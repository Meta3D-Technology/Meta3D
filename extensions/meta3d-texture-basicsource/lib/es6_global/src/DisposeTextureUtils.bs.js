

import * as ImmutableSparseMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";
import * as GroupTextureUtils$Meta3dTextureBasicsource from "./GroupTextureUtils.bs.js";

function _disposeData(state, texture) {
  return {
          maxUID: state.maxUID,
          wrapSs: ImmutableSparseMap$Meta3dCommonlib.remove(state.wrapSs, texture),
          wrapTs: ImmutableSparseMap$Meta3dCommonlib.remove(state.wrapTs, texture),
          magFilters: ImmutableSparseMap$Meta3dCommonlib.remove(state.magFilters, texture),
          minFilters: ImmutableSparseMap$Meta3dCommonlib.remove(state.minFilters, texture),
          formats: ImmutableSparseMap$Meta3dCommonlib.remove(state.formats, texture),
          types: ImmutableSparseMap$Meta3dCommonlib.remove(state.types, texture),
          isNeedUpdates: ImmutableSparseMap$Meta3dCommonlib.remove(state.isNeedUpdates, texture),
          flipYs: ImmutableSparseMap$Meta3dCommonlib.remove(state.flipYs, texture),
          images: ImmutableSparseMap$Meta3dCommonlib.remove(state.images, texture),
          materials: state.materials
        };
}

function disposeTexture(state, texture, material) {
  var materials = GroupTextureUtils$Meta3dTextureBasicsource.removeMaterial(state.materials, texture, material);
  if (GroupTextureUtils$Meta3dTextureBasicsource.isGroupTexture(materials, texture)) {
    return {
            maxUID: state.maxUID,
            wrapSs: state.wrapSs,
            wrapTs: state.wrapTs,
            magFilters: state.magFilters,
            minFilters: state.minFilters,
            formats: state.formats,
            types: state.types,
            isNeedUpdates: state.isNeedUpdates,
            flipYs: state.flipYs,
            images: state.images,
            materials: materials
          };
  } else {
    return _disposeData({
                maxUID: state.maxUID,
                wrapSs: state.wrapSs,
                wrapTs: state.wrapTs,
                magFilters: state.magFilters,
                minFilters: state.minFilters,
                formats: state.formats,
                types: state.types,
                isNeedUpdates: state.isNeedUpdates,
                flipYs: state.flipYs,
                images: state.images,
                materials: materials
              }, texture);
  }
}

export {
  _disposeData ,
  disposeTexture ,
}
/* No side effect */
