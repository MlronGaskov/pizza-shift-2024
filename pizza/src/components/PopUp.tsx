import React, { useState } from 'react';
import cross from "../assets/cross.svg"
import { PizzaData } from '../pages/CatalogPage';
import Toppings from './Toppings';
import SizeSelection from './SizeSelection';

import '../style/PopUp.css';
import { pizzaInfo } from '../pages/CartPage'

const imgUrlStart = "https://shift-backend.onrender.com";

interface PopUpProps {
    addToCart?: (pizzaInfo: pizzaInfo) => void,
    onClose: () => void,
    pizzaData: PizzaData,
    pizzaInfo?: pizzaInfo,
    editPizzaInfo?: (newPizzaInfo: pizzaInfo) => void;
    ordersCount?: number,
}

const PopUp: React.FC<PopUpProps> = ({pizzaData, onClose, addToCart, pizzaInfo, editPizzaInfo}) => {
    const sizePrices = new Map<string, number>();
    sizePrices.set(pizzaData.sizes[0].name, pizzaData.sizes[0].price);
    sizePrices.set(pizzaData.sizes[1].name, pizzaData.sizes[1].price);
    sizePrices.set(pizzaData.sizes[2].name, pizzaData.sizes[2].price);
    const doughPrices = new Map<string, number>();
    doughPrices.set(pizzaData.doughs[0].name, pizzaData.doughs[0].price);
    doughPrices.set(pizzaData.doughs[1].name, pizzaData.doughs[1].price);

    const [pizzaDough, setPizzaDough] = useState<string>(pizzaInfo == undefined ? "THICK" : pizzaInfo.doughs.name);
    const [pizzaSize, setPizzaSize] = useState<string>(pizzaInfo == undefined ? "SMALL" : pizzaInfo.size.name);
    
    let startTotalPrice = sizePrices.get(pizzaSize)! + doughPrices.get(pizzaDough)!;
    let startToppings: Set<string> = new Set();
    if (pizzaInfo != undefined) {
        for (const topping of pizzaInfo.toppings) {
            startToppings.add(topping.name);
            startTotalPrice += topping.cost;
        }
    }
    const [addedToppings, setAddedToppings] = useState<Set<string>>(startToppings);

    const [totalPrice, setTotalPrice] = useState<number>(startTotalPrice);

    const addTopping = (name: string, price: number) => {
        const newToppings = new Set(addedToppings);
        newToppings.add(name);
        setAddedToppings(newToppings);
        const newTotalPrice = totalPrice + price;
        setTotalPrice(newTotalPrice); 
    };
    
    const removeTopping = (name: string, price: number) => {
        const newToppings = new Set(addedToppings);
        newToppings.delete(name);
        setAddedToppings(newToppings);
        const newTotalPrice = totalPrice - price;
        setTotalPrice(newTotalPrice);
    };

    const onClickTopping = (name: string, price: number) => {
        if (addedToppings.has(name))
            removeTopping(name, price);
        else
            addTopping(name, price);
    }

    const swapDough = () => {
        setPizzaDough((prevDough) => {
            const newDough = prevDough === 'THICK' ? 'THIN' : 'THICK';
            setTotalPrice(totalPrice - doughPrices.get(prevDough)! + doughPrices.get(newDough)!);
            return newDough;
        });
    };

    const setSize = (name: string) => {
        const newTotalPrice = totalPrice + sizePrices.get(name)! - sizePrices.get(pizzaSize)!;
        setTotalPrice(newTotalPrice);
        setPizzaSize(name);
    };
    const sizes = new Map<string, number>();
    sizes.set("LARGE", 50);
    sizes.set("MEDIUM", 40);
    sizes.set("SMALL", 30);

    const getPizzaInfo = (): pizzaInfo => {
        const toppings: Array<{name: string, cost: number, img: string}> = [];
        for (const topping of pizzaData.toppings) {
            if (addedToppings.has(topping.name)) {
                toppings.push(topping);
            }
        }
        let size: {name: string, price: number} = pizzaData.sizes[0];
        if (pizzaData.sizes[1].name == pizzaSize)
            size = pizzaData.sizes[1];
        if (pizzaData.sizes[2].name == pizzaSize)
            size = pizzaData.sizes[2];
        
        let doughs: {name: string, price: number} = pizzaData.doughs[0];
        if (pizzaData.doughs[1].name == pizzaDough)
            doughs = pizzaData.doughs[1];

        const chosenPizzaInfo: pizzaInfo = {
            totalPrice: totalPrice,
            img: pizzaData.img,
            id: pizzaData.id,
            name: pizzaData.name,
            toppings: toppings,
            description: pizzaData.description,
            size: size,
            doughs: doughs,
            pizzaData: pizzaData,
        }

        return chosenPizzaInfo;
    }

    return (
        <div className='card'>
            <div className='pop-up'>
                <div className='line'>
                    <div className='cross' onClick={onClose}>
                        <img src={cross} className='img-cross'></img>
                    </div>
                </div>
            </div>
            <div className='login'>
                <div className='login-frame'>
                    <img src={imgUrlStart + pizzaData.img} className='pizza'></img>
                    <div className='child-frame'>
                        <div className='scroll'>
                            <div className='child-frame1'>
                                <div className='child-frame1-text'>
                                    <p className='child-frame1-text1'>{pizzaData.name}</p>
                                    <p className='child-frame1-text2' onClick={swapDough}>{sizes.get(pizzaSize)} см, {pizzaDough == "THICK" ? "традиционное" : "тонкое"} тесто</p>
                                    <p className='child-frame1-text3'>{pizzaData.description}</p>
                                </div>
                                <SizeSelection size={pizzaSize} setSize={setSize}></SizeSelection>
                            </div>
                            <Toppings addedToppings={addedToppings} onClickTopping={onClickTopping} toppings={pizzaData.toppings}></Toppings>
                        </div>
                        <button className='child-button' onClick={() => {  
                            if (addToCart !== undefined)
                                addToCart(getPizzaInfo()); 
                            if (editPizzaInfo !== undefined)
                                editPizzaInfo(getPizzaInfo());
                            onClose();
                        }}>
                            {(addToCart !== undefined ? "Добавить в корзину " : "Изменить ") + totalPrice + " ₽"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopUp;
