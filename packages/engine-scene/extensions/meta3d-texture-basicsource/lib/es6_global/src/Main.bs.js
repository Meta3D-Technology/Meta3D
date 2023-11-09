

import * as ImmutableSparseMap$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";
import * as GroupTextureUtils$Meta3dTextureBasicsource from "./GroupTextureUtils.bs.js";
import * as CreateTextureUtils$Meta3dTextureBasicsource from "./CreateTextureUtils.bs.js";
import * as DisposeTextureUtils$Meta3dTextureBasicsource from "./DisposeTextureUtils.bs.js";

function getExtensionService(api) {
  return {
          createTexture: CreateTextureUtils$Meta3dTextureBasicsource.create,
          disposeTexture: DisposeTextureUtils$Meta3dTextureBasicsource.disposeTexture,
          addMaterial: (function (state, texture, material) {
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
                      materials: GroupTextureUtils$Meta3dTextureBasicsource.addMaterial(state.materials, texture, material),
                      names: state.names
                    };
            }),
          getName: (function (state, texture) {
              return ImmutableSparseMap$Meta3dCommonlib.getNullable(state.names, texture);
            }),
          setName: (function (state, texture, name) {
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
                      materials: state.materials,
                      names: ImmutableSparseMap$Meta3dCommonlib.set(state.names, texture, name)
                    };
            }),
          getWrapS: (function (state, texture) {
              return ImmutableSparseMap$Meta3dCommonlib.getExn(state.wrapSs, texture);
            }),
          setWrapS: (function (state, texture, wrapS) {
              return {
                      maxUID: state.maxUID,
                      wrapSs: ImmutableSparseMap$Meta3dCommonlib.set(state.wrapSs, texture, wrapS),
                      wrapTs: state.wrapTs,
                      magFilters: state.magFilters,
                      minFilters: state.minFilters,
                      formats: state.formats,
                      types: state.types,
                      isNeedUpdates: state.isNeedUpdates,
                      flipYs: state.flipYs,
                      images: state.images,
                      materials: state.materials,
                      names: state.names
                    };
            }),
          getWrapT: (function (state, texture) {
              return ImmutableSparseMap$Meta3dCommonlib.getExn(state.wrapTs, texture);
            }),
          setWrapT: (function (state, texture, wrapT) {
              return {
                      maxUID: state.maxUID,
                      wrapSs: state.wrapSs,
                      wrapTs: ImmutableSparseMap$Meta3dCommonlib.set(state.wrapTs, texture, wrapT),
                      magFilters: state.magFilters,
                      minFilters: state.minFilters,
                      formats: state.formats,
                      types: state.types,
                      isNeedUpdates: state.isNeedUpdates,
                      flipYs: state.flipYs,
                      images: state.images,
                      materials: state.materials,
                      names: state.names
                    };
            }),
          getMagFilter: (function (state, texture) {
              return ImmutableSparseMap$Meta3dCommonlib.getExn(state.magFilters, texture);
            }),
          setMagFilter: (function (state, texture, magFilter) {
              return {
                      maxUID: state.maxUID,
                      wrapSs: state.wrapSs,
                      wrapTs: state.wrapTs,
                      magFilters: ImmutableSparseMap$Meta3dCommonlib.set(state.magFilters, texture, magFilter),
                      minFilters: state.minFilters,
                      formats: state.formats,
                      types: state.types,
                      isNeedUpdates: state.isNeedUpdates,
                      flipYs: state.flipYs,
                      images: state.images,
                      materials: state.materials,
                      names: state.names
                    };
            }),
          getMinFilter: (function (state, texture) {
              return ImmutableSparseMap$Meta3dCommonlib.getExn(state.minFilters, texture);
            }),
          setMinFilter: (function (state, texture, minFilter) {
              return {
                      maxUID: state.maxUID,
                      wrapSs: state.wrapSs,
                      wrapTs: state.wrapTs,
                      magFilters: state.magFilters,
                      minFilters: ImmutableSparseMap$Meta3dCommonlib.set(state.minFilters, texture, minFilter),
                      formats: state.formats,
                      types: state.types,
                      isNeedUpdates: state.isNeedUpdates,
                      flipYs: state.flipYs,
                      images: state.images,
                      materials: state.materials,
                      names: state.names
                    };
            }),
          getFormat: (function (state, texture) {
              return ImmutableSparseMap$Meta3dCommonlib.getExn(state.formats, texture);
            }),
          setFormat: (function (state, texture, format) {
              return {
                      maxUID: state.maxUID,
                      wrapSs: state.wrapSs,
                      wrapTs: state.wrapTs,
                      magFilters: state.magFilters,
                      minFilters: state.minFilters,
                      formats: ImmutableSparseMap$Meta3dCommonlib.set(state.formats, texture, format),
                      types: state.types,
                      isNeedUpdates: state.isNeedUpdates,
                      flipYs: state.flipYs,
                      images: state.images,
                      materials: state.materials,
                      names: state.names
                    };
            }),
          getType: (function (state, texture) {
              return ImmutableSparseMap$Meta3dCommonlib.getExn(state.types, texture);
            }),
          setType: (function (state, texture, type_) {
              return {
                      maxUID: state.maxUID,
                      wrapSs: state.wrapSs,
                      wrapTs: state.wrapTs,
                      magFilters: state.magFilters,
                      minFilters: state.minFilters,
                      formats: state.formats,
                      types: ImmutableSparseMap$Meta3dCommonlib.set(state.types, texture, type_),
                      isNeedUpdates: state.isNeedUpdates,
                      flipYs: state.flipYs,
                      images: state.images,
                      materials: state.materials,
                      names: state.names
                    };
            }),
          getIsNeedUpdate: (function (state, texture) {
              return ImmutableSparseMap$Meta3dCommonlib.getExn(state.isNeedUpdates, texture);
            }),
          setIsNeedUpdate: (function (state, texture, isNeedUpdate) {
              return {
                      maxUID: state.maxUID,
                      wrapSs: state.wrapSs,
                      wrapTs: state.wrapTs,
                      magFilters: state.magFilters,
                      minFilters: state.minFilters,
                      formats: state.formats,
                      types: state.types,
                      isNeedUpdates: ImmutableSparseMap$Meta3dCommonlib.set(state.isNeedUpdates, texture, isNeedUpdate),
                      flipYs: state.flipYs,
                      images: state.images,
                      materials: state.materials,
                      names: state.names
                    };
            }),
          getFlipY: (function (state, texture) {
              return ImmutableSparseMap$Meta3dCommonlib.getExn(state.flipYs, texture);
            }),
          setFlipY: (function (state, texture, flipY) {
              return {
                      maxUID: state.maxUID,
                      wrapSs: state.wrapSs,
                      wrapTs: state.wrapTs,
                      magFilters: state.magFilters,
                      minFilters: state.minFilters,
                      formats: state.formats,
                      types: state.types,
                      isNeedUpdates: state.isNeedUpdates,
                      flipYs: ImmutableSparseMap$Meta3dCommonlib.set(state.flipYs, texture, flipY),
                      images: state.images,
                      materials: state.materials,
                      names: state.names
                    };
            }),
          getImage: (function (state, texture) {
              return ImmutableSparseMap$Meta3dCommonlib.getExn(state.images, texture);
            }),
          setImage: (function (state, texture, image) {
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
                      images: ImmutableSparseMap$Meta3dCommonlib.set(state.images, texture, image),
                      materials: state.materials,
                      names: state.names
                    };
            })
        };
}

function createExtensionState(param) {
  return {
          maxUID: 0,
          wrapSs: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          wrapTs: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          magFilters: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          minFilters: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          formats: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          types: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          isNeedUpdates: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          flipYs: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          images: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          materials: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          names: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined)
        };
}

function getExtensionLife(api, param) {
  return {
          onRegister: null,
          onRestore: null,
          onDeepCopy: null,
          onStart: null,
          onInit: null,
          onUpdate: null
        };
}

export {
  getExtensionService ,
  createExtensionState ,
  getExtensionLife ,
}
/* No side effect */
