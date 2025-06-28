import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Counter } from "./Counter";

const user = userEvent.setup();

describe("Counter", () => {
	test("カウントアップするか", async () => {
		render(<Counter />);

		const button = screen.getByRole("button", { name: /count is 0/i });
		expect(button).toBeInTheDocument();

		await user.click(button);
		expect(button).toHaveTextContent("count is 1");
	});
});
