package dev.dhkim.petlog.entities.shop;

import dev.dhkim.petlog.entities.user.UserEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "`order`")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(name = "orderer_name", nullable = false, length = 50)
    private String ordererName;

    @Column(name = "orderer_email", nullable = false, length = 100)
    private String ordererEmail;

    @Column(name = "orderer_phone", nullable = false, length = 20)
    private String ordererPhone;

    @Column(name = "receiver_name", nullable = false, length = 50)
    private String receiverName;

    @Column(name = "receiver_phone", nullable = false, length = 20)
    private String receiverPhone;

    @Column(name = "address_postal", nullable = false, length = 10)
    private String addressPostal;

    @Column(name = "address_primary", nullable = false, length = 100)
    private String addressPrimary;

    @Column(name = "address_secondary", length = 100)
    private String addressSecondary;

    @Column(name = "delivery_request", length = 100)
    private String deliveryRequest;

    @Column(name = "delivery_fee", nullable = false)
    private Integer deliveryFee = 0;

    @Column(name = "final_amount", nullable = false)
    private Integer finalAmount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "used_coupon_id")
    private UserCouponEntity usedCoupon;

    @Column(name = "used_point", nullable = false)
    private Integer usedPoint = 0;

    @Column(name = "coupon_discount", nullable = false)
    private Integer couponDiscount = 0;

    @Column(name = "point_discount", nullable = false)
    private Integer pointDiscount = 0;

    @Column(name = "payment_method", nullable = false, length = 20)
    private String paymentMethod;

    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}