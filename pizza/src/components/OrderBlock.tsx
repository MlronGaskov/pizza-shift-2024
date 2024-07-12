import React from "react";
import { pizzaInfo } from "../pages/CartPage";
import { useState } from "react";

import PopUp from "./PopUp";
import cross from "../assets/cross.svg"
import { names_rus } from "./Toppings";
import { PizzaData } from "../pages/CatalogPage";

const imgUrlStart = "https://shift-backend.onrender.com";

interface OrderBlockProps {
    chosenPizza: PizzaData,
    id: number,
    count: number,
    pizzaInfo: pizzaInfo,
    deleteFromCart: (id: number) => void,
    addToCart: (blockInfo: { id: number; pizzaInfo: pizzaInfo; }) => void,
    editCart: (blockInfo: { id: number; pizzaInfo: pizzaInfo; }) => void,
}

const OrderBlock: React.FC<OrderBlockProps> = ({ id, count, pizzaInfo, deleteFromCart, addToCart, chosenPizza, editCart}) => {
    const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);

    let orderInfo = "";
    if (pizzaInfo.size.name == "SMALL")
        orderInfo += "Маленькая 30см"
    else if (pizzaInfo.size.name == "MEDIUM")
        orderInfo += "Средняя 40см"
    else
        orderInfo += "Большая 50см"
    if (pizzaInfo.doughs.name == "THICK")
        orderInfo += ", традиционное тесто"
    else
        orderInfo += ", тонкое тесто"

    if (pizzaInfo.toppings.length != 0) {
        orderInfo += " + "
        for (let i = 0; i < pizzaInfo.toppings.length; i += 1) {
            orderInfo += names_rus.get(pizzaInfo.toppings[i].name)!.toLowerCase();
            if (i != pizzaInfo.toppings.length - 1)
                orderInfo += ", ";
        }
    }
    
    return (
        <div className="order-block">        
            {isPopUpOpen ? <PopUp 
                                pizzaData={chosenPizza!} 
                                onClose={()=>{setIsPopUpOpen(false)}} 
                                pizzaInfo={pizzaInfo} 
                                editPizzaInfo={(newPizzaInfo: pizzaInfo) => {editCart({ id: id, pizzaInfo: newPizzaInfo} )}}>
                            </PopUp> : null}
            {isPopUpOpen && <div className="dark-overlay" onClick={()=>setIsPopUpOpen(false)}/>}

            <img src={imgUrlStart + pizzaInfo.img} className="order-block-img"></img>
            <div className="pizza-name">{pizzaInfo.name}</div>
            <div className="order-info">{orderInfo}</div>
            <div className="change" onClick={() => setIsPopUpOpen(true)}>Изменить</div>
            <div className="total-price">{pizzaInfo.totalPrice * count} ₽</div>
            <div className="orders-count">
                <div className="count-space">
                    <div className="count-frame">
                        <div className="count-minus" onClick={() => deleteFromCart(id)}>-</div>
                        <div className="count-total">{count}</div>
                        <div className="count-plus" onClick={() => addToCart({id: id, pizzaInfo: pizzaInfo})}>+</div>
                    </div>
                </div>
            </div>
            <div className="delete-all">
                <div className="delete-all-cross">
                    <img src={cross} 
                        onClick={() => { for (let i = 0; i < count; i += 1) deleteFromCart(id); }}>
                    </img>
                </div>
            </div>
        </div>
    );
};

export default OrderBlock;
