# This is just an example to get you started. Users of your hybrid library will
# import this file by writing ``import turbo_parakeetpkg/submodule``. Feel free to rename or
# remove this file altogether. You may create additional modules alongside
# this file as required.

# run: nimble run -- scan dir="./"
import os
proc getWelcomeMessage*(): string = 
    #echo commandLineParams()
    # hardcode single project path for dev
    setCurrentDir("../../temp/react-app")
    let rootDir = getCurrentDir()
    for kind, path in walkDir(rootDir):
        let pathSplit = splitPath(path)
        if pathSplit.tail == "package.json":
            echo "JS project"
            return
    result = "Hello, World!"
