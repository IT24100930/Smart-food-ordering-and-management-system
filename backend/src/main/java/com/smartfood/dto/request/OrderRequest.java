package com.smartfood.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderRequest {
    @Email
    @NotBlank
    private String userEmail;

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

    @Valid
    @NotEmpty
    private List<OrderItemRequest> items;
}
