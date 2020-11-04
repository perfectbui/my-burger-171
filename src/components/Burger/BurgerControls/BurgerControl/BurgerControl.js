import React from "react";

import './BurgerControl.css'

const burgerControl = (props) => {
  return (
    <div className="flex justify-between font-bold m-2 items-center burger-control">
      <div>{props.label}</div>
      <div className="text-white">
        <button className="h-8 w-16 bg-orange-400 hover:bg-orange-300 border border-solid border-black focus:outline-none hover:disabled:bg-red-300"
        disabled={props.disableRemove}
        onClick={props.removed}
        >
          Less
        </button>
        <button
          className="h-8 w-16 bg-orange-800 ml-6 hover:bg-orange-700 border border-solid border-black focus:outline-none"
          onClick={props.added}
        >
          More
        </button>
      </div>
    </div>
  );
};

export default burgerControl;
