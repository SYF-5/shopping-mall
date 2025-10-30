<template>
  <div class="home">
    <!-- 横幅区域 -->
    <div class="banner">
      <img src="/src/assets/images/222.jpg" alt="小兔鲜促销横幅">
    </div>
    
    <!-- 分类导航占位 -->
    <div class="category-nav">
      <div class="category-item" v-for="category in categories" :key="category">
        <span class="category-icon">{{ getCategoryIcon(category) }}</span>
        <span class="category-name">{{ category }}</span>
      </div>
    </div>
    
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>商品加载中...</p>
    </div>
    
    <!-- 错误状态 -->
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="fetchProducts" class="retry-btn">重试</button>
    </div>
    
    <!-- 正常显示内容 -->
    <template v-else>
      <!-- 新鲜好物区域 -->
      <div class="product-section">
        <h2 class="section-title">新鲜好物</h2>
        <div class="products-grid">
          <GoodsItem 
            v-for="product in featuredProducts" 
            :key="getProductKey(product)" 
            :product="product"
            @item-click="goToProductDetail(product)"
            @add-to-cart="addToCart(product)"
          />
        </div>
      </div>
      
      <!-- 热门商品区域 -->
      <div class="product-section">
        <h2 class="section-title">热门商品</h2>
        <div class="products-grid">
          <GoodsItem 
            v-for="product in productList.slice(4)" 
            :key="getProductKey(product)" 
            :product="product"
            @item-click="goToProductDetail(product)"
            @add-to-cart="addToCart(product)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import type { Product } from '@/types/cart'

const productStore = useProductStore()
const cartStore = useCartStore()
const router = useRouter()

// 使用计算属性获取 store 状态
const loading = computed(() => productStore.loading)
const error = computed(() => productStore.error)
const productList = computed(() => productStore.productList as Product[])
const featuredProducts = computed(() => {
  const products = productStore.featuredProducts()
  return Array.isArray(products) ? products : []
})

// 安全的 key 生成器
const getProductKey = (product: any) => {
  return product?.id || Math.random().toString(36).substr(2, 9)
}

// 组件挂载时获取商品数据
onMounted(() => {
  // 如果商品列表为空，才获取数据
  if (productList.value.length === 0) {
    productStore.fetchProducts()
  }
})

// 硬编码的分类数据
const categories = ['蔬菜', '水果', '肉类', '粮油', '奶制品', '零食']

// 获取分类图标
const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    '蔬菜': '🥬',
    '水果': '🍎',
    '肉类': '🥩',
    '粮油': '🍚',
    '奶制品': '🥛',
    '零食': '🍪'
  }
  return icons[category] || '🛒'
}

// 跳转到商品详情页
const goToProductDetail = (product: Product) => {
  productStore.setCurrentProduct(product)
  router.push(`/product/${product.id}`)
}

// 添加到购物车
const addToCart = (product: Product) => {
  cartStore.addToCart(product)
}

// 重新获取数据的方法
const fetchProducts = () => {
  productStore.fetchProducts()
}
</script>

<style scoped>
/* 保持原有的样式不变 */
.home {
  padding-bottom: 50px;
}

.banner {
  width: 100%;
  height: 200px;
  overflow: hidden;
  margin-bottom: 20px;
}

.banner img {
  width: 100%;
  height: 100%;
object-fit: cover;
}

.category-nav {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
  padding: 0 20px;
  margin-bottom: 30px;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.category-item:hover {
  transform: translateY(-3px);
}

.category-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.category-name {
  font-size: 14px;
  color: #333;
}

.product-section {
  margin-bottom: 40px;
  padding: 0 20px;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
  position: relative;
  padding-left: 15px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 20px;
  width: 5px;
  background: #27BA9B;
  border-radius: 3px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* 加载状态样式 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #666;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #27BA9B;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 错误状态样式 */
.error-state {
  text-align: center;
  padding: 40px;
  color: #ff4757;
}

.retry-btn {
  margin-top: 16px;
  padding: 8px 16px;
  background: #27BA9B;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.retry-btn:hover {
  background: #1fa588;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .category-nav {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .category-nav {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>