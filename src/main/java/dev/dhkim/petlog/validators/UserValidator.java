package dev.dhkim.petlog.validators;

import dev.dhkim.petlog.dto.user.AddressDto;
import dev.dhkim.petlog.dto.user.PetDto;
import dev.dhkim.petlog.dto.user.RegisterDto;
import dev.dhkim.petlog.dto.user.StoreDto;
import dev.dhkim.petlog.enums.user.EmailVerificationType;
import dev.dhkim.petlog.enums.user.PetBodyType;
import dev.dhkim.petlog.enums.user.PetGenderType;
import dev.dhkim.petlog.enums.user.UserType;
import lombok.experimental.UtilityClass;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@UtilityClass
public class UserValidator {
    private static final DateTimeFormatter birthFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    // 공통 validate
    public static final String EMAIL_REGEX = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
    public static final String LOGIN_ID_REGEX = "^[A-Za-z0-9._-]+$";
    public static final String PASSWORD_REGEX = "^[\\da-zA-Z`~!@#$%^&*()\\-_=+\\[{\\]}\\\\|;:'\",<.>\\/?]+$";
    public static final String PHONE_REGEX = "^[0-9]+$";

    // 개인 validate
    public static final String NAME_REGEX = "^[가-힣]+$";
    public static final String NICKNAME_REGEX = "^[\\da-zA-Z가-힣]+$";

    // 사업자 validate
    public static final String COMPANY_NAME_REGEX = "^[\\da-zA-Z가-힣]+$";
    public static final String BUSINESS_NUMBER_REGEX = "^[0-9]+$";

    // 이메일 인증 validate
    public static final String CODE_REGEX = "^[0-9]+$";

    // 주소 인증
    public static final String ADDRESS_POSTAL_REGEX = "^[0-9]+$";

    // 펫 이름 인증
    public static final String PET_NAME_REGEX = "^[\\da-zA-Z가-힣]+$";




    //----------------------------------------------------------------//



    // 이메일 검증
    public static boolean validateEmail(String email) {
        return ValidatorUtils.isLengthInBetween(email, 5, 255) &&
                email.matches(EMAIL_REGEX);
    }

    // 유저 타입 검증
    public static boolean validateUserType(UserType userType) {
        return userType != null;
    }


    // 로그인 아이디 검증
    public static boolean validateLoginId(String loginId) {
        return ValidatorUtils.isLengthInBetween(loginId, 4, 20) &&
                loginId.matches(LOGIN_ID_REGEX);
    }

    // 비밀번호 검증
    public static boolean validatePassword(String password) {
        return ValidatorUtils.isLengthInBetween(password, 6, 50) &&
                password.matches(PASSWORD_REGEX);
    }

    // 유저 공통 전화번호 검증
    public static boolean validatePhone(String phone) {
        return ValidatorUtils.isLengthInBetween(phone, 11, 11) &&
                phone.matches(PHONE_REGEX);
    }

    // 이름(실명) 검증
    public static boolean validateName(String name) {
        return ValidatorUtils.isLengthInBetween(name, 2, 20) &&
                name.matches(NAME_REGEX);
    }

    // 닉네임 검증
    public static boolean validateNickname(String nickname) {
        return ValidatorUtils.isLengthInBetween(nickname, 2, 20) &&
                nickname.matches(NICKNAME_REGEX);
    }

    // 기업명 검증
    public static boolean validateCompanyName(String companyName) {
        return ValidatorUtils.isLengthInBetween(companyName, 1, 150) &&
                companyName.matches(COMPANY_NAME_REGEX);
    }

    // 대표자명 검증
    public static boolean validateRepresentativeName(String representativeName) {
        return ValidatorUtils.isLengthInBetween(representativeName, 2, 20) &&
                representativeName.matches(NAME_REGEX);
    }

    // 사업자등록번호 검증
    public static boolean validateBusinessNumber(String businessNumber) {
        return ValidatorUtils.isLengthInBetween(businessNumber, 10, 10) &&
                businessNumber.matches(BUSINESS_NUMBER_REGEX);
    }

    // 이메일 타입 검증
    public static boolean validateEmailType(EmailVerificationType type) {
        return type != null;
    }

    // 이메일 인증번호 검증
    public static boolean validateEmailCode(String code) {
        return ValidatorUtils.isLengthInBetween(code, 6, 6) &&
                code.matches(CODE_REGEX);
    }

    // 개인,사업자등록상 주소 배송지명 검증
    public static boolean validateMemberReceiverName(String receiverName) {
        if (receiverName == null) {
            return true;
        }
        return ValidatorUtils.isLengthInBetween(receiverName, 0, 50);
    }

    // 개인,사업자등록상 주소 우편번호 검증
    public static boolean validateMemberPostalCode(String postalCode) {
        return ValidatorUtils.isLengthInBetween(postalCode, 5, 5) &&
                postalCode.matches(ADDRESS_POSTAL_REGEX);
    }

    // 개인,사업자등록상 주소 기본주소 검증
    public static boolean validateMemberAddressPrimary(String addressPrimary) {
        return ValidatorUtils.isLengthInBetween(addressPrimary, 1, 150);
    }

