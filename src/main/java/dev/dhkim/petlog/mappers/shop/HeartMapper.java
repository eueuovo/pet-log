package dev.dhkim.petlog.mappers.shop;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface HeartMapper {
    Integer checkHeart(@Param("userId") int userId, @Param("productId") int productId);
    void insertHeart(@Param("userId") int userId, @Param("productId") int productId);
    void deleteHeart(@Param("userId") int userId, @Param("productId") int productId);
}