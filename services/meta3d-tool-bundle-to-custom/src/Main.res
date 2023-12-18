let _error = msg => {
  Meta3dCommonlib.Exception.throwErr(
    Meta3dCommonlib.Exception.buildErr(
      Meta3dCommonlib.Log.buildErrorMessage(
        ~title=msg,
        ~description={
          j``
        },
        ~reason="",
        ~solution=j``,
        ~params=j``,
      ),
    ),
  )
}

let _isFile = (path: string) => Fs.existsSync(. path) && Fs.statSync(. path).isFile(.)

// let _addExtname = (path: string, extname) => {
//   path->Js.String.endsWith(extname, _) ? path : path ++ extname
// }

let _isDir = (path: string) => Fs.existsSync(. path) && Fs.statSync(. path).isDirectory(.)

let _getLocalModulePath = (~path, ~from=None, ()) => {
  let absPath = switch from {
  | None => Path.resolve1(path)
  | Some(from) => Path.resolve2(Path.dirname(from), path)
  }
  let tsPath = absPath->Js.String.endsWith(".ts", _) ? absPath : absPath ++ ".ts"
  // let filePath = absPath
  let indexPath = Path.resolve2(absPath, "index.ts")

  _isFile(tsPath)
    ? tsPath
    : _isDir(absPath) && _isFile(indexPath)
    ? indexPath
    : _error({j`Cannot find module '${path}'.`})

  // _isFile(_addExtname(filePath, ".ts"))
  //   ? _addExtname(filePath, ".ts")
  //   : _isFile(_addExtname(filePath, ".js"))
  //   ? _addExtname(filePath, ".js")
  //   : _isFile(_addExtname(filePath, ".html"))
  //   ? _addExtname(filePath, ".html")
  //   : _isDir(absPath) && _isFile(indexPath)
  //   ? indexPath
  //   : _error({j`Cannot find module '${path}'.`})
}

let getLocalModulePath = (path, from) => {
  _getLocalModulePath(~path, ~from=from->Meta3dCommonlib.OptionSt.fromNullable, ())
}

let _isRootPath = (path: string) => {
  path == "/"
}

let _getNpmModulePath = (pkg: string, from: string): string => {
  let rec _find = projRoot => {
    let projRoot = ref(projRoot)
    while (
      !_isRootPath(projRoot.contents) && !_isDir(Path.resolve2(projRoot.contents, "node_modules"))
    ) {
      projRoot := Path.dirname(projRoot.contents)
    }

    _isRootPath(projRoot.contents) ? _error(`Cannot find module '${pkg}'.`) : ()

    let path = Path.resolve3(projRoot.contents, "node_modules", pkg)

    let tsPath = path ++ ".ts"

    _isFile(tsPath)
      ? tsPath
      : {
          let packageJSONPath = Path.resolve2(path, "package.json")
          _isFile(packageJSONPath)
            ? {
                let packageJSON =
                  Fs.readFileSync(. packageJSONPath, "utf-8")->Js.Json.parseExn->Obj.magic

                !(packageJSON["main"]->Meta3dCommonlib.NullableSt.isNullable)
                  ? {
                      Path.resolve2(path, packageJSON["main"]->Meta3dCommonlib.NullableSt.getExn)
                    }
                  : _find(Path.dirname(projRoot.contents))
              }
            : _find(Path.dirname(projRoot.contents))
        }
  }

  _find(Path.dirname(from))
}

let _isImportInTranspiledText = (moduleSpecifierText, transpiledText) => {
  transpiledText->Js.String.includes(moduleSpecifierText, _)
}

let _getImportVariableRenameMap = importDecl => {
  importDecl["importClause"]["namedBindings"]["elements"]->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. map, element) => {
      element["propertyName"]->Meta3dCommonlib.NullableSt.isNullable
        ? map
        : map->Meta3dCommonlib.ImmutableHashMap.set(
            (element["propertyName"]->Meta3dCommonlib.NullableSt.getExn)["escapedText"],
            element["name"]["escapedText"],
          )
    },
    Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  )
}

let _renameImportVariables = (depTranspiledText, importVariableRenameMap) => {
  importVariableRenameMap
  ->Meta3dCommonlib.ImmutableHashMap.entries
  ->Meta3dCommonlib.ArraySt.reduceOneParam((. text, (sourceName, targetName)) => {
    text
    ->Js.String.replace({j`export var ${sourceName} =`}, {j`export var ${targetName} =`}, _)
    ->Js.String.replace({j`export const ${sourceName} =`}, {j`export const ${targetName} =`}, _)
    ->Js.String.replace({j`export let ${sourceName} =`}, {j`export let ${targetName} =`}, _)
    ->Js.String.replace({j`export function ${sourceName}(`}, {j`export function ${targetName}(`}, _)
  }, depTranspiledText)
}

let _removeExportKeyword = depTranspiledText => {
  depTranspiledText->Js.String.replaceByRe(%re("/export\s*/g"), "", _)
}

let _replaceImportClause = (result, transpiledText, pos, end, depTranspiledText, lastEnd) => {
  (result ++ transpiledText->Js.String.slice(~from=lastEnd, ~to_=pos, _) ++ depTranspiledText, end)
}

let bundle = (filePath: string, fileSource: string) => {
  let rec _func = (filePath, fileSource) => {
    let outputText = Typescript.transpileModule(.
      fileSource,
      {
        compilerOptions: {
          // module_: Typescript.ES2015,
          target: 2,
          module_: 5,
          // noImplicitUseStrict: true,
          pretty: true,
        },
      },
    ).outputText

    let source = Typescript.createSourceFile(. filePath, outputText, 2)

    let data = []

    source.forEachChild(.(node: Typescript.node) => {
      switch node.kind {
      | 269 =>
        let importDecl = node->Obj.magic
        let moduleSpecifierText =
          importDecl["moduleSpecifier"]["getText"](. source)->Js.Json.parseExn->Obj.magic

        let depPath =
          moduleSpecifierText->Js.String.startsWith(".", _)
            ? _getLocalModulePath(~path=moduleSpecifierText, ~from=filePath->Some, ())
            : _getNpmModulePath(moduleSpecifierText, filePath)

        // Js.log(("depPath: ", depPath))

        let depTranspiledText =
          _func(depPath, Fs.readFileSync(. depPath, "utf-8"))
          // ->Meta3dCommonlib.Log.printForDebug
          ->_renameImportVariables(_getImportVariableRenameMap(importDecl))
          // ->Meta3dCommonlib.Log.printForDebug
          ->_removeExportKeyword

        data
        ->Meta3dCommonlib.ArraySt.push((importDecl["pos"], importDecl["end"], depTranspiledText))
        ->ignore

        ()

      | _ => ()
      }
    })

    // TODO handle more: e.g. rename duplicate private function name between depTranspiledText and result
    let (result, lastEnd) =
      data->Meta3dCommonlib.ArraySt.reduceOneParam(
        (. (result, lastEnd), (pos, end, depTranspiledText)) => {
          result->_replaceImportClause(outputText, pos, end, depTranspiledText, lastEnd)
        },
        ("", 0),
      )

    result ++ outputText->Js.String.slice(~from=lastEnd, ~to_=outputText->Js.String.length, _)
  }

  _func(filePath, fileSource)
}
