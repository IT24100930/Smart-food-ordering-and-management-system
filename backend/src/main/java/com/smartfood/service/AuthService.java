package com.smartfood.service;

import com.smartfood.dto.request.LoginRequest;
import com.smartfood.dto.request.RegisterRequest;
import com.smartfood.dto.response.UserResponse;

public interface AuthService {
    UserResponse register(RegisterRequest request);
    UserResponse login(LoginRequest request);
}
