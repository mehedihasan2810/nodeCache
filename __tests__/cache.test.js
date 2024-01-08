import { expect, it } from "vitest";

function foo(a, b) {
   return a + b;
}

it("foo", () => {
    expect(foo(1, 2)).toBe(3);
})