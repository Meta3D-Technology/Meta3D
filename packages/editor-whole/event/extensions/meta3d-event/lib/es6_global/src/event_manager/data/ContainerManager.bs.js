


var createState = (function(createStateFunc, eventExtensionProtocolName){
window[eventExtensionProtocolName + "_eventManagerState"] = createStateFunc()
            });

var getState = (function(eventExtensionProtocolName){
return window[eventExtensionProtocolName + "_eventManagerState"]
            });

var setState = (function(state, eventExtensionProtocolName){
window[eventExtensionProtocolName + "_eventManagerState"] = state
            });

export {
  createState ,
  getState ,
  setState ,
}
/* No side effect */
