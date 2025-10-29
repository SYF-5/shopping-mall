<template>
  <div class="cart-item">
    <div class="item-image">
      <img :src="item.image" :alt="item.name">
    </div>
    <div class="item-details">
      <h3 class="item-title">{{ item.name }}</h3>
      <div class="item-price">¥{{ item.price.toFixed(2) }}</div>
      <div class="item-actions">
        <div class="quantity-control">
          <div class="quantity-btn" @click="$emit('decrease-quantity', index)">-</div>
          <input type="text" class="quantity-input" :value="item.quantity" readonly>
          <div class="quantity-btn" @click="$emit('increase-quantity', index)">+</div>
        </div>
        <button class="remove-btn" @click="$emit('remove-item', index)">删除</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
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

@media (max-width: 768px) {
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