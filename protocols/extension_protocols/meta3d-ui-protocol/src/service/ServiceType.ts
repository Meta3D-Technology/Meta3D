import { api, extensionProtocolName, state as meta3dState } from "meta3d-type/src/Index"
import { elementContribute, elementName } from "../contribute/ElementContributeType"
import { state, textureID, elementState } from "../state/StateType"
import { skinContribute, skinName } from "../contribute/SkinContributeType"
import { uiControlContribute, uiControlFunc, uiControlName } from "../contribute/UIControlContributeType"
import { style, label, pos, size, rect, texture as imguiTexture, context, imguiImplTexture, imageSrc, menuAllLabels, menuLabel, sceneTreeData, sceneTreeIndexData, sceneTreeReturnData, getValueFunc, setValueFunc } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable"
import { name } from "meta3d-gameobject-protocol"
import { localEulerAngles, localPosition, localScale } from "meta3d-component-transform-protocol"

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
        state: state,
        elementContribute: elementContribute<elementState>
    ) => state;
    readonly registerSkin: <skin> (
        state: state,
        skinContribute: skinContribute<skin>
    ) => state;
    readonly registerUIControl: <inputData, outputData> (
        state: state,
        uiControlContribute: uiControlContribute<inputData, outputData>
    ) => state;
    readonly getSkin: <skin> (
        state: state,
        skinName: skinName
    ) => nullable<skinContribute<skin>>;
    readonly getUIControlFunc: < inputData, outputData> (
        state: state,
        uiControlName: uiControlName
    ) => uiControlFunc<inputData, outputData>;
    // readonly updateUIControlName: (
    //     meta3dState: meta3dState,
    //     [api, uiExtensionProtocolName]: [api, uiExtensionProtocolName],
    //     [oldUIControlName, newUIControlName]: [uiControlName, uiControlName]
    // ) => meta3dState;
    readonly getUIControlState: <uiControlState> (
        state: state,
        uiControlName: uiControlName,
    ) => nullable<uiControlState>;
    readonly setUIControlState: <uiControlState> (
        state: state,
        uiControlName: uiControlName,
        uiControlState: uiControlState
    ) => state;
    // readonly prepare: (
    //     meta3dState: meta3dState,
    //     allUIControlContributes: Array<uiControlContribute<uiControlState, inputData, outputData>>
    // ) => Promise<meta3dState>;
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
        state: state
    ) => nullable<elementState>;
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
    ) => nullable<elementState>;
    // readonly dispatch: <action> (
    //     state: state,
    //     actionName: string,
    //     role: string,
    //     updateElementStateFieldFunc: updateElementStateFieldFunc
    // ) => state;
    readonly updateElementState: (
        state: state,
        updateElementStateFunc: updateElementStateFunc
    ) => state;
    readonly setStyle: (
        meta3dState: meta3dState,
        style: style
    ) => meta3dState;
    readonly beginWindow: (
        meta3dState: meta3dState,
        label: label
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
        state: state,
        textureID: textureID,
    ) => nullable<texture>;
    readonly setFBOTexture: (
        state: state,
        textureID: textureID,
        texture: texture
    ) => state;
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
        textures: { "loadGlbTexture": imguiImplTexture, "removeAssetTexture": imguiImplTexture, "glbTexture": imguiImplTexture },
        glbs: Array<[string, string]>,
        label: label,
        rect: rect,
    ) => [meta3dState, [boolean, boolean, nullable<string>]];
    readonly menu: (
        meta3dState: meta3dState,
        allLabels: menuAllLabels,
        windowName: string,
        rect: rect,
    ) => [meta3dState, nullable<menuLabel>];
    readonly sceneTree: (
        meta3dState: meta3dState,
        sceneTreeData: sceneTreeData,
        lastSceneTreeSelectedData: nullable<sceneTreeIndexData>,
        textures: {
            "addCubeTexture": imguiImplTexture,
            "disposeTexture": imguiImplTexture,
            "cloneTexture": imguiImplTexture,
            // "cameraIconTexture": imguiImplTexture,
            // "meshIconTexture": imguiImplTexture,
            // "lightIconTexture": imguiImplTexture,
        }, windowName: string, rect: rect) => [meta3dState, sceneTreeReturnData];
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
    readonly runStopButton: (
        meta3dState: meta3dState,
        isRunState: boolean,
        textures: {
            "runTexture": imguiImplTexture,
            "stopTexture": imguiImplTexture,
        },
        size: size
    ) => [meta3dState, [boolean, boolean]];
    readonly handleDragDropTarget: <data> (
        meta3dState: meta3dState,
        type: string
    ) => [meta3dState, nullable<data>],
};
