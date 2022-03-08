let batchGetComponent = (
  gameObjects,
  gameObjectComponentMap: Meta3dCommonlibType.MutableSparseMapType.t<
    Meta3dEngineCoreProtocol.GameObjectContributeType.gameObject,
    Meta3dComponentTransformProtocol.Index.transform,
  >,
) => gameObjects->Meta3dCommonlib.ArraySt.reduceOneParam((. arr, gameObject) => {
    switch gameObjectComponentMap->Meta3dCommonlib.MutableSparseMap.get(gameObject) {
    | None => arr
    | Some(component) => arr->Meta3dCommonlib.ArraySt.push(component)
    }
  }, [])
