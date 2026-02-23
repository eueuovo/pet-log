package dev.dhkim.petlog.dto.user;

import lombok.*;

import java.time.LocalDateTime;
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StoreDto {
    private String storeName;
    private String storePhone;
    private String postalCode;
    private String addressPrimary;
    private String addressSecondary;
    private String category;
    private LocalDateTime createdAt;
    private Double lng;
    private Double lat;
    private int userId;
    private int storeId;
}
