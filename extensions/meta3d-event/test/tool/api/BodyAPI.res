let getBodyExn = () => {
  ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName())->BodyDoService.getBodyExn
}

let setBody = body => {
  ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName())->BodyDoService.setBody(body)->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())
}
