package dev.dhkim.petlog.entities.user;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "deliveryAddressId")
public class DeliveryAddressEntity {
    private int deliveryAddressId;
    private int userId;
    private String deliveryName;
    private String receiverName;
    private String phone;
    private String postalCode;
    private String addressPrimary;
    private String addressSecondary;
    private boolean isDefault;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
