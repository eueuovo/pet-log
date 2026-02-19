package dev.dhkim.petlog.mappers.feed;

import dev.dhkim.petlog.dto.feed.FeedCommentDto;
import dev.dhkim.petlog.entities.feed.FeedCommentEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FeedCommentMapper {
    // 피드 id로 전체 댓글 조회
    List<FeedCommentDto> selectCommentById (@Param("feedId") int feedId);
    // 댓글 단건 조회(DTO)
    FeedCommentDto selectById(@Param("commentId") int commentId);
    // 댓글 단건 조회(Entity)
    FeedCommentEntity selectEntityById(@Param("commentId") int commentId);
    // 댓글 insert
    int insertComment(FeedCommentEntity entity);
    // 삭제할 댓글 갯수 확인
    int countWithChildren(@Param("commentId") int commentId);
    // 댓글 삭제
    int deleteById(@Param("commentId") int commentId);
}
