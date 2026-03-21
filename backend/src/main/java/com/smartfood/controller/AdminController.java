package com.smartfood.controller;

import com.smartfood.dto.response.DashboardSummaryResponse;
import com.smartfood.dto.response.OrderResponse;
import com.smartfood.dto.response.UserResponse;
import com.smartfood.exception.BadRequestException;
import com.smartfood.service.AdminService;
import com.smartfood.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final OrderService orderService;

    @GetMapping("/dashboard-summary")
    public DashboardSummaryResponse getDashboardSummary(@RequestHeader(value = "X-User-Role", required = false) String role) {
        validateAdmin(role);
        return adminService.getDashboardSummary();
    }

    @GetMapping("/users")
    public List<UserResponse> getUsers(@RequestHeader(value = "X-User-Role", required = false) String role) {
        validateAdmin(role);
        return adminService.getAllUsers();
    }

    @GetMapping("/orders")
    public List<OrderResponse> getOrders(
            @RequestHeader(value = "X-User-Role", required = false) String role,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(defaultValue = "all") String scope) {
        validateAdmin(role);
        return orderService.filterOrders(search, status, date, scope);
    }

    private void validateAdmin(String role) {
        if (!"admin".equalsIgnoreCase(role)) {
            throw new BadRequestException("Admin access required.");
        }
    }
}
