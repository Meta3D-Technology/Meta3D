import { state as meta3dState, api } from "meta3d-type"
import { actionName as addAssetActionName, state as addAssetState, asset,  assetType } from "meta3d-action-add-asset-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { zip } from "meta3d-structure-utils/src/ArrayUtils"
import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { id } from "meta3d-action-add-asset-protocol/src/EventType"

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

export let convertAllAssetDataForExport = (meta3dState: meta3dState, api: api): [Uint8Array, Uint8Array, Uint8Array, Array<Uint8Array>] => {
    let { allAddedAssets } = api.nullable.getExn(
        api.action.getActionState<addAssetState>(meta3dState, addAssetActionName)
    )

    let encoder = new TextEncoder()

    let [assetTypes, ids, names, allData] = allAddedAssets.toArray().reduce(([assetTypes, ids, names, allData]: any, [assetType_, id, name, _icon, data]) => {
        assetTypes.push(assetType_)
        ids.push(id)
        names.push(name)

        switch (assetType_) {
            case assetType.Glb:
                allData.push(new Uint8Array(data))
                break
            default:
                allData.push(
                    encoder.encode(JSON.stringify(data))
                )
        }

        return [assetTypes, ids, names, allData]
    }, [[], [], [], []])


    return [
        encoder.encode(JSON.stringify(assetTypes)),
        encoder.encode(JSON.stringify(ids)),
        encoder.encode(JSON.stringify(names)),
        allData
    ]
}

export let convertAllAssetDataForImport = ([glbTexture, scriptTexture]: [imguiImplTexture, imguiImplTexture], [assetTypes, ids, names, allData]: [Uint8Array, Uint8Array, Uint8Array, Array<Uint8Array>]): Array<asset> => {
    let decoder = new TextDecoder()

    let newAssetTypes = JSON.parse(decoder.decode(assetTypes))
    let newIds = JSON.parse(decoder.decode(ids))
    let newNames = JSON.parse(decoder.decode(names))
    let icons = newAssetTypes.map((assetType_: assetType) => {
        switch (assetType_) {
            case assetType.Glb:
                return glbTexture
            default:
                return scriptTexture
        }
    })
    let newAllData = allData.map((data, i) => {
        switch (newAssetTypes[i]) {
            case assetType.Glb:
                return data.buffer
            default:
                return JSON.parse(decoder.decode(data))
        }
    })

    return zip(newAssetTypes, newIds, newNames, icons, newAllData)
}