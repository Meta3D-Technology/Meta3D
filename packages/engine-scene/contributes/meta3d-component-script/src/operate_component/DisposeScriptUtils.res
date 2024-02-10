open StateType

let deferDisposeComponent = (
  {gameObjectScriptMap, needDisposedScripts} as state,
  (script, gameObject),
) => {
  {
    ...state,
    gameObjectScriptMap: gameObjectScriptMap->Meta3dCommonlib.MutableSparseMap.remove(gameObject),
    needDisposedScripts: needDisposedScripts->Meta3dCommonlib.ArraySt.push(script),
  }
}

let _disposeSparseMapData = (map, script) => map->Meta3dCommonlib.MutableSparseMap.remove(script)

let _disposeData = ({gameObjectMap, attributeMap, allAssetDataMap, names} as state, script) => {
  {
    ...state,
    attributeMap: attributeMap->_disposeSparseMapData(script),
    allAssetDataMap: allAssetDataMap->_disposeSparseMapData(script),
    gameObjectMap: gameObjectMap->_disposeSparseMapData(script),
    names: names->Meta3dCommonlib.ImmutableSparseMap.remove(script),
  }
}

let disposeComponents = ({gameObjectScriptMap, disposedScripts} as state, scripts) => {
  let needDisposedComponents = GetNeedDisposedScriptsUtils.get(state)

  Meta3dCommonlib.DisposeUtils.checkShouldNeedDisposed(
    ConfigUtils.getIsDebug(state),
    "script",
    scripts,
    needDisposedComponents,
  )

  let state = {
    ...state,
    disposedScripts: disposedScripts->Js.Array.concat(scripts, _),
    needDisposedScripts: needDisposedComponents->Meta3dCommonlib.DisposeComponentUtils.batchRemoveFromArray(
      scripts,
    ),
  }

  (
    scripts->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. state, script) => state->_disposeData(script),
      state,
    ),
    scripts,
  )
}
