
import type { ImmutableSparseMapType_t as Meta3dCommonlibType_ImmutableSparseMapType_t } from 'meta3d-commonlib-type/lib/es6_global/src/structure/sparse_map/ImmutableSparseMapType.bs';

export type htmlImageElement = TexImageSource

export type material = number

// tslint:disable-next-line:interface-over-type-literal
export type uid = number;

// tslint:disable-next-line:interface-over-type-literal
export type texture = uid;

export enum filter {
  Nearest,
  Linear,
  Nearest_mipmap_nearest,
  Linear_mipmap_nearest,
  Nearest_mipmap_linear,
  Linear_mipmap_linear
}

// tslint:disable-next-line:interface-over-type-literal
export enum wrap {
  Clamp_to_edge,
  Mirrored_repeat,
  Repeat
}


export enum format {
  AlphaFormat = 1021,
  LuminanceFormat = 1024,
  LuminanceAlphaFormat = 1025,
  DepthFormat = 1026,
  DepthStencilFormat = 1027,
  RedFormat = 1028,
  RedIntegerFormat = 1029,
  RGFormat = 1030,
  SRGBAFormat = 1035,
}

export enum textureDataType {
  UnsignedByteType = 1009,
  ByteType = 1010,
  ShortType = 1011,
  UnsignedShortType = 1012,
  IntType = 1013,
  UnsignedIntType = 1014,
  FloatType = 1015,
  HalfFloatType = 1016,
  UnsignedShort4444Type = 1017,
  UnsignedShort5551Type = 1018,
  UnsignedInt248Type = 1020,
}

// tslint:disable-next-line:interface-over-type-literal
export type state = {
  readonly maxUID: number;
  readonly wrapSs: Meta3dCommonlibType_ImmutableSparseMapType_t<texture, wrap>;
  readonly wrapTs: Meta3dCommonlibType_ImmutableSparseMapType_t<texture, wrap>;
  readonly magFilters: Meta3dCommonlibType_ImmutableSparseMapType_t<texture, filter>;
  readonly minFilters: Meta3dCommonlibType_ImmutableSparseMapType_t<texture, filter>;
  readonly formats: Meta3dCommonlibType_ImmutableSparseMapType_t<texture, format>;
  readonly types: Meta3dCommonlibType_ImmutableSparseMapType_t<texture, textureDataType>;
  readonly isNeedUpdates: Meta3dCommonlibType_ImmutableSparseMapType_t<texture, boolean>;
  readonly flipYs: Meta3dCommonlibType_ImmutableSparseMapType_t<texture, boolean>;
  readonly images: Meta3dCommonlibType_ImmutableSparseMapType_t<texture, htmlImageElement>;
  readonly materials: Meta3dCommonlibType_ImmutableSparseMapType_t<texture, material[]>
};
