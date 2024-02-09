import { state as meta3dState, api } from "meta3d-type"
import { actionName as addAssetActionName, state as addAssetState, asset, id } from "meta3d-action-add-asset-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export let update = (meta3dState: meta3dState, func: (asset: asset) => asset, api: api, id: id): meta3dState => {
    let { allAddedAssets } = api.nullable.getExn(
        api.action.getActionState<addAssetState>(meta3dState, addAssetActionName)
    )

    return api.action.setActionState(meta3dState, addAssetActionName, {
        ...api.nullable.getExn(api.action.getActionState<addAssetState>(meta3dState, addAssetActionName)),
        allAddedAssets: allAddedAssets.map(asset => {
            if (asset[1] == id) {
                return func(asset)
            }

            return asset
        })
    })
}

export let find = (meta3dState: meta3dState, api: api, id: id): nullable<asset> => {
    let { allAddedAssets } = api.nullable.getExn(
        api.action.getActionState<addAssetState>(meta3dState, addAssetActionName)
    )

    return allAddedAssets.find(asset => {
        return asset[1] == id
    })
}

