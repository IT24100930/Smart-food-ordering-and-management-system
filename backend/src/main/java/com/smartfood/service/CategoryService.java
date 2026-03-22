package com.smartfood.service;

import com.smartfood.dto.request.CategoryRequest;
import com.smartfood.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getAllCategories();
    CategoryResponse createCategory(CategoryRequest request);
}
