let prepare = (given, \"and", componentName, registerdComponentName, getContributeFunc, config) => {
  open Meta3dEngineCoreSceneview

  given("prepare register", () => {
    CreateState.createState()->StateContainer.setState
  })

  \"and"({j`register ${componentName} contribute`}, () => {
    RegisterComponentTool.registerComponent(getContributeFunc)
  })

  \"and"("create and set all component states", () => {
    StateContainer.unsafeGetState()
    ->DirectorForJs.createAndSetComponentState(registerdComponentName, config->Obj.magic)
    ->StateContainer.setState
  })
}
