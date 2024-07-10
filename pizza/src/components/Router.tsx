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


const Router: React.FC = () => {
    return (
        <div>
            <header className="header">
                <div className="header-content">
                    <NavLink to="/" className="logo">
                        <img src={logoPizza} className="logo-img" alt="Logo"/>
                    </NavLink>
                    <div className="links">
                        <NavLink to="/profile" className="itemMenu">
                            <img src={logoProfile} className="links-logo" alt="Logo"/>
                            <div className="links-text">Профиль</div>
                        </NavLink>
                        <NavLink to="/orders" className="itemMenu">
                            <img src={logoOrders} className="links-logo" alt="Logo"/>
                            <div className="links-text">Заказы</div>
                        </NavLink>
                        <div className="space"></div>
                        <NavLink to="/cart" className="itemMenu">
                            <img src={logoCart} className="links-logo" alt="Logo"/>
                            <div className="links-text">Корзина</div>
                        </NavLink>
                        <div className="itemMenu">
                            <img src={logoCatalog} className="links-logo" alt="Logo"/>
                            <div className="links-text">Выйти</div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="divider"/>

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
  

export default Router;
