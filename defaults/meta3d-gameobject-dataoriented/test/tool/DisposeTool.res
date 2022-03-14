let deferDisposeGameObject = (
  ~contribute: Meta3dEngineCoreProtocol.GameObjectContributeType.gameObjectContribute<
    StateType.state,
    Meta3dComponentTransformProtocol.Index.state,
    Meta3dComponentPbrmaterialProtocol.Index.state,
    StateType.config,
    StateType.gameObject,
    Meta3dComponentTransformProtocol.Index.transform,
  >,
  ~gameObjectState,
  ~gameObject,
  ~transformState=Obj.magic(1),
  ~pbrMaterialState=Obj.magic(1),
  ~transformFuncs=((. componentState, _) => Obj.magic(1), (. componentState, _) => componentState),
  ~pbrMaterialFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => componentState,
  ),
  (),
) => {
  contribute.deferDisposeGameObjectFunc(.
    (gameObjectState, transformState->Obj.magic, pbrMaterialState->Obj.magic),
    (transformFuncs, pbrMaterialFuncs),
    gameObject,
  )
}

let disposeGameObjects = (
  ~contribute: Meta3dEngineCoreProtocol.GameObjectContributeType.gameObjectContribute<
    Meta3dGameobjectDataoriented.StateType.state,
    Meta3dComponentTransformProtocol.Index.state,
    Meta3dComponentPbrmaterialProtocol.Index.state,
    Meta3dGameobjectDataoriented.StateType.config,
    Meta3dGameobjectDataoriented.StateType.gameObject,
    Meta3dComponentTransformProtocol.Index.transform,
  >,
  ~gameObjectState,
  ~gameObjects,
  ~transformState=Obj.magic(1),
  ~pbrMaterialState=Obj.magic(1),
  ~transformFuncs=((. componentState, _) => Obj.magic(1), (. componentState, _) => componentState),
  ~pbrMaterialFuncs=(
    (. componentState, _) => Obj.magic(1),
    (. componentState, _) => componentState,
  ),
  (),
) => {
  contribute.disposeGameObjectsFunc(.
    (gameObjectState, transformState->Obj.magic, pbrMaterialState->Obj.magic),
    (transformFuncs, pbrMaterialFuncs),
    gameObjects,
  )
}
