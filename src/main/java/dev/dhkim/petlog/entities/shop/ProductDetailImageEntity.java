package dev.dhkim.petlog.entities.shop;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product_detail_image")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductDetailImageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;

    @Column(name = "image_url", nullable = false, length = 255)
    private String imageUrl;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;
}