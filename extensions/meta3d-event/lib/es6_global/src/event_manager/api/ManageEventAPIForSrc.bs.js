

import * as ContainerManager$Meta3dEvent from "../data/ContainerManager.bs.js";
import * as ManageEventDoService$Meta3dEvent from "../service/event/ManageEventDoService.bs.js";

function onCustomGlobalEvent(eventExtensionProtocolName, param) {
  var handleFunc = param[2];
  ContainerManager$Meta3dEvent.setState(ManageEventDoService$Meta3dEvent.onCustomGlobalEvent(param[0], (function (customEvent, state) {
              handleFunc(customEvent);
              return [
                      state,
                      customEvent
                    ];
            }), ContainerManager$Meta3dEvent.getState(eventExtensionProtocolName), param[1], undefined), eventExtensionProtocolName);
}

export {
  onCustomGlobalEvent ,
}
/* No side effect */
