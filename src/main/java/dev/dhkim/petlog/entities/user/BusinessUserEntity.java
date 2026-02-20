package dev.dhkim.petlog.entities.user;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "userId")
public class BusinessUserEntity {
    private int userId;
    private String companyName;
    private String representativeName;
    private String businessNumber;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
