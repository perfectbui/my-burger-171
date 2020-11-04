import React from "react";

const input = (props) => {
  let inputElement = null;
  let classNameInput = "p-1 outline-none focus:bg-gray-300 w-full";
  let classNameContainer = "m-2 w-2/5 border border-solid border-black w-2/5";
  if (props.valid === false && props.touch === true) {
    classNameInput = "p-1 outline-none bg-red-300 w-full";
    classNameContainer = "m-2 w-2/5 border border-solid border-red-500 w-2/5";
  }
  switch (props.inputType) {
    case "input":
      inputElement = (
        <input
          className={classNameInput}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <input
          className={classNameInput}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classNameInput}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value}>{option.displayValue}</option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classNameInput}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classNameContainer}>
      {inputElement}
    </div>
  );
};

export default input;
