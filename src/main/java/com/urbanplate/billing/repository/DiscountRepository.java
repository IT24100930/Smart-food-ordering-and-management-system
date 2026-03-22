package com.urbanplate.billing.repository;

import com.urbanplate.billing.model.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Long> {

    Optional<Discount> findByCouponCode(String couponCode);

    List<Discount> findByActiveTrue();

    List<Discount> findByValidFromBeforeAndValidUntilAfter(LocalDateTime now, LocalDateTime now2);
}