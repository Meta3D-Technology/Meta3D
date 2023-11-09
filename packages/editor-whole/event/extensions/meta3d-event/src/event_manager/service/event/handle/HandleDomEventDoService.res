let preventDefault: Meta3dEventProtocol.EventType.domEvent => unit = %raw(`
  function(event){
    if (event.cancelable) {
      if (!event.defaultPrevented) {
          event.preventDefault();
      }
  }

  event.stopPropagation();
  }
  `)
