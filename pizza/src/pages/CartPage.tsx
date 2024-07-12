import * as React from "react";

import OrderBlock from "../components/OrderBlock";
import "../style/CartPage.css"
import { PizzaData } from "./CatalogPage";
import { NavLink } from "react-router-dom";

export interface pizzaInfo {
    img: string,
    id: string,
    name: string,
    toppings: Array<{name: string, cost: number, img: string}>,
    description: string,
    size: {name: string, price: number},
    doughs: {name: string, price: number},
    totalPrice: number,
    pizzaData: PizzaData,
}

interface CartPageProps {
    deleteFromCart: (id: number) => void,
    addToCart: (blockInfo: { id: number; pizzaInfo: pizzaInfo; }) => void,
    editCart: (blockInfo: { id: number; pizzaInfo: pizzaInfo; }) => void,
    cart: Array<{id: number, count: number, pizzaInfo: pizzaInfo}>,
}

const CartPage: React.FC<CartPageProps> = ({cart, addToCart, deleteFromCart, editCart}) => {
    const getOrderTotalPrice = (): number => {
        let totalPrice = 0;
        for (let i = 0; i < cart.length; i += 1)
            totalPrice += cart[i].count * cart[i].pizzaInfo.totalPrice;
        return totalPrice;
    }

    return (
        <div className="parent-container">
            <div className="cards">
                {cart.map((block, index) => (     
                    <OrderBlock
                        chosenPizza={block.pizzaInfo.pizzaData}
                        key={index}
                        id={block.id}
                        count={block.count} 
                        pizzaInfo={block.pizzaInfo}
                        addToCart={addToCart} 
                        editCart={editCart}
                        deleteFromCart={deleteFromCart}>
                    </OrderBlock>
                ))}
                <div className="line-divider"></div>
                <div className="placing-order-frame">
                    <div className="order-cost">
                        <div className="order-text1">Стоимость заказа: </div>
                        <div className="order-total-price">{getOrderTotalPrice()} ₽</div>
                    </div>
                    <NavLink to="/set_user_info" className="empty-nav-link">
                        <button className="placing-order-button" onClick={() => console.log(cart)}>
                            <div className="placing-order-button-text">Оформить заказ</div>
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
