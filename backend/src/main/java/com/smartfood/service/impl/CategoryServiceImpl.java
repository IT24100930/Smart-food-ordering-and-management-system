package com.smartfood.service.impl;

import com.smartfood.dto.request.CategoryRequest;
import com.smartfood.dto.response.CategoryResponse;
import com.smartfood.entity.Category;
import com.smartfood.exception.BadRequestException;
import com.smartfood.repository.CategoryRepository;
import com.smartfood.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapCategory)
                .toList();
    }

    @Override
    public CategoryResponse createCategory(CategoryRequest request) {
        String normalizedName = request.getName().trim();

        if (categoryRepository.findByName(normalizedName).isPresent()) {
            throw new BadRequestException("Category already exists: " + normalizedName);
        }

        Category category = categoryRepository.save(Category.builder()
                .name(normalizedName)
                .build());

        return mapCategory(category);
    }

    private CategoryResponse mapCategory(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }
}
