package com.smartfood.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderItemResponse {
    private String name;
    private Integer quantity;
}
