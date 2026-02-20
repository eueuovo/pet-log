package dev.dhkim.petlog.controllers.shop;

import dev.dhkim.petlog.entities.shop.ProductEntity;
import dev.dhkim.petlog.services.shop.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/shop")
public class ProductPageController {

    private final ProductService productService;

    // 메인 페이지
    @GetMapping
    public String mainPage() {
        return "shop/main";
    }

    // 상품 상세 페이지
    @GetMapping("/product/{id}")
    public String productPage(@PathVariable Integer id, Model model) {
        ProductEntity product = productService.getProductDetail(id);
        model.addAttribute("product", product);
        return "shop/product";
    }
}