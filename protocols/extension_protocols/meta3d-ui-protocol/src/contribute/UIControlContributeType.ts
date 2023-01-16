import type { state as Meta3dType_Index_state } from 'meta3d-type/src/Index';

// tslint:disable-next-line:interface-over-type-literal
export type uiControlName = string;

// tslint:disable-next-line:interface-over-type-literal
export type uiControlFunc<inputData, outputData> = (_1: Meta3dType_Index_state, _2: inputData) => Promise<[Meta3dType_Index_state, outputData]>;

// tslint:disable-next-line:interface-over-type-literal
// export type uiControlContribute<uiControlState, inputData, outputData> = {
//     readonly uiControlName: uiControlName;
//     readonly createStateFunc: () => uiControlState;
//     readonly func: uiControlFunc<inputData, outputData>
// };

export type uiControlContribute<inputData, outputData> = {
    readonly uiControlName: uiControlName;
    readonly func: uiControlFunc<inputData, outputData>
};


// tslint:disable-next-line:interface-over-type-literal
// export type skinName = string;

// // tslint:disable-next-line:interface-over-type-literal
// export type getUIControlContribute<inputData, outputData> = (_1: skinName) => uiControlContribute<inputData, outputData>;
