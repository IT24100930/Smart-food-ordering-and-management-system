package com.smartfood.service.impl;

import com.smartfood.dto.request.AdminOrderUpdateRequest;
import com.smartfood.dto.request.OrderItemRequest;
import com.smartfood.dto.request.OrderRequest;
import com.smartfood.dto.request.OrderStatusUpdateRequest;
import com.smartfood.dto.response.OrderItemResponse;
import com.smartfood.dto.response.OrderResponse;
import com.smartfood.entity.FoodOrder;
import com.smartfood.entity.OrderItem;
import com.smartfood.entity.User;
import com.smartfood.exception.ResourceNotFoundException;
import com.smartfood.repository.OrderRepository;
import com.smartfood.repository.UserRepository;
import com.smartfood.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @Override
    public List<OrderResponse> getOrdersByUserEmail(String email) {
        return orderRepository.findByUserEmailOrderByOrderDateDescIdDesc(email).stream()
                .map(this::mapOrder)
                .toList();
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAllByOrderByOrderDateDescIdDesc().stream()
                .map(this::mapOrder)
                .toList();
    }

    @Override
    public List<OrderResponse> filterOrders(String search, String status, LocalDate date, String scope) {
        return orderRepository.findAllByOrderByOrderDateDescIdDesc().stream()
                .filter(order -> matchesSearch(order, search))
                .filter(order -> matchesStatus(order, status))
                .filter(order -> matchesDate(order, date))
                .filter(order -> matchesScope(order, scope))
                .map(this::mapOrder)
                .toList();
    }

    @Override
    public OrderResponse createOrder(OrderRequest request) {
        User user = userRepository.findByEmail(request.getUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found for email: " + request.getUserEmail()));

        FoodOrder order = FoodOrder.builder()
                .orderCode("ORD-" + System.currentTimeMillis())
                .user(user)
                .customerName(request.getCustomerName())
                .phone(request.getPhone())
                .address(request.getAddress())
                .paymentMethod(request.getPaymentMethod())
                .total(request.getTotal())
                .status("Pending")
                .progress(20)
                .orderDate(LocalDate.now())
                .build();

        List<OrderItem> orderItems = request.getItems().stream()
                .map(item -> buildItem(order, item))
                .toList();

        order.setItems(orderItems);

        FoodOrder savedOrder = orderRepository.save(order);
        return mapOrder(savedOrder);
    }

    @Override
    public OrderResponse updateOrder(String orderCode, AdminOrderUpdateRequest request) {
        FoodOrder order = orderRepository.findByOrderCode(orderCode)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + orderCode));

        String normalizedStatus = normalizeStatus(request.getStatus());

        order.setCustomerName(request.getCustomerName());
        order.setPhone(request.getPhone());
        order.setAddress(request.getAddress());
        order.setPaymentMethod(request.getPaymentMethod());
        order.setTotal(request.getTotal());
        order.setStatus(normalizedStatus);
        order.setProgress(resolveProgress(normalizedStatus));

        order.getItems().clear();
        request.getItems().forEach(item -> order.getItems().add(buildItem(order, item)));

        return mapOrder(orderRepository.save(order));
    }

    @Override
    public OrderResponse updateOrderStatus(String orderCode, OrderStatusUpdateRequest request) {
        FoodOrder order = orderRepository.findByOrderCode(orderCode)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + orderCode));

        String normalizedStatus = normalizeStatus(request.getStatus());
        order.setStatus(normalizedStatus);
        order.setProgress(resolveProgress(normalizedStatus));

        return mapOrder(orderRepository.save(order));
    }

    @Override
    public void deleteOrder(String orderCode) {
        FoodOrder order = orderRepository.findByOrderCode(orderCode)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + orderCode));
        orderRepository.delete(order);
    }

    private OrderItem buildItem(FoodOrder order, OrderItemRequest item) {
        return OrderItem.builder()
                .order(order)
                .foodName(item.getName())
                .quantity(item.getQuantity())
                .build();
    }

    private OrderResponse mapOrder(FoodOrder order) {
        return OrderResponse.builder()
                .id(order.getOrderCode())
                .userEmail(order.getUser().getEmail())
                .customerName(order.getCustomerName())
                .phone(order.getPhone())
                .address(order.getAddress())
                .paymentMethod(order.getPaymentMethod())
                .total(order.getTotal())
                .status(order.getStatus())
                .progress(order.getProgress())
                .date(order.getOrderDate())
                .items(order.getItems().stream()
                        .map(item -> OrderItemResponse.builder()
                                .name(item.getFoodName())
                                .quantity(item.getQuantity())
                                .build())
                        .toList())
                .build();
    }

    private boolean matchesSearch(FoodOrder order, String search) {
        if (search == null || search.isBlank()) {
            return true;
        }

        String keyword = search.toLowerCase(Locale.ROOT);
        return order.getOrderCode().toLowerCase(Locale.ROOT).contains(keyword)
                || order.getCustomerName().toLowerCase(Locale.ROOT).contains(keyword)
                || order.getUser().getEmail().toLowerCase(Locale.ROOT).contains(keyword);
    }

    private boolean matchesStatus(FoodOrder order, String status) {
        if (status == null || status.isBlank() || status.equalsIgnoreCase("All")) {
            return true;
        }

        return order.getStatus().equalsIgnoreCase(status);
    }

    private boolean matchesDate(FoodOrder order, LocalDate date) {
        return date == null || order.getOrderDate().equals(date);
    }

    private boolean matchesScope(FoodOrder order, String scope) {
        if (scope == null || scope.isBlank() || scope.equalsIgnoreCase("all")) {
            return true;
        }

        if (scope.equalsIgnoreCase("active")) {
            return !order.getStatus().equalsIgnoreCase("Completed")
                    && !order.getStatus().equalsIgnoreCase("Canceled");
        }

        if (scope.equalsIgnoreCase("completed")) {
            return order.getStatus().equalsIgnoreCase("Completed")
                    || order.getStatus().equalsIgnoreCase("Canceled");
        }

        return true;
    }

    private String normalizeStatus(String status) {
        String normalized = status.trim().toLowerCase(Locale.ROOT);

        return switch (normalized) {
            case "pending" -> "Pending";
            case "preparing" -> "Preparing";
            case "hold", "on hold" -> "Hold";
            case "completed" -> "Completed";
            case "canceled", "cancelled" -> "Canceled";
            default -> "Pending";
        };
    }

    private int resolveProgress(String status) {
        return switch (status) {
            case "Pending" -> 20;
            case "Preparing" -> 60;
            case "Hold" -> 40;
            case "Completed" -> 100;
            case "Canceled" -> 0;
            default -> 20;
        };
    }
}
