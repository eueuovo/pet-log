package dev.dhkim.petlog.entities.shop;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "product")
@Getter
@Setter
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String brand;
    private String name;
    private Integer price;
    private Integer discountPrice;
    private Integer deliveryFee;
    private Integer stock;
    private String petType;

    @ManyToOne
    @JoinColumn(name = "sub_category_id")
    private SubCategoryEntity subCategory;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<ProductImageEntity> productImages;

    public int getDiscountRate() {
        if (discountPrice == null || discountPrice == 0 || price == 0) return 0;
        return (int) Math.round((1.0 - (double) discountPrice / price) * 100);
    }
}
