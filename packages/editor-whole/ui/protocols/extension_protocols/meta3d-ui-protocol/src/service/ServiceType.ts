import { api, extensionProtocolName, state as meta3dState } from "meta3d-type/src/Index"
import { elementContribute, elementName } from "../contribute/ElementContributeType"
import { textureID, elementState } from "../state/StateType"
import { skinContribute, skinName } from "../contribute/SkinContributeType"
import { uiControlContribute, uiControlFunc, uiControlName } from "../contribute/UIControlContributeType"
import { style, label, pos, size, rect, texture as imguiTexture, context, imguiImplTexture, imageSrc, menuAllLabels, menuLabel, treeData, treeNodeLabel, treeIndexData, treeReturnData, windowFlags, cond, vec2 } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable"
import { name } from "meta3d-gameobject-protocol"
import { localEulerAngles, localPosition, localScale } from "meta3d-component-transform-protocol"
import { inputContribute, inputFunc, inputName } from "../contribute/InputContributeType"

export type uiExtensionProtocolName = extensionProtocolName

export type imguiRendererExtensionProtocolName = extensionProtocolName

type time = number

// type elementStateField = any

type updateElementStateFunc = (elementState: elementState) => elementState

type clearColor = [number, number, number, number]

export type texture = imguiTexture

export type isDebug = boolean

