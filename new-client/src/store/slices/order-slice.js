import {createSlice} from '@reduxjs/toolkit';

const initialState = null;
export  const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      return action.payload;
    },
    resetOrder: () => {
      return null;
    },
  },

});
export const selectOrder = (state) => state.order;
export const { setOrder, resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
