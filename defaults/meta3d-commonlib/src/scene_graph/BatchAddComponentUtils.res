let _checkBatchAdd = (isDebug, gameObjects, components) => {
  Contract.requireCheck(() => {
    open Contract
    open Operators

        let gameObjectCount = gameObjects->Js.Array.length
        let componentCount = components->Js.Array.length

    test(
      Log.buildAssertMessage(
        ~expect=j`one gameObject should add one component`,
        ~actual=j`$gameObjectCount gameObject add $componentCount components`,
      ),
      () => {
        gameObjectCount == componentCount
      },
    )
  }, isDebug)
}

let batchAdd = (componentState, addComponentFunc, isDebug, gameObjects, components) => {
  _checkBatchAdd(isDebug, gameObjects, components)

  gameObjects->ArraySt.reduceOneParami((. componentState, gameObject, index) => {
    addComponentFunc(. componentState, gameObject, Array.unsafe_get(components, index))
  }, componentState)
}