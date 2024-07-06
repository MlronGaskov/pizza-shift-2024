import * as React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import CartPage from "../pages/CartPage";
import ProfilePage from "../pages/ProfilePage";
import OrdersPage from "../pages/OrdersPage";
import CatalogPage from "../pages/CatalogPage";
import logoPizza from "../assets/logo.svg"
import logoCart from "../assets/cart.svg"
import logoOrders from "../assets/orders.svg"
import logoProfile from "../assets/profile.svg"
import logoCatalog from "../assets/catalog.svg"

import '../style/Header.css';

const Divider: React.FC = () => {
  return <div className="divider"/>;
};

const Header: React.FC = () => {
    return (
      <div className="Header">
        <div className="desktop">
          <div className="frame2682">
            <NavLink to="/" className="logo">
              <img src={logoPizza} alt="Logo"/>
            </NavLink>
            <div className="links">
              <NavLink to="/profile" className="itemMenu1">
                <img src={logoProfile} className="user" alt="Logo"/>
                <div className="profileText">Профиль</div>
              </NavLink>
              <NavLink to="/orders" className="itemMenu2">
                <img src={logoOrders} className="time" alt="Logo"/>
                <div className="ordersText">Заказы</div>
              </NavLink>
              <div className="itemMenu3"></div>
              <NavLink to="/cart" className="line1">
                <img src={logoCart} className="cart" alt="Logo"/>
                <div className="cartText">Корзина</div>
              </NavLink>
              <NavLink to="/" className="line2">
                <img src={logoCatalog} className="catalog" alt="Logo"/>
                <div className="catalogText">Выйти</div>
              </NavLink>
            </div>
          </div>
        </div>
        <Divider></Divider>
        <Routes>
          <Route path="/" element={<CatalogPage />}></Route>
          <Route path="/catalog" element={<CatalogPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/orders" element={<OrdersPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
        </Routes>
      </div>
    );
  };
  

export default Header;
