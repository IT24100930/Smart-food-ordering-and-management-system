package com.smartfood.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DashboardSummaryResponse {
    private long totalFoods;
    private long totalUsers;
    private long totalOrders;
    private double revenue;
}
