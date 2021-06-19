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

function main() {}