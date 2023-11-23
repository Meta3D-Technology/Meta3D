/* TypeScript file generated from StateType.res by genType. */
/* eslint-disable import/first */


import type {ImmutableSparseMapType_t as Meta3dCommonlibType_ImmutableSparseMapType_t} from './Meta3dCommonlibType.gen';

import type {htmlImageElement as Dom_htmlImageElement} from './Dom.gen';

// tslint:disable-next-line:interface-over-type-literal
export type uid = number;

// tslint:disable-next-line:interface-over-type-literal
export type texture = uid;

// tslint:disable-next-line:interface-over-type-literal
export type wrap = 
    "Clamp_to_edge"
  | "Mirrored_repeat"
  | "Repeat";

// tslint:disable-next-line:interface-over-type-literal
export type state = {
  readonly maxUID: number; 
  readonly wrapSs: Meta3dCommonlibType_ImmutableSparseMapType_t<texture,wrap>; 
  readonly wrapTs: Meta3dCommonlibType_ImmutableSparseMapType_t<texture,wrap>; 
  readonly magFilters: Meta3dCommonlibType_ImmutableSparseMapType_t<texture,filter>; 
  readonly minFilters: Meta3dCommonlibType_ImmutableSparseMapType_t<texture,filter>; 
  readonly formats: Meta3dCommonlibType_ImmutableSparseMapType_t<texture,format>; 
  readonly types: Meta3dCommonlibType_ImmutableSparseMapType_t<texture,textureDataType>; 
  readonly isNeedUpdates: Meta3dCommonlibType_ImmutableSparseMapType_t<texture,boolean>; 
  readonly flipYs: Meta3dCommonlibType_ImmutableSparseMapType_t<texture,boolean>; 
  readonly images: Meta3dCommonlibType_ImmutableSparseMapType_t<texture,Dom_htmlImageElement>; 
  readonly materials: Meta3dCommonlibType_ImmutableSparseMapType_t<texture,material[]>; 
  readonly names: Meta3dCommonlibType_ImmutableSparseMapType_t<texture,string>
};
