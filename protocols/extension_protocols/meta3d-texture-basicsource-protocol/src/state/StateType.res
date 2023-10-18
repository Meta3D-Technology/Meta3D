type material = int

type uid = int

type texture = uid

// type config = Meta3dTextureBasicsourceProtocol.Index.config

type filter =
  | Nearest
  | Linear
  | Nearest_mipmap_nearest
  | Linear_mipmap_nearest
  | Nearest_mipmap_linear
  | Linear_mipmap_linear

type wrap =
  | Clamp_to_edge
  | Mirrored_repeat
  | Repeat

// type isNeedUpdate =
//   | Not_needUpdate
//   | NeedUpdate

// type isFlipY =
//   | Not_flipy
//   | Flipy

// type format =
//   | Rgb
//   | Rgba
//   | Alpha
//   | Luminance
//   | LuminanceAlpha
//   | Rgbs3tcdxt1
//   | Rgbas3tcdxt1
//   | Rgbas3tcdxt3
//   | Rgbas3tcdxt5

type format =
  | @as(1021) AlphaFormat
  | @as(1024) LuminanceFormat
  | @as(1025) LuminanceAlphaFormat
  | @as(1026) DepthFormat
  | @as(1027) DepthStencilFormat
  | @as(1028) RedFormat
  | @as(1029) RedIntegerFormat
  | @as(1030) RGFormat
  | @as(1035) SRGBAFormat

type textureDataType =
  | @as(1009) UnsignedByteType
  | @as(1010) ByteType
  | @as(1011) ShortType
  | @as(1012) UnsignedShortType
  | @as(1013) IntType
  | @as(1014) UnsignedIntType
  | @as(1015) FloatType
  | @as(1016) HalfFloatType
  | @as(1017) UnsignedShort4444Type
  | @as(1018) UnsignedShort5551Type
  | @as(1020) UnsignedInt248Type

@genType
type state = {
  maxUID: int,
  wrapSs: Meta3dCommonlibType.ImmutableSparseMapType.t<
    texture,
    wrap,
  >,
  wrapTs: Meta3dCommonlibType.ImmutableSparseMapType.t<
    texture,
    wrap,
  >,
  magFilters: Meta3dCommonlibType.ImmutableSparseMapType.t<
    texture,
    filter,
  >,
  minFilters: Meta3dCommonlibType.ImmutableSparseMapType.t<
    texture,
    filter,
  >,
  formats: Meta3dCommonlibType.ImmutableSparseMapType.t<
    texture,
    format,
  >,
  types: Meta3dCommonlibType.ImmutableSparseMapType.t<
    texture,
    textureDataType,
  >,
  isNeedUpdates: Meta3dCommonlibType.ImmutableSparseMapType.t<
    texture,
    bool,
  >,
  flipYs: Meta3dCommonlibType.ImmutableSparseMapType.t<
    texture,
    bool,
  >,
  images: Meta3dCommonlibType.ImmutableSparseMapType.t<
    texture,
    Dom.htmlImageElement,
  >,
  materials: Meta3dCommonlibType.ImmutableSparseMapType.t<
    texture,
    array<material>,
  >,
  // mutable needDisposedTextureArray: array<texture>,
  // mutable disposedTextureArray: array<texture>,
}
