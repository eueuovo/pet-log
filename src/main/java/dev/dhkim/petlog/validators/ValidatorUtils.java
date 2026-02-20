package dev.dhkim.petlog.validators;


import lombok.NonNull;
import lombok.experimental.UtilityClass;

@UtilityClass
public class ValidatorUtils {
    static boolean isLengthInBetween(String str, int min, int max) {
        if (str == null) {
            return false;
        }
        return str.length() >= min && str.length() <= max;
    }
}
