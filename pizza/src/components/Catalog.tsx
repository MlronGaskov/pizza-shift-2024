import React from "react";
import CardPizza from "./CardPizza";
import {PizzaData} from "../pages/CatalogPage"


const imgUrlStart = "https://shift-backend.onrender.com";

interface CatalogProps {
    catalog: PizzaData[],
    setChoosenPizza: React.Dispatch<React.SetStateAction<PizzaData | undefined>>
    setIsPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Catalog: React.FC<CatalogProps> = ({ catalog, setChoosenPizza, setIsPopUpOpen }) => {
    const getPizzaCard = (item: PizzaData, onAddToCart: ()=>void): JSX.Element => {
        const url = imgUrlStart + item.img;
        const prices = item.sizes.map((element) => element.price);
        const minPrice = Math.min(...prices);
        return (
            <CardPizza 
                imgUrl={url} 
                name={item.name} 
                description={item.description} 
                price={minPrice} 
                onAddToCart={onAddToCart}
            ></CardPizza>
        );
    }

    const toPizzaCard = (item: PizzaData): JSX.Element => {
        return getPizzaCard(item, () => { setChoosenPizza(item); setIsPopUpOpen(true) } );
    }

    let cards = catalog.map(toPizzaCard);
    const frameSize = 3;
    const pizzaFrames = [];
    for (let i = 0; i < cards.length; i += frameSize) {
        const frame = cards.slice(i, i + frameSize);
        pizzaFrames.push(frame);
    }

    return (
        <div className="catalog-content">
            {pizzaFrames.map((frame, index) => (
                <div key={index} className="catalog-frame">
                {frame.map((card, subIndex) => (
                    <React.Fragment key={subIndex}>{card}</React.Fragment>
                ))}
                </div>
            ))}
            <div className="catalog-space"></div>    
        </div>
    );
};

export default Catalog;
