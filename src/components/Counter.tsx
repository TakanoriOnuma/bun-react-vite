import type { FC } from "react";
import { useState } from "react";

export type CounterProps = {
  onClick?: () => void;
};

export const Counter: FC<CounterProps> = ({ onClick }) => {
  const [count, setCount] = useState(0);

  return (
    <button
      type="button"
      onClick={() => {
        setCount((count) => count + 1);
        onClick?.();
      }}
    >
      count is {count}
    </button>
  );
};
