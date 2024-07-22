import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.css';
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider 
} from "react-router-dom";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {HelmetProvider} from 'react-helmet-async';

import { Provider } from 'react-redux';
import store from './store';

import App from './App';
import reportWebVitals from './reportWebVitals';
import Homescreen from './screens/Homescreen';
import ProductScreen from './screens/ProductScreen';

import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreening from './screens/ShippingScreening';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from "../src/screens/PlaceOrderScreen";
import PrivateRoute from './components/PrivateRoute';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminRoutes from './components/AdminRoutes';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEfditScreen from './screens/admin/ProductEfditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';

const PAYPAL_CLIENT_ID = "AffpR-S-4Zd4rMN6uGFiDfm5wDzMlGbFXDUeuPsw1CIclPD9vMOVI6BERX7gf-iA-VmZ7bJLfrhyGwyp";

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<App />}>
    <Route index={true} element={<Homescreen />} />
    <Route path='/search/:keyword' element={<Homescreen />} />
    <Route path='/page/:pageNumber' element={<Homescreen />} />
    <Route path='/search/:keyword/page/:pageNumber' element={<Homescreen />} />


    <Route path="/product/:id" element={<ProductScreen />} />
    <Route path="/cart" element={<CartScreen />} />
    <Route path="/login" element={<LoginScreen />} />
    <Route path="/register" element={<RegisterScreen />} />

{/* PrivateRoute containing nested routes */}
    <Route path=""          element={<PrivateRoute />} >
    <Route path="/shipping" element={<ShippingScreening />} />
    <Route path="/payment"  element={<PaymentScreen />} />
    <Route path="/placeorder" element={<PlaceOrderScreen />} />
    <Route path="/order/:id" element={<OrderScreen />} />
    <Route path="/profile" element={<ProfileScreen />} />
</Route>

<Route path=""          element={<AdminRoutes />} >
    <Route path="/admin/orderlist" element={<OrderListScreen />} />
    <Route path="/admin/productlist" element={<ProductListScreen />} />
    <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />} />

    <Route path="/admin/product/:id/edit" element={<ProductEfditScreen />} />
    <Route path="/admin/userlist" element={<UserListScreen />} />
    <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />

</Route>
    </Route> 
  ));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
                   <Provider store={store}>
                    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
                        
                          <RouterProvider router={router} /> {/* Corrected component */}

                    </PayPalScriptProvider>
                   </Provider>
                   </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
