import { setVariables as setVariablesUtils } from "./utils/GlobalUtils";

export let globalKeyNameForMeshInstanceMap: string
export let globalKeyNameForPhysicalMaterialInstanceMap: string
export let globalKeyNameForTextureInstanceMap: string
export let globalKeyNameForGeometryInstanceMap: string
export let globalKeyNameForDirectionLightInstanceMap: string

export let setVariables = (
    engineSceneProtocolName, globalKeyNameForMeta3dState, globalKeyNameForAPI, globalKeyNameForMeshInstanceMap_, globalKeyNameForPhysicalMaterialInstanceMap_,

    globalKeyNameForTextureInstanceMap_,
    globalKeyNameForGeometryInstanceMap_,

    globalKeyNameForDirectionLightInstanceMap_
) => {
    setVariablesUtils(
        engineSceneProtocolName, globalKeyNameForMeta3dState, globalKeyNameForAPI, globalKeyNameForMeshInstanceMap_, globalKeyNameForPhysicalMaterialInstanceMap_,
        globalKeyNameForTextureInstanceMap_,
        globalKeyNameForGeometryInstanceMap_,
        globalKeyNameForDirectionLightInstanceMap_
    )

    globalKeyNameForMeshInstanceMap = globalKeyNameForMeshInstanceMap_
    globalKeyNameForPhysicalMaterialInstanceMap = globalKeyNameForPhysicalMaterialInstanceMap_

    globalKeyNameForTextureInstanceMap = globalKeyNameForTextureInstanceMap_

    globalKeyNameForGeometryInstanceMap = globalKeyNameForGeometryInstanceMap_

    globalKeyNameForDirectionLightInstanceMap = globalKeyNameForDirectionLightInstanceMap_
}