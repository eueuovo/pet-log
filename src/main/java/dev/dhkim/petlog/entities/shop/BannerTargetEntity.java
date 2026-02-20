package dev.dhkim.petlog.entities.shop;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "banner_target")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BannerTargetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "target_type", nullable = false, length = 20)
    private String targetType;

    @Column(name = "target_id", nullable = false)
    private Integer targetId;

    @Column(name = "display_type", nullable = false, length = 10)
    private String displayType;
}