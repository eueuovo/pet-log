package dev.dhkim.petlog.services.shop;

import dev.dhkim.petlog.entities.shop.SubCategoryEntity;
import dev.dhkim.petlog.mappers.shop.SubCategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubCategoryService {
    private final SubCategoryMapper subCategoryMapper;

}