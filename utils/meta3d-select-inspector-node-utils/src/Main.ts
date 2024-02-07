import { gameObject } from "meta3d-gameobject-protocol"
import { state as meta3dState, api } from "meta3d-type"
import { actionName as selectInspectorNodeActionName, state as selectInspectorNodeState } from "meta3d-action-select-inspector-node-protocol"

export let getSelectedInspectorNode = (meta3dState: meta3dState, api: api) => {
    return api.nullable.bind(selectSceneTreeNodeState => selectSceneTreeNodeState.selectedNodeData, api.action.getActionState<selectInspectorNodeState>(meta3dState, selectInspectorNodeActionName))
}

export let isSelectSceneTreeNode = (meta3dState: meta3dState, api: api) => {
    return api.nullable.getWithDefault(
        api.nullable.map(
            ([nodeType, data]) => {
                return nodeType == "scenetree"
            },
            getSelectedInspectorNode(meta3dState, api)
        ),
        false
    )
}

export let isSelectAssetNode = (meta3dState: meta3dState, api: api) => {
    return api.nullable.getWithDefault(
        api.nullable.map(
            ([nodeType, data]) => {
                return nodeType == "asset"
            },
            getSelectedInspectorNode(meta3dState, api)
        ),
        false
    )
}


export let getSelectedGameObject = (meta3dState: meta3dState, api: api) => {
    return api.nullable.map(
        ([nodeType, data]) => {
            if (nodeType != "scenetree") {
                throw new Error("should be sceneTree")
            }

            return data as gameObject
        },
        getSelectedInspectorNode(meta3dState, api)
    )
}

export let getSelectedAsset = (meta3dState: meta3dState, api: api) => {
    return api.nullable.map(
        ([nodeType, data]) => {
            if (nodeType != "asset") {
                throw new Error("should be asset")
            }

            return data as any
        },
        getSelectedInspectorNode(meta3dState, api)
    )
}

export let notSelecteNode = (meta3dState: meta3dState, api: api) => {
    return api.action.setActionState(meta3dState, selectInspectorNodeActionName, {
        ...api.nullable.getExn(api.action.getActionState<selectInspectorNodeState>(meta3dState, selectInspectorNodeActionName)),
        selectedNodeData: api.nullable.getEmpty()
    })
}

export let selecteNode = (meta3dState: meta3dState, api: api, nodeData: any) => {
    return api.action.setActionState(meta3dState, selectInspectorNodeActionName, {
        ...api.nullable.getExn(api.action.getActionState<selectInspectorNodeState>(meta3dState, selectInspectorNodeActionName)),
        selectedNodeData: nodeData
    })
}
