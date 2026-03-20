package com.smartfood.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FoodResponse {
    private Long id;
    private String name;
    private String category;
    private Double price;
    private Double rating;
    private Integer stock;
    private String prepTime;
    private String description;
    private String image;
}
