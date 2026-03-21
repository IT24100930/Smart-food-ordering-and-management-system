package com.smartfood.repository;

import com.smartfood.entity.FoodOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<FoodOrder, Long> {
    List<FoodOrder> findByUserEmailOrderByOrderDateDescIdDesc(String email);
    List<FoodOrder> findAllByOrderByOrderDateDescIdDesc();
    Optional<FoodOrder> findByOrderCode(String orderCode);
}
