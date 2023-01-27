let setCanvas = canvas => {
  ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName())->CanvasDoService.setCanvas(canvas)->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())
}
