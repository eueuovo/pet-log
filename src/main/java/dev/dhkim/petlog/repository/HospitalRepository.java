package dev.dhkim.petlog.repository;

import dev.dhkim.petlog.entities.HospitalEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HospitalRepository extends JpaRepository<HospitalEntity, Long> {
    boolean existsByManageNo(String manageNo); // 중복 체크용

    List<HospitalEntity> findByLatIsNullOrLngIsNull();

    List<HospitalEntity> findByLatIsNullOrLngIsNullOrLatEqualsOrLngEquals(double v, double v1);


}
