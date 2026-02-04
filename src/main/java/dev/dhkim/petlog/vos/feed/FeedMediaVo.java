package dev.dhkim.petlog.vos.feed;

import dev.dhkim.petlog.enums.feed.MediaType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class FeedMediaVo {
    private String mediaUrl;
    private MediaType mediaType;
    private int sortOrder;
}
