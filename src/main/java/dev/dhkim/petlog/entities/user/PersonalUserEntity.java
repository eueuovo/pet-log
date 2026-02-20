package dev.dhkim.petlog.entities.user;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "userId")
public class PersonalUserEntity {
    private int userId;
    private String name;
    private String nickname;
    private int followingCount;
    private int followerCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
