import { useState } from "react";

export const useCounter = () => {
  const [count, setCount] = useState(0);

  return {
    count,
    increment: () => setCount((prevCount) => prevCount + 1),
    reset: () => setCount(0),
  };
};
