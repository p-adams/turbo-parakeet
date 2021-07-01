import * as semver from "https://deno.land/x/semver/mod.ts";
import { exists, ensureFile } from "https://deno.land/std@0.100.0/fs/mod.ts";
type DependencyManagement = "npm" | "yarn";

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

export async function getDependencyManagementType(): Promise<DependencyManagement> {
  const isNpm = await exists("package-lock.json");
  const isYarn = await exists("yarn.lock");
  if (isNpm) {
    return "npm";
  } else if (isYarn) {
    return "yarn";
  } else {
    throw new Error("no depencency management found");
  }
}

export function isValidPackageJson(packageJson: PackageJsonData) {
  const containsAllowedChars = /^[a-z_-]+$/g;
  const hasValidName = containsAllowedChars.test(packageJson.name);
  const hasValidVersion = semver.valid(packageJson.version);
  return hasValidName && !!hasValidVersion;
}
export function buildReadmeFromPkgJson(
  packageJson: PackageJsonData,
  dependencyManagement: DependencyManagement = "npm"
) {
  let supportedScripts = "";
  for (const script in packageJson.scripts) {
    supportedScripts += ` \`\`\`\n ${dependencyManagement} run ${script}\n\`\`\`\n`;
  }
  return `
  # ${packageJson.name}
  ${packageJson.description ? packageJson.description : ""}
  ## Get started
  \`\`\`${dependencyManagement} install\`\`\`
  ${supportedScripts}
  ${packageJson.license ? `### License\n ${packageJson.license}` : ""}
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

    const depManagement = await getDependencyManagementType();

    // write README.md to generated output dir

    Deno.mkdir(".turbo_parakeet", { recursive: true })
      .then(() => {
        Deno.chdir(".turbo_parakeet");
        Deno.writeTextFile(
          "./README.md",
          buildReadmeFromPkgJson(pkgJson, depManagement)
        )
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
