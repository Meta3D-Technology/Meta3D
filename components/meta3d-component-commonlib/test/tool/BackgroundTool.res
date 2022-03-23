let prepare = (given, \"and", componentName, registerdComponentName, getContributeFunc, config) => {
  open Meta3dEngineCore

  given("prepare register", () => {
    CreateState.createState()->StateContainer.setState
  })

  \"and"({j`register ${componentName} contribute`}, () => {
    StateContainer.unsafeGetState()
    ->DirectorForJs.registerComponent(getContributeFunc()->Obj.magic)
    ->StateContainer.setState
  })

  \"and"("create and set all component states", () => {
    StateContainer.unsafeGetState()
    ->DirectorForJs.createAndSetComponentState(registerdComponentName, config->Obj.magic)
    ->StateContainer.setState
  })
}
