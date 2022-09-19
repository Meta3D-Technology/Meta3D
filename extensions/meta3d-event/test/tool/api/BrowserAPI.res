let setBrowser = browser => {
  ContainerManager.getState(EventExtensionTool.buildEventExtentsionName())->BrowserDoService.setBrowser(browser)->ContainerManager.setState(EventExtensionTool.buildEventExtentsionName())
}
