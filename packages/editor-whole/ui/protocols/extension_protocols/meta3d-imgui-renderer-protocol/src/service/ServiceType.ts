import type { state as StateType_state } from '../../src/state/StateType';
import type { texture as webgl1Texture } from 'meta3d-webgl1-protocol/src/service/ServiceType';
import { nullable, strictNullable } from 'meta3d-commonlib-ts/src/nullable';
import { name } from 'meta3d-gameobject-protocol';
import { localPosition, localEulerAngles, localScale } from 'meta3d-component-transform-protocol';

// tslint:disable-next-line:interface-over-type-literal
export type rect = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number
};

// tslint:disable-next-line:interface-over-type-literal
export type time = number;

// tslint:disable-next-line:interface-over-type-literal
export type clearColor = [number, number, number, number];

// tslint:disable-next-line:interface-over-type-literal
export type label = string;

// tslint:disable-next-line:interface-over-type-literal
export type size = [number, number];

// tslint:disable-next-line:interface-over-type-literal
export type pos = [number, number];

export type style = string

export type texture = webgl1Texture

// export type context = webgl1Context
export type context = any

export type imageSrc = string

export type imguiImplTexture = any

export type menuLabel = string

export type menuAllLabels = Array<[menuLabel, Array<menuLabel>]>

type sceneTreeNodeLabel = string

export type sceneTreeData = Array<[sceneTreeNodeLabel, imguiImplTexture, sceneTreeData]>

// export type level = number

type index = number

// export type sceneTreeIndexData = [level, index]
export type sceneTreeIndexData = Array<index>

export type sceneTreeDragData = {
  source: sceneTreeIndexData,
  target: sceneTreeIndexData
}

export type sceneTreeReturnData = [boolean, boolean, boolean, nullable<sceneTreeIndexData>, nullable<sceneTreeDragData>]

export type sceneTreeFunc = (sceneTreeData: sceneTreeData,
  lastSceneTreeSelectedData: nullable<sceneTreeIndexData>,
  textures: {
    "addCubeTexture": imguiImplTexture,
    "disposeTexture": imguiImplTexture,
    "cloneTexture": imguiImplTexture
  }, windowName: string, rect: rect) => sceneTreeReturnData

export type assetFunc = (
  textures: {
    "loadGlbTexture": imguiImplTexture,
    "removeAssetTexture": imguiImplTexture,
    "glbTexture": imguiImplTexture,
    // "cameraIconTexture": imguiImplTexture,
    // "meshIconTexture": imguiImplTexture,
    // "lightIconTexture": imguiImplTexture,
  },
  glbs: Array<[string, string]>,
  label: label,
  rect: rect,
) => [boolean, boolean, nullable<string>]


export type getValueFunc<T> = () => T

export type setValueFunc<T> = (value: T) => void

export type inspectorFunc = (
  // [
  //   getGameObjectNameFunc, setGameObjectNameFunc,
  //   getLocalPositionXFunc, setLocalPositionXFunc,
  //   getLocalPositionYFunc, setLocalPositionYFunc,
  //   getLocalPositionZFunc, setLocalPositionZFunc,
  //   getLocalEulerXFunc, setLocalEulerXFunc,
  //   getLocalEulerYFunc, setLocalEulerYFunc,
  //   getLocalEulerZFunc, setLocalEulerZFunc,
  //   getLocalScaleXFunc, setLocalScaleXFunc,
  //   getLocalScaleYFunc, setLocalScaleYFunc,
  //   getLocalScaleZFunc, setLocalScaleZFunc,
  // ]: [getValueFunc<name>, setValueFunc<name>,
  //     getValueFunc<number>, setValueFunc<number>,
  //     getValueFunc<number>, setValueFunc<number>,
  //     getValueFunc<number>, setValueFunc<number>,
  //     getValueFunc<number>, setValueFunc<number>,
  //     getValueFunc<number>, setValueFunc<number>,
  //     getValueFunc<number>, setValueFunc<number>,
  //     getValueFunc<number>, setValueFunc<number>,
  //     getValueFunc<number>, setValueFunc<number>,
  //     getValueFunc<number>, setValueFunc<number>,
  //   ],

  gameObjectName: name,
  localPosition: localPosition,
  localEulerAngles: localEulerAngles,
  localScale: localScale,
  windowName: string,
  rect: rect,
) => [nullable<name>, nullable<localPosition>, nullable<localEulerAngles>, nullable<localScale>]

export type ref<T> = {
  content: T
}

// tslint:disable-next-line:interface-over-type-literal
export type service = {
  readonly init: (_1: StateType_state, _2: boolean, _3: boolean, _4: HTMLCanvasElement) => Promise<StateType_state>;
  readonly render: () => void;
  readonly setStyle: (_1: StateType_state, _2: style) => StateType_state;
  readonly beforeExec: (_1: StateType_state, _2: time) => StateType_state;
  readonly afterExec: () => void;
  readonly clear: (_1: clearColor) => void;
  readonly beginWindow: (_1: label) => void;
  readonly endWindow: () => void;
  readonly beginChild: (_1: label) => void;
  readonly endChild: () => void;
  readonly setNextWindowRect: (_1: rect) => void;
  readonly addFBOTexture: (_1: strictNullable<texture>, _2: rect) => void;
  readonly getWindowBarHeight: () => number;
  readonly button: (_1: label, _2: size) => boolean;
  readonly setCursorPos: (_1: pos) => void
  readonly loadImage: (_1: imageSrc) => Promise<imguiImplTexture>;
  readonly asset: assetFunc;
  readonly handleDragDropTarget: <data> (type: string) => nullable<data>;
  readonly menu: (allLabels: menuAllLabels, windowName: string, rect: rect) => nullable<menuLabel>;
  readonly sceneTree: sceneTreeFunc;
  readonly inspector: inspectorFunc;
  readonly runStopButton: (
    isRunState: boolean,
    textures: {
      "runTexture": imguiImplTexture,
      "stopTexture": imguiImplTexture,
    },
    size: size
  ) => [boolean, boolean];
  readonly getContext: () => context
};
