package dev.dhkim.petlog.entities.feed;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class FeedLikesEntity {
    private int id;
    private int userId;
    private int feedId;
    private LocalDateTime createdAt;
}
