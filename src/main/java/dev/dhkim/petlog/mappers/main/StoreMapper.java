package dev.dhkim.petlog.mappers.main;

import dev.dhkim.petlog.entities.user.StoreEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface StoreMapper {

    void insert(StoreEntity storeEntity);

 /*   StoreEntity selectById(@Param("storeId") Integer storeId);*/

    List<StoreEntity> selectStoresByCategory(@Param("category") String category);

    List<StoreEntity> selectAllStores();

    void updateStoreLatLng(@Param("storeId") Integer storeId,
                           @Param("lat") Double lat,
                           @Param("lng") Double lng);

   /* StoreEntity selectById(Integer storeId);*/
}