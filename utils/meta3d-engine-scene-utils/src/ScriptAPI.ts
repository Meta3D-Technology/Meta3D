import { engineCoreService } from "meta3d-core-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { componentName, script, dataName, attributeValue, allAssetData } from "meta3d-component-script-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export function createScript(meta3dState: meta3dState, { unsafeGetUsedComponentContribute,
    createComponent,
    setUsedComponentContribute,
}: engineCoreService): [meta3dState, script] {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    let data = createComponent<script>(contribute)
    contribute = data[0]
    let basicCameraView = data[1]

    meta3dState =
        setUsedComponentContribute(meta3dState, contribute, componentName)

    return [
        meta3dState,
        basicCameraView
    ]
}

export let getName = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, script: script): nullable<string> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<script, string>(contribute, script, dataName.name)
}

export let setName = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, script: script, name: string): meta3dState => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)


    contribute = setComponentData(contribute, script, dataName.name, name)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getAttribute = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, script: script): nullable<attributeValue> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<script, attributeValue>(contribute, script, dataName.attribute)
}

export let setAttribute = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, script: script, attribute: number) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    contribute = setComponentData(contribute, script, dataName.attribute, attribute)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}

export let getAllAssetData = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, script: script): nullable<allAssetData> => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    return getComponentData<script, allAssetData>(contribute, script, dataName.allAssetData)
}

export let setAllAssetData = (meta3dState: meta3dState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, script: script, allAssetData: allAssetData) => {
    let contribute = unsafeGetUsedComponentContribute(meta3dState, componentName)

    contribute = setComponentData(contribute, script, dataName.allAssetData, allAssetData)

    return setUsedComponentContribute(meta3dState, contribute, componentName)
}