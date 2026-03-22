package com.smartfood.controller;

import com.smartfood.dto.request.FoodRequest;
import com.smartfood.dto.response.FoodResponse;
import com.smartfood.service.FoodService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
public class FoodController {

    private final FoodService foodService;

    @GetMapping
    public List<FoodResponse> getFoods() {
        return foodService.getAllFoods();
    }

    @PostMapping
    public FoodResponse createFood(@Valid @RequestBody FoodRequest request) {
        return foodService.createFood(request);
    }

    @PutMapping("/{id}")
    public FoodResponse updateFood(@PathVariable Long id, @Valid @RequestBody FoodRequest request) {
        return foodService.updateFood(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
    }
}
