package com.smartfood.service;

import com.smartfood.dto.request.FoodRequest;
import com.smartfood.dto.response.FoodResponse;

import java.util.List;

public interface FoodService {
    List<FoodResponse> getAllFoods();
    FoodResponse createFood(FoodRequest request);
    FoodResponse updateFood(Long id, FoodRequest request);
    void deleteFood(Long id);
}
