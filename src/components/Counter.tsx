import type { FC } from "react";

import { useCounter } from "./useCounter";

export type CounterProps = {
  onClick?: () => void;
};

export const Counter: FC<CounterProps> = ({ onClick }) => {
  const { count, increment } = useCounter();

  return (
    <button
      type="button"
      onClick={() => {
        increment();
        onClick?.();
      }}
    >
      count is {count}
    </button>
  );
};
