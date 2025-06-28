import { AsymmetricMatchers, Matchers } from "bun:test";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "bun:test" {
	interface Matchers<R>
		extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
	interface AsymmetricMatchers extends TestingLibraryMatchers {}
}
