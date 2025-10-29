<template>
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
</template>

<script>
export default {
  name: 'CartSummary',
  props: {
    subtotal: {
      type: Number,
      required: true
    },
    shipping: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.cart-summary {
  width: 300px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  align-self: flex-start;
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

@media (max-width: 768px) {
  .cart-summary {
    width: 100%;
  }
}
</style>