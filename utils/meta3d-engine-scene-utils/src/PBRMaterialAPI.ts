import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { componentName, pbrMaterial, diffuseColor, dataName } from "meta3d-component-pbrmaterial-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"

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

export let getDiffuseColor = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentData }: engineCoreService, pbrMaterial: pbrMaterial): nullable<diffuseColor>  => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentData<pbrMaterial, diffuseColor>(contribute, pbrMaterial, dataName.diffuseColor)
}

export let setDiffuseColor = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, setComponentData }: engineCoreService, pbrMaterial: pbrMaterial, diffuseColor: diffuseColor) =>  {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)


	contribute = setComponentData(contribute, pbrMaterial, dataName.diffuseColor, diffuseColor)

	return setUsedComponentContribute(engineCoreState, contribute, componentName)
}

export let getAllPBRMaterials = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getAllComponents }: engineCoreService) =>  {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getAllComponents<pbrMaterial>(contribute)
}

export let getGameObjects = (engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponentGameObjects }: engineCoreService, pbrMaterial: pbrMaterial): Array<gameObject>  => {
	let contribute = unsafeGetUsedComponentContribute(engineCoreState, componentName)

	return getComponentGameObjects<pbrMaterial>(contribute, pbrMaterial)
}