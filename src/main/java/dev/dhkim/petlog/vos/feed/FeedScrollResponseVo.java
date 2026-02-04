package dev.dhkim.petlog.vos.feed;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedScrollResponseVo {
    private List<FeedResponseVo> feedResponseVos;
    private Integer lastFeedId;
    private boolean hasNext;
}
