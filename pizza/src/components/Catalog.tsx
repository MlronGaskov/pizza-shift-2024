import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import CardPizza from "./CardPizza";


const imgUrlStart = "https://shift-backend.onrender.com";

interface PizzaData {
  allergens: Array<string>,
  calories: 320,
  carbohydrates: string,
  description: string,
  doughs: Array<{name: string, price: number}>,
  id: string,
  img: string,
  ingredients: Array<{name: string, cost: number, img: string}>,
  isGlutenFree: boolean,
  isHit: boolean,
  isNew: boolean,
  isVegetarian: boolean,
  name: string,
  protein: string,
  sizes: Array<{name: string, price: number}>,
  soium: string,
  toppings: Array<{name: string, cost: number, img: string}>,
  totalFat: string
}


const fetchData = async () => {
  const { data } = await axios.get('https://shift-backend.onrender.com/pizza/catalog');
  return data;
};


function getPizzaCard(item: PizzaData): JSX.Element{
  const url = imgUrlStart + item.img;
  const prices = item.sizes.map((element) => element.price);
  const minPrice = Math.min(...prices);
  return <CardPizza imgUrl={url} name={item.name} description={item.description} price={minPrice}></CardPizza>;
}


const PizzaCards: React.FC = () => {
  const { isLoading, isError, data } = useQuery<{success: boolean, catalog: Array<PizzaData>}>("catalogData", fetchData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  
  let cards = data!.catalog.flatMap(getPizzaCard);

  const frameSize = 3;
  const pizzaFrames = [];
  for (let i = 0; i < cards.length; i += frameSize) {
    const frame = cards.slice(i, i + frameSize);
    pizzaFrames.push(frame);
  }

  return (
    <div className="content">
      {pizzaFrames.map((frame, index) => (
        <div key={index} className="frame">
          {frame.map((card, subIndex) => (
            <div key={subIndex}>{card}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PizzaCards;
