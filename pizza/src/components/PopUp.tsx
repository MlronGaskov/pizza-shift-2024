import React, { useState } from 'react';
import cross from "../assets/cross.svg"
import { PizzaData } from '../pages/CatalogPage';
import Toppings from './Toppings';
import SizeSelection from './SizeSelection';

import '../style/PopUp.css';

const imgUrlStart = "https://shift-backend.onrender.com";

interface PopUpProps {
    onClose?: () => void,
    pizzaData: PizzaData,
}

const PopUp: React.FC<PopUpProps> = ({pizzaData, onClose}) => {
    const [dough, setDough] = useState<"традиционное" | "тонкое">("традиционное");
    const [pizzaSize, setPizzaSize] = useState<"SMALL" | "MEDIUM" | "LARGE">("SMALL");

    const swapDough = () => {
        if (dough == "традиционное")
            setDough("тонкое");
        else
            setDough("традиционное");
    }

    const setLarge = () => {setPizzaSize("LARGE")};
    const setMedium = () => {setPizzaSize("MEDIUM")};
    const setSmall = () => {setPizzaSize("SMALL")};

    const sizes = new Map<string, number>();
    sizes.set("LARGE", 50);
    sizes.set("MEDIUM", 40);
    sizes.set("SMALL", 30);

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
                                    <p className='child-frame1-text2' onClick={swapDough}>{sizes.get(pizzaSize)} см, {dough} тесто</p>
                                    <p className='child-frame1-text3'>{pizzaData.description}</p>
                                </div>
                                <SizeSelection size={pizzaSize} setLarge={setLarge} setMedium={setMedium} setSmall={setSmall}></SizeSelection>
                            </div>
                            <Toppings toppings={pizzaData.toppings}></Toppings>
                        </div>
                        <button className='child-button'>
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopUp;
