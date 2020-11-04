import React from 'react'

const order = (props) => {

    const ingredients=[];
    for(let ingredientName in props.ingredients) {
        ingredients.push([ingredientName,props.ingredients[ingredientName]]);
    }

    return(
        <div className="flex flex-col border border-black border-solid w-4/5 m-2">
            <div className="flex flex-wrap m-2 items-center">Ingredients:{ingredients.map(ingredient=><div className="m-1 p-1 border border-black border-solid">{ingredient[0]}({ingredient[1]})</div>)}</div>
            <div className="font-bold m-2">Price: USD {props.price}</div>
        </div>
    )
}

export default order;