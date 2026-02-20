package dev.dhkim.petlog.services.shop;

import dev.dhkim.petlog.mappers.shop.PointMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PointService {

    private final PointMapper pointMapper;

    public int getAvailablePoint(Integer userId) {
        return pointMapper.getAvailablePoint(userId);
    }
}