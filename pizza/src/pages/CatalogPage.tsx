import * as React from "react";
import Header from "../components/Header";
import CardPizza from "../components/CardPizza";
import PizzaCards from "../components/Catalog";

import "../style/СatalogPage.css"

const CatalogPage: React.FC = () => {
  return (
    <PizzaCards></PizzaCards>
  );
};

export default CatalogPage;
