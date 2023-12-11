type source = string

type moduleKind = int

type compilerOptions = {@as("module") module_: moduleKind}

type transpileOptions = {compilerOptions: compilerOptions}

type transpileOutput = {outputText: string}

@module("typescript")
external transpileModule: (. source, transpileOptions) => transpileOutput = "transpileModule"
