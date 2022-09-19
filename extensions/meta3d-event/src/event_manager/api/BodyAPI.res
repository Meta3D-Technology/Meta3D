let getBodyExn = () => {
  ContainerManager.getState()->BodyDoService.getBodyExn
}

let setBody = body => {
  ContainerManager.getState()->BodyDoService.setBody(body)->ContainerManager.setState
}
