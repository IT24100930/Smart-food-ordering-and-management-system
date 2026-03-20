package com.smartfood.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class OrderResponse {
    private String id;
    private String customerName;
    private String phone;
    private String address;
    private String paymentMethod;
    private Double total;
    private String status;
    private Integer progress;
    private LocalDate date;
    private List<OrderItemResponse> items;
}
