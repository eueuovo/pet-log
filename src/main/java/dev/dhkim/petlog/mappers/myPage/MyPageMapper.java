package dev.dhkim.petlog.mappers.myPage;

import dev.dhkim.petlog.dto.user.PetDto;
import dev.dhkim.petlog.entities.user.AddressEntity;
import dev.dhkim.petlog.entities.user.PersonalUserEntity;
import dev.dhkim.petlog.entities.user.PetEntity;
import dev.dhkim.petlog.entities.user.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MyPageMapper {
    UserEntity selectByUserId(@Param(value = "userId") int userId);

    PersonalUserEntity selectPersonalByUserId(@Param(value = "userId") int userId);

    AddressEntity selectDefaultAddressByUserId(@Param(value = "userId") int userId);

    PetEntity selectPrimaryPetByUserId(@Param(value = "userId") int userId);

    List<PetEntity> selectPetsByUserId(@Param(value = "userId") int userId);

    PetEntity selectByPetIdAndUserId(@Param(value = "petId") int petId,
                                     @Param(value = "userId") int userId);



    int deletePet(@Param(value = "petId") int petId,
                  @Param(value = "userId") int userId);

    int updatePrimary(@Param(value = "petId") int petId);

    int updatePet(@Param(value = "pet") PetEntity pet,
                  @Param(value = "userId") int userId);
}
