package com.smartfood.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String category;
    @NotNull
    private Double price;
    @NotNull
    private Integer stock;
    private String prepTime;
    private String description;
    private String image;
}
