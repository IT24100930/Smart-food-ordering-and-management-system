package com.smartfood.controller;

import com.smartfood.dto.request.OrderRequest;
import com.smartfood.dto.response.OrderResponse;
import com.smartfood.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public List<OrderResponse> getOrdersByUser(@RequestParam String email) {
        return orderService.getOrdersByUserEmail(email);
    }

    @PostMapping
    public OrderResponse createOrder(@Valid @RequestBody OrderRequest request) {
        return orderService.createOrder(request);
    }
}
