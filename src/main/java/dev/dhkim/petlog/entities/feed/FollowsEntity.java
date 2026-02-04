package dev.dhkim.petlog.entities.feed;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class FollowsEntity {
    private int id;
    private int followingUserId;
    private int followedUserId;
    private LocalDateTime createdAt;
}
