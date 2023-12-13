type path = string

type source = string

// type moduleKind =
//   | @as(0) None
//   | @as(1) CommonJS
//   | @as(2) AMD
//   | @as(3) UMD
//   | @as(4) System
//   | @as(5) ES2015
//   | @as(6) ES2020
//   | @as(7) ES2022
//   | @as(99) ESNext
//   | @as(100) Node16
//   | @as(199) NodeNext
type moduleKind = int

// type syntaxKind = | @as(269) ImportDeclaration
type syntaxKind = int

type compilerOptions = {
  target: int,
  @as("module") module_: moduleKind,
  pretty: bool,
}

type transpileOptions = {compilerOptions: compilerOptions}

type transpileOutput = {outputText: string}

type node = {kind: syntaxKind}

type sourceFile = {
  forEachChild: (. node => unit) => unit,
  // getChildren: (. unit) => array<node>,
}

@module("typescript")
external transpileModule: (. source, transpileOptions) => transpileOutput = "transpileModule"

@module("typescript")
external createSourceFile: (. path, source, ScriptTargetType.scriptTarget) => sourceFile =
  "createSourceFile"
