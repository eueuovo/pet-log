package dev.dhkim.petlog.entities.user;

import lombok.*;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "userId")
public class UserEntity {
    private int userId;
    private String email;
    private String loginId;
    private String password;
    private String userType;
    private int shopPoint;
    private LocalDateTime createdAt;
}
