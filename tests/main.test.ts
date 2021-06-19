import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { isValidPackageJson } from "../src/main.ts";
Deno.test(
  "#isValidPackageJson validates that package.json has correct required fields",
  () => {
    const packageJson = {
      name: "react-app",
      version: "0.0.1",
    };
    assertEquals(isValidPackageJson(packageJson), true);
  }
);
