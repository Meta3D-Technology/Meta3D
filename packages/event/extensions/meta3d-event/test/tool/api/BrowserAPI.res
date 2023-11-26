let setBrowser = browser => {
  ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName())->BrowserDoService.setBrowser(browser)->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())
}
