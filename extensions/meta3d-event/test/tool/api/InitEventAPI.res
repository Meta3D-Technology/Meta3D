let initEvent = () => {
  ContainerManager.getState(EventExtensionTool.buildEventExtentsionName())
  ->InitEventDoService.initEvent(EventExtensionTool.buildEventExtentsionName())
  ->ContainerManager.setState(EventExtensionTool.buildEventExtentsionName())
}
