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
   return (
       <div className='card-pizza'>
           <img src={imgUrl} className='pizza-img' alt={name} />
           <div className='card-pizza-content'>
               <div className='content-details'>
                   <div className='text'>
                       <div className='title'>{name}</div>
                       <div className='description'>{description}</div>
                   </div>
                   <div className='price'>
                       <div className='price-text'>от {price} ₽</div>
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