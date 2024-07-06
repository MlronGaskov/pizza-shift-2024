import React from 'react';

import '../style/CardPizza.css';

interface CardPizzaProps {
    imgUrl: string;
    name: string;
    description: string;
    price: number;
    onAddToCart?: () => void;
}

const CardPizza: React.FC<CardPizzaProps> = ({ imgUrl, name, description, price, onAddToCart }) => {
    // Component implementation
    return (
        <div className='cardPizza'>
            <img src={imgUrl} className='pizzaImg' alt={name} />
            <div className='content1'>
                <div className='content2'>
                    <div className='text'>
                        <div className='title'>{name}</div>
                        <div className='description'>{description}</div>
                    </div>
                    <div className='frame2815'>
                        <div className='price'>От {price}₽</div>
                        <button onClick={onAddToCart}>
                            <div className="button-text">Выбрать</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardPizza;
