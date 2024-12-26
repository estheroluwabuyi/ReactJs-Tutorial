import { useState, useReducer } from "react";

function reducer(state, action) {
  console.log(state, action);
  //this returns the initial value of the dispatch function as the action and the current value as the state
  // if (action.type === "inc") return state + action.payload;
  // if (action.type === "inc") return state + action.payload;
  if (action.type === "inc") return state + 1;
  if (action.type === "dec") return state - 1;
  if (action.type === "setCount") return action.payload;
  // if (action.type !== "setCount") return;
}

function DateCounter() {
  // const [count, setCount] = useState(0);

  const [count, dispatch] = useReducer(reducer, 0);

  const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // dispatch({ type: "dec", payload: 1 });
    dispatch({ type: "dec" });
  };

  const inc = function () {
    // dispatch({ type: "inc", payload: 1 });
    dispatch({ type: "dec" });
  };

  const defineCount = function (e) {
    //payload here will be whatever value is typed into the input field
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {};

  const reset = function () {
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
