import React from 'react';

import '../style/Toppings.css';

const imgUrlStart = "https://shift-backend.onrender.com";

export const names_rus = new Map<string, string>();
names_rus.set("PINEAPPLE", "Ананас");
names_rus.set("GREEN_PEPPER", "Зеленый перец");
names_rus.set("MUSHROOMS", "Грибы");
names_rus.set("BACON", "Бекон");
names_rus.set("SHRIMPS", "Креветки");
names_rus.set("HAM", "Ветчина");
names_rus.set("MOZZARELLA", "Моцарелла");
names_rus.set("PEPERONI", "Пеперони");
names_rus.set("CHICKEN_FILLET", "Куринное филе");
names_rus.set("ONION", "Лук");
names_rus.set("BASIL", "Базилик");
names_rus.set("CHILE", "Чили");    
names_rus.set("CHEDDAR", "Чеддар");
names_rus.set("MEATBALLS", "Мясные шарики");
names_rus.set("PICKLE", "Огурцы");
names_rus.set("TOMATO", "Помидоры");
names_rus.set("FETA", "Фета");


interface CardToppingProps {
    addedToppings: Set<string>;
    imgUrl: string;
    name: string;
    price: number;
    onClick?: () => void;
}

interface ToppingsProps {
    addedToppings: Set<string>;
    onClickTopping: (name: string, price: number) => void;
    toppings: Array<{name: string, cost: number, img: string}>;
}

const CardTopping: React.FC<CardToppingProps> = ({ imgUrl, name, price, onClick, addedToppings }) => {
    return (
        <div className={`${addedToppings.has(name!) ? 'chosen-card-topping' : 'card-topping'}`} onClick={onClick}>
            <img src={imgUrl} className='img-topping'></img>
            <div className='topping-content'>
                <div className='text1'>{names_rus.get(name)}</div>
                <div className='text2'>{price} ₽</div>
            </div>
        </div>
    );
}


function getCardTopping(item: {name: string, cost: number, img: string}, addedToppings: Set<string>, onClickTopping: (name: string, price: number) => void): JSX.Element{
    const url = imgUrlStart + item.img;
    const onClick = () => onClickTopping(item.name, item.cost);
    return <CardTopping imgUrl={url} addedToppings={addedToppings} name={item.name} price={item.cost} onClick={onClick}></CardTopping>;
}
  

const Toppings: React.FC<ToppingsProps> = ({ toppings, addedToppings, onClickTopping }) => {

    let cards = toppings.flatMap((item) => getCardTopping(item, addedToppings, onClickTopping));

    const frameSize = 3;
    const toppingFrames = [];
    for (let i = 0; i < cards.length; i += frameSize) {
        const frame = cards.slice(i, i + frameSize);
        toppingFrames.push(frame);
    }

    return (
        <div className='toppings'>
            <div className='toppings-frame1'>
                <div className='toppings-frame1-text'>Добавить по вкусу</div>
            </div>
            <div className='toppings-frame2'>
                {toppingFrames.map((frame, index) => (
                    <div key={index} className="topping-frame">         
                        {frame.map((card, subIndex) => (
                            <div key={subIndex}>
                                {card}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Toppings;
