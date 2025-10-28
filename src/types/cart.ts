// src/types/index.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  picture: string;
  description?: string;
  category?: string;
  stock?: number;
  rating?: number;
}

export interface CartItem {
  id: number;         // 购物车项ID（可用商品ID）
  goods: Product;     // 商品信息
  count: number;      // 数量
  selected: boolean;  // 是否选中（用于结算）
}

// 商品列表响应类型
export interface ProductsResponse {
  products: Product[]
}