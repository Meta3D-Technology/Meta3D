// let _getStateKey = (eventExtensionName) => {
//     {j`${eventExtensionName}_eventManagerState`}
// }

let createState = %raw(`
  function(createStateFunc, eventExtensionName){
window[eventExtensionName + "_eventManagerState"] = createStateFunc()
            }
`)

let getState: string => EventManagerStateType.state = %raw(`
  function(eventExtensionName){
return window[eventExtensionName + "_eventManagerState"]
            }
`)

let setState: (EventManagerStateType.state, string) => unit = %raw(`
  function(state, eventExtensionName){
window[eventExtensionName + "_eventManagerState"] = state
            }
`)

// let getState = () => Container.poContainer.state

// let setState = state => Container.poContainer.state = state
