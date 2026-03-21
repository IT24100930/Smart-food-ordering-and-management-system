package com.smartfood.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuDTO {
    private Long menuId;
    private String name;
    private String category;
    private double price;
    private String description;
    private String imageUrl;
    private boolean available;
}
