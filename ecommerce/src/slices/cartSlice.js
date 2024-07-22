import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils.js";


const initialState = localStorage.getItem('cart')
 ? JSON.parse(localStorage.getItem('cart')) 
 : { cartItems: [], shippingAddress:{}, paymentMethod:"PayPal" };


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItemIndex = state.cartItems.findIndex((x) => x._id === item._id);

            if (existItemIndex !== -1) {
                state.cartItems[existItemIndex].qty += item.qty; // Increment quantity if item exists
            } else {
                state.cartItems.push(item); // Add new item to cartItems
            }
return updateCart(state)
          
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter( (x) => x._id !== action.payload );

            return updateCart(state);
        },
        saveShippingAddress:(state, action)=>{
            state.shippingAddress = action.payload;
            return updateCart(state);
    
        },
        savePaymentMethod:(state, action)=>{
            state.paymentMethod = action.payload;
            return updateCart(state);
    
        },
        clearCartItems : (state, action) =>{
            state.cartItems = [];
            return updateCart(state)
        }
            },
});

export const { addToCart, removeFromCart, saveShippingAddress,savePaymentMethod, clearCartItems,} = cartSlice.actions;
export default cartSlice.reducer;
