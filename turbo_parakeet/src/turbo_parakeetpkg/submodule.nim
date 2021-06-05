# This is just an example to get you started. Users of your hybrid library will
# import this file by writing ``import turbo_parakeetpkg/submodule``. Feel free to rename or
# remove this file altogether. You may create additional modules alongside
# this file as required.

# run: nimble run -- scan dir="./"
import os
proc getWelcomeMessage*(): string = 
    echo commandLineParams()
    result = "Hello, World!"
