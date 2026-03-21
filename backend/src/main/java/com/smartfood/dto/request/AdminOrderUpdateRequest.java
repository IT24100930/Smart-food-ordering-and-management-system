package com.smartfood.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AdminOrderUpdateRequest {
    @NotBlank
    private String customerName;

    @NotBlank
    private String phone;

    @NotBlank
    private String address;

    @NotBlank
    private String paymentMethod;

    @NotNull
    private Double total;

    @NotBlank
    private String status;

    @Valid
    @NotEmpty
    private List<OrderItemRequest> items;
}
