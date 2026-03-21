package com.smartfood.service.impl;

import com.smartfood.dto.request.FoodRequest;
import com.smartfood.dto.response.FoodResponse;
import com.smartfood.entity.Category;
import com.smartfood.entity.Food;
import com.smartfood.exception.ResourceNotFoundException;
import com.smartfood.repository.CategoryRepository;
import com.smartfood.repository.FoodRepository;
import com.smartfood.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodServiceImpl implements FoodService {

    private final FoodRepository foodRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<FoodResponse> getAllFoods() {
        return foodRepository.findAll().stream().map(this::mapFood).toList();
    }

    @Override
    public FoodResponse createFood(FoodRequest request) {
        Category category = categoryRepository.findByName(request.getCategory())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + request.getCategory()));

        Food food = foodRepository.save(Food.builder()
                .name(request.getName())
                .category(category)
                .price(request.getPrice())
                .rating(4.5)
                .stock(request.getStock())
                .prepTime(request.getPrepTime() == null || request.getPrepTime().isBlank() ? "15 min" : request.getPrepTime())
                .description(request.getDescription())
                .image(request.getImage())
                .build());

        return mapFood(food);
    }

    private FoodResponse mapFood(Food food) {
        return FoodResponse.builder()
                .id(food.getId())
                .name(food.getName())
                .category(food.getCategory().getName())
                .price(food.getPrice())
                .rating(food.getRating())
                .stock(food.getStock())
                .prepTime(food.getPrepTime())
                .description(food.getDescription())
                .image(food.getImage())
                .build();
    }
}
