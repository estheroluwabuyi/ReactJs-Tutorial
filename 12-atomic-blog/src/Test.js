// import { useState } from "react";

// //This simulates a slow component
// function SlowComponent() {
//   // If this is too slow on your machine, reduce the `length`
//   const words = Array.from({ length: 300_00 }, () => "WORD");
//   return (
//     <ul>
//       {words.map((word, i) => (
//         <li key={i}>
//           {i + 1}: {word}
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default function Test() {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <h1>Slow counter?!?</h1>
//       <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
//       <SlowComponent />
//     </div>
//   );
// }

//FIX
import { useState } from "react";

//This simulates a slow component
function SlowComponent() {
  // If this is too slow on your machine, reduce the `length`
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i + 1}: {word}
        </li>
      ))}
    </ul>
  );
}

function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}

export default function Test() {
  //here the slow component gets rerendered on every counter update
  // const [count, setCount] = useState(0);
  // return (
  //   <div>
  //     <h1>Slow counter?!?</h1>
  //     <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
  //     <SlowComponent />
  //   </div>
  // );

  //So to prevent the lagging, we updated the counter state in another component. This component will now handle the state updates without affecting the slow component...the slow component wont get re-rendered on every counter update.React already created the component before anything happens inside the counter
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <Counter>
        <SlowComponent />
      </Counter>
    </div>
  );
}
