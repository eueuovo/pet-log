package dev.dhkim.petlog.mappers.shop;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PointMapper {
    int getAvailablePoint(@Param("userId") Integer userId);
}
