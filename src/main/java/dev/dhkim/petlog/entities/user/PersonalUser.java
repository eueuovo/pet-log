package dev.dhkim.petlog.entities.user;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "userId")
public class PersonalUser {
    private int userId;
    private String name;
    private String nickname;
    private String phone;
}
