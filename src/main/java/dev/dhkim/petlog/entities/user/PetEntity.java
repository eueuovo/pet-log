package dev.dhkim.petlog.entities.user;

import lombok.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "petId")
public class PetEntity {
    private int petId;
    private int userId;
    private String name;
    private String species;
    private LocalDateTime birthDate;
    private String gender;
    private Float weight;
    private String bodyType;
    private String imageUrl;
    private Boolean isPrimary;
}
