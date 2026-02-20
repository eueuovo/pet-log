package dev.dhkim.petlog.dto.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import dev.dhkim.petlog.enums.user.PetBodyType;
import dev.dhkim.petlog.enums.user.PetGenderType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PetDto {
    private int petId;
    private String name;
    private String species;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
    private PetGenderType gender;
    private String introduction;
    private BigDecimal weight;
    private PetBodyType bodyType;
    private String imageUrl;
    private Boolean isPrimary;
    private LocalDateTime createdAt;
}
