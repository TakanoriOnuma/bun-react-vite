import type { FC } from "react";
import { useState } from "react";

export const Counter: FC = () => {
	const [count, setCount] = useState(0);

	return (
		<button
			type="button"
			onClick={() => {
				setCount((count) => count + 1);
			}}
		>
			count is {count}
		</button>
	);
};
