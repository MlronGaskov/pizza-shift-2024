import * as React from "react";
import { Route, Routes, NavLink } from "react-router-dom";

import { useState } from "react";
import CartPage, { pizzaInfo } from "../pages/CartPage";
import ProfilePage from "../pages/ProfilePage";
import OrdersPage from "../pages/OrdersPage";
import CatalogPage from "../pages/CatalogPage";
import logoPizza from "../assets/logo.svg"
import logoCart from "../assets/cart.svg"
import logoOrders from "../assets/orders.svg"
import logoProfile from "../assets/profile.svg"
import logoCatalog from "../assets/catalog.svg"

import '../style/Header.css';
import SetUserInfoPage from "../pages/SetUserInfoPage";
import SetDebitCardPage from "../pages/SetDebitCardPage";


export interface personInfo {
    firstname: string,
    lastname: string,
    middlename: string,
    phone: string,
}

export interface receiverAddress {
    street: string,
    house: string,
    apartment: string,
    comment: string,
}

export interface debitCard {
    pan: string,
    expireDate: string,
    cvv: string,
}


type dataType = {
    receiverAddress: receiverAddress;
    person: personInfo;
    debitCard: debitCard;
    pizzas: Array<{
        id: string;
        name: string;
        toppings: Array<{
            name: string;
            cost: number;
            img: string;
        }>;
        description: string;
        size: {
            name: string;
            price: number;
        };
        doughs: {
            name: string;
            price: number;
        };
    }>;
}


const Router: React.FC = () => {
    const [cart, setCart] = useState<Array<{id: number, count: number, pizzaInfo: pizzaInfo}>>([]);
    const [person, setPerson] = useState<personInfo>({
        firstname: "Имя",
        lastname: "Фамилия", 
        middlename: "Отчество", 
        phone: "89130632864"});
    const [address, setAddress] = useState<receiverAddress>({street: "Улица", house: "Дом", apartment: "Квартира", comment: ""});
    const [card, setCard] = useState<debitCard>({pan: "0000 0000", expireDate: "11/11", cvv: "000"});

    const addToCart = (blockInfo: {id: number, pizzaInfo: pizzaInfo}): void => {
        const new_cart: Array<{id: number, count: number, pizzaInfo: pizzaInfo}> = [];
        
        for (let element of cart) {
            if (element.id == blockInfo.id)
                element.count += 1;
            new_cart.push(element);
        }
        if (blockInfo.id == -1) {
            const id = cart.length == 0 ? 0 : cart[cart.length - 1].id + 1;
            new_cart.push({id: id, count: 1, pizzaInfo: blockInfo.pizzaInfo});
        }
        setCart(new_cart);
    }

    const deleteFromCart = (id: number): void => {
        const new_cart: Array<{id: number, count: number, pizzaInfo: pizzaInfo}> = [];
        for (let element of cart) {
            if (element.id == id && element.count == 1)
                continue;
            if (element.id == id)
                element.count -= 1;
            new_cart.push(element);
        }
        setCart(new_cart);
    }

    const editCart = (blockInfo: {id: number, pizzaInfo: pizzaInfo}) => {
        const new_cart: Array<{id: number, count: number, pizzaInfo: pizzaInfo}> = [];
        for (let element of cart) {
            if (element.id == blockInfo.id)
                element.pizzaInfo = blockInfo.pizzaInfo;
            new_cart.push(element);
        }
        setCart(new_cart);
    }

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
                <Route path="/" element={<CatalogPage addToCart={(pizzaInfo) => addToCart({id: -1, pizzaInfo: pizzaInfo})}/>}></Route>
                <Route path="/catalog" element={<CatalogPage addToCart={(pizzaInfo) => addToCart({id: -1, pizzaInfo: pizzaInfo})}/>}></Route>
                <Route path="/profile" element={<ProfilePage />}></Route>
                <Route path="/orders" element={<OrdersPage />}></Route>
                <Route path="/cart" element={<CartPage cart={cart} deleteFromCart={deleteFromCart} addToCart={addToCart} editCart={editCart}/>}></Route>
                
                <Route path="/set_user_info" element={<SetUserInfoPage prevPersonInfo={person} prevAddress={address} setPerson={setPerson} setAddress={setAddress}/>}></Route>
                <Route path="/set_debit_card_info" element={<SetDebitCardPage onClick={() => {}} prevCardInfo={card} setCardInfo={setCard}/>}></Route>

            </Routes>
        </div>
    );
};
  

export default Router;