    // 개인,사업자등록상 주소 상세주소 검증
    public static boolean validateMemberAddressSecondary(String addressSecondary) {
        return ValidatorUtils.isLengthInBetween(addressSecondary, 0, 100);
    }


    // 가게 가게명 검증
    public static boolean validateStoreName(String storeName) {
        return ValidatorUtils.isLengthInBetween(storeName, 1, 100);
    }

    // 가게 우편주소 검증
    public static boolean validateStorePostalCode(String postalCode) {
        return ValidatorUtils.isLengthInBetween(postalCode, 5, 5) &&
                postalCode.matches(ADDRESS_POSTAL_REGEX);
    }

    // 가게 기본주소 검증
    public static boolean validateStoreAddressPrimary(String addressPrimary) {
        return ValidatorUtils.isLengthInBetween(addressPrimary, 1, 150);
    }

    // 가게 상세주소 검증
    public static boolean validateStoreAddressSecondary(String addressSecondary) {
        return ValidatorUtils.isLengthInBetween(addressSecondary, 0, 100);
    }

    // 가게 카테고리 검증
    public static boolean validateStoreCategory(String category) {
        return ValidatorUtils.isLengthInBetween(category, 1, 10);
    }

    // 가게 전화번호 검증
    public static boolean validateStorePhone(String phone) {
        return ValidatorUtils.isLengthInBetween(phone, 8, 11) &&
                phone.matches(PHONE_REGEX);
    }


    // 펫 이름 검증
    public static boolean validatePetName(String name) {
        return ValidatorUtils.isLengthInBetween(name, 1, 30) &&
                name.matches(PET_NAME_REGEX);
    }

    // 펫 종 검증
    public static boolean validatePetSpecies(String species) {
        return ValidatorUtils.isLengthInBetween(species, 1, 50);
    }

    // 펫 생일 검증
    public static boolean validatePetBirth(LocalDate birthDate) {
        if (birthDate == null) {
            return false;
        }
        return !birthDate.isAfter(LocalDate.now());
    }

    // 펫 소개 검증
    public static boolean validatePetIntroduction(String introduction) {
        return ValidatorUtils.isLengthInBetween(introduction, 0, 50);
    }


    // 펫 성별 검증
    public static boolean validatePetGender(PetGenderType gender) {
        return gender != null;
    }

    // 펫 체형타입 검증
    public static boolean validatePetBody(PetBodyType bodyType) {
        return bodyType != null;
    }

    // 펫 몸무게 검증
    public static boolean validatePetWeight(BigDecimal weight) {
        if (weight == null) {
            return false;
        }
        if (weight.compareTo(BigDecimal.ZERO) < 0 ||
            weight.compareTo(new BigDecimal("100")) > 0) {
            return false;
        }
        return weight.scale() <= 1;
    }




    // 유저 공통 정보 검증
    public static boolean validateCommon(RegisterDto dto) {
        if (dto == null) {
            return false;
        }
        return validateEmail(dto.getEmail()) &&
                validateUserType(dto.getUserType()) &&
                validateLoginId(dto.getLoginId()) &&
                validatePassword(dto.getPassword()) &&
                validatePhone(dto.getPhone());
    }

    // 개인회원 정보 검증
    public static boolean validatePersonal(RegisterDto dto) {
        if (dto == null) {
            return false;
        }
        return validateName(dto.getName()) &&
                validateNickname(dto.getNickname());
    }

    // 사업자회원 정보 검증
    public static boolean validateBusiness(RegisterDto dto) {
        if (dto == null) {
            return false;
        }
        return validateCompanyName(dto.getCompanyName()) &&
                validateRepresentativeName(dto.getRepresentativeName()) &&
                validateBusinessNumber(dto.getBusinessNumber());
    }

    // 주소 정보 검증
    public static boolean validateAddress(AddressDto address) {
        if (address == null) {
            return false;
        }
        return validateMemberPostalCode(address.getPostalCode()) &&
                validateMemberAddressPrimary(address.getAddressPrimary());
    }

    // 가게 정보 검증
    public static boolean validateStore(StoreDto store) {
        if (store == null) {
            return true;
        }
        if (store.getStoreName() == null || store.getStoreName().isBlank()) {
            return true;
        }
        return validateStoreName(store.getStoreName()) &&
                validateStorePostalCode(store.getPostalCode()) &&
                validateStoreAddressPrimary(store.getAddressPrimary()) &&
                validateStoreAddressSecondary(store.getAddressSecondary()) &&
                validateStoreCategory(store.getCategory()) &&
                validateStorePhone(store.getStorePhone());
    }


    // 펫 정보 검증
    public static boolean validatePet(PetDto pet) {
        if (pet == null) {
            return true;
        }
        return validatePetName(pet.getName()) &&
                validatePetSpecies(pet.getSpecies()) &&
                validatePetBirth(pet.getBirthDate()) &&
                validatePetIntroduction(pet.getIntroduction()) &&
                validatePetGender(pet.getGender()) &&
                validatePetBody(pet.getBodyType()) &&
                validatePetWeight(pet.getWeight());
    }







}
