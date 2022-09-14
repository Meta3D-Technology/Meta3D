import { api, extensionName, state as meta3dState } from "meta3d-type/src/Index"
import { uiExtensionName, elementName } from "../contribute/UIType"
import { elementContribute, reducerData } from "../contribute/ElementContributeType"
import { state, ioData } from "../state/StateType"
import { skinContribute, skinName } from "../contribute/SkinContributeType"
import { customControlContribute, customControlFunc, customControlName } from "../contribute/CustomControlContributeType"

type rect = {
    x: number,
    y: number,
    width: number,
    height: number,
}

type text = string

type color = string

export type service = {
    readonly registerElement: < elementState> (
        state: state,
        elementContribute: elementContribute<elementState>
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
        elementName: elementName
    ) => state;
    readonly hide: (
        state: state,
        elementName: elementName
    ) => state;
    readonly isStateChange: (
        state: state,
        elementName: elementName
    ) => boolean;
    readonly getElementState: <elementState> (
        state: state,
        elementName: elementName
    ) => // TODO use nullable.d
        elementState | null | undefined;
    readonly combineReducers: <elementState, action> (
        state: state,
        reducerData: reducerData<elementState, action>
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
