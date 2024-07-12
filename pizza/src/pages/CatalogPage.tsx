import * as React from "react";
import axios from "axios";
import Catalog from "../components/Catalog";
import { useQuery } from "react-query";
import { useState } from "react";

import { pizzaInfo } from "./CartPage";
import "../style/СatalogPage.css"
import PopUp from "../components/PopUp";

export interface PizzaData {
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


const CatalogPage: React.FC<{addToCart: (pizzaInfo: pizzaInfo) => void}> = ({addToCart}) => {
    const { isLoading, isError, data } = useQuery<{success: boolean, catalog: Array<PizzaData>}>("catalogData", fetchData);

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [choosenPizza, setChoosenPizza] = useState<PizzaData | undefined>(undefined);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;
    
    return (
        <div className="catalog-page">
            {isPopUpOpen ? <PopUp pizzaData={choosenPizza!} onClose={()=>{setIsPopUpOpen(false)}} addToCart={addToCart}></PopUp> : null}
            {isPopUpOpen && <div className="dark-overlay" onClick={()=>setIsPopUpOpen(false)}/>}
            <Catalog catalog={data!.catalog} setChoosenPizza={setChoosenPizza} setIsPopUpOpen={setIsPopUpOpen}></Catalog>
        </div>
    );
};

export default CatalogPage;

