package dev.dhkim.petlog.services.myPage;

import dev.dhkim.petlog.dto.user.PetDto;
import dev.dhkim.petlog.dto.user.RegisterDto;
import dev.dhkim.petlog.entities.user.AddressEntity;
import dev.dhkim.petlog.entities.user.PersonalUserEntity;
import dev.dhkim.petlog.entities.user.PetEntity;
import dev.dhkim.petlog.entities.user.UserEntity;
import dev.dhkim.petlog.mappers.myPage.MyPageMapper;
import dev.dhkim.petlog.mappers.user.UserMapper;
import dev.dhkim.petlog.results.MyPageResult;
import dev.dhkim.petlog.validators.UserValidator;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MyPageService {
    private final MyPageMapper myPageMapper;
    private final UserMapper userMapper;

    public boolean verifyPassword(int userId, String password) {
        if (userId < 1 ||
                !UserValidator.validatePassword(password)) {
            return false;
        }
        UserEntity dbUser = this.myPageMapper.selectByUserId(userId);
        if (dbUser == null) {
            return false;
        }
        return BCrypt.checkpw(password, dbUser.getPassword());
    }


    public Pair<MyPageResult, UserEntity> getUser(int userId) {
        if (userId < 1) {
            return Pair.of(MyPageResult.FAILURE, null);
        }
        UserEntity dbUser = this.myPageMapper.selectByUserId(userId);
        if (dbUser == null) {
            return Pair.of(MyPageResult.FAILURE, null);
        }
        return Pair.of(MyPageResult.SUCCESS, dbUser);
    }

    public Pair<MyPageResult, PersonalUserEntity> getPersonalUser(int userId) {
        if (userId < 1) {
            return Pair.of(MyPageResult.FAILURE, null);
        }
        PersonalUserEntity dbUser = this.myPageMapper.selectPersonalByUserId(userId);
        if (dbUser == null) {
            return Pair.of(MyPageResult.FAILURE, null);
        }
        return Pair.of(MyPageResult.SUCCESS, dbUser);
    }

    public Pair<MyPageResult, AddressEntity> getAddress(int userId) {
        if (userId < 1) {
            return Pair.of(MyPageResult.FAILURE, null);
        }
        AddressEntity dbAddress = this.myPageMapper.selectDefaultAddressByUserId(userId);
        if (dbAddress == null) {
            return Pair.of(MyPageResult.FAILURE, null);
        }
        return Pair.of(MyPageResult.SUCCESS, dbAddress);
    }

    public Pair<MyPageResult, PetEntity> getPrimaryPet(int userId) {
        if (userId < 1) {
            return Pair.of(MyPageResult.FAILURE, null);
        }
        PetEntity dbPet = this.myPageMapper.selectPrimaryPetByUserId(userId);
        return Pair.of(MyPageResult.SUCCESS, dbPet);
    }

    public Pair<MyPageResult, List<PetEntity>> getPets(int userId) {
        if (userId < 1) {
            return Pair.of(MyPageResult.FAILURE, null);
        }
        List<PetEntity> dbPets = this.myPageMapper.selectPetsByUserId(userId);
        return Pair.of(MyPageResult.SUCCESS, dbPets);
    }

    public MyPageResult deletePet(int petId, int userId) {
        if (petId < 1 ||
                userId < 1) {
            return MyPageResult.FAILURE;
        }
        PetEntity dbPet = this.myPageMapper.selectByPetIdAndUserId(petId, userId);
        if (dbPet == null) {
            return MyPageResult.FAILURE;
        }
        boolean primaryPet = dbPet.getIsPrimary();
        int delete = this.myPageMapper.deletePet(petId, userId);

        if (delete < 1) {
            return MyPageResult.FAILURE;
        }

        if (primaryPet) {
            List<PetEntity> pets = this.myPageMapper.selectPetsByUserId(userId);
            if (pets != null && !pets.isEmpty()) {
                PetEntity firstPet = pets.get(0);
                int updatePetPrimary = this.myPageMapper.updatePrimary(firstPet.getPetId());
                if (updatePetPrimary < 1) {
                    return MyPageResult.FAILURE;
                }
            }
        }
        return MyPageResult.SUCCESS;
    }

    public Pair<MyPageResult, Integer> insertPetInMyPage(int userId, PetDto pet) {
        if (userId < 1 ||
                pet == null) {
            return Pair.of(MyPageResult.FAILURE, null);
        }
        return this.userMapper.insertPet(userId, pet) > 0
                ? Pair.of(MyPageResult.SUCCESS, pet.getPetId())
                : Pair.of(MyPageResult.FAILURE, null);
    }


    public Pair<MyPageResult, PetEntity> getPet(int petId, int userId) {
        PetEntity dbPet = this.myPageMapper.selectByPetIdAndUserId(petId, userId);
        if (dbPet == null) {
            return Pair.of(MyPageResult.FAILURE, null);
        }
        return Pair.of(MyPageResult.SUCCESS, dbPet);
    }

    public MyPageResult updatePet(PetEntity pet, int userId) {
        if (pet.getPetId() < 1 ||
                userId < 1) {
            return MyPageResult.FAILURE;
        }
        return this.myPageMapper.updatePet(pet, userId) > 0
                ? MyPageResult.SUCCESS
                : MyPageResult.FAILURE;


    }
}
