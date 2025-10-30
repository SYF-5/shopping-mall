<template>
  <div class="empty-cart">
    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0iI2Y1ZjVmNSIvPjxwYXRoIGQ9Ik0xMjgsMzJhOTYsOTYsMCwxLDAsOTYsOTZBOTYuMTEsOTYuMTEsMCwwLDAsMTI4LDMyWm0wLDE2YTgwLDgwLDAsMSwxLTgwLTgwQTgwLjA5LDgwLjA5LDAsMCwxLDEyOCw0OFoiIGZpbGw9IiNkZGQiLz48cGF0aCBkPSJNMTY4LDcySDg4YTgsOCwwLDAsMCwwLDE2aDgwYTgsOCwwLDAsMCwwLTE2WiIgZmlsbD0iI2RkZCIvPjxwYXRoIGQ9Ik0xNzYsMTEySDgwYTgsOCwwLDAsMCwwLDE2aDk2YTgsOCwwLDAsMCwwLTE2WiIgZmlsbD0iI2RkZCIvPjxwYXRoIGQ9Ik0xNjAsMTUySDk2YTgsOCwwLDAsMCwwLDE2aDY0YTgsOCwwLDAsMCwwLTE2WiIgZmlsbD0iI2RkZCIvPjwvc3ZnPg==" alt="空购物车">
    <h3>您的购物车是空的</h3>
    <p>快去挑选一些心仪的商品吧</p>
    <router-link to="/"   class="continue-shopping">前往购物</router-link>
  </div>
</template>

<script>
export default {
  name: 'EmptyCart'
}
</script>

<style scoped>
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

.empty-cart h3 {
  color: #2c3e50;
  margin-bottom: 10px;
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
</style>