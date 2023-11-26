// let _getStateKey = (eventExtensionProtocolName) => {
//     {j`${eventExtensionProtocolName}_eventManagerState`}
// }

let createState = %raw(`
  function(createStateFunc, eventExtensionProtocolName){
window[eventExtensionProtocolName + "_eventManagerState"] = createStateFunc()
            }
`)

let getState: string => EventManagerStateType.state = %raw(`
  function(eventExtensionProtocolName){
return window[eventExtensionProtocolName + "_eventManagerState"]
            }
`)

let setState: (EventManagerStateType.state, string) => unit = %raw(`
  function(state, eventExtensionProtocolName){
window[eventExtensionProtocolName + "_eventManagerState"] = state
            }
`)

// let getState = () => Container.poContainer.state

// let setState = state => Container.poContainer.state = state
