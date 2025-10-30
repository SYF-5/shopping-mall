<template>
  <div id="app">
    <div class="container">
      <div class="header">
        <div class="cart-stats" v-if="!loading">
        
        </div>
      </div>
      
      <!-- 加载状态 -->
      <div class="loading" v-if="loading">
        <p>正在加载商品信息...</p>
      </div>
      
      <!-- 错误状态 -->
      <div class="error" v-if="error">
        <p>加载商品信息失败，请刷新页面重试</p>
      </div>
      
      <div class="cart-container" v-if="!loading && !error && !cartStore.isEmpty">
        <div class="cart-actions">
          <button class="clear-cart-btn" @click="clearCart">清空购物车</button>
        </div>
        
        <div class="cart-items">
          <CartItem
            v-for="(item, index) in cartStore.cartItems"
            :key="item.id"
            :item="item"
            :index="index"
            @increase-quantity="increaseQuantity(item.id)"
            @decrease-quantity="decreaseQuantity(item.id)"
            @remove-item="removeItem(item.id)"
            @update-quantity="updateQuantity(item.id, $event)"
          />
        </div>
        
        <CartSummary
          :subtotal="cartStore.subtotal"
          :shipping="cartStore.shipping"
          :discount="cartStore.discount"
          :total="cartStore.total"    
          @clear-cart-instant="clearCartInstant"
        />
      </div>
      
      <EmptyCart v-if="!loading && !error && cartStore.isEmpty" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import CartItem from './components/CartItem.vue'
import CartSummary from './components/CartSummary.vue'
import EmptyCart from './components/EmptyCart.vue'

const cartStore = useCartStore()
const loading = ref(false)
const error = ref(false)

const increaseQuantity = (productId: number) => {
  try {
    cartStore.increaseQuantity(productId)
  } catch (err: any) {
    alert(err.message)
  }
}

const decreaseQuantity = (productId: number) => {
  try {
    cartStore.decreaseQuantity(productId)
  } catch (err: any) {
    alert(err.message)
  }
}

const updateQuantity = (productId: number, newQuantity: number) => {
  try {
    cartStore.updateQuantity(productId, newQuantity)
  } catch (err: any) {
    alert(err.message)
  }
}

const removeItem = (productId: number) => {
  if (confirm('确定要删除这个商品吗？')) {
    cartStore.removeFromCart(productId)
  }
}

const clearCart = () => {
  if (cartStore.isEmpty) {
    alert('购物车已经是空的')
    return
  }
  
  if (confirm('确定要清空购物车吗？此操作不可撤销！')) {
    cartStore.clearCart()
    alert('购物车已清空')
  }
}

const clearCartInstant = () => {
  // 直接清空购物车，不需要确认
  cartStore.clearCart()
}

onMounted(() => {
  loading.value = true
  try {
    cartStore.loadFromLocalStorage()
    // 确保购物车中的商品有图片数据
    ensureCartItemsHaveImages()
  } catch (err) {
    console.error('加载购物车数据失败:', err)
    error.value = true
  } finally {
    loading.value = false
  }
})

// 确保购物车中的商品有图片数据
const ensureCartItemsHaveImages = async () => {
  // 如果购物车中的商品缺少图片数据，可以从商品服务中获取
  for (const item of cartStore.cartItems) {
    if (!item.picture) {
      try {
        // 假设您有一个获取商品详情的方法
        // const productDetail = await productService.getProductById(item.id)
        // item.picture = productDetail.picture
        
        // 临时使用默认图片
        item.picture = getDefaultImageForProduct(item)
      } catch (err) {
        console.error(`获取商品 ${item.id} 的图片失败:`, err)
        // 使用默认图片
        item.picture = getDefaultImageForProduct(item)
      }
    }
  }
}

// 根据商品类型获取默认图片
const getDefaultImageForProduct = (item: any) => {
  // 根据商品类型返回不同的默认图片
  const defaultImages = {
    vegetables: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=150',
    fruits: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=150',
    grains: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=150',
    eggs: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=150',
    default: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150'
  }
  
  return defaultImages[item.category] || defaultImages.default
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.header p {
  color: #666;
  font-size: 1.1rem;
}

.cart-stats {
  margin-top: 10px;
  font-weight: bold;
  color: #4a5568;
}

.cart-actions {
  margin-bottom: 20px;
  text-align: right;
}

.clear-cart-btn {
  background-color: #e53e3e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.clear-cart-btn:hover {
  background-color: #c53030;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
}

.error {
  color: #e53e3e;
}
</style>