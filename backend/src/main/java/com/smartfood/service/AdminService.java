package com.smartfood.service;

import com.smartfood.dto.response.DashboardSummaryResponse;
import com.smartfood.dto.response.UserResponse;

import java.util.List;

public interface AdminService {
    DashboardSummaryResponse getDashboardSummary();
    List<UserResponse> getAllUsers();
}
