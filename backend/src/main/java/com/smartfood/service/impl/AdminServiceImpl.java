package com.smartfood.service.impl;

import com.smartfood.dto.response.DashboardSummaryResponse;
import com.smartfood.dto.response.UserResponse;
import com.smartfood.repository.FoodRepository;
import com.smartfood.repository.OrderRepository;
import com.smartfood.repository.UserRepository;
import com.smartfood.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final FoodRepository foodRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    @Override
    public DashboardSummaryResponse getDashboardSummary() {
        double revenue = orderRepository.findAll().stream()
                .mapToDouble(order -> order.getTotal() == null ? 0 : order.getTotal())
                .sum();

        return DashboardSummaryResponse.builder()
                .totalFoods(foodRepository.count())
                .totalUsers(userRepository.count())
                .totalOrders(orderRepository.count())
                .revenue(revenue)
                .build();
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .build())
                .toList();
    }
}