export type service = {
    readonly registerElement: < elementState> (
        meta3dState: meta3dState,
        elementContribute: elementContribute<elementState>
    ) => meta3dState;
    readonly registerSkin: <skin> (
        meta3dState: meta3dState,
        skinContribute: skinContribute<skin>
    ) => meta3dState;
    readonly registerUIControl: <inputData, specificData, outputData> (
        meta3dState: meta3dState,
        uiControlContribute: uiControlContribute<inputData, specificData, outputData>
    ) => meta3dState;
    readonly registerInput: <data> (
        meta3dState: meta3dState,
        inputContribute: inputContribute<data>
    ) => meta3dState;
    readonly getSkin: <skin> (
        meta3dState: meta3dState,
        skinName: skinName
    ) => nullable<skinContribute<skin>>;
    readonly getUIControlFunc: < inputData, specificData, outputData> (
        meta3dState: meta3dState,
        uiControlName: uiControlName
    ) => uiControlFunc<inputData, specificData, outputData>;
    readonly getInputFunc: <data> (
        meta3dState: meta3dState,
        inputName: inputName
    ) => nullable<inputFunc<data>>;
    // readonly updateUIControlName: (
    //     meta3dState: meta3dState,
    //     [api, uiExtensionProtocolName]: [api, uiExtensionProtocolName],
    //     [oldUIControlName, newUIControlName]: [uiControlName, uiControlName]
    // ) => meta3dState;
    readonly getUIControlState: <uiControlState> (
        meta3dState: meta3dState,
        uiControlName: uiControlName,
    ) => nullable<uiControlState>;
    readonly setUIControlState: <uiControlState> (
        meta3dState: meta3dState,
        uiControlName: uiControlName,
        uiControlState: uiControlState
    ) => meta3dState;
    readonly init: (
        meta3dState: meta3dState,
        [api, imguiRendererExtensionProtocolName]: [api, imguiRendererExtensionProtocolName],
        isInitEvent: boolean,
        isDebug: boolean,
        canvas: HTMLCanvasElement
    ) => Promise<meta3dState>;
    readonly clear: (
        meta3dState: meta3dState,
        [api, imguiRendererExtensionProtocolName]: [api, imguiRendererExtensionProtocolName],
        clearColor: clearColor
    ) => meta3dState;
    readonly render: (
        meta3dState: meta3dState,
        [uiExtensionProtocolName, imguiRendererExtensionProtocolName]: [uiExtensionProtocolName, imguiRendererExtensionProtocolName],
        time: time
    ) => Promise<meta3dState>;
    readonly getCurrentElementState: (
        meta3dState: meta3dState
    ) => nullable<elementState>;
    readonly show: (
        meta3dState: meta3dState,
        elementName: elementName
    ) => meta3dState;
    readonly hide: (
        meta3dState: meta3dState,
        elementName: elementName
    ) => meta3dState;
    readonly isStateChange: (
        meta3dState: meta3dState,
        elementName: elementName
    ) => boolean;
    readonly getElementState: <elementState> (
        meta3dState: meta3dState,
        elementName: elementName
    ) => nullable<elementState>;
    // readonly dispatch: <action> (
    //     meta3dState: meta3dState,
    //     actionName: string,
    //     role: string,
    //     updateElementStateFieldFunc: updateElementStateFieldFunc
    // ) => meta3dState;
    readonly updateElementState: (
        meta3dState: meta3dState,
        updateElementStateFunc: updateElementStateFunc
    ) => meta3dState;
    readonly setStyle: (
        meta3dState: meta3dState,
        style: style
    ) => meta3dState;
    readonly beginWindow: (
        meta3dState: meta3dState,
        label: label,
        flags: windowFlags
    ) => meta3dState;
    readonly endWindow: (
        meta3dState: meta3dState
    ) => meta3dState;
    readonly beginChild: (
        meta3dState: meta3dState,
        label: label
    ) => meta3dState;
    readonly endChild: (
        meta3dState: meta3dState
    ) => meta3dState;
    readonly setNextWindowRect: (
        meta3dState: meta3dState,
        rect: rect
    ) => meta3dState;
    readonly addFBOTexture: (
        meta3dState: meta3dState,
        texture: strictNullable<texture>,
        rect: rect
    ) => meta3dState;
    readonly getFBOTexture: (
        meta3dState: meta3dState,
        textureID: textureID,
    ) => nullable<texture>;
    readonly setFBOTexture: (
        meta3dState: meta3dState,
        textureID: textureID,
        texture: texture
    ) => meta3dState;
    readonly getWindowBarHeight: (
        meta3dState: meta3dState
    ) => number;
    readonly getContext: (
        meta3dState: meta3dState
    ) => context;
    readonly button: (
        meta3dState: meta3dState,
        label: label,
        size: size
    ) => [meta3dState, boolean];
    readonly setCursorPos: (
        meta3dState: meta3dState,
        pos: pos
    ) => meta3dState;
    readonly loadImage: (
        meta3dState: meta3dState,
        _1: imageSrc
    ) => Promise<imguiImplTexture>;
    readonly asset: (
        meta3dState: meta3dState,
        // textures: { "loadGlbTexture": imguiImplTexture, "removeAssetTexture": imguiImplTexture, "glbTexture": imguiImplTexture },
        // fileTexture: imguiImplTexture,
        files: Array<[string, string, imguiImplTexture]>,
        label: label,
        rect: rect,
    ) => [meta3dState, nullable<string>];
    readonly menu: (
        meta3dState: meta3dState,
        allLabels: menuAllLabels,
        windowName: string,
        rect: rect,
    ) => [meta3dState, nullable<menuLabel>];
    readonly tree: (
        meta3dState: meta3dState,
        treeData: treeData,
        rootNodeLabel: treeNodeLabel,
        lastTreeSelectedData: nullable<treeIndexData>,
        // textures:
        // {
        //     "addCubeTexture": imguiImplTexture,
        //     "disposeTexture": imguiImplTexture,
        //     "cloneTexture": imguiImplTexture,
        //     // "cameraIconTexture": imguiImplTexture,
        //     // "meshIconTexture": imguiImplTexture,
        //     // "lightIconTexture": imguiImplTexture,
        // },
        windowName: string, rect: rect) => [meta3dState, treeReturnData];
    readonly inspector: (
        meta3dState: meta3dState,
        // [
        //     getGameObjectNameFunc, setGameObjectNameFunc,
        //     getLocalPositionXFunc, setLocalPositionXFunc,
        //     getLocalPositionYFunc, setLocalPositionYFunc,
        //     getLocalPositionZFunc, setLocalPositionZFunc,
        //     getLocalEulerXFunc, setLocalEulerXFunc,
        //     getLocalEulerYFunc, setLocalEulerYFunc,
        //     getLocalEulerZFunc, setLocalEulerZFunc,
        //     getLocalScaleXFunc, setLocalScaleXFunc,
        //     getLocalScaleYFunc, setLocalScaleYFunc,
        //     getLocalScaleZFunc, setLocalScaleZFunc,
        // ]: [getValueFunc<name>, setValueFunc<name>,
        //         getValueFunc<number>, setValueFunc<number>,
        //         getValueFunc<number>, setValueFunc<number>,
        //         getValueFunc<number>, setValueFunc<number>,
        //         getValueFunc<number>, setValueFunc<number>,
        //         getValueFunc<number>, setValueFunc<number>,
        //         getValueFunc<number>, setValueFunc<number>,
        //         getValueFunc<number>, setValueFunc<number>,
        //         getValueFunc<number>, setValueFunc<number>,
        //         getValueFunc<number>, setValueFunc<number>,
        //     ],
        gameObjectName: name,
        localPosition: localPosition,
        localEulerAngles: localEulerAngles,
        localScale: localScale,
        windowName: string,
        rect: rect,
    ) => [meta3dState, [nullable<name>, nullable<localPosition>, nullable<localEulerAngles>, nullable<localScale>]];
    readonly switchButton: (
        meta3dState: meta3dState,
        isRunState: boolean,
        textures: {
            "click1Texture": imguiImplTexture,
            "click2Texture": imguiImplTexture,
        },
        size: size
    ) => [meta3dState, [boolean, boolean]];
    readonly imageButton: (
        meta3dState: meta3dState,
        clickTexture: imguiImplTexture,
        size: size
    ) => [meta3dState, boolean];
    readonly image: (
        meta3dState: meta3dState,
        clickTexture: imguiImplTexture,
        size: size
    ) => meta3dState;
    readonly inputText: (
        meta3dState: meta3dState,
        label: label,
        value: string,
        maxLength: number,
        width: number
    ) => [meta3dState, nullable<string>];
    readonly inputFloat1: (
        meta3dState: meta3dState,
        label: label,
        value: number,
        step: number,
        stepFast: number,
        width: number
    ) => [meta3dState, nullable<number>];
    readonly inputFloat3: (
        meta3dState: meta3dState,
        label: label,
        value: [number, number, number],
        step: number,
        stepFast: number,
        width: number
    ) => [meta3dState, nullable<[number, number, number]>];
    readonly checkbox: (
        meta3dState: meta3dState,
        label: label,
        value: boolean,
    ) => [meta3dState, nullable<boolean>];
    readonly collapsing: (
        meta3dState: meta3dState,
        label: label,
        isOpen: boolean,
        cond: cond
    ) => [meta3dState, boolean];
    readonly openModal: (
        meta3dState: meta3dState,
        label: label,
    ) => meta3dState;
    readonly closeCurrentModal: (
        meta3dState: meta3dState,
    ) => meta3dState;
    readonly beginModal: (
        meta3dState: meta3dState,
        label: label,
    ) => [meta3dState, boolean];
    readonly endModal: (
        meta3dState: meta3dState,
    ) => meta3dState;
    readonly popup: (
        meta3dState: meta3dState,
        label: label,
        selectedValues: Array<string>,
        id: string
    ) => [meta3dState, nullable<number>];
    readonly imagePopup: (
        meta3dState: meta3dState,
        clickTexture: imguiImplTexture,
        rect: rect,
        selectedValues: Array<string>,
        id: string
    ) => [meta3dState, nullable<number>];
    readonly handleDragDropTarget: <data> (
        meta3dState: meta3dState,
        type: string
    ) => [meta3dState, nullable<data>],
    readonly dummy: (meta3dState: meta3dState, width: number, height: number) => meta3dState;
    readonly getItemRectMax: (meta3dState: meta3dState) => vec2;
    readonly getItemRectSize: (meta3dState: meta3dState) => vec2;
    readonly getWindowPos: (meta3dState: meta3dState) => vec2;
    readonly getWindowSize: (meta3dState: meta3dState) => vec2;
};
