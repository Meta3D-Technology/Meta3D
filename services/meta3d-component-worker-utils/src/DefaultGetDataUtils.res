let createComponentFunc = (. state) => (state, -1->Obj.magic)

let addComponentFunc = (. state, _, _) => state

let removeComponentFunc = (. state, _, _) => state

let hasComponentFunc = (. state, _) => false

let getComponentFunc = (. state, _) => -1->Obj.magic

let getGameObjectsFunc = (. state, _) => []

let setComponentDataFunc = (. state, _, _, _) => state

let getAllComponentsFunc = (. state) => []

let getNeedDisposedComponentsFunc = (. state) => []

let deferDisposeComponentFunc = (. state, _) => state

let disposeComponentsFunc = (. state, _) => state

let cloneComponentFunc = (. state, _, _, _) => ( state, [] )