let deferDisposeGameObject = (
  ~contribute: Meta3dEngineCoreProtocol.GameObjectContributeType.gameObjectContribute<
    Meta3dGameobjectDataoriented.StateType.state,
    Meta3dComponentTransformProtocol.Index.state,
    Meta3dComponentPbrmaterialProtocol.Index.state,
    Meta3dGameobjectDataoriented.StateType.config,
    Meta3dGameobjectDataoriented.StateType.gameObject,
    Meta3dComponentTransformProtocol.Index.transform,
  >,
  ~state,
  ~gameObject,
  ~transformState=Obj.magic(1),
  ~pbrMaterialState=Obj.magic(1),
  ~transformFuncs=Obj.magic(1),
  ~pbrMaterialFuncs=Obj.magic(1),
  (),
) => {
  contribute.deferDisposeGameObjectFunc(.
    (state, transformState->Obj.magic, pbrMaterialState->Obj.magic),
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
  ~state,
  ~gameObjects,
  ~transformState=Obj.magic(1),
  ~pbrMaterialState=Obj.magic(1),
  ~transformFuncs=Obj.magic(1),
  ~pbrMaterialFuncs=Obj.magic(1),
  (),
) => {
  contribute.disposeGameObjectsFunc(.
    (state, transformState->Obj.magic, pbrMaterialState->Obj.magic),
    (transformFuncs, pbrMaterialFuncs),
    gameObjects,
  )
}
