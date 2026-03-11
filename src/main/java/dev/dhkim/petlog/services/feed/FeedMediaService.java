package dev.dhkim.petlog.services.feed;

import dev.dhkim.petlog.dto.feed.FeedDto;
import dev.dhkim.petlog.dto.feed.FeedMediaDto;
import dev.dhkim.petlog.entities.feed.FeedMediaEntity;
import dev.dhkim.petlog.mappers.feed.FeedMediaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedMediaService {

    private final FeedMediaMapper feedMediaMapper;

    @Value("${file.upload.base-path}")  // ← 추가
    private String basePath;

    // ID에 따른 미디어 넣는 함수
    public void addMediaToFeed (List<FeedDto> feeds) {
        if (feeds.isEmpty()) return;
        // ID만 리스트로 가져오기
        List<Integer> feedIds = feeds.stream()
                .map(FeedDto::getFeedId)
                .toList();
        // ID에 해당하는 모든 미디어 가져오기
        List<FeedMediaEntity> mediaList = feedMediaMapper.selectByFeedIds(feedIds);
        // 해당 아이디에 맞게 묶어주기
        Map<Integer, List<FeedMediaDto>> mediaMap = mediaList.stream()
                .collect(Collectors.groupingBy( // gropingBy(x, y): x를 기준으로 y를 묶음
                        FeedMediaEntity::getFeedId, // FeedId(x)를 기준으로
                        Collectors.mapping( // mediaDto(y)들을 묶음
                                media -> FeedMediaDto.builder()
                                        .mediaUrl(media.getThumbnailUrl())
                                        .mediaType(media.getMediaType())
                                        .sortOrder(media.getSortOrder())
                                        .source(media.getSource())
                                        .build(),
                                Collectors.toList()
                        )
                ));
        // 각 피드에 맞는 미디어 넣어주기
        feeds.forEach(feed ->
                feed.setFeedMediaDtos(mediaMap.getOrDefault(feed.getFeedId(), Collections.emptyList()))
        );
    }

    // 비디오 썸네일 만들기
    public String generateThumbnail(String savedUrl, List<String> createdPaths) {

        try {
            String videoPath = basePath +  savedUrl.replace("/uploads", "");;

            File videoFile = new File(videoPath);
            if (!videoFile.exists()) throw new RuntimeException("영상 파일이 존재하지 않습니다.");

            String thumbnailName =
                    videoFile.getName().replaceAll("\\.[^.]+$", "") + "_thumb.jpg";

            File thumbnailFile = new File(videoFile.getParent(), thumbnailName);

            ProcessBuilder builder = new ProcessBuilder(
                    "ffmpeg",
                    "-y", // ✅ 같은 이름 있으면 덮어쓰기
                    "-ss", "00:00:01",
                    "-i", videoFile.getAbsolutePath(),
                    "-vframes", "1",
                    thumbnailFile.getAbsolutePath()
            );

            builder.redirectErrorStream(true);
            Process process = builder.start();

            // ✅ 로그 소비
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                while (reader.readLine() != null) {
                    // 필요하면 log.debug로 출력 가능
                }
            }

            int exitCode = process.waitFor();
            if (exitCode != 0 || !thumbnailFile.exists()) {
                throw new RuntimeException("썸네일 생성 실패 (exitCode=" + exitCode + ")");
            }

            // DB에 저장할 URL 생성
            String thumbnailUrl = savedUrl.replace(videoFile.getName(), thumbnailName);
            createdPaths.add(thumbnailUrl);

            return thumbnailUrl;

        } catch (Exception e) {
            throw new RuntimeException("썸네일 생성 실패", e);
        }
    }


    // 저장된 사진 및 비디오 URL → 실제 파일 경로로 바꿔서 삭제
    public void deleteCreatedFilesQuietly(List<String> createdPaths) {
        for (String urlPath : createdPaths) {

            if (urlPath == null) continue;

            try {
                String absolutePath =
                        basePath + urlPath.replace("/uploads", "");

                File f = new File(absolutePath);

                if (f.exists()) {
                    boolean deleted = f.delete();
                    // 필요하면 log.debug("delete {} = {}", absolutePath, deleted);
                }
            } catch (Exception ignored) {
            }
        }
    }
}
