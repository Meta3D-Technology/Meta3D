let _getGameObjects = (gameObjectsMap, component) =>
  MutableSparseMap.get(gameObjectsMap, component)

let isComponentHasGameObject = (gameObjectsMap, component, gameObjectArr) => {
  switch _getGameObjects(gameObjectsMap, component) {
  | Some(arr) if arr->Js.Array.length > 0 => true
  | _ => false
  }
}

let removeDisposedComponentsFromNeedDisposedComponents = (
  needDisposedComponents,
  disposedComponents,
) => {
  disposedComponents->ArraySt.reduceOneParam(
    (. needDisposedComponents, component) => {
      needDisposedComponents->MutableSparseMap.remove(component)
    },
    needDisposedComponents,
  )
}
