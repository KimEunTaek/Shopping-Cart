import { productItems } from '../dummyData/productItems';
import { coupons } from '../dummyData/coupons';
import { ProductModel } from 'models';

/**
 * @description product 관련 서비스 담당
 * @description 제품 목록, 쿠폰
 */
export const productService = {
  /**
   * @description 제품 목록 가져오기
   * @param {number} [pageNumber=1] 가져올 페이지 번호
   * @param {number} [pageSize=4] 서버에 요청할 제품 수
   *
   * NOTE: 별다른 요구사항이 없다면 일단 pageSize는 고정(4)
   */
  getItems: (pageNumber: undefined | number = 1, pageSize: number = 4) => {
    // NOTE: 서버가 없어서 가내 수공업
    const newProductItems = productItems;
    const totalProducts = newProductItems.length;

    const startIndex: number =
      pageNumber === 1 ? 0 : (pageNumber - 1) * pageSize;

    const endIndex: number =
      pageNumber * pageSize > totalProducts
        ? totalProducts
        : pageNumber * pageSize;

    // NOTE: 최대한 서버가 보내주는 데이터랑 비슷하게 만듬.
    const serverData = {
      items: newProductItems
        .sort((a, b) => b.score - a.score)
        .slice(startIndex, endIndex),
      totalProducts,
    };

    return serverData;
  },

  /**
   * @description 장바구니에 있는 데이터만 가져옴.
   * @param {ProductModel['id']} cartedProductList ProductModel['id'] 배열
   */
  getCartedItems: (cartedProductList: ProductModel['id'][]) => {
    // NOTE: 서버가 없어서 가내 수공업
    const newProductItems = productItems;
    const items = newProductItems.filter(product => {
      if (
        product.id === cartedProductList[0] ||
        product.id === cartedProductList[1] ||
        product.id === cartedProductList[2]
      ) {
        return true;
      }
    });
    return items.length ? { items } : {};
  },

  /**
   * @description 상품에 적용되는 쿠폰 데이터를 가져옴
   * @todo 만약 서버에서 오는 coupons 속성이 바뀌어, 속성 값이 객체 참조라면, 이 로직은 반드시 수정해야 한다.
   */
  getCoupons: () => {
    return Object.assign({}, coupons);
  },
};