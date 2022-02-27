import { api, extensionName, state as meta3dState } from "meta3d-type/src/Index"
import { registerData, uiExtensionName, id, reducerData } from "../contribute_points/UIType"
import { state, ioData } from "../state/StateType"
import { skinContribute, skinName } from "../contribute_points/ISkin"
import { customControlContribute, customControlFunc, customControlName } from "../contribute_points/ICustomControl"

type rect = {
    x: number,
    y: number,
    width: number,
    height: number,
}

type text = string

type color = string


export type service = {
    readonly register: < execState> (
        state: state,
        registerData: registerData<execState>
    ) => state;
    readonly registerSkin: < buttonStyle> (
        state: state,
        skinContribute: skinContribute<buttonStyle>
    ) => state;
    readonly registerCustomControl: < inputData, outputData> (
        state: state,
        customControlContribute: customControlContribute<inputData, outputData>
    ) => state;
    readonly getSkin: <buttonStyle> (
        state: state,
        skinName: skinName
    ) => skinContribute<buttonStyle>;
    readonly getCustomControl: < inputData, outputData> (
        state: state,
        customControlName: customControlName
    ) => customControlFunc<inputData, outputData>;
    readonly render: (
        meta3dState: meta3dState,
        uiExtensionName: uiExtensionName,
        ioData: ioData
    ) => Promise<meta3dState>;
    readonly show: (
        state: state,
        id: id
    ) => state;
    readonly hide: (
        state: state,
        id: id
    ) => state;
    readonly isStateChange: (
        state: state,
        id: id
    ) => boolean;
    readonly getExecState: <execState> (
        state: state,
        id: id
    ) => // TODO use nullable.d
        execState | null | undefined;
    readonly combineReducers: <execState, action> (
        state: state,
        reducerData: reducerData<execState, action>
    ) => state;
    readonly dispatch: <action> (
        state: state,
        action: action
    ) => state;
    readonly getIOData: (
        state: state,
    ) => ioData;
    readonly drawBox: (
        meta3dState: meta3dState,
        [api, uiExtensionName]: [api, extensionName],
        rect: rect,
        backgroundColor: color
    ) => meta3dState
    readonly drawText: (
        meta3dState: meta3dState,
        [api, uiExtensionName]: [api, extensionName],
        rect: rect,
        text: text
    ) => meta3dState
};
