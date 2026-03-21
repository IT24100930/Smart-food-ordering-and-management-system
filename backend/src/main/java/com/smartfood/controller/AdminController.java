package com.smartfood.controller;

import com.smartfood.dto.response.DashboardSummaryResponse;
import com.smartfood.dto.response.OrderResponse;
import com.smartfood.dto.response.UserResponse;
import com.smartfood.service.AdminService;
import com.smartfood.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final OrderService orderService;

    @GetMapping("/dashboard-summary")
    public DashboardSummaryResponse getDashboardSummary() {
        return adminService.getDashboardSummary();
    }

    @GetMapping("/users")
    public List<UserResponse> getUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/orders")
    public List<OrderResponse> getOrders() {
        return orderService.getAllOrders();
    }
}
