package com.urbanplate.billing.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "discounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String couponCode;

    @Enumerated(EnumType.STRING)
    private DiscountType type; // PERCENTAGE or FIXED

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal value;

    private String description;

    private LocalDateTime validFrom;

    private LocalDateTime validUntil;

    private Integer usageLimit;

    private Integer usageCount = 0;

    private BigDecimal minimumOrderAmount;

    private Boolean active = true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public enum DiscountType {
        PERCENTAGE, FIXED_AMOUNT
    }

    public boolean isValid() {
        LocalDateTime now = LocalDateTime.now();
        return active &&
                now.isAfter(validFrom) &&
                now.isBefore(validUntil) &&
                (usageLimit == null || usageCount < usageLimit);
    }

    public BigDecimal calculateDiscount(BigDecimal amount) {
        if (type == DiscountType.PERCENTAGE) {
            return amount.multiply(value).divide(BigDecimal.valueOf(100));
        } else {
            return value.min(amount); // Can't discount more than the amount
        }
    }
}