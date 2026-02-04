package dev.dhkim.petlog.services.feed;

import dev.dhkim.petlog.entities.feed.FeedEntity;
import dev.dhkim.petlog.entities.feed.FeedMediaEntity;
import dev.dhkim.petlog.mappers.FeedMapper;
import dev.dhkim.petlog.mappers.FeedMediaMapper;
import dev.dhkim.petlog.vos.feed.FeedMediaVo;
import dev.dhkim.petlog.vos.feed.FeedResponseVo;
import dev.dhkim.petlog.vos.feed.FeedScrollResponseVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedApiService {

    private final FeedMapper feedMapper;
    private final FeedMediaMapper feedMediaMapper;

    // feed 전체 조회 (lastFeedId보다 작은 값, size갯수만큼)
    public FeedScrollResponseVo getFeeds(Integer lastFeedId, int size) {
        List<FeedEntity> feedList = feedMapper.selectFeedsForScroll(lastFeedId, size + 1);

        boolean hasNext = feedList.size() > size;

        if(hasNext) {
            feedList.remove(size);
        }

        List<Integer> feedIds = feedList.stream()
                .map(FeedEntity::getId)
                .toList();

        if(feedIds.isEmpty()) {
            return FeedScrollResponseVo.builder()
                    .feedResponseVos(Collections.emptyList())
                    .lastFeedId(null)
                    .hasNext(false)
                    .build();
        }

        List<FeedMediaEntity> mediaList = feedMediaMapper.selectByFeedIds(feedIds);

        Map<Integer, List<FeedMediaVo>> mediaMap = mediaList.stream()
                .collect(Collectors.groupingBy( // feedId 가 같은 것 끼리 묶어라!
                    FeedMediaEntity::getFeedId,
                    Collectors.mapping( // Entity를 Vo로 변경함
                        media -> FeedMediaVo.builder()
                                            .mediaUrl(media.getMediaUrl())
                                            .mediaType(media.getMediaType())
                                            .sortOrder(media.getSortOrder())
                                            .build(),
                        Collectors.toList() // 변경된 Vo를 리스트 형태로 만들기
                    )
                ));

        List<FeedResponseVo> responseFeeds = feedList.stream()
                .map(feed -> FeedResponseVo.builder()
                        .id(feed.getId())
                        .userId(feed.getUserId())
                        .title(feed.getTitle())
                        .content(feed.getContent())
                        .likeCount(feed.getLikeCount())
                        .commentCount(feed.getCommentCount())
                        .createdAt(feed.getCreatedAt())
                        .updatedAt(feed.getUpdatedAt())
                        .feedMediaVos(mediaMap.getOrDefault(feed.getId(), Collections.emptyList()))
                        .build()
                ).toList();

        Integer nextLastFeedId = hasNext
                ? responseFeeds.get(responseFeeds.size() -1).getId()
                : null;

        return FeedScrollResponseVo.builder()
                .feedResponseVos(responseFeeds)
                .lastFeedId(nextLastFeedId)
                .hasNext(hasNext)
                .build();
    }
}
