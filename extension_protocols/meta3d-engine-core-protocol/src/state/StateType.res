type registeredWorkPluginContribute = (
  IWorkForJs.workPluginContribute<RegisterWorkPluginType.state, RegisterWorkPluginType.states>,
  RegisterWorkPluginType.jobOrders,
)

type pluginData = {isDebug: bool}

type state = {
  allRegisteredWorkPluginContribute: list<registeredWorkPluginContribute>,
  states: RegisterWorkPluginType.states,
  pluginData: pluginData,
  componentData: RegisterComponentType.componentData,
  gameObjectContribute: option<GameObjectType.gameObjectContribute>,
  mutable usedGameObjectData: option<GameObjectType.usedGameObjectData>,
}
