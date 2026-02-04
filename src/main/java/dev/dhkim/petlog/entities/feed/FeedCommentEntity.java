package dev.dhkim.petlog.entities.feed;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class FeedCommentEntity {
    private int id;
    private int feedId;
    private int UserId;
    private int parentCommentId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
