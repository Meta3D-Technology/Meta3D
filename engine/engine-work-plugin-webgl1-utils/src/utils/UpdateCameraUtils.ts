import { perspectiveCameraProjectionRepo } from "engine-core/src/abstract/repo/ISceneGraphRepoForJs.gen";

export let exec = (perspectiveCameraProjectionRepo: perspectiveCameraProjectionRepo) => {
	let allDirtyPerspectiveCameraProjectionList = perspectiveCameraProjectionRepo.getAllDirtyPerspectiveCameraProjections();
	allDirtyPerspectiveCameraProjectionList.forEach(perspectiveCameraProjectionRepo.updatePerspectiveCameraProjection)
	perspectiveCameraProjectionRepo.clearDirtyList();

}