package dev.dhkim.petlog.vos.feed;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedResponseVo {
    private int id;
    private int userId;
    private String title;
    private String content;
    private int likeCount;
    private int commentCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<FeedMediaVo> feedMediaVos;
}
