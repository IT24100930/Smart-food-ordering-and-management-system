package com.smartfood.service.impl;

import com.smartfood.dto.request.OrderItemRequest;
import com.smartfood.dto.request.OrderRequest;
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
}
