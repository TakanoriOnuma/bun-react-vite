import { describe, expect, jest, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Counter } from "./Counter";

// 流石にjest.mockはbunではサポートされていなかった
// jest.mock("./useCounter", () => {
//   const originalModule = jest.requireActual("./useCounter");

//   return {
//     ...originalModule,
//     useCounter: () => ({
//       count: 0,
//       increment: jest.fn(() => {
//         // Mock implementation to simulate incrementing the count
//       }),
//     }),
//   };
// });

const user = userEvent.setup();

describe("Counter", () => {
  test("カウントアップするか", async () => {
    const onClick = jest.fn();

    render(<Counter onClick={onClick} />);
    expect(onClick).toHaveBeenCalledTimes(0);

    const button = screen.getByRole("button", { name: /count is 0/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(button).toHaveTextContent("count is 1");

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
