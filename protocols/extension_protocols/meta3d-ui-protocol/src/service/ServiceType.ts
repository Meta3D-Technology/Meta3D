import { api, extensionName, state as meta3dState } from "meta3d-type/src/Index"
import { elementContribute, elementName } from "../contribute/ElementContributeType"
import { state, ioData } from "../state/StateType"
import { skinContribute, skinName } from "../contribute/SkinContributeType"
import { uiControlContribute, uiControlFunc, uiControlName } from "../contribute/UIControlContributeType"
import { color, rect } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export type uiExtensionName = extensionName

export type imguiRendererExtensionName = extensionName


// type rect = {
//     x: number,
//     y: number,
//     width: number,
//     height: number,
// }

// type text = string

// type color = string


type elementStateField = any

type updateElementStateFieldFunc = (elementStateField: elementStateField) => elementStateField


export type service = {
    readonly registerElement: < elementState> (
        state: state,
        elementContribute: elementContribute<elementState>
    ) => state;
    readonly registerSkin: <skin> (
        state: state,
        skinContribute: skinContribute<skin>
    ) => state;
    readonly registerUIControl: < inputData, outputData> (
        state: state,
        uiControlContribute: uiControlContribute<inputData, outputData>
    ) => state;
    readonly getSkin: <skin> (
        state: state,
        skinName: skinName
    ) => skinContribute<skin>;
    readonly getUIControl: < inputData, outputData> (
        state: state,
        uiControlName: uiControlName
    ) => uiControlFunc<inputData, outputData>;
    readonly init: (
        meta3dState: meta3dState,
        [api, imguiRendererExtensionName]: [api, imguiRendererExtensionName],
        isDebug: boolean,
        canvas: HTMLCanvasElement
    ) => meta3dState;
    readonly render: (
        meta3dState: meta3dState,
        [uiExtensionName, imguiRendererExtensionName]: [uiExtensionName, imguiRendererExtensionName],
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
    readonly dispatch: <action> (
        state: state,
        actionName: string,
        role: string,
        updateElementStateFieldFunc: updateElementStateFieldFunc
    ) => state;
    readonly getIOData: (
        state: state,
    ) => ioData;
    readonly drawBox: (
        meta3dState: meta3dState,
        rect: rect,
        backgroundColor: color
    ) => meta3dState
    // readonly drawText: (
    //     meta3dState: meta3dState,
    //     [api, uiExtensionName]: [api, extensionName],
    //     rect: rect,
    //     text: text
    // ) => meta3dState
};
