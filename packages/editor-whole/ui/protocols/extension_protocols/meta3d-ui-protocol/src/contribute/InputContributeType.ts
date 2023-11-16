import type { state as Meta3dType_Index_state } from 'meta3d-type/src/Index';

export type inputName = string;

export type inputFunc<data> = (_1: Meta3dType_Index_state) => Promise<data>;

export type inputContribute<data> = {
    inputName: inputName;
    func: inputFunc<data>
};
