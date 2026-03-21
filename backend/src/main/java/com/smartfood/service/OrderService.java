package com.smartfood.service;

import com.smartfood.dto.request.OrderRequest;
import com.smartfood.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {
    List<OrderResponse> getOrdersByUserEmail(String email);
    List<OrderResponse> getAllOrders();
    OrderResponse createOrder(OrderRequest request);
}
