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
          <div class="cart-item" v-for="(item, index) in cartItems" :key="item.id">
            <div class="item-image">
              <img :src="item.image" :alt="item.name">
            </div>
            <div class="item-details">
              <h3 class="item-title">{{ item.name }}</h3>
              <div class="item-price">¥{{ item.price.toFixed(2) }}</div>
              <div class="item-actions">
                <div class="quantity-control">
                  <div class="quantity-btn" @click="decreaseQuantity(index)">-</div>
                  <input type="text" class="quantity-input" :value="item.quantity" readonly>
                  <div class="quantity-btn" @click="increaseQuantity(index)">+</div>
                </div>
                <button class="remove-btn" @click="removeItem(index)">删除</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="cart-summary">
          <h3 class="summary-title">订单摘要</h3>
          <div class="summary-row">
            <span>商品小计</span>
            <span>¥{{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>运费</span>
            <span>¥{{ shipping.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>优惠</span>
            <span>-¥{{ discount.toFixed(2) }}</span>
          </div>
          <div class="summary-row summary-total">
            <span>总计</span>
            <span>¥{{ total.toFixed(2) }}</span>
          </div>
          <button class="checkout-btn">去结算</button>
        </div>
      </div>
      
      <div class="empty-cart" v-if="!loading && !error && cartItems.length === 0">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0iI2Y1ZjVmNSIvPjxwYXRoIGQ9Ik0xMjgsMzJhOTYsOTYsMCwxLDAsOTYsOTZBOTYuMTEsOTYuMTEsMCwwLDAsMTI4LDMyWm0wLDE2YTgwLDgwLDAsMSwxLTgwLTgwQTgwLjA5LDgwLjA5LDAsMCwxLDEyOCw0OFoiIGZpbGw9IiNkZGQiLz48cGF0aCBkPSJNMTY4LDcySDg4YTgsOCwwLDAsMCwwLDE2aDgwYTgsOCwwLDAsMCwwLTE2WiIgZmlsbD0iI2RkZCIvPjxwYXRoIGQ9Ik0xNzYsMTEySDgwYTgsOCwwLDAsMCwwLDE2aDk2YTgsOCwwLDAsMCwwLTE2WiIgZmlsbD0iI2RkZCIvPjxwYXRoIGQ9Ik0xNjAsMTUySDk2YTgsOCwwLDAsMCwwLDE2aDY0YTgsOCwwLDAsMCwwLTE2WiIgZmlsbD0iI2RkZCIvPjwvc3ZnPg==" alt="空购物车">
        <h3>您的购物车是空的</h3>
        <p>快去挑选一些心仪的商品吧</p>
        <a href="#" class="continue-shopping">继续购物</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
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
        
        // 根据您的项目设置调整路径
        // 如果使用Vue CLI，通常放在public文件夹中
        const response = await fetch('/goods.json');
        
        if (!response.ok) {
          throw new Error('网络响应不正常');
        }
        
        const data = await response.json();
        
        // 将JSON数据赋值给组件数据
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
    // 组件挂载后加载数据
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

body {
  background-color: #f5f5f5;
  color: #333;
  padding: 20px;
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

.cart-summary {
  width: 300px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  align-self: flex-start;
}

.cart-item {
  display: flex;
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.item-image {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 15px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #2c3e50;
}

.item-price {
  color: #e74c3c;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 15px;
}

.item-actions {
  display: flex;
  align-items: center;
}

.quantity-control {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
}

.quantity-btn:hover {
  background-color: #e9ecef;
}

.quantity-input {
  width: 50px;
  height: 30px;
  text-align: center;
  border: 1px solid #ddd;
  margin: 0 5px;
}

.remove-btn {
  color: #e74c3c;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.remove-btn:hover {
  text-decoration: underline;
}

.summary-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: #2c3e50;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.summary-total {
  font-weight: 600;
  font-size: 18px;
  color: #2c3e50;
  border-top: 1px solid #eee;
  padding-top: 15px;
  margin-top: 10px;
}

.checkout-btn {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.checkout-btn:hover {
  background-color: #2980b9;
}

.empty-cart {
  text-align: center;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.empty-cart img {
  width: 150px;
  margin-bottom: 20px;
}

.empty-cart p {
  color: #7f8c8d;
  margin-bottom: 20px;
}

.continue-shopping {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .cart-container {
    flex-direction: column;
  }
  
  .cart-summary {
    width: 100%;
  }
  
  .cart-item {
    flex-direction: column;
  }
  
  .item-image {
    width: 100%;
    height: 200px;
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style>