let setCanvas = canvas => {
  ContainerManager.getState(EventExtensionTool.buildEventExtentsionName())->CanvasDoService.setCanvas(canvas)->ContainerManager.setState(EventExtensionTool.buildEventExtentsionName())
}
