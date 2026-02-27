package dev.dhkim.petlog.utils;

public class PhoneUtil {
    public static String phoneNumberFormat(String phone) {
        if (phone == null || phone.length() < 9) {
            return phone;
        }

        // 서울 지역번호
        if (phone.startsWith("02")) {
            if (phone.length() == 10) {
                return phone.replaceAll("(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3");
            }
            if (phone.length() == 9) {
                return phone.replaceAll("(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3");
            }
        }

        // 휴대폰 (010)
        if (phone.length() == 11) {
            return phone.replaceAll("(\\d{3})(\\d{4})(\\d{4})", "$1-$2-$3");
        }

        // 기타 지역번호 (053 등)
        if (phone.length() == 10) {
            return phone.replaceAll("(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3");
        }

        return phone;
    }
}
