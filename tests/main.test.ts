import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { buildReadmeFromPkgJson } from "../src/main.ts";
Deno.test(
  "#buildReadmeFromPkgJson creates markdown headings for selected package.json keys",
  () => {
    const packageJson = {
      name: "react-app",
    };
    assertEquals(buildReadmeFromPkgJson(packageJson), "### Project name");
  }
);
