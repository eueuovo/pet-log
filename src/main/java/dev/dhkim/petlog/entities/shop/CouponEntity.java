package dev.dhkim.petlog.entities.shop;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "coupon")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CouponEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "discount_type", nullable = false, length = 10)
    private String discountType;

    @Column(name = "discount_value", nullable = false)
    private Integer discountValue;

    @Column(name = "min_order_amount", nullable = false)
    private Integer minOrderAmount = 0;

    @Column(name = "max_discount_amount")
    private Integer maxDiscountAmount;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "total_quantity")
    private Integer totalQuantity;

    @Column(name = "issued_quantity", nullable = false)
    private Integer issuedQuantity = 0;

    @Column(name = "coupon_limit")
    private Integer couponLimit;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}