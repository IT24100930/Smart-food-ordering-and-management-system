package com.urbanplate.billing.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "taxes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tax {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String taxName;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal rate; // e.g., 8.00 for 8%

    @Enumerated(EnumType.STRING)
    private TaxCategory applicableTo;

    private Boolean active = true;

    private String description;

    public enum TaxCategory {
        FOOD, BEVERAGE, SERVICE, DELIVERY, ALL
    }

    public BigDecimal calculateTax(BigDecimal amount) {
        return amount.multiply(rate).divide(BigDecimal.valueOf(100));
    }
}