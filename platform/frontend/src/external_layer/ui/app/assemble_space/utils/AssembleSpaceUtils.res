let resetWhenLeave = dispatchForElementAssembleStore => {
  dispatchForElementAssembleStore(
    ElementAssembleStoreType.SetCanvasData(({width: 0, height: 0}: Meta3dType.Index.canvasData)),
  )
}
