import { state as meta3dState, extensionName } from "meta3d-type/src/Index"
import { actionName, actionContribute } from "../contribute/ActionContributeType"
import { state } from "../state/StateType"
import { customEvent } from "./EventType.gen"
import { browser } from "./BrowserType.gen"

type eventExtensionName = extensionName

type pointEventName =
    "meta3d_pointdown"
    | "meta3d_pointup"
    | "meta3d_pointtap"
    | "meta3d_pointmove"
    | "meta3d_pointscale"
    | "meta3d_pointdragstart"
    | "meta3d_pointdragover"
    | "meta3d_pointdragdrop"

type priority = number

type handleFunc = (customEvent: customEvent) => void

export type service = {
    trigger: <actionData> (
        meta3dState: meta3dState,
        eventExtensionName: eventExtensionName,
        actionName: actionName,
        actionData: actionData
    ) => Promise<meta3dState>;
    registerAction: <actionData>(
        state: state,
        actionContribute: actionContribute<actionData>
    ) => state;
    onPointEvent(
        eventExtensionName: eventExtensionName,
        [pointEventName, priority, handleFunc]: [pointEventName, priority, handleFunc]
    ): void;
    initEvent(
        meta3dState: meta3dState,
        eventExtensionName: eventExtensionName,
    ): meta3dState;
    setBrowser(
        meta3dState: meta3dState,
        eventExtensionName: eventExtensionName,
        browser: browser
    ): meta3dState;
    setCanvas(
        meta3dState: meta3dState,
        eventExtensionName: eventExtensionName,
        canvas: HTMLCanvasElement
    ): meta3dState;
    setBody(
        meta3dState: meta3dState,
        eventExtensionName: eventExtensionName,
        body: HTMLBodyElement
    ): meta3dState;
    getBrowserChromeType(): browser;
    getBrowserFirefoxType(): browser;
    getBrowserAndroidType(): browser;
    getBrowserIOSType(): browser;
    getBrowserUnknownType(): browser;
    getPointDownEventName(): pointEventName;
    getPointUpEventName(): pointEventName;
    getPointTapEventName(): pointEventName;
    getPointMoveEventName(): pointEventName;
    getPointScaleEventName(): pointEventName;
    getPointDragStartEventName(): pointEventName;
    getPointDragOverEventName(): pointEventName;
};