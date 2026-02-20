package dev.dhkim.petlog.services.shop;

import dev.dhkim.petlog.entities.shop.BannerEntity;
import dev.dhkim.petlog.mappers.shop.BannerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BannerService {

    @Autowired
    private BannerMapper bannerMapper;

    public List<BannerEntity> getBannersByDeviceType(String deviceType) {
        return bannerMapper.selectBannersByDeviceType(deviceType);
    }
}