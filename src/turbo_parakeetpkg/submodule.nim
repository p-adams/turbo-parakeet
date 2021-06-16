# This is just an example to get you started. Users of your hybrid library will
# import this file by writing ``import turbo_parakeetpkg/submodule``. Feel free to rename or
# remove this file altogether. You may create additional modules alongside
# this file as required.

# run: nimble run -- scan dir="./"
import os
import json

proc buildReadMe(packageJsonObj: JsonNode): string =
    let projectName = packageJsonObj["name"].getStr()
    result = projectName




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
            createDir(".turbo_parakeet")
            setCurrentDir(".turbo_parakeet")
            let readMe = buildReadMe(parsedPackageJson)
            writeFile("README.md", readMe)
            result = "View .turbo_parakeet directory in project root to view output."
            return result
