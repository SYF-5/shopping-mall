import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Product } from '@/types/cart'

// 临时硬编码数据（在迁移到 JSON 期间作为备用）
const mockProducts: Product[] = [
  {
    id: 1,
    name: '新鲜芹菜',
    price: 10.5,
    picture: 'https://ts1.tc.mm.bing.net/th/id/R-C.d1104979d0f6299ea171c29afde7904b?rik=s4Okjwh8qyTsew&riu=http%3a%2f%2fe0.ifengimg.com%2f02%2f2019%2f0703%2f8E809A800B446248CE02C136BDE8A2F36A292163_size147_w1125_h630.jpeg&ehk=JE2uImkMzZDsyE5%2fULWN3llthNR9IRVoQ4MNv4Lzcts%3d&risl=&pid=ImgRaw&r=0',
    description: '新鲜采摘的芹菜，清脆爽口',
    category: 'vegetables',
    stock: 50,
    rating: 4.5
  },
  // ... 其他商品数据
];

export const useProductStore = defineStore('product', () => {
  const productList = ref<Product[]>([]);
  const currentProduct = ref<Product | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // 获取商品列表
  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get('/goods.json');
      productList.value = response.data.products;
    } catch (err) {
      error.value = '获取商品数据失败';
      console.error('Error fetching products:', err);
      // 如果请求失败，使用备用数据
      productList.value = mockProducts;
    } finally {
      loading.value = false;
    }
  };

  // 根据ID查找商品
  const findProductById = (id: number) => {
    return productList.value.find(product => product.id === id);
  };

  // 设置当前选中的商品
  const setCurrentProduct = (product: Product) => {
    currentProduct.value = product;
  };

  // Getter：精选商品（前4个）
  const featuredProducts = () => {
    return productList.value.slice(0, 4);
  };

  return {
    productList,
    currentProduct,
    loading,
    error,
    featuredProducts,
    fetchProducts,
    findProductById,
    setCurrentProduct
  };
});