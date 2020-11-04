import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import "./Burger.css";

const burger = (props) => {
  let ingredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, index) => (
        <BurgerIngredient key={igKey + index} type={igKey} />
      ));
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (ingredients.length === 0) {
    ingredients = <div className="mx-auto text-center">Please add some ingredients!</div>;
  }
  return (
    <div className="burger">
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
