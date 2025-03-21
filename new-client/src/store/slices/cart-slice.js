import {createSlice} from '@reduxjs/toolkit';

const loadCartFromStorage = JSON.parse(localStorage.getItem('pizzajoint-cart')) || [];
const saveCartToStorage = (cartItems) => {
  localStorage.setItem('pizzajoint-cart', JSON.stringify(cartItems));
}
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: loadCartFromStorage,
  },
  reducers: {
    increamentAmount: (state, action) => {
      const exist = state.cartItems.find(x => x._id === action.payload._id);
      if (exist) {
        exist.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      saveCartToStorage(state.cartItems);
    },

    decrementAmount: (state, action) => {
      const exist = state.cartItems.find(x => x._id === action.payload._id);
      if (exist) {
        if (exist.quantity === 1) {
          state.cartItems = state.cartItems.filter(x => x._id !== action.payload._id);
        } else {
          exist.quantity -= 1;
        }
      }
      saveCartToStorage(state.cartItems);
    },

    resetCart: () => {
     
        if (localStorage.getItem('pizzajoint-cart')) {
        localStorage.removeItem('pizzajoint-cart');
    }
      return [];
    },
  },
});
// Selectors for derived data

export const selectCartItems = (state) => state.cart?.cartItems || [];
export const selectItemsCount = (state) =>{
  const cartItems = state.cart?.cartItems || []; // Fallback to empty array
  return cartItems.reduce((a, c) => a + c.quantity, 0);
};
  
export const selectItemsPrice = (state) => {
  const itemsPrice = state.cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
  return itemsPrice.toFixed(2);
};
export const selectTaxPrice = (state) => {
  const taxPrice = selectItemsPrice(state) * 0.05;
  return taxPrice.toFixed(2);
};
export const selectShippingPrice = (state) => {
  const itemsPrice = selectItemsPrice(state);
  return itemsPrice > 30 ? 0 : 10;
};
export const selectTotalPrice = (state) => {
  const itemsPrice = Number(selectItemsPrice(state));
  const taxPrice = Number(selectTaxPrice(state));
  const shippingPrice = selectShippingPrice(state);
  return (itemsPrice + taxPrice + shippingPrice).toFixed(2);
};

export const {increamentAmount, decrementAmount, resetCart} = cartSlice.actions;
export default cartSlice.reducer;

