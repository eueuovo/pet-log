package dev.dhkim.petlog.mappers.shop;

import dev.dhkim.petlog.entities.shop.SubCategoryEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SubCategoryMapper {
    SubCategoryEntity selectByDisplayText(@Param("displayText") String displayText);
}