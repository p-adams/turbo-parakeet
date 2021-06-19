import * as semver from "https://deno.land/x/semver/mod.ts";
/* 
proc buildReadMe(packageJsonObj: JsonNode): string =
    let name = packageJsonObj["name"].getStr()
    let version = packageJsonObj["version"].getStr()
    let readMe = &"""
    ## Project
        {name}
    ### Version
        {version}
    """
    result = readMe.unindent




proc scanProject*(): string = 
    #echo commandLineParams()
    # hardcode single project path for dev
    setCurrentDir("../../temp/react-app")
    let rootDir = getCurrentDir()
    if fileExists("package.json") == false:
        result = "package.json not found"
        return
    for kind, path in walkDir(rootDir):
        let pathSplit = splitPath(path)
        if pathSplit.tail == "package.json":
            let parsedPackageJson = parseFile(pathSplit.tail)
            let readMe = buildReadMe(parsedPackageJson)
            createDir(".turbo_parakeet")
            setCurrentDir(".turbo_parakeet")
            writeFile("README.md", readMe)
            result = "View .turbo_parakeet directory in project root to view output."
            return result


*/

export interface PackageJsonData {
  name: string;
  version: string;
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
export function buildReadmeFromPkgJson(_packageJson: PackageJsonData) {
  return "### Project name";
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
  }
}
main();
