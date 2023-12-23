let getEventTargetValue = %raw(`
function(event) {
    return event.target.value
}
`)

let getShowPublishAppModalEventName = () => "ShowPublishAppModalEventName"

let getPublishAppEventName = () => "PublishAppEventName"

let getRunEventName = () => "RunEventName"

let getShowUIControlsEventName = () => "ShowUIControlsEventName"

let getSelectUIControlEventName = () => "SelectUIControlEventName"

let getSelectTreeNodeEventName = () => "SelectTreeNodeEventName"
