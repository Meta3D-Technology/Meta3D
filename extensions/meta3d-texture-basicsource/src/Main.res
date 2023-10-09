let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dTextureBasicsourceProtocol.ServiceType.service,
> = api => {
  createTexture: CreateTextureUtils.create,
  disposeTexture: DisposeTextureUtils.disposeTexture,
  addMaterial: (state, texture, material) => {
    {
      ...state,
      materials: GroupTextureUtils.addMaterial(state.materials, texture, material),
    }
  },
  getWrapS: (state, texture) => {
    state.wrapSs -> Meta3dCommonlib.ImmutableSparseMap.getExn(texture)
  },
  setWrapS: (state, texture, wrapS) => {
    {
      ...state,
      wrapSs: state.wrapSs -> Meta3dCommonlib.ImmutableSparseMap.set(texture, wrapS)
    }
  },
  getWrapT: (state, texture) => {
    state.wrapTs -> Meta3dCommonlib.ImmutableSparseMap.getExn(texture)
  },
  setWrapT: (state, texture, wrapT) => {
    {
      ...state,
      wrapTs: state.wrapTs -> Meta3dCommonlib.ImmutableSparseMap.set(texture, wrapT)
    }
  },
  getMagFilter: (state, texture) => {
    state.magFilters -> Meta3dCommonlib.ImmutableSparseMap.getExn(texture)
  },
  setMagFilter: (state, texture, magFilter) => {
    {
      ...state,
      magFilters: state.magFilters -> Meta3dCommonlib.ImmutableSparseMap.set(texture, magFilter)
    }
  },
  getMinFilter: (state, texture) => {
    state.minFilters -> Meta3dCommonlib.ImmutableSparseMap.getExn(texture)
  },
  setMinFilter: (state, texture, minFilter) => {
    {
      ...state,
      minFilters: state.minFilters -> Meta3dCommonlib.ImmutableSparseMap.set(texture, minFilter)
    }
  },
  getFormat: (state, texture) => {
    state.formats -> Meta3dCommonlib.ImmutableSparseMap.getExn(texture)
  },
  setFormat: (state, texture, format) => {
    {
      ...state,
      formats: state.formats -> Meta3dCommonlib.ImmutableSparseMap.set(texture, format)
    }
  },
  getType: (state, texture) => {
    state.types -> Meta3dCommonlib.ImmutableSparseMap.getExn(texture)
  },
  setType: (state, texture, type_) => {
    {
      ...state,
      types: state.types -> Meta3dCommonlib.ImmutableSparseMap.set(texture, type_)
    }
  },
  getIsNeedUpdate: (state, texture) => {
    state.isNeedUpdates -> Meta3dCommonlib.ImmutableSparseMap.getExn(texture)
  },
  setIsNeedUpdate: (state, texture, isNeedUpdate) => {
    {
      ...state,
      isNeedUpdates: state.isNeedUpdates -> Meta3dCommonlib.ImmutableSparseMap.set(texture, isNeedUpdate)
    }
  },
  getFlipY: (state, texture) => {
    state.flipYs -> Meta3dCommonlib.ImmutableSparseMap.getExn(texture)
  },
  setFlipY: (state, texture, flipY) => {
    {
      ...state,
      flipYs: state.flipYs -> Meta3dCommonlib.ImmutableSparseMap.set(texture, flipY)
    }
  },
  getImage: (state, texture) => {
    state.images -> Meta3dCommonlib.ImmutableSparseMap.getExn(texture)
  },
  setImage: (state, texture, image) => {
    {
      ...state,
      images: state.images -> Meta3dCommonlib.ImmutableSparseMap.set(texture, image)
    }
  },
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dTextureBasicsourceProtocol.StateType.state,
> = () => {
  maxUID: 0,
  wrapSs: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
  wrapTs: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
  magFilters: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
  minFilters: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
  formats: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
  types: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
  isNeedUpdates: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
  flipYs: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
  images: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
  materials: Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
}

let getExtensionLife: Meta3dType.Index.getExtensionLife<
  Meta3dTextureBasicsourceProtocol.ServiceType.service,
> = (api, _) => {
  {
    onRegister: Js.Nullable.null,
    onRestore: Js.Nullable.null,
    onDeepCopy: Js.Nullable.null,
    onStart: Js.Nullable.null,
    onInit: Js.Nullable.null,
    onUpdate: Js.Nullable.null,
  }
}
