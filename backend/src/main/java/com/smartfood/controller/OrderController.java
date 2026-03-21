package com.smartfood.controller;

import com.smartfood.dto.request.AdminOrderUpdateRequest;
import com.smartfood.dto.request.OrderRequest;
import com.smartfood.dto.request.OrderStatusUpdateRequest;
import com.smartfood.dto.response.OrderResponse;
import com.smartfood.exception.BadRequestException;
import com.smartfood.service.OrderService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final ObjectMapper objectMapper;
    private final Validator validator;

    @GetMapping
    public List<OrderResponse> getOrdersByUser(@RequestParam String email) {
        return orderService.getOrdersByUserEmail(email);
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE})
    public OrderResponse createOrder(@RequestBody String payload) {
        OrderRequest request = parseBody(payload, OrderRequest.class);
        validateRequest(request);
        return orderService.createOrder(request);
    }

    @PostMapping(value = "/admin", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE})
    public OrderResponse createAdminOrder(
            @RequestHeader(value = "X-User-Role", required = false) String role,
            @RequestBody String payload) {
        validateAdmin(role);
        OrderRequest request = parseBody(payload, OrderRequest.class);
        validateRequest(request);
        return orderService.createOrder(request);
    }

    @PutMapping(value = "/{orderCode}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE})
    public OrderResponse updateOrder(
            @RequestHeader(value = "X-User-Role", required = false) String role,
            @PathVariable String orderCode,
            @RequestBody String payload) {
        validateAdmin(role);
        AdminOrderUpdateRequest request = parseBody(payload, AdminOrderUpdateRequest.class);
        validateRequest(request);
        return orderService.updateOrder(orderCode, request);
    }

    @PutMapping(value = "/{orderCode}/status", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE})
    public OrderResponse updateOrderStatus(
            @RequestHeader(value = "X-User-Role", required = false) String role,
            @PathVariable String orderCode,
            @RequestBody String payload) {
        validateAdmin(role);

        OrderStatusUpdateRequest request = new OrderStatusUpdateRequest();
        request.setStatus(parseStatus(payload));

        return orderService.updateOrderStatus(orderCode, request);
    }

    @DeleteMapping("/{orderCode}")
    public void deleteOrder(
            @RequestHeader(value = "X-User-Role", required = false) String role,
            @PathVariable String orderCode) {
        validateAdmin(role);
        orderService.deleteOrder(orderCode);
    }

    private void validateAdmin(String role) {
        if (!"admin".equalsIgnoreCase(role)) {
            throw new BadRequestException("Admin access required.");
        }
    }

    private String parseStatus(String payload) {
        if (payload == null || payload.isBlank()) {
            throw new BadRequestException("Status is required.");
        }

        String trimmedPayload = payload.trim();

        try {
            if (trimmedPayload.startsWith("{")) {
                JsonNode jsonNode = objectMapper.readTree(trimmedPayload);
                String status = jsonNode.path("status").asText("").trim();
                if (!status.isBlank()) {
                    return status;
                }
            }
        } catch (Exception ignored) {
            // Fall back to plain-text parsing below.
        }

        String plainTextStatus = trimmedPayload.replace("\"", "").trim();
        if (plainTextStatus.isBlank()) {
            throw new BadRequestException("Status is required.");
        }

        return plainTextStatus;
    }

    private <T> T parseBody(String payload, Class<T> type) {
        if (payload == null || payload.isBlank()) {
            throw new BadRequestException("Request body is required.");
        }

        try {
            return objectMapper.readValue(payload, type);
        } catch (Exception ex) {
            throw new BadRequestException("Invalid request body.");
        }
    }

    private <T> void validateRequest(T request) {
        Set<ConstraintViolation<T>> violations = validator.validate(request);
        if (violations.isEmpty()) {
            return;
        }

        ConstraintViolation<T> firstViolation = violations.iterator().next();
        throw new BadRequestException(firstViolation.getMessage());
    }
}
