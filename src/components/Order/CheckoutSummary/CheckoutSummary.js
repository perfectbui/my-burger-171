import React from "react";

import Burger from "../../Burger/Burger";
import "./CheckoutSummary.css";

const CheckoutSummary = (props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-5xl font-bold">
        We hope it tastes well
      </div>
        <Burger className="w-full" ingredients={props.ingredients} />
      <div>
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
    </div>
  );
};

export default CheckoutSummary;
