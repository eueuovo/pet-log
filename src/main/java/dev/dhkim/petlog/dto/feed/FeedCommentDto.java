package dev.dhkim.petlog.dto.feed;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedCommentDto {
    private int commentId;
    private int feedId;
    private int userId;
    private Integer parentCommentId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String timeAgo;
    private String nickname;
    private String profileImageUrl;
    private List<FeedCommentDto> replies = new ArrayList<>();
}

