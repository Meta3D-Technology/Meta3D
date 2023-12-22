import type { state as Meta3dType_Index_state } from 'meta3d-type/src/Index';
import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"

// tslint:disable-next-line:interface-over-type-literal
export type uiControlName = string;

// type getInputFunc<data> = (_1: Meta3dType_Index_state) => Promise<data>

// tslint:disable-next-line:interface-over-type-literal
export type uiControlFunc<inputFunc, specificData, outputData> = (_1: Meta3dType_Index_state, _2: inputFunc, _3: rect, _4: specificData) => Promise<[Meta3dType_Index_state, outputData]>;

// tslint:disable-next-line:interface-over-type-literal
// export type uiControlContribute<uiControlState, specificData, outputData> = {
//     uiControlName: uiControlName;
//     createStateFunc: () => uiControlState;
//     func: uiControlFunc<specificData, outputData>
// };

export type init = (meta3dState: Meta3dType_Index_state) => Promise<Meta3dType_Index_state>

export type uiControlContribute<inputFunc, specificData, outputData> = {
    uiControlName: uiControlName;
    func: uiControlFunc<inputFunc, specificData, outputData>
    init: init,
};


// tslint:disable-next-line:interface-over-type-literal
// export type skinName = string;

// // tslint:disable-next-line:interface-over-type-literal
// export type getUIControlContribute<specificData, outputData> = (_1: skinName) => uiControlContribute<specificData, outputData>;
