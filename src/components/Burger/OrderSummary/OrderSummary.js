import React from "react";

const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((igKey) => (
    <li key={igKey}>
      <span className="capitalize">{igKey}: </span>
      {props.ingredients[igKey]}
    </li>
  ));
  return (
    <div>
      <h3 className="text-3xl m-4">Your Order</h3>
      <p className="mt-2 ml-4">
        A delicious burger with the following ingredients:
      </p>
      <ul className="mt-2 ml-10 list-disc">{ingredientsSummary}</ul>
      <button
        className="m-3 px-1 py-1 bg-red-500 hover:bg-red-400 border border-black border-solid focus:outline-none"
        onClick={props.cancel}
      >
        Cancel
      </button>
      <button
        className="m-3 px-1 py-1 bg-green-500 hover:bg-green-400 border border-black border-solid focus:outline-none"
        onClick={props.continue}
      >
        Continue
      </button>
    </div>
  );
};

export default orderSummary;
