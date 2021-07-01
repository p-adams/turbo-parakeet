import * as semver from "https://deno.land/x/semver/mod.ts";

export interface PackageJsonData {
  name: string;
  version: string;
  description?: string;
  main?: string;
  scripts?: {
    test?: string;
  };
  repository?: {
    type?: string;
    url?: string;
  };
  keywords?: string[];
  author?: string;
  license?: string;
  bugs?: {
    url?: string;
  };
  homepage?: string;
}
/*
A package.json file must contain "name" and "version" fields.

The "name" field contains your package's name, and must be lowercase and one word, and may contain hyphens and underscores.

The "version" field must be in the form x.x.x and follow the semantic versioning guidelines.

 */

export function isValidPackageJson(packageJson: PackageJsonData) {
  const containsAllowedChars = /^[a-z_-]+$/g;
  const hasValidName = containsAllowedChars.test(packageJson.name);
  const hasValidVersion = semver.valid(packageJson.version);
  return hasValidName && !!hasValidVersion;
}
export function buildReadmeFromPkgJson(packageJson: PackageJsonData) {
  let supportedScripts = "";
  for (const script in packageJson.scripts) {
    supportedScripts += ` \`\`\`\n npm run ${script}\n\`\`\`\n`;
  }
  return `
  # ${packageJson.name}
  ## Get started
  ${supportedScripts}
  `;
}

async function main() {
  // hardcode single project path for dev
  // TODO: get project path from Deno.args
  Deno.chdir("../../temp/react-app");
  const decoder = new TextDecoder("utf-8");
  const result = await Deno.readFile("package.json").catch((err) => {
    console.error(err.message);
  });
  if (!result) {
    return;
  } else {
    const pkgJson = JSON.parse(decoder.decode(result));
    if (!isValidPackageJson(pkgJson)) {
      console.error("invalid package.json");
      return;
    }

    // write README.md to generated output dir
    Deno.mkdir(".turbo_parakeet")
      .then(() => {
        Deno.chdir(".turbo_parakeet");
        Deno.writeTextFile("./README.md", buildReadmeFromPkgJson(pkgJson))
          .then(() => {
            console.log(
              "View .turbo_parakeet directory in project root to view output."
            );
          })
          .catch((error) => {
            console.error(error.message);
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
main();
