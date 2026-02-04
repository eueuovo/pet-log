package dev.dhkim.petlog.controllers.feed;

import dev.dhkim.petlog.services.feed.FeedApiService;
import dev.dhkim.petlog.vos.feed.FeedScrollResponseVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/feed")
@RequiredArgsConstructor
public class FeedApiController {

    private final FeedApiService feedApiService;

    @RequestMapping(value="/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public FeedScrollResponseVo getFeeds(@RequestParam(required = false) Integer lastFeedId,
                                        @RequestParam(defaultValue = "10") int size) {
        return feedApiService.getFeeds(lastFeedId, size);
    }
}
