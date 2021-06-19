import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { isValidPackageJson } from "../src/main.ts";

Deno.test(
  "#isValidPackageJson validates that package.json has correct name field",
  () => {
    const packageJson1 = {
      name: "react app",
      version: "0.1.1",
    };
    const packageJson2 = {
      name: "react-app",
      version: "0.0.1",
    };
    assertEquals(isValidPackageJson(packageJson1), false);
    assertEquals(isValidPackageJson(packageJson2), true);
  }
);
Deno.test(
  "#isValidPackageJson validates that package.json has correct version field",
  () => {
    const packageJson1 = {
      name: "react-app",
      version: "a.b.c",
    };
    const packageJson2 = {
      name: "react-app",
      version: "0.0.1",
    };
    assertEquals(isValidPackageJson(packageJson1), false);
    assertEquals(isValidPackageJson(packageJson2), true);
  }
);
