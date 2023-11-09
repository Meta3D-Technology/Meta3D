let initEvent = () => {
  ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName())
  ->InitEventDoService.initEvent(EventExtensionTool.buildEventExtentsionProtocolName())
  ->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())
}
