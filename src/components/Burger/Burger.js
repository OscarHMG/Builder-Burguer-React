import React from "react";
import style from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  /**
   * Obtain key props.ingredients, then create a array of the BurgerIngredients
   */
  let burgerIngedients = Object.keys(props.ingredients)
    .map(ingredient => {
      return [...Array(props.ingredients[ingredient])].map((_, i) => {
        return <BurgerIngredient key={ingredient + i} type={ingredient} />;
      });
    })
    .reduce((array, element) => {
      return array.concat(element);
    }, []);

  return (
    <div className={style.Burger}>
      <BurgerIngredient type="bread-top" />
        {burgerIngedients.length === 0 ? <p>Please start adding ingredients</p> : burgerIngedients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
