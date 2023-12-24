let getEventTargetValue = %raw(`
function(event) {
    return event.target.value
}
`)

let getShowPublishAppModalEventName = () => "ShowPublishAppModalEventName"

let getPublishAppEventName = () => "PublishAppEventName"

let getRunEventName = () => "RunEventName"

let getAddUIControlsEventName = () => "ShowUIControlsEventName"

let getSelectUIControlEventName = () => "SelectUIControlEventName"

let getSelectTreeNodeEventName = () => "SelectTreeNodeEventName"

let getExpandInputCollapseEventName = () => "ExpandInputCollapseEventName"

let getSelectInputInUIControlInspectorEventName = () => "SelectInputInUIControlInspectorEventName"

let getAddInputEventName = () => "AddInputEventName"

let getSelectInputInInputsEventName = () => "SelectInputInInputsEventName"

let getExpandActionCollapseEventName = () => "ExpandActionCollapseEventName"

let getSelectActionInUIControlInspectorEventName = () => "SelectActionInUIControlInspectorEventName"

let getAddActionEventName = () => "AddActionEventName"

let getSelectActionInActionsEventName = () => "SelectActionInActionsEventName"
