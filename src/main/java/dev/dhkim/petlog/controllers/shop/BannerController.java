package dev.dhkim.petlog.controllers.shop;

import dev.dhkim.petlog.entities.shop.BannerEntity;
import dev.dhkim.petlog.services.shop.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/shop")
public class BannerController {

    @Autowired
    private BannerService bannerService;

    @GetMapping("/banners")
    public List<BannerEntity> getBanners() {
        return bannerService.getBannersByDeviceType("web");
    }
}