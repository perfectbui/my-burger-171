import React from "react";

import BurgerControl from "./BurgerControl/BurgerControl";
import "./BurgerControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
];

const burgerControls = (props) => {
  return (
    <div className="bg-orange-500 flex items-center flex-col">
      <div className="mb-5 text-5xl text-center font-bold">
        Current Price: ${props.price}
      </div>
      {controls.map((control) => (
        <BurgerControl
          key={control.label}
          label={control.label}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          disableRemove={props.disableRemove[control.type]}
        />
      ))}
      <button
        className="h-10 font-medium w-48 m-4 bg-yellow-400 hover:bg-green-500 focus:outline-none"
        disabled={props.disablePurchase}
        onClick={props.order}
      >
       {props.isAuth ? 'ORDER NOW':'SIGN UP TO ORDER'}
      </button>
    </div>
  );
};

export default burgerControls;
