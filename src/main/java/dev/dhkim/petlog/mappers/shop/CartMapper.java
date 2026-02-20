package dev.dhkim.petlog.mappers.shop;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface CartMapper {

    // 장바구니에 같은 상품+옵션이 있는지 확인
    Integer findCartItem(@Param("userId") Integer userId,
                         @Param("productId") Integer productId,
                         @Param("optionId") Integer optionId);

    // 장바구니에 상품 추가
    void insertCartItem(@Param("userId") Integer userId,
                        @Param("productId") Integer productId,
                        @Param("optionId") Integer optionId,
                        @Param("quantity") Integer quantity);

    // 장바구니 수량 업데이트
    void updateCartQuantity(@Param("cartId") Integer cartId,
                            @Param("additionalQuantity") Integer additionalQuantity);

    List<Map<String, Object>> getCartItems(@Param("userId") Integer userId);

    void deleteCartItem(@Param("cartId") Integer cartId);

    // 상품의 옵션 목록 조회
    List<Map<String, Object>> getProductOptions(@Param("productId") Integer productId);

    // 장바구니 옵션 변경
    void updateCartOption(@Param("cartId") Integer cartId,
                          @Param("optionId") Integer optionId);

    // 장바구니 수량 변경
    void setCartQuantity(@Param("cartId") Integer cartId,
                         @Param("quantity") Integer quantity);

    List<Map<String, Object>> getCartItemsByIds(List<Integer> cartIds);
}