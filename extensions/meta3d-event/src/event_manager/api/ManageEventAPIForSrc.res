let onCustomGlobalEvent = (eventExtensionProtocolName, (eventName, priority, handleFunc)) =>
  // ManageEventDoService.onCustomGlobalEvent(
  //   ~eventName,
  //   ~handleFunc,
  //   ~state=ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName()),
  //   ~priority,
  //   (),
  // )->ignore
  // )->ContainerManager.setState(EventExtensionTool.buildEventExtentsionProtocolName())
  ManageEventDoService.onCustomGlobalEvent(
    ~eventName,
    ~handleFunc=(. customEvent, state) => {
      handleFunc(. customEvent)

      (state, customEvent)
    },
    ~state=ContainerManager.getState(eventExtensionProtocolName),
    ~priority,
    (),
  )->ContainerManager.setState(eventExtensionProtocolName)
