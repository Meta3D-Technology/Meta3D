

import * as ImmutableSparseMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";

function create(state) {
  var uid = state.maxUID;
  var state_maxUID = uid + 1 | 0;
  var state_wrapSs = state.wrapSs;
  var state_wrapTs = state.wrapTs;
  var state_magFilters = state.magFilters;
  var state_minFilters = state.minFilters;
  var state_formats = state.formats;
  var state_types = state.types;
  var state_isNeedUpdates = state.isNeedUpdates;
  var state_flipYs = state.flipYs;
  var state_images = state.images;
  var state_materials = ImmutableSparseMap$Meta3dCommonlib.set(state.materials, uid, []);
  var state$1 = {
    maxUID: state_maxUID,
    wrapSs: state_wrapSs,
    wrapTs: state_wrapTs,
    magFilters: state_magFilters,
    minFilters: state_minFilters,
    formats: state_formats,
    types: state_types,
    isNeedUpdates: state_isNeedUpdates,
    flipYs: state_flipYs,
    images: state_images,
    materials: state_materials
  };
  return [
          state$1,
          uid
        ];
}

export {
  create ,
}
/* No side effect */
