import { transformRepo } from "engine-core/src/abstract/repo/ISceneGraphRepoForJs.gen";

export let exec = (transformRepo: transformRepo) => {
	const allTransformList = transformRepo.getAllTransforms();
	allTransformList.forEach(transformRepo.updateTransform)
}
