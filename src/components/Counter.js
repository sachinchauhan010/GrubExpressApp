import { useState } from "react"

const Counter=({price})=>{
    // const [increment,setIncrement]=useState(1);
    // const [decrement, setDecrement]=useState(1);
    // let counter=1;
    

    const handleDecrement=()=>{
        setCounter(counter-1);
        setCost(cost-price);
    }
    const handleIncrement=()=>{
        setCounter(counter+1);
        setCost(cost+price);
    }
    return(
        <section>
            <button onClick={handleDecrement}>-</button>
            <span>{counter}</span>
            <button onClick={handleIncrement}>+</button>

            <p>{cost}</p>
        </section>
    )
}
export default Counter;