package com.smartfood.service;

import com.smartfood.dto.request.AdminOrderUpdateRequest;
import com.smartfood.dto.request.OrderRequest;
import com.smartfood.dto.request.OrderStatusUpdateRequest;
import com.smartfood.dto.response.OrderResponse;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {
    List<OrderResponse> getOrdersByUserEmail(String email);
    List<OrderResponse> getAllOrders();
    List<OrderResponse> filterOrders(String search, String status, LocalDate date, String scope);
    OrderResponse createOrder(OrderRequest request);
    OrderResponse updateOrder(String orderCode, AdminOrderUpdateRequest request);
    OrderResponse updateOrderStatus(String orderCode, OrderStatusUpdateRequest request);
    void deleteOrder(String orderCode);
}
