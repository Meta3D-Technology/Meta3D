import type { api as Meta3dType_Index_api } from 'meta3d-type/src/Index';

import type { state as Meta3dType_Index_state } from 'meta3d-type/src/Index';

// tslint:disable-next-line:interface-over-type-literal
export type customControlName = string;

// tslint:disable-next-line:interface-over-type-literal
export type customControlFunc<inputData, outputData> = (_1: Meta3dType_Index_state, _2: inputData) => [Meta3dType_Index_state, outputData];

// tslint:disable-next-line:interface-over-type-literal
export type customControlContribute<inputData, outputData> = { readonly customControlName: customControlName; readonly func: customControlFunc<inputData, outputData> };

// tslint:disable-next-line:interface-over-type-literal
// export type skinName = string;

// // tslint:disable-next-line:interface-over-type-literal
// export type getCustomControlContribute<inputData, outputData> = (_1: skinName) => customControlContribute<inputData, outputData>;
