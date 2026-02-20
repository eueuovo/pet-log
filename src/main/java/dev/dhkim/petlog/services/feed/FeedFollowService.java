package dev.dhkim.petlog.services.feed;

import dev.dhkim.petlog.mappers.feed.FeedUserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class FeedFollowService {
    private final FeedUserMapper feedUserMapper;

    @Transactional
    public boolean toggleFollow(int userId, int targetUserId) {
        boolean exists = feedUserMapper.selectIsFollowing(userId, targetUserId);

        if (exists) { // 현재 팔로우 중이라면
            feedUserMapper.deleteFollow(userId, targetUserId);
            feedUserMapper.decreaseFollowing(userId);
            feedUserMapper.decreaseFollowers(targetUserId);
            return false;
        } else {
            feedUserMapper.insertFollow(userId, targetUserId);
            feedUserMapper.increaseFollowing(userId);
            feedUserMapper.increaseFollowers(targetUserId);
            return true;
        }
    }

    public Map<String, Integer> getFollowCount(int userId, int targetUserId) {
        int followerCount = feedUserMapper.selectFollowerCount(targetUserId);
        int followingCount = feedUserMapper.selectFollowingCount(userId);
        return Map.of("followerCount", followerCount,
                "followingCount", followingCount);
    }
}
