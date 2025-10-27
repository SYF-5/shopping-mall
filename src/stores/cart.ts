import { defineStore } from 'pinia';

export interface Goods {
  id: number;
  name: string;
  description: string;
  picture: string;
  price: number;
  stock: number;
}

export interface CartItem {
  id: number;
  goods: Goods;
  count: number;
  selected: boolean;
  addedTime: string;
}

interface CartState {
  cartList: CartItem[];
  loading: boolean;
  error: string | null;
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    cartList: [],
    loading: false,
    error: null
  }),

  getters: {
    isAllSelected: (state) => {
      if (state.cartList.length === 0) return false;
      return state.cartList.every(item => item.selected);
    },

    selectedCount: (state) => {
      return state.cartList.filter(item => item.selected).length;
    },

    totalPrice: (state) => {
      return state.cartList
        .filter(item => item.selected)
        .reduce((total, item) => total + item.goods.price * item.count, 0)
        .toFixed(2);
    },

    selectedItems: (state) => {
      return state.cartList.filter(item => item.selected);
    }
  },

  actions: {
    changeQuantity(id: number, quantity: number) {
      const item = this.cartList.find(item => item.id === id);
      if (item) {
        item.count = Math.max(1, Math.min(quantity, item.goods.stock));
      }
    },

    toggleSelect(id: number) {
      const item = this.cartList.find(item => item.id === id);
      if (item) {
        item.selected = !item.selected;
      }
    },

    selectAll(selected: boolean) {
      this.cartList.forEach(item => {
        item.selected = selected;
      });
    },

    removeItem(id: number) {
      const index = this.cartList.findIndex(item => item.id === id);
      if (index !== -1) {
        this.cartList.splice(index, 1);
      }
    }
  }
});