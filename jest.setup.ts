import "@testing-library/jest-dom";
import "@testing-library/react";

import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

// @jest/globalsのexpectにTesting Libraryのマッチャーを追加する
// @see https://qiita.com/k42un0k0/items/c788b54802308cabdfc4
declare module "expect" {
  interface Matchers<R extends void | Promise<void>, T = unknown>
    extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
}
