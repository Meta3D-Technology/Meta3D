import { state as meta3dState, api } from "meta3d-type/src/Index"

export type actionName = string;

export type eventHandler<uiData> = (
    meta3dState: meta3dState,
    uiData: uiData
) => Promise<meta3dState>;

export type createState<state> = () => state

export type restore<state> = (currentState: state, targetState: state) => state

export type deepCopy<state> = (state: state) => state

export type actionContribute<uiData, state> = {
    actionName: actionName,
    handler: eventHandler<uiData>,
    createState: createState<state>,
    restore?: restore<state>,
    deepCopy?: deepCopy<state>
}

// export type getActionContribute<dependentExtensionProtocolNameMap, uiData> = (api: api, dependentExtensionProtocolNameMap: dependentExtensionProtocolNameMap) => actionContribute<uiData>;
