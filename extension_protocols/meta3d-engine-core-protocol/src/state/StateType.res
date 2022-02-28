type registeredWorkPluginContribute = (
  WorkPluginContributeType.workPluginContribute<RegisterWorkPluginType.state, RegisterWorkPluginType.states>,
  RegisterWorkPluginType.jobOrders,
)

type pluginData = {isDebug: bool}

type state = {
  allRegisteredWorkPluginContribute: list<registeredWorkPluginContribute>,
  states: RegisterWorkPluginType.states,
  pluginData: pluginData,
  componentContributeData: RegisterComponentType.componentContributeData,
  gameObjectContribute: option<GameObjectType.gameObjectContribute>,
  mutable usedGameObjectData: option<GameObjectType.usedGameObjectData>,
}
