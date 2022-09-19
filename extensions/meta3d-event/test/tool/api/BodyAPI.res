let getBodyExn = () => {
  ContainerManager.getState(EventExtensionTool.buildEventExtentsionName())->BodyDoService.getBodyExn
}

let setBody = body => {
  ContainerManager.getState(EventExtensionTool.buildEventExtentsionName())->BodyDoService.setBody(body)->ContainerManager.setState(EventExtensionTool.buildEventExtentsionName())
}
