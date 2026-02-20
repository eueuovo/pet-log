package dev.dhkim.petlog.mappers.shop;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface ReviewMapper {
    List<Map<String, Object>> selectReviewsByProductId(Integer productId);

    List<String> selectReviewImages(Integer reviewId);

    boolean checkPurchased(@Param("userId") Integer userId, @Param("productId") Integer productId);

    List<String> getPurchasedOptions(@Param("userId") Integer userId, @Param("productId") Integer productId);

    boolean checkAlreadyReviewed(@Param("userId") Integer userId, @Param("productId") Integer productId);

    Double selectAverageRating(Integer productId);

    List<Map<String, Object>> selectRatingDistribution(Integer productId);
}
