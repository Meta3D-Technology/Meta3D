let registerComponent = getContributeFunc => {
  open Meta3dEngineCore

  StateContainer.unsafeGetState()
  ->DirectorForJs.registerComponent(
    getContributeFunc->Obj.magic(Obj.magic(1), Obj.magic(1))->Obj.magic,
  )
  ->StateContainer.setState
}
