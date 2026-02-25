package dev.dhkim.petlog.entities.user;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class UserEntity {
    @Id
    private int id;
    private String email;
    private String loginId;
    private String password;
    private String phone;
    private String userType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}