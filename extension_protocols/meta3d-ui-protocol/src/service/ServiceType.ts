import { state as meta3dState } from "meta3d-type/src/Index"
import { registerData, uiExtensionName, id } from "../contribute_points/UIType"
import { state } from "../state/StateType"

export type drawButtonData = {
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
}

export type onClickFunc = (meta3dState: meta3dState) => Promise<meta3dState>

export type service = {
    readonly register: < execState> (
        state: state,
        registerData: registerData<execState>
    ) => state;
    readonly render: (
        meta3dState: meta3dState,
        uiExtensionName: uiExtensionName
    ) => Promise<meta3dState>;
    readonly markRender: (
        state: state,
        id: id
    ) => state;
    readonly markNotRender: (
        state: state,
        id: id
    ) => state;
    readonly getExecState: <execState> (
        state: state,
        id: id
    ) => // TODO use nullable.d
        execState | null | undefined;
    readonly drawButton: (
        meta3dState: meta3dState,
        drawButtonData: drawButtonData,
        onClickFunc: onClickFunc
    ) => Promise<meta3dState>;
};
