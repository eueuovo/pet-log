package dev.dhkim.petlog.entities.shop;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "option")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OptionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;

    @Column(name = "option_name", nullable = false, length = 50)
    private String optionName;

    @Column(name = "additional_price", nullable = false)
    private Integer additionalPrice = 0;

    @Column(name = "stock", nullable = false)
    private Integer stock = 0;
}