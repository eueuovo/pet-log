package dev.dhkim.petlog.mappers.shop;

import dev.dhkim.petlog.entities.shop.BannerEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BannerMapper {
    List<BannerEntity> selectBannersByDeviceType(String deviceType);
}