


var getEventTargetValue = (function(event) {
    return event.target.value
});

function getShowPublishAppModalEventName(param) {
  return "ShowPublishAppModalEventName";
}

function getPublishAppEventName(param) {
  return "PublishAppEventName";
}

function getRunEventName(param) {
  return "RunEventName";
}

function getAddUIControlsEventName(param) {
  return "ShowUIControlsEventName";
}

function getSelectUIControlEventName(param) {
  return "SelectUIControlEventName";
}

function getSelectTreeNodeEventName(param) {
  return "SelectTreeNodeEventName";
}

function getExpandInputCollapseEventName(param) {
  return "ExpandInputCollapseEventName";
}

function getSelectInputInUIControlInspectorEventName(param) {
  return "SelectInputInUIControlInspectorEventName";
}

function getAddInputEventName(param) {
  return "AddInputEventName";
}

function getSelectInputInInputsEventName(param) {
  return "SelectInputInInputsEventName";
}

function getExpandActionCollapseEventName(param) {
  return "ExpandActionCollapseEventName";
}

function getSelectActionInUIControlInspectorEventName(param) {
  return "SelectActionInUIControlInspectorEventName";
}

function getAddActionEventName(param) {
  return "AddActionEventName";
}

function getSelectActionInActionsEventName(param) {
  return "SelectActionInActionsEventName";
}

export {
  getEventTargetValue ,
  getShowPublishAppModalEventName ,
  getPublishAppEventName ,
  getRunEventName ,
  getAddUIControlsEventName ,
  getSelectUIControlEventName ,
  getSelectTreeNodeEventName ,
  getExpandInputCollapseEventName ,
  getSelectInputInUIControlInspectorEventName ,
  getAddInputEventName ,
  getSelectInputInInputsEventName ,
  getExpandActionCollapseEventName ,
  getSelectActionInUIControlInspectorEventName ,
  getAddActionEventName ,
  getSelectActionInActionsEventName ,
}
/* No side effect */
