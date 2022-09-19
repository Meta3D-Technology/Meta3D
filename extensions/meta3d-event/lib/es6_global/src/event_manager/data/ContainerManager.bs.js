


var createState = (function(createStateFunc, eventExtensionName){
window[eventExtensionName + "_eventManagerState"] = createStateFunc()
            });

var getState = (function(eventExtensionName){
return window[eventExtensionName + "_eventManagerState"]
            });

var setState = (function(state, eventExtensionName){
window[eventExtensionName + "_eventManagerState"] = state
            });

export {
  createState ,
  getState ,
  setState ,
  
}
/* No side effect */
