import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);

    //whatever the function return will become the initial state value of the useState hook. in this case we returned 👇👇
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      //rem you set set before getting
      localStorage.setItem("watched", JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
