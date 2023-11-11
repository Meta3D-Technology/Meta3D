import { state as meta3dState } from "meta3d-type"
import { engineCoreService } from "meta3d-core-protocol/src/service/ServiceType"
import { transform, update } from "meta3d-component-transform-protocol-common"
import { componentName, dataName } from "meta3d-component-transform-protocol";

export let updateTransform = (meta3dState: meta3dState, engineCoreService: engineCoreService) => {
	let usedTransformContribute = engineCoreService.unsafeGetUsedComponentContribute(meta3dState, componentName)
	let allTransforms = engineCoreService.getAllComponents<transform>(usedTransformContribute)

	usedTransformContribute = allTransforms.reduce((usedTransformContribute, transform) => {
		return engineCoreService.setComponentData<transform, update>(usedTransformContribute, transform, dataName.update, null)
	}, usedTransformContribute)

	return engineCoreService.setUsedComponentContribute(meta3dState, usedTransformContribute, componentName)
}
