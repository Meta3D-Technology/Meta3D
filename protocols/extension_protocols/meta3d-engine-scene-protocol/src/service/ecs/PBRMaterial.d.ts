import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { componentName, pbrMaterial, diffuseColor, dataName } from "meta3d-component-pbrmaterial-protocol"

export type createPBRMaterial = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
	createComponent,
	setUsedComponentContribute,
}: engineCoreService) => [engineCoreState, pbrMaterial]

export type setDiffuseColor = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, diffuseColor: diffuseColor) => engineCoreState

export type getAllPBRMaterials = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getAllComponents }: engineCoreService) => pbrMaterial[]