open Meta3dEngineCore

let unsafeGetUsedComponentContribute = componentName => {
  StateContainer.unsafeGetState()
  ->DirectorForJs.unsafeGetUsedComponentContribute(componentName)
  ->Obj.magic
}

let createComponent = contribute => {
  contribute->DirectorForJs.createComponent->Obj.magic
}

let getComponentData = (contribute, component, dataName) => {
  contribute->DirectorForJs.getComponentData(component, dataName)
}

let setComponentData = (contribute, component, dataName, dataValue) => {
  contribute->DirectorForJs.setComponentData(component, dataName, dataValue)
}

let getExtensionService = () => {
  (Main.getExtensionService->Obj.magic)(Obj.magic(1))
}

let addComponent = (contribute, gameObject, component) => {
  contribute->DirectorForJs.addComponent(gameObject, component)
}
