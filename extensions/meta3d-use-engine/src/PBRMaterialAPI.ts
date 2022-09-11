import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { componentName, pbrMaterial, diffuseColor, dataName } from "meta3d-component-pbrmaterial-protocol"

export function createPBRMaterial(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute,
	createComponent,
	setUsedComponentContribute,
}: engineCoreService): [engineCoreState, pbrMaterial] {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	let data = createComponent<pbrMaterial>(contribute)
	contribute = data[0]
	let pbrMaterial = data[1]

	engineCoreState =
		setUsedComponentContribute(engineCoreState, contribute, componentName)

	return [
		engineCoreState,
		pbrMaterial
	]
}

export function setDiffuseColor(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, diffuseColor: diffuseColor) {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.diffuseColor, diffuseColor)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export function getAllPBRMaterials(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getAllComponents }: engineCoreService) {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getAllComponents<pbrMaterial>(contribute)
}