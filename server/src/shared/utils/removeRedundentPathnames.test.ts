import { test, expect } from "@jest/globals";
import removeRedundantPathnames from "./removeRedundentPathnames";

test("keeps parent when subfolder comes after it", () => {
  const result = removeRedundantPathnames(["fu", "fu/budu"]);
  expect(result).toEqual(["fu"]);
});

test("keeps parent when subfolder comes before it", () => {
  const result = removeRedundantPathnames(["fu/hello/fu", "fu"]);
  expect(result).toEqual(["fu"]);
});

test("removes subfolder when parent folder is nested", () => {
  const result = removeRedundantPathnames([
    "git/flash",
    "git/flash/bang",
    "babba",
    "babba/lb/babba",
  ]);
  console.log(result);
  expect(result).toEqual(["git/flash", "babba"]);
});

test("removes subfolder when parent folder is included, right to left", () => {
  const result = removeRedundantPathnames([
    "pro/one",
    "project/one",
    "grape/juice",
    "grape juice/tasty",
  ]);
  console.log(result);
  expect(result).toEqual([
    "pro/one",
    "project/one",
    "grape/juice",
    "grape juice/tasty",
  ]);
});

test("keeps all when no nested paths are present", () => {
  const result = removeRedundantPathnames(["a", "b", "c"]);
  expect(result).toEqual(["a", "b", "c"]);
});

test("removes deep nested subfolders", () => {
  const result = removeRedundantPathnames(["a", "a/b", "a/b/c"]);
  expect(result).toEqual(["a"]);
});

test("handles duplicate folder inputs", () => {
  const result = removeRedundantPathnames(["a", "a", "a/b"]);
  expect(result).toEqual(["a"]);
});
