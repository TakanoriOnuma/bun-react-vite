import { afterEach, expect } from "bun:test";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import chalk from "chalk";

function ensureExpectedColor(fn: any) {
	return function (...args: any[]) {
		this.utils.EXPECTED_COLOR = chalk.green;
		this.utils.RECEIVED_COLOR = chalk.red;
		return fn.apply(this, args);
	};
}

// 「context.utils.RECEIVED_COLOR is not a function.」というエラーが出たのでパッチを当てる。
// ただこれを当てても今度は「received value must be an HTMLElement or an SVGElement.」とか出て、
// そもそもtesting-library/jest-domのカスタムクエリがbunはサポートしきれていない気がする。。
// エラー表示だけ上手くいっていないので、正常系は大丈夫かもしれない。
// @see https://github.com/oven-sh/bun/issues/18500#issuecomment-2755227330
// apply the color overrides to all matcher functions within jest-dom matchers
function patchObjectMethods<T extends object>(obj: T) {
	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [
			key,
			typeof value === "function" ? ensureExpectedColor(value) : value,
		]),
	);
}

expect.extend(patchObjectMethods(matchers));

afterEach(() => {
	cleanup();
});
