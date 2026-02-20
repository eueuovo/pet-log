package dev.dhkim.petlog.services.shop;

import dev.dhkim.petlog.mappers.shop.CouponMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CouponService {

    private final CouponMapper couponMapper;

    // 사용 가능한 쿠폰 목록 조회
    public List<Map<String, Object>> getAvailableCoupons(Integer userId) {
        if (userId == null) {
            return List.of();
        }
        return couponMapper.getAvailableCoupons(userId);
    }
}