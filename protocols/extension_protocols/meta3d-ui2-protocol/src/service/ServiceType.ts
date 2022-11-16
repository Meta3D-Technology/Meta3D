import { api, extensionName, state as meta3dState } from "meta3d-type/src/Index"
import { elementContribute, elementName } from "../contribute/ElementContributeType"
import { state } from "../state/StateType"
import { skinContribute, skinName } from "../contribute/SkinContributeType"
import { uiControlContribute, uiControlFunc, uiControlName } from "../contribute/UIControlContributeType"
import { label, rect } from "meta3d-imgui-renderer2-protocol/src/service/ServiceType"

export type uiExtensionName = extensionName

export type imguiRendererExtensionName = extensionName

type time = number

type elementStateField = any

type updateElementStateFieldFunc = (elementStateField: elementStateField) => elementStateField

type clearColor = [number, number, number, number]

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
        isInitEvent: boolean,
        isDebug: boolean,
        canvas: HTMLCanvasElement
    ) => Promise<meta3dState>;
    readonly clear: (
        meta3dState: meta3dState,
        [api, imguiRendererExtensionName]: [api, imguiRendererExtensionName],
        clearColor: clearColor
    ) => meta3dState;
    readonly render: (
        meta3dState: meta3dState,
        [uiExtensionName, imguiRendererExtensionName]: [uiExtensionName, imguiRendererExtensionName],
        time: time
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
    readonly beginWindow: (
        meta3dState: meta3dState,
        label: label
    ) => meta3dState;
    readonly endWindow: (
        meta3dState: meta3dState
    ) => meta3dState;
    readonly setNextWindowRect: (
        meta3dState: meta3dState,
        rect: rect
    ) => meta3dState;
};
