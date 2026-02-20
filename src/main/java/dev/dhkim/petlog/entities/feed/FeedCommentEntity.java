package dev.dhkim.petlog.entities.feed;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedCommentEntity {
    private int id;
    private int feedId;
    private int userId;
    private Integer parentCommentId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
