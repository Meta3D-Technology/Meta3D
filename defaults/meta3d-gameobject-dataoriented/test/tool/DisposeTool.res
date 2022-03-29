let deferDisposeGameObject = (
  ~contribute: Meta3dEngineCoreProtocol.GameObjectContributeType.gameObjectContribute<
    StateType.state,
  >,
  ~gameObjectState,
  ~gameObject,
  ~transformState=Obj.magic(1),
  ~pbrMaterialState=Obj.magic(1),
  ~geometryState=Obj.magic(1),
  ~transformFuncs=((. componentState, _) => Obj.magic(1), (. componentState, _) => componentState),
  ~pbrMaterialFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => componentState,
  ),
  ~geometryFuncs=((. componentState, _) => Obj.magic(1), (. componentState, _) => componentState),
  (),
) => {
  contribute.deferDisposeGameObjectFunc(.
    (
      gameObjectState,
      transformState->Obj.magic,
      pbrMaterialState->Obj.magic,
      geometryState->Obj.magic,
    ),
    (transformFuncs, pbrMaterialFuncs, geometryFuncs),
    gameObject,
  )
}

let disposeGameObjects = (
  ~contribute: Meta3dEngineCoreProtocol.GameObjectContributeType.gameObjectContribute<
    Meta3dGameobjectDataoriented.StateType.state,
  >,
  ~gameObjectState,
  ~gameObjects,
  ~transformState=Obj.magic(1),
  ~pbrMaterialState=Obj.magic(1),
  ~geometryState=Obj.magic(1),
  ~transformFuncs=((. componentState, _) => Obj.magic(1), (. componentState, _) => componentState),
  ~pbrMaterialFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => componentState,
  ),
  ~geometryFuncs=((. componentState, _) => Obj.magic(1), (. componentState, _) => componentState),
  (),
) => {
  contribute.disposeGameObjectsFunc(.
    (
      gameObjectState,
      transformState->Obj.magic,
      pbrMaterialState->Obj.magic,
      geometryState->Obj.magic,
    ),
    (transformFuncs, pbrMaterialFuncs, geometryFuncs),
    gameObjects,
  )
}
