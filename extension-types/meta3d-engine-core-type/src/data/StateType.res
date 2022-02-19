type registeredWorkPluginData = (
  IWorkForJs.registeredWorkPlugin<RegisterWorkPluginType.state, RegisterWorkPluginType.states>,
  RegisterWorkPluginType.jobOrders,
)

type pluginData = {isDebug: bool}

type state = {
  allRegisteredWorkPluginData: list<registeredWorkPluginData>,
  states: RegisterWorkPluginType.states,
  pluginData: pluginData,
  componentData: RegisterComponentType.componentData,
  gameObjectData: option<GameObjectType.gameObjectData>,
  mutable usedGameObjectData: option<GameObjectType.usedGameObjectData>,
}
