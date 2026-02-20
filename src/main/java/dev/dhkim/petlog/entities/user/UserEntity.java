package dev.dhkim.petlog.entities.user;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true, name = "login_id")
    private String loginId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phone;

    @Column(name = "user_type", nullable = false)
    private String userType;

    @Column(name = "shop_point", nullable = false)
    private Integer shopPoint;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
