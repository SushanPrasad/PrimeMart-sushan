const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};


export const updateCart = (state) => {
      // Recalculate prices based on cartItems
      state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
      state.shippingPrice = addDecimals(state.itemsPrice > 200 ? 0 : 100);
      state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
      state.totalPrice = addDecimals(Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice));

      // Save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state));

      return state;
}