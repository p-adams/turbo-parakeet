# This is just an example to get you started. Users of your hybrid library will
# import this file by writing ``import turbo_parakeetpkg/submodule``. Feel free to rename or
# remove this file altogether. You may create additional modules alongside
# this file as required.

# run: nimble run -- scan dir="./"
import os
import json
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
            let packageJson = readFile(pathSplit.tail)
            let parsedPackageJson = parseJson(packageJson)
            createDir(".turbo_parakeet")
            setCurrentDir(".turbo_parakeet")
            let projectName = parsedPackageJson["name"].getStr()
            writeFile("output.md", projectName)
            result = "View .turbo_parakeet directory in project root to view output."
            return result
