<template>
  <div id="app">
    <div class="container">
      <div class="header">
        <h1>我的购物车</h1>
        <p>查看您的商品并结算</p>
      </div>
      
      <!-- 加载状态 -->
      <div class="loading" v-if="loading">
        <p>正在加载商品信息...</p>
      </div>
      
      <!-- 错误状态 -->
      <div class="error" v-if="error">
        <p>加载商品信息失败，请刷新页面重试</p>
      </div>
      
      <div class="cart-container" v-if="!loading && !error && cartItems.length > 0">
        <div class="cart-items">
          <CartItem
            v-for="(item, index) in cartItems"
            :key="item.id"
            :item="item"
            :index="index"
            @increase-quantity="increaseQuantity"
            @decrease-quantity="decreaseQuantity"
            @remove-item="removeItem"
          />
        </div>
        
        <CartSummary
          :subtotal="subtotal"
          :shipping="shipping"
          :discount="discount"
          :total="total"
        />
      </div>
      
      <EmptyCart v-if="!loading && !error && cartItems.length === 0" />
    </div>
  </div>
</template>

<script>
import CartItem from './components/CartItem.vue'
import CartSummary from './components/CartSummary.vue'
import EmptyCart from './components/EmptyCart.vue'

export default {
  name: 'ShoppingCart',
  components: {
    CartItem,
    CartSummary,
    EmptyCart
  },
  data() {
    return {
      cartItems: [],
      shipping: 0,
      discount: 0,
      loading: true,
      error: false
    }
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    },
    total() {
      return this.subtotal + this.shipping - this.discount;
    }
  },
  methods: {
    async fetchGoodsData() {
      try {
        this.loading = true;
        this.error = false;
        
        const response = await fetch('/goods.json');
        
        if (!response.ok) {
          throw new Error('网络响应不正常');
        }
        
        const data = await response.json();
        
        this.cartItems = data.cartItems || [];
        this.shipping = data.shipping || 0;
        this.discount = data.discount || 0;
        
      } catch (error) {
        console.error('加载商品数据失败:', error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    increaseQuantity(index) {
      // 静态页面，不实际增加数量
      // this.cartItems[index].quantity++;
    },
    decreaseQuantity(index) {
      // 静态页面，不实际减少数量
      // if (this.cartItems[index].quantity > 1) {
      //   this.cartItems[index].quantity--;
      // }
    },
    removeItem(index) {
      // 静态页面，不实际删除商品
      // this.cartItems.splice(index, 1);
    }
  },
  mounted() {
    this.fetchGoodsData();
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.header p {
  color: #7f8c8d;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.loading p, .error p {
  font-size: 18px;
  color: #7f8c8d;
}

.error p {
  color: #e74c3c;
}

.cart-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.cart-items {
  flex: 1;
  min-width: 300px;
}

@media (max-width: 768px) {
  .cart-container {
    flex-direction: column;
  }
}
</style>