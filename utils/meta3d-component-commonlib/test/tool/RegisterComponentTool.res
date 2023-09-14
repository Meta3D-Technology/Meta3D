let registerComponent = getContributeFunc => {
  open Meta3dEngineCoreSceneview

  StateContainer.unsafeGetState()
  ->DirectorForJs.registerComponent(getContributeFunc->Obj.magic(Obj.magic(1))->Obj.magic)
  ->StateContainer.setState
}
