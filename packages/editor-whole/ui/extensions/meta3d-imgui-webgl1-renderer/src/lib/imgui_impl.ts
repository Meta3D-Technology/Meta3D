import { Font } from "./font";
import * as ImGui from "./imgui";
import * as Input from "./input";

let clipboard_text: string = "";

export let canvas: HTMLCanvasElement | null = null;

export let canvas_scale: number = ImGui.isMobile.any() ? 1 : window.devicePixelRatio;
export let font_scale: number = Math.max(window.devicePixelRatio, 1.5);

export function setCanvasScale(scale: number): void {
    canvas_scale = scale;
}
export function setFontScale(scale: number): void {
    font_scale = scale;
}

export let gl: WebGL2RenderingContext | WebGLRenderingContext | null = null;
let g_ShaderHandle: WebGLProgram | null = null;
let g_VertHandle: WebGLShader | null = null;
let g_FragHandle: WebGLShader | null = null;
let g_AttribLocationTex: WebGLUniformLocation | null = null;
let g_AttribLocationProjMtx: WebGLUniformLocation | null = null;
let g_AttribLocationPosition: GLint = -1;
let g_AttribLocationUV: GLint = -1;
let g_AttribLocationColor: GLint = -1;
let g_VboHandle: WebGLBuffer | null = null;
let g_ElementsHandle: WebGLBuffer | null = null;
let g_FontTexture: WebGLTexture | null = null;
const enable_vao: boolean = true;
let g_vao: WebGLVertexArrayObject;
// let has_videoframe: boolean = typeof VideoFrame !== "undefined";

export let ctx: CanvasRenderingContext2D | null = null;

let prev_time: number = 0;

function document_on_copy(event: ClipboardEvent): void {
    if (event.clipboardData) {
        event.clipboardData.setData("text/plain", clipboard_text);
    }
    // console.log(`${event.type}: "${clipboard_text}"`);
    event.preventDefault();
}

function document_on_cut(event: ClipboardEvent): void {
    if (event.clipboardData) {
        event.clipboardData.setData("text/plain", clipboard_text);
    }
    // console.log(`${event.type}: "${clipboard_text}"`);
    event.preventDefault();
}

function document_on_paste(event: ClipboardEvent): void {
    if (event.clipboardData) {
        clipboard_text = event.clipboardData.getData("text/plain");
    }
    // console.log(`${event.type}: "${clipboard_text}"`);
    event.preventDefault();
}

export function window_on_resize(): void {
    if (canvas !== null) {
        canvas.width = canvas.scrollWidth * canvas_scale;
        canvas.height = canvas.scrollHeight * canvas_scale;
        //canvas.width = canvas.scrollWidth;
        //canvas.height = canvas.scrollHeight;
    }
}

function window_on_gamepadconnected(event: any /* GamepadEvent */): void {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        event.gamepad.index, event.gamepad.id,
        event.gamepad.buttons.length, event.gamepad.axes.length);
}

function window_on_gamepaddisconnected(event: any /* GamepadEvent */): void {
    console.log("Gamepad disconnected at index %d: %s.",
        event.gamepad.index, event.gamepad.id);
}

export function canvas_on_blur(event: FocusEvent): void {
    const io = ImGui.GetIO();
    io.KeyCtrl = false;
    io.KeyShift = false;
    io.KeyAlt = false;
    io.KeySuper = false;
    for (let i = 0; i < io.KeysDown.length; ++i) {
        io.KeysDown[i] = false;
    }
    for (let i = 0; i < io.MouseDown.length; ++i) {
        io.MouseDown[i] = false;
    }
    console.log("canvas_on_blur");
}

const key_code_to_index: Record<string, number> = {
    "Tab": 9,
    "Enter": 13,
    "Escape": 27,
    "ArrowLeft": 37,
    "ArrowUp": 38,
    "ArrowRight": 39,
    "ArrowDown": 40,
    "NumpadEnter": 176,
};

function canvas_on_keydown(event: KeyboardEvent): void {
    const key_index: number = key_code_to_index[event.code] || event.key.charCodeAt(0);
    //console.log(event.type, event.key, event.code, key_index);
    const io = ImGui.GetIO();
    io.KeyCtrl = event.ctrlKey;
    io.KeyShift = event.shiftKey;
    io.KeyAlt = event.altKey;
    io.KeySuper = event.metaKey;
    ImGui.ASSERT(key_index >= 0 && key_index < ImGui.ARRAYSIZE(io.KeysDown));
    io.KeysDown[key_index] = true;
    // forward to the keypress event
    if (/*io.WantCaptureKeyboard ||*/ key_index == 9) {
        event.preventDefault();
    }
}

function canvas_on_keyup(event: KeyboardEvent): void {
    const key_index: number = key_code_to_index[event.code] || event.key.charCodeAt(0);
    //console.log(event.type, event.key, event.code, key_index);
    const io = ImGui.GetIO();
    io.KeyCtrl = event.ctrlKey;
    io.KeyShift = event.shiftKey;
    io.KeyAlt = event.altKey;
    io.KeySuper = event.metaKey;
    ImGui.ASSERT(key_index >= 0 && key_index < ImGui.ARRAYSIZE(io.KeysDown));
    io.KeysDown[key_index] = false;
    if (io.WantCaptureKeyboard || key_index == 9) {
        event.preventDefault();
    }
}

function canvas_on_keypress(event: KeyboardEvent): void {
    //console.log(event);
    const io = ImGui.GetIO();
    io.AddInputCharacter(event.charCode);
    if (io.WantCaptureKeyboard) {
        event.preventDefault();
    }
}

function canvas_on_pointermove(event: PointerEvent): void {
    const io = ImGui.GetIO();
    io.MousePos.x = event.offsetX;
    io.MousePos.y = event.offsetY;
    if (io.WantCaptureMouse) {
        event.preventDefault();
    }
}

// MouseEvent.button
// A number representing a given button:
// 0: Main button pressed, usually the left button or the un-initialized state
// 1: Auxiliary button pressed, usually the wheel button or the middle button (if present)
// 2: Secondary button pressed, usually the right button
// 3: Fourth button, typically the Browser Back button
// 4: Fifth button, typically the Browser Forward button
const mouse_button_map: number[] = [0, 2, 1, 3, 4];

export function any_pointerdown(): boolean {
    const io = ImGui.GetIO();
    for (let i = 0; i < io.MouseDown.length; i++) {
        if (io.MouseDown[i])
            return true;
    }
    return false;
}

function canvas_on_pointerdown(event: PointerEvent): void {
    if (event.target != canvas)
        return;
    const io = ImGui.GetIO();
    io.MousePos.x = event.offsetX;
    io.MousePos.y = event.offsetY;
    io.MouseDown[mouse_button_map[event.button]] = true;
    // if (io.WantCaptureMouse) {
    //     event.preventDefault();
    // }
    //console.log("canvas_on_pointerdown", event);
}
function canvas_on_contextmenu(event: Event): void {
    const io = ImGui.GetIO();
    if (io.WantCaptureMouse) {
        event.preventDefault();
    }
}

function canvas_on_pointerup(event: PointerEvent): void {
    const io = ImGui.GetIO();
    io.MouseDown[mouse_button_map[event.button]] = false;
    if (io.WantCaptureMouse) {
        event.preventDefault();
    }
    //console.log("canvas_on_pointerup", event);
}

function canvas_on_wheel(event: WheelEvent): void {
    const io = ImGui.GetIO();
    let scale: number = 1.0;
    switch (event.deltaMode) {
        case event.DOM_DELTA_PIXEL: scale = 0.01; break;
        case event.DOM_DELTA_LINE: scale = 0.2; break;
        case event.DOM_DELTA_PAGE: scale = 1.0; break;
    }
    io.MouseWheelH = event.deltaX * scale;
    io.MouseWheel = -event.deltaY * scale; // Mouse wheel: 1 unit scrolls about 5 lines text.
    if (io.WantCaptureMouse) {
        event.preventDefault();
    }
}

let touch_count: number = 0;
let touch_id: number;
export class ITouch {
    x: number;
    y: number;
}
export let multi_touch: { [key: number]: ITouch } = {};

function canvas_on_touchstart(event: TouchEvent): void {
    for (let i = 0; i < event.changedTouches.length; i++) {
        let touch = event.changedTouches[i];
        touch_id = touch.identifier;
        multi_touch[touch.identifier] = { x: touch.clientX, y: touch.clientY };
    }
    let mtouch = multi_touch[touch_id];
    let io = ImGui.GetIO();
    io.MousePos.x = mtouch.x;
    io.MousePos.y = mtouch.y;
    io.MouseDown[0] = true;
}
function canvas_on_touchmove(event: TouchEvent): void {
    for (let i = 0; i < event.changedTouches.length; i++) {
        let touch = event.changedTouches[i];
        multi_touch[touch.identifier] = { x: touch.clientX, y: touch.clientY };
    }
    let mtouch = multi_touch[touch_id];
    let io = ImGui.GetIO();
    io.MousePos.x = mtouch.x;
    io.MousePos.y = mtouch.y;
}
function canvas_on_touchend(event: TouchEvent): void {
    let io = ImGui.GetIO();
    for (let i = 0; i < event.changedTouches.length; i++) {
        let touch = event.changedTouches[i];
        if (touch.identifier == touch_id) {
            io.MouseDown[0] = false;
        }
        delete multi_touch[touch.identifier];
    }
    touch_count++;
    if (touch_count >= 200) {
        multi_touch = {}
    }
}
function canvas_on_touchcancel(event: TouchEvent): void {
    canvas_on_touchend(event);
}

export let is_contextlost: boolean = false;
export function add_key_event(): void {
    window.addEventListener("keydown", canvas_on_keydown);
    window.addEventListener("keyup", canvas_on_keyup);
    window.addEventListener("keypress", canvas_on_keypress);
}
export function remove_key_event(): void {
    window.removeEventListener("keydown", canvas_on_keydown);
    window.removeEventListener("keyup", canvas_on_keyup);
    window.removeEventListener("keypress", canvas_on_keypress);
}

export function add_pointer_event(): void {
    if (canvas) {
        canvas.addEventListener("pointermove", canvas_on_pointermove);
        canvas.addEventListener("wheel", canvas_on_wheel);
        //canvas.addEventListener("pointerdown", canvas_on_pointerdown);
        //canvas.addEventListener("pointerup", canvas_on_pointerup);
        canvas.addEventListener("touchstart", canvas_on_touchstart);
        canvas.addEventListener("touchmove", canvas_on_touchmove);
        canvas.addEventListener("touchend", canvas_on_touchend);
        canvas.addEventListener("touchcancel", canvas_on_touchcancel);
    }
    window.addEventListener("pointerdown", canvas_on_pointerdown);
    window.addEventListener("pointerup", canvas_on_pointerup);
}

export function remove_pointer_event(): void {
    if (canvas) {
        canvas.removeEventListener("pointermove", canvas_on_pointermove);
        canvas.removeEventListener("wheel", canvas_on_wheel);
        //canvas.removeEventListener("pointerdown", canvas_on_pointerdown);
        //canvas.removeEventListener("pointerup", canvas_on_pointerup);
        canvas.removeEventListener("touchstart", canvas_on_touchstart);
        canvas.removeEventListener("touchmove", canvas_on_touchmove);
        canvas.removeEventListener("touchend", canvas_on_touchend);
        canvas.removeEventListener("touchcancel", canvas_on_touchcancel);
    }
    window.removeEventListener("pointerdown", canvas_on_pointerdown);
    window.removeEventListener("pointerup", canvas_on_pointerup);

}

function canvas_on_contextlost(e: Event): void {
    e.preventDefault();
    console.log("canvas_on_contextlost");
    is_contextlost = true;
}

function canvas_on_contextrestored(e: Event): void {
    console.log("canvas_on_contextrestored");
    Init(canvas);
    is_contextlost = false;
}

export function Init(value: HTMLCanvasElement | WebGL2RenderingContext | WebGLRenderingContext | CanvasRenderingContext2D | null): void {
    const io = ImGui.GetIO();

    if (typeof (window) !== "undefined") {
        io.BackendPlatformName = "imgui_impl_browser";
        ImGui.LoadIniSettingsFromMemory(window.localStorage.getItem("imgui.ini") || "");
    }
    else {
        io.BackendPlatformName = "imgui_impl_console";
    }

    if (typeof (navigator) !== "undefined") {
        io.ConfigMacOSXBehaviors = navigator.platform.match(/Mac/) !== null;
    }

    /*
    if (typeof(document) !== "undefined") {
        document.body.addEventListener("copy", document_on_copy);
        document.body.addEventListener("cut", document_on_cut);
        document.body.addEventListener("paste", document_on_paste);
    }
    */

    // io.SetClipboardTextFn = (user_data: any, text: string): void => {
    //     clipboard_text = text;
    //     // console.log(`set clipboard_text: "${clipboard_text}"`);
    //     if (typeof navigator !== "undefined" && typeof (navigator as any).clipboard !== "undefined") {
    //         // console.log(`clipboard.writeText: "${clipboard_text}"`);
    //         (navigator as any).clipboard.writeText(clipboard_text).then((): void => {
    //             // console.log(`clipboard.writeText: "${clipboard_text}" done.`);
    //         });
    //     }
    // };
    // io.GetClipboardTextFn = (user_data: any): string => {
    //     // if (typeof navigator !== "undefined" && typeof (navigator as any).clipboard !== "undefined") {
    //     //     console.log(`clipboard.readText: "${clipboard_text}"`);
    //     //     (navigator as any).clipboard.readText().then((text: string): void => {
    //     //         clipboard_text = text;
    //     //         console.log(`clipboard.readText: "${clipboard_text}" done.`);
    //     //     });
    //     // }
    //     // console.log(`get clipboard_text: "${clipboard_text}"`);
    //     return clipboard_text;
    // };
    // io.ClipboardUserData = null;

    // if (typeof (window) !== "undefined") {
    //     window.addEventListener("resize", window_on_resize);
    //     window.addEventListener("gamepadconnected", window_on_gamepadconnected);
    //     window.addEventListener("gamepaddisconnected", window_on_gamepaddisconnected);
    // }

    if (typeof (window) !== "undefined") {
        if (value instanceof (HTMLCanvasElement)) {
            canvas = value;
            value = canvas.getContext("webgl2", { alpha: false }) || canvas.getContext("webgl", { alpha: false }) || canvas.getContext("2d");
        }
        if (typeof WebGL2RenderingContext !== "undefined" && value instanceof (WebGL2RenderingContext)) {
            io.BackendRendererName = "imgui_impl_webgl2";
            canvas = canvas || value.canvas as HTMLCanvasElement;
            gl = value;
        }
        else if (typeof WebGLRenderingContext !== "undefined" && value instanceof (WebGLRenderingContext)) {
            io.BackendRendererName = "imgui_impl_webgl";
            canvas = canvas || value.canvas as HTMLCanvasElement;
            gl = value;
        }
        else if (typeof CanvasRenderingContext2D !== "undefined" && value instanceof (CanvasRenderingContext2D)) {
            io.BackendRendererName = "imgui_impl_2d";
            canvas = canvas || value.canvas;
            ctx = value;
        }
    }

    // if (canvas !== null) {
    //     window_on_resize();
    //     canvas.style.touchAction = "none"; // Disable browser handling of all panning and zooming gestures.
    //     canvas.addEventListener("blur", canvas_on_blur);
    //     add_key_event();
    //     add_pointer_event();
    //     canvas.addEventListener("contextmenu", canvas_on_contextmenu);

    //     canvas.addEventListener('webglcontextlost', canvas_on_contextlost, false);
    //     canvas.addEventListener('webglcontextrestored', canvas_on_contextrestored, false);
    // }

    // Setup back-end capabilities flags
    io.BackendFlags |= ImGui.BackendFlags.HasMouseCursors;   // We can honor GetMouseCursor() values (optional)

    // Keyboard mapping. ImGui will use those indices to peek into the io.KeyDown[] array.
    io.KeyMap[ImGui.Key.Tab] = 9;
    io.KeyMap[ImGui.Key.LeftArrow] = 37;
    io.KeyMap[ImGui.Key.RightArrow] = 39;
    io.KeyMap[ImGui.Key.UpArrow] = 38;
    io.KeyMap[ImGui.Key.DownArrow] = 40;
    io.KeyMap[ImGui.Key.PageUp] = 33;
    io.KeyMap[ImGui.Key.PageDown] = 34;
    io.KeyMap[ImGui.Key.Home] = 36;
    io.KeyMap[ImGui.Key.End] = 35;
    io.KeyMap[ImGui.Key.Insert] = 45;
    io.KeyMap[ImGui.Key.Delete] = 46;
    io.KeyMap[ImGui.Key.Backspace] = 8;
    io.KeyMap[ImGui.Key.Space] = 32;
    io.KeyMap[ImGui.Key.Enter] = 13;
    io.KeyMap[ImGui.Key.Escape] = 27;
    io.KeyMap[ImGui.Key.KeyPadEnter] = key_code_to_index["NumpadEnter"];
    io.KeyMap[ImGui.Key.A] = 65;
    io.KeyMap[ImGui.Key.C] = 67;
    io.KeyMap[ImGui.Key.V] = 86;
    io.KeyMap[ImGui.Key.X] = 88;
    io.KeyMap[ImGui.Key.Y] = 89;
    io.KeyMap[ImGui.Key.Z] = 90;

    CreateDeviceObjects();
}

export function Shutdown(): void {
    DestroyDeviceObjects();

    remove_key_event();
    remove_pointer_event();
    if (canvas !== null) {
        canvas.removeEventListener("blur", canvas_on_blur);
        canvas.removeEventListener("contextmenu", canvas_on_contextmenu);
    }

    gl = null;
    ctx = null;
    canvas = null;

    if (typeof (window) !== "undefined") {
        window.removeEventListener("resize", window_on_resize);
        window.removeEventListener("gamepadconnected", window_on_gamepadconnected);
        window.removeEventListener("gamepaddisconnected", window_on_gamepaddisconnected);
    }

    if (typeof (document) !== "undefined") {
        document.body.removeEventListener("copy", document_on_copy);
        document.body.removeEventListener("cut", document_on_cut);
        document.body.removeEventListener("paste", document_on_paste);
    }
}

export function ClearBuffer(color: ImGui.ImVec4, bufferBit: number = gl.COLOR_BUFFER_BIT) {
    gl.clearColor(color.x, color.y, color.z, color.w);
    gl.clear(bufferBit);
}

export function NewFrame(time: number): void {
    const io = ImGui.GetIO();

    if (io.WantSaveIniSettings) {
        io.WantSaveIniSettings = false;
        if (typeof (window) !== "undefined") {
            window.localStorage.setItem("imgui.ini", ImGui.SaveIniSettingsToMemory());
        }
    }

    const w: number = canvas && canvas.scrollWidth || 640;
    const h: number = canvas && canvas.scrollHeight || 480;
    const display_w: number = gl && gl.drawingBufferWidth || w;
    const display_h: number = gl && gl.drawingBufferHeight || h;
    io.DisplaySize.x = w;
    io.DisplaySize.y = h;
    io.DisplayFramebufferScale.x = w > 0 ? (display_w / w) : 0;
    io.DisplayFramebufferScale.y = h > 0 ? (display_h / h) : 0;

    // const dt: number = time - prev_time;
    let dt: number = time - prev_time;
    prev_time = time;

    /*!  refer to https://github.com/ocornut/imgui/issues/4680 */
    if (dt <= 0) {
        console.warn(`dt: ${dt} <= 0! use 0.00001 instead`);

        dt = 0.00001
    }

    io.DeltaTime = dt / 1000;

    if (io.WantSetMousePos) {
        console.log("TODO: MousePos", io.MousePos.x, io.MousePos.y);
    }

    if (typeof (document) !== "undefined") {
        if (io.MouseDrawCursor) {
            document.body.style.cursor = "none";
        } else {
            switch (ImGui.GetMouseCursor()) {
                case ImGui.MouseCursor.None: document.body.style.cursor = "none"; break;
                default: case ImGui.MouseCursor.Arrow: document.body.style.cursor = "default"; break;
                case ImGui.MouseCursor.TextInput: document.body.style.cursor = "text"; break;         // When hovering over InputText, etc.
                case ImGui.MouseCursor.ResizeAll: document.body.style.cursor = "all-scroll"; break;         // Unused
                case ImGui.MouseCursor.ResizeNS: document.body.style.cursor = "ns-resize"; break;     // When hovering over an horizontal border
                case ImGui.MouseCursor.ResizeEW: document.body.style.cursor = "ew-resize"; break;     // When hovering over a vertical border or a column
                case ImGui.MouseCursor.ResizeNESW: document.body.style.cursor = "nesw-resize"; break; // When hovering over the bottom-left corner of a window
                case ImGui.MouseCursor.ResizeNWSE: document.body.style.cursor = "nwse-resize"; break; // When hovering over the bottom-right corner of a window
                case ImGui.MouseCursor.Hand: document.body.style.cursor = "move"; break;
                case ImGui.MouseCursor.NotAllowed: document.body.style.cursor = "not-allowed"; break;
            }
        }
    }

    // Gamepad navigation mapping [BETA]
    for (let i = 0; i < io.NavInputs.length; ++i) {
        // TODO: This is currently causing an issue and I have no gamepad to test with.
        //       The error is: ''set' on proxy: trap returned falsish for property '21'
        //       I think that the NavInputs are zeroed out by ImGui at the start of each frame anyway
        //       so I am not sure if the following is even necessary.
        //io.NavInputs[i] = 0.0;
    }
    // if (io.ConfigFlags & ImGui.ConfigFlags.NavEnableGamepad) {
    //     // Update gamepad inputs
    //     const gamepads: (Gamepad | null)[] = (typeof (navigator) !== "undefined" && typeof (navigator.getGamepads) === "function") ? navigator.getGamepads() : [];
    //     for (let i = 0; i < gamepads.length; ++i) {
    //         const gamepad: Gamepad | null = gamepads[i];
    //         if (!gamepad) { continue; }
    //         io.BackendFlags |= ImGui.BackendFlags.HasGamepad;
    //         const buttons_count: number = gamepad.buttons.length;
    //         const axes_count: number = gamepad.axes.length;

    //         var MAP_BUTTON =
    //             function MAP_BUTTON(NAV_NO: number, BUTTON_NO: number): void {
    //                 if (!gamepad) { return; }
    //                 if (buttons_count > BUTTON_NO && gamepad.buttons[BUTTON_NO].pressed)
    //                     io.NavInputs[NAV_NO] = 1.0;
    //             }
    //         var MAP_ANALOG =
    //             function MAP_ANALOG(NAV_NO: number, AXIS_NO: number, V0: number, V1: number): void {
    //                 if (!gamepad) { return; }
    //                 let v: number = (axes_count > AXIS_NO) ? gamepad.axes[AXIS_NO] : V0;
    //                 v = (v - V0) / (V1 - V0);
    //                 if (v > 1.0) v = 1.0;
    //                 if (io.NavInputs[NAV_NO] < v) io.NavInputs[NAV_NO] = v;
    //             }
    //         // TODO: map input based on vendor and product id
    //         // https://developer.mozilla.org/en-US/docs/Web/API/Gamepad/id
    //         const match: RegExpMatchArray | null = gamepad.id.match(/^([0-9a-f]{4})-([0-9a-f]{4})-.*$/);
    //         const match_chrome: RegExpMatchArray | null = gamepad.id.match(/^.*\(.*Vendor: ([0-9a-f]{4}) Product: ([0-9a-f]{4})\).*$/);
    //         const vendor: string = (match && match[1]) || (match_chrome && match_chrome[1]) || "0000";
    //         const product: string = (match && match[2]) || (match_chrome && match_chrome[2]) || "0000";
    //         switch (vendor + product) {
    //             case "046dc216": // Logitech Logitech Dual Action (Vendor: 046d Product: c216)
    //                 MAP_BUTTON(ImGui.NavInput.Activate, 1); // Cross / A
    //                 MAP_BUTTON(ImGui.NavInput.Cancel, 2); // Circle / B
    //                 MAP_BUTTON(ImGui.NavInput.Menu, 0); // Square / X
    //                 MAP_BUTTON(ImGui.NavInput.Input, 3); // Triangle / Y
    //                 MAP_ANALOG(ImGui.NavInput.DpadLeft, 4, -0.3, -0.9); // D-Pad Left
    //                 MAP_ANALOG(ImGui.NavInput.DpadRight, 4, +0.3, +0.9); // D-Pad Right
    //                 MAP_ANALOG(ImGui.NavInput.DpadUp, 5, -0.3, -0.9); // D-Pad Up
    //                 MAP_ANALOG(ImGui.NavInput.DpadDown, 5, +0.3, +0.9); // D-Pad Down
    //                 MAP_BUTTON(ImGui.NavInput.FocusPrev, 4); // L1 / LB
    //                 MAP_BUTTON(ImGui.NavInput.FocusNext, 5); // R1 / RB
    //                 MAP_BUTTON(ImGui.NavInput.TweakSlow, 6); // L2 / LT
    //                 MAP_BUTTON(ImGui.NavInput.TweakFast, 7); // R2 / RT
    //                 MAP_ANALOG(ImGui.NavInput.LStickLeft, 0, -0.3, -0.9);
    //                 MAP_ANALOG(ImGui.NavInput.LStickRight, 0, +0.3, +0.9);
    //                 MAP_ANALOG(ImGui.NavInput.LStickUp, 1, -0.3, -0.9);
    //                 MAP_ANALOG(ImGui.NavInput.LStickDown, 1, +0.3, +0.9);
    //                 break;
    //             case "046dc21d": // Logitech Gamepad F310 (STANDARD GAMEPAD Vendor: 046d Product: c21d)
    //                 MAP_BUTTON(ImGui.NavInput.Activate, 0); // Cross / A
    //                 MAP_BUTTON(ImGui.NavInput.Cancel, 1); // Circle / B
    //                 MAP_BUTTON(ImGui.NavInput.Menu, 2); // Square / X
    //                 MAP_BUTTON(ImGui.NavInput.Input, 3); // Triangle / Y
    //                 MAP_BUTTON(ImGui.NavInput.DpadLeft, 14); // D-Pad Left
    //                 MAP_BUTTON(ImGui.NavInput.DpadRight, 15); // D-Pad Right
    //                 MAP_BUTTON(ImGui.NavInput.DpadUp, 12); // D-Pad Up
    //                 MAP_BUTTON(ImGui.NavInput.DpadDown, 13); // D-Pad Down
    //                 MAP_BUTTON(ImGui.NavInput.FocusPrev, 4); // L1 / LB
    //                 MAP_BUTTON(ImGui.NavInput.FocusNext, 5); // R1 / RB
    //                 MAP_ANALOG(ImGui.NavInput.TweakSlow, 6, +0.3, +0.9); // L2 / LT
    //                 MAP_ANALOG(ImGui.NavInput.TweakFast, 7, +0.3, +0.9); // R2 / RT
    //                 MAP_ANALOG(ImGui.NavInput.LStickLeft, 0, -0.3, -0.9);
    //                 MAP_ANALOG(ImGui.NavInput.LStickRight, 0, +0.3, +0.9);
    //                 MAP_ANALOG(ImGui.NavInput.LStickUp, 1, -0.3, -0.9);
    //                 MAP_ANALOG(ImGui.NavInput.LStickDown, 1, +0.3, +0.9);
    //                 break;
    //             case "2dc86001": // 8Bitdo SN30 Pro  8Bitdo SN30 Pro (Vendor: 2dc8 Product: 6001)
    //             case "2dc86101": // 8Bitdo SN30 Pro (Vendor: 2dc8 Product: 6101)
    //                 MAP_BUTTON(ImGui.NavInput.Activate, 1); // Cross / A
    //                 MAP_BUTTON(ImGui.NavInput.Cancel, 0); // Circle / B
    //                 MAP_BUTTON(ImGui.NavInput.Menu, 4); // Square / X
    //                 MAP_BUTTON(ImGui.NavInput.Input, 3); // Triangle / Y
    //                 MAP_ANALOG(ImGui.NavInput.DpadLeft, 6, -0.3, -0.9); // D-Pad Left
    //                 MAP_ANALOG(ImGui.NavInput.DpadRight, 6, +0.3, +0.9); // D-Pad Right
    //                 MAP_ANALOG(ImGui.NavInput.DpadUp, 7, -0.3, -0.9); // D-Pad Up
    //                 MAP_ANALOG(ImGui.NavInput.DpadDown, 7, +0.3, +0.9); // D-Pad Down
    //                 MAP_BUTTON(ImGui.NavInput.FocusPrev, 6); // L1 / LB
    //                 MAP_BUTTON(ImGui.NavInput.FocusNext, 7); // R1 / RB
    //                 MAP_BUTTON(ImGui.NavInput.TweakSlow, 8); // L2 / LT
    //                 MAP_BUTTON(ImGui.NavInput.TweakFast, 9); // R2 / RT
    //                 MAP_ANALOG(ImGui.NavInput.LStickLeft, 0, -0.3, -0.9);
    //                 MAP_ANALOG(ImGui.NavInput.LStickRight, 0, +0.3, +0.9);
    //                 MAP_ANALOG(ImGui.NavInput.LStickUp, 1, -0.3, -0.9);
    //                 MAP_ANALOG(ImGui.NavInput.LStickDown, 1, +0.3, +0.9);
    //                 break;
    //             default: // standard gamepad: https://w3c.github.io/gamepad/#remapping
    //                 MAP_BUTTON(ImGui.NavInput.Activate, 0); // Cross / A
    //                 MAP_BUTTON(ImGui.NavInput.Cancel, 1); // Circle / B
    //                 MAP_BUTTON(ImGui.NavInput.Menu, 2); // Square / X
    //                 MAP_BUTTON(ImGui.NavInput.Input, 3); // Triangle / Y
    //                 MAP_BUTTON(ImGui.NavInput.DpadLeft, 14); // D-Pad Left
    //                 MAP_BUTTON(ImGui.NavInput.DpadRight, 15); // D-Pad Right
    //                 MAP_BUTTON(ImGui.NavInput.DpadUp, 12); // D-Pad Up
    //                 MAP_BUTTON(ImGui.NavInput.DpadDown, 13); // D-Pad Down
    //                 MAP_BUTTON(ImGui.NavInput.FocusPrev, 4); // L1 / LB
    //                 MAP_BUTTON(ImGui.NavInput.FocusNext, 5); // R1 / RB
    //                 MAP_BUTTON(ImGui.NavInput.TweakSlow, 6); // L2 / LT
    //                 MAP_BUTTON(ImGui.NavInput.TweakFast, 7); // R2 / RT
    //                 MAP_ANALOG(ImGui.NavInput.LStickLeft, 0, -0.3, -0.9);
    //                 MAP_ANALOG(ImGui.NavInput.LStickRight, 0, +0.3, +0.9);
    //                 MAP_ANALOG(ImGui.NavInput.LStickUp, 1, -0.3, -0.9);
    //                 MAP_ANALOG(ImGui.NavInput.LStickDown, 1, +0.3, +0.9);
    //                 break;
    //         }
    //     }
    // }
}

function toRgba(col: number): string {
    const r = (col >>> 24);
    const g = (col >> 16) & 0xFF;
    const b = (col >> 8) & 0xFF;
    const a = (col & 0xFF);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

export let dom_font: Font = null;

async function font_update(io: ImGui.IO) {
    if (!dom_font) {
        dom_font = new Font;
    }
    io.Fonts.Fonts.forEach(font => {
        let glyph = font.GlyphToCreate;
        while (glyph) {
            glyph = dom_font.Create(glyph, font);
            font.GlyphCreated(glyph);
            glyph = font.GlyphToCreate;
        }
    });
    dom_font.UpdateTexture();
}

let current_window_id: ImGui.ImGuiID = 0;
export let scroll_acc: ImGui.ImVec2 = new ImGui.ImVec2(0, 0);
let mouse_first_down: boolean = false;

function scroll_update(io: ImGui.IO) {
    const hoveredWin = ImGui.GetHoveredWindow();
    const hoveredId = ImGui.GetHoveredId();
    if (hoveredWin && hoveredId == 0) {
        if (current_window_id != hoveredWin.ID) {
            current_window_id = hoveredWin.ID;
            scroll_acc.Set(0, 0);
            mouse_first_down = true;
        }

        if (hoveredWin.Flags & ImGui.ImGuiWindowFlags.NoMove) {

            let first_down = false;
            if (io.MouseDown[0]) {
                first_down = mouse_first_down;
                mouse_first_down = false;
            } else {
                mouse_first_down = true;
            }

            let scroll = new ImGui.ImVec2(hoveredWin.Scroll.x, hoveredWin.Scroll.y);
            if (hoveredWin.ScrollbarY) {
                if (io.MouseDown[0] && !first_down) {
                    scroll.y -= io.MouseDelta.y;
                    scroll_acc.y = io.MouseDelta.y;
                } else if (Math.abs(scroll_acc.y) > 1) {
                    scroll.y -= scroll_acc.y;
                    scroll_acc.y *= 0.8;
                }
                if (scroll.y < 0) scroll.y = 0;
                else if (scroll.y > hoveredWin.ScrollMax.y) {
                    scroll.y = hoveredWin.ScrollMax.y;
                }
                hoveredWin.Scroll = scroll;
            }
            if (hoveredWin.ScrollbarX) {
                if (io.MouseDown[0]) {
                    scroll.x -= io.MouseDelta.x;
                    scroll_acc.x = io.MouseDelta.x;
                }
                if (scroll.x < 0) scroll.x = 0;
                else if (scroll.x > hoveredWin.ScrollMax.x) {
                    scroll.x = hoveredWin.ScrollMax.x;
                }
                hoveredWin.Scroll = scroll;
            }
        }
    }
}

let dom_input: Input.Input;
let current_input_id: ImGui.ImGuiID = 0;
let current_input_text: string;

function input_text_update(io: ImGui.IO): void {
    const activeId = ImGui.GetActiveId();
    const inpId = ImGui.GetInputTextId();
    if (!activeId || activeId != inpId) {
        current_input_id = 0;
        return;
    }
    if (current_input_id != activeId) {
        dom_input = null;
    }

    current_input_id = activeId;
    let inpState = ImGui.GetInputTextState(activeId);
    let inp: Input.Input = dom_input;
    if (!inp) {
        let textCol = ImGui.Vec4_toRGBA(ImGui.GetStyleColorVec4(ImGui.ImGuiCol.Text));
        let textBg = ImGui.Vec4_toRGBA(ImGui.GetStyleColorVec4(ImGui.ImGuiCol.WindowBg));

        if (inpState.Flags & ImGui.ImGuiInputTextFlags.Multiline) {
            inp = Input.GetInput(Input.EType.eMultiLine, textCol, textBg);
        }
        else if (inpState.Flags & ImGui.ImGuiInputTextFlags.Password) {
            inp = Input.GetInput(Input.EType.ePassword, textCol, textBg);
        } else {
            inp = Input.GetInput(Input.EType.eInput, textCol, textBg);
        }
        current_input_text = inpState.Text;
        inp.on_visible = b => {
            if (b) {
                remove_key_event();
                io.KeysDown[9] = false;
            } else {
                add_key_event();
                if (inp.isTab) {
                    io.KeysDown[9] = true;
                }
            }
        }
        inp.setText(current_input_text, activeId, io.Fonts.CurrentFont);
        dom_input = inp;
    }
    let framebb = inpState.FrameBB;
    inp.setRect(framebb.Min.x, framebb.Min.y, framebb.Max.x - framebb.Min.x, framebb.Max.y - framebb.Min.y);
    if (current_input_text !== inp.Text) {
        current_input_text = inp.Text;
        inpState.Text = inp.Text;
        //console.log(inp.Text);
    }
    if (!inp.isVisible) {
        ImGui.SetActiveId(0);
    }
}

function BindState() {
    gl && gl.enable(gl.BLEND);
    gl && gl.blendEquation(gl.FUNC_ADD);
    gl && gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl && gl.disable(gl.CULL_FACE);
    gl && gl.disable(gl.DEPTH_TEST);
    gl && gl.enable(gl.SCISSOR_TEST);
}

function BindShader(ortho_projection: Float32Array) {
    gl && gl.useProgram(g_ShaderHandle);
    gl && gl.uniform1i(g_AttribLocationTex, 0);
    gl && g_AttribLocationProjMtx && gl.uniformMatrix4fv(g_AttribLocationProjMtx, false, ortho_projection);
}
function BindMesh() {
    const gl2: WebGL2RenderingContext | null = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext && gl || null;
    const gl_vao: OES_vertex_array_object | null = gl && gl.getExtension("OES_vertex_array_object") || null;

    if (enable_vao) {
        if (!g_vao) {
            g_vao = gl2 && gl2.createVertexArray();   // || gl_vao && gl_vao.createVertexArrayOES();
        }
        gl2 && gl2.bindVertexArray(g_vao);
        //gl_vao && gl_vao.bindVertexArrayOES(vertex_array_object);
    }

    gl && gl.bindBuffer(gl.ARRAY_BUFFER, g_VboHandle);
    gl && gl.enableVertexAttribArray(g_AttribLocationPosition);
    gl && gl.enableVertexAttribArray(g_AttribLocationUV);
    gl && gl.enableVertexAttribArray(g_AttribLocationColor);

    gl && gl.vertexAttribPointer(g_AttribLocationPosition, 2, gl.FLOAT, false, ImGui.DrawVertSize, ImGui.DrawVertPosOffset);
    gl && gl.vertexAttribPointer(g_AttribLocationUV, 2, gl.FLOAT, false, ImGui.DrawVertSize, ImGui.DrawVertUVOffset);
    gl && gl.vertexAttribPointer(g_AttribLocationColor, 4, gl.UNSIGNED_BYTE, true, ImGui.DrawVertSize, ImGui.DrawVertColOffset);
}

function UnbindMesh() {
    const gl2: WebGL2RenderingContext | null = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext && gl || null;
    if (enable_vao) {
        gl2 && gl2.bindVertexArray(null);
        //gl2 && gl2.deleteVertexArray(vertex_array_object);
        //gl_vao && gl_vao.deleteVertexArrayOES(vertex_array_object);
    } else {
        gl && gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl && gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
}

export function RenderDrawData(draw_data: ImGui.DrawData | null = ImGui.GetDrawData()): void {
    const io = ImGui.GetIO();

    font_update(io);
    scroll_update(io);
    input_text_update(io);

    if (draw_data === null) { throw new Error(); }

    gl || ctx || console.log(draw_data);

    // Avoid rendering when minimized, scale coordinates for retina displays (screen coordinates != framebuffer coordinates)
    const fb_width: number = io.DisplaySize.x * io.DisplayFramebufferScale.x;
    const fb_height: number = io.DisplaySize.y * io.DisplayFramebufferScale.y;
    if (fb_width === 0 || fb_height === 0) {
        return;
    }
    draw_data.ScaleClipRects(io.DisplayFramebufferScale);

    const gl2: WebGL2RenderingContext | null = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext && gl || null;
    const gl_vao: OES_vertex_array_object | null = gl && gl.getExtension("OES_vertex_array_object") || null;

    // Backup GL state

    //const last_active_texture: GLenum | null = gl && gl.getParameter(gl.ACTIVE_TEXTURE) || null;
    //const last_program: WebGLProgram | null = gl && gl.getParameter(gl.CURRENT_PROGRAM) || null;
    //const last_texture: WebGLTexture | null = gl && gl.getParameter(gl.TEXTURE_BINDING_2D) || null;
    //const last_array_buffer: WebGLBuffer | null = gl && gl.getParameter(gl.ARRAY_BUFFER_BINDING) || null;
    //const last_element_array_buffer: WebGLBuffer | null = gl && gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING) || null;
    //const last_vertex_array_object: WebGLVertexArrayObject | WebGLVertexArrayObjectOES | null = gl2 && gl2.getParameter(gl2.VERTEX_ARRAY_BINDING) || gl && gl_vao && gl.getParameter(gl_vao.VERTEX_ARRAY_BINDING_OES) || null;
    // GLint last_polygon_mode[2]; glGetIntegerv(GL_POLYGON_MODE, last_polygon_mode);
    //const last_viewport: Int32Array | null = gl && gl.getParameter(gl.VIEWPORT) || null;
    //const last_scissor_box: Int32Array | null = gl && gl.getParameter(gl.SCISSOR_BOX) || null;
    //const last_blend_src_rgb: GLenum | null = gl && gl.getParameter(gl.BLEND_SRC_RGB) || null;
    //const last_blend_dst_rgb: GLenum | null = gl && gl.getParameter(gl.BLEND_DST_RGB) || null;
    //const last_blend_src_alpha: GLenum | null = gl && gl.getParameter(gl.BLEND_SRC_ALPHA) || null;
    //const last_blend_dst_alpha: GLenum | null = gl && gl.getParameter(gl.BLEND_DST_ALPHA) || null;
    //const last_blend_equation_rgb: GLenum | null = gl && gl.getParameter(gl.BLEND_EQUATION_RGB) || null;
    //const last_blend_equation_alpha: GLenum | null = gl && gl.getParameter(gl.BLEND_EQUATION_ALPHA) || null;
    //const last_enable_blend: GLboolean | null = gl && gl.getParameter(gl.BLEND) || null;
    //const last_enable_cull_face: GLboolean | null = gl && gl.getParameter(gl.CULL_FACE) || null;
    //const last_enable_depth_test: GLboolean | null = gl && gl.getParameter(gl.DEPTH_TEST) || null;
    //const last_enable_scissor_test: GLboolean | null = gl && gl.getParameter(gl.SCISSOR_TEST) || null;
    const last_enable_scissor_test: GLboolean = false;

    // Setup desired GL state
    // Recreate the VAO every time (this is to easily allow multiple GL contexts to be rendered to. VAO are not shared among GL contexts)
    // The renderer would actually work without any VAO bound, but then our VertexAttrib calls would overwrite the default one currently bound.

    // Setup render state: alpha-blending enabled, no face culling, no depth testing, scissor enabled, polygon fill
    BindState();
    // glPolygonMode(GL_FRONT_AND_BACK, GL_FILL);

    // Setup viewport, orthographic projection matrix
    // Our visible imgui space lies from draw_data->DisplayPps (top left) to draw_data->DisplayPos+data_data->DisplaySize (bottom right). DisplayMin is typically (0,0) for single viewport apps.
    gl && gl.viewport(0, 0, fb_width, fb_height);
    const L: number = draw_data.DisplayPos.x;
    const R: number = draw_data.DisplayPos.x + draw_data.DisplaySize.x;
    const T: number = draw_data.DisplayPos.y;
    const B: number = draw_data.DisplayPos.y + draw_data.DisplaySize.y;
    const ortho_projection: Float32Array = new Float32Array([
        2.0 / (R - L), 0.0, 0.0, 0.0,
        0.0, 2.0 / (T - B), 0.0, 0.0,
        0.0, 0.0, -1.0, 0.0,
        (R + L) / (L - R), (T + B) / (B - T), 0.0, 1.0,
    ]);
    BindShader(ortho_projection);
    BindMesh();
    // Draw
    const pos = draw_data.DisplayPos;
    let idx_buffer_type: GLenum;
    draw_data.IterateDrawLists((draw_list: ImGui.DrawList): void => {
        gl || ctx || console.log(draw_list);
        gl || ctx || console.log("VtxBuffer.length", draw_list.VtxBuffer.length);
        gl || ctx || console.log("IdxBuffer.length", draw_list.IdxBuffer.length);

        let idx_buffer_offset: number = 0;
        const vx = draw_list.VtxBuffer;
        const ix = draw_list.IdxBuffer;
        let ixU: Uint8Array | Uint16Array | Uint32Array = null;
        switch (ImGui.DrawIdxSize) {
            case 1:
                ixU = new Uint8Array(ix.buffer.slice(ix.byteOffset, ix.byteOffset + ix.byteLength));
                idx_buffer_type = gl.UNSIGNED_BYTE;
                break;
            case 2:
                ixU = new Uint16Array(ix.buffer.slice(ix.byteOffset, ix.byteOffset + ix.byteLength));
                idx_buffer_type = gl.UNSIGNED_SHORT;
                break;
            case 4:
                ixU = new Uint32Array(ix.buffer.slice(ix.byteOffset, ix.byteOffset + ix.byteLength));
                idx_buffer_type = gl.UNSIGNED_INT;
                break;
        }

        if (vx) {
            gl && gl.bindBuffer(gl.ARRAY_BUFFER, g_VboHandle);
            gl && gl.bufferData(gl.ARRAY_BUFFER, vx, gl.STREAM_DRAW);
        }
        if (ixU) {
            gl && gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_ElementsHandle);
            gl && gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, ixU, gl.STREAM_DRAW);
        }
        draw_list.IterateDrawCmds((draw_cmd: ImGui.DrawCmd): void => {
            gl || ctx || console.log(draw_cmd);
            gl || ctx || console.log("ElemCount", draw_cmd.ElemCount);
            gl || ctx || console.log("ClipRect", draw_cmd.ClipRect.x, fb_height - draw_cmd.ClipRect.w, draw_cmd.ClipRect.z - draw_cmd.ClipRect.x, draw_cmd.ClipRect.w - draw_cmd.ClipRect.y);
            gl || ctx || console.log("TextureId", draw_cmd.TextureId);
            if (!gl && !ctx) {
                console.log("i: pos.x pos.y uv.x uv.y col");
                for (let i = 0; i < Math.min(3, draw_cmd.ElemCount); ++i) {
                    const view: ImGui.DrawVert = new ImGui.DrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i * ImGui.DrawVertSize);
                    console.log(`${i}: ${view.pos[0].toFixed(2)} ${view.pos[1].toFixed(2)} ${view.uv[0].toFixed(5)} ${view.uv[1].toFixed(5)} ${("00000000" + view.col[0].toString(16)).substr(-8)}`);
                }
            }

            if (draw_cmd.UserCallback !== null) {
                // User callback (registered via ImDrawList::AddCallback)
                UnbindMesh();
                draw_cmd.UserCallback(draw_list, draw_cmd);
                BindState();
                BindShader(ortho_projection);
                BindMesh();
            } else {
                const clip_rect = new ImGui.Vec4(draw_cmd.ClipRect.x - pos.x, draw_cmd.ClipRect.y - pos.y, draw_cmd.ClipRect.z - pos.x, draw_cmd.ClipRect.w - pos.y);
                if (clip_rect.x < fb_width && clip_rect.y < fb_height && clip_rect.z >= 0.0 && clip_rect.w >= 0.0) {
                    // Apply scissor/clipping rectangle
                    gl && gl.scissor(clip_rect.x, fb_height - clip_rect.w, clip_rect.z - clip_rect.x, clip_rect.w - clip_rect.y);

                    // Bind texture, Draw
                    gl && gl.activeTexture(gl.TEXTURE0);
                    gl && gl.bindTexture(gl.TEXTURE_2D, draw_cmd.TextureId);
                    gl && gl.drawElements(gl.TRIANGLES, draw_cmd.ElemCount, idx_buffer_type, idx_buffer_offset);

                    if (ctx) {
                        ctx.save();
                        ctx.beginPath();
                        ctx.rect(clip_rect.x, clip_rect.y, clip_rect.z - clip_rect.x, clip_rect.w - clip_rect.y);
                        ctx.clip();
                        const idx = ImGui.DrawIdxSize === 4 ?
                            new Uint32Array(draw_list.IdxBuffer.buffer, draw_list.IdxBuffer.byteOffset + idx_buffer_offset) :
                            new Uint16Array(draw_list.IdxBuffer.buffer, draw_list.IdxBuffer.byteOffset + idx_buffer_offset);
                        for (let i = 0; i < draw_cmd.ElemCount; i += 3) {
                            const i0: number = idx[i + 0];
                            const i1: number = idx[i + 1];
                            const i2: number = idx[i + 2];
                            const v0: ImGui.DrawVert = new ImGui.DrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i0 * ImGui.DrawVertSize);
                            const v1: ImGui.DrawVert = new ImGui.DrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i1 * ImGui.DrawVertSize);
                            const v2: ImGui.DrawVert = new ImGui.DrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i2 * ImGui.DrawVertSize);
                            const i3: number = idx[i + 3];
                            const i4: number = idx[i + 4];
                            const i5: number = idx[i + 5];
                            const v3: ImGui.DrawVert = new ImGui.DrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i3 * ImGui.DrawVertSize);
                            const v4: ImGui.DrawVert = new ImGui.DrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i4 * ImGui.DrawVertSize);
                            const v5: ImGui.DrawVert = new ImGui.DrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i5 * ImGui.DrawVertSize);
                            let quad = true;
                            let minmin: ImGui.DrawVert = v0;
                            let minmax: ImGui.DrawVert = v0;
                            let maxmin: ImGui.DrawVert = v0;
                            let maxmax: ImGui.DrawVert = v0;
                            for (const v of [v1, v2, v3, v4, v5]) {
                                let found = false;
                                if (v.pos[0] <= minmin.pos[0] && v.pos[1] <= minmin.pos[1]) { minmin = v; found = true; }
                                if (v.pos[0] <= minmax.pos[0] && v.pos[1] >= minmax.pos[1]) { minmax = v; found = true; }
                                if (v.pos[0] >= maxmin.pos[0] && v.pos[1] <= maxmin.pos[1]) { maxmin = v; found = true; }
                                if (v.pos[0] >= maxmax.pos[0] && v.pos[1] >= maxmax.pos[1]) { maxmax = v; found = true; }
                                if (!found) { quad = false; }
                            }
                            quad = quad && (minmin.pos[0] === minmax.pos[0]);
                            quad = quad && (maxmin.pos[0] === maxmax.pos[0]);
                            quad = quad && (minmin.pos[1] === maxmin.pos[1]);
                            quad = quad && (minmax.pos[1] === maxmax.pos[1]);
                            if (quad) {
                                if (minmin.uv[0] === maxmax.uv[0] || minmin.uv[1] === maxmax.uv[1]) {
                                    // one vertex color
                                    ctx.beginPath();
                                    ctx.rect(minmin.pos[0], minmin.pos[1], maxmax.pos[0] - minmin.pos[0], maxmax.pos[1] - minmin.pos[1]);
                                    ctx.fillStyle = `rgba(${v0.col[0] >> 0 & 0xff}, ${v0.col[0] >> 8 & 0xff}, ${v0.col[0] >> 16 & 0xff}, ${(v0.col[0] >> 24 & 0xff) / 0xff})`;
                                    ctx.fill();
                                } else {
                                    // no vertex color
                                    const image = draw_cmd.TextureId as CanvasImageSource; // HACK
                                    let width: number = 0;
                                    let height: number = 0;
                                    if (image instanceof HTMLVideoElement) {
                                        width = image.videoWidth;
                                        height = image.videoHeight;
                                    }
                                    // else if (has_videoframe && image instanceof VideoFrame) {
                                    //     width = image.displayWidth;
                                    //     height = image.displayHeight;
                                    // }
                                    else {
                                        let src = image as HTMLCanvasElement | OffscreenCanvas | ImageBitmap | HTMLOrSVGImageElement;
                                        width = src.width as number;
                                        height = src.height as number;
                                    }

                                    image && ctx.drawImage(image,
                                        minmin.uv[0] * width, minmin.uv[1] * height,
                                        (maxmax.uv[0] - minmin.uv[0]) * width, (maxmax.uv[1] - minmin.uv[1]) * height,
                                        minmin.pos[0], minmin.pos[1],
                                        maxmax.pos[0] - minmin.pos[0], maxmax.pos[1] - minmin.pos[1]);
                                    // ctx.beginPath();
                                    // ctx.rect(minmin.pos[0], minmin.pos[1], maxmax.pos[0] - minmin.pos[0], maxmax.pos[1] - minmin.pos[1]);
                                    // ctx.strokeStyle = "yellow";
                                    // ctx.stroke();
                                }
                                i += 3;
                            } else {
                                // one vertex color, no texture
                                ctx.beginPath();
                                ctx.moveTo(v0.pos[0], v0.pos[1]);
                                ctx.lineTo(v1.pos[0], v1.pos[1]);
                                ctx.lineTo(v2.pos[0], v2.pos[1]);
                                ctx.closePath();
                                ctx.fillStyle = `rgba(${v0.col[0] >> 0 & 0xff}, ${v0.col[0] >> 8 & 0xff}, ${v0.col[0] >> 16 & 0xff}, ${(v0.col[0] >> 24 & 0xff) / 0xff})`;
                                ctx.fill();
                            }
                        }
                        ctx.restore();
                    }
                }
            }

            idx_buffer_offset += draw_cmd.ElemCount * ImGui.DrawIdxSize;
        });
    });

    // Destroy the temporary VAO
    UnbindMesh();
    // Restore modified GL state

    //gl && (last_program !== null) && gl.useProgram(last_program);
    //gl && (last_texture !== null) && gl.bindTexture(gl.TEXTURE_2D, last_texture);
    //gl && (last_active_texture !== null) && gl.activeTexture(last_active_texture);
    //gl2 && gl2.bindVertexArray(last_vertex_array_object);
    //gl_vao && gl_vao.bindVertexArrayOES(last_vertex_array_object);
    //gl && (last_array_buffer !== null) && gl.bindBuffer(gl.ARRAY_BUFFER, last_array_buffer);
    //gl && (last_element_array_buffer !== null) && gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, last_element_array_buffer);
    //gl && (last_blend_equation_rgb !== null && last_blend_equation_alpha !== null) && gl.blendEquationSeparate(last_blend_equation_rgb, last_blend_equation_alpha);
    //gl && (last_blend_src_rgb !== null && last_blend_src_alpha !== null && last_blend_dst_rgb !== null && last_blend_dst_alpha !== null) && gl.blendFuncSeparate(last_blend_src_rgb, last_blend_src_alpha, last_blend_dst_rgb, last_blend_dst_alpha);
    //gl && (last_enable_blend ? gl.enable(gl.BLEND) : gl.disable(gl.BLEND));
    //gl && (last_enable_cull_face ? gl.enable(gl.CULL_FACE) : gl.disable(gl.CULL_FACE));
    //gl && (last_enable_depth_test ? gl.enable(gl.DEPTH_TEST) : gl.disable(gl.DEPTH_TEST));
    gl && (last_enable_scissor_test ? gl.enable(gl.SCISSOR_TEST) : gl.disable(gl.SCISSOR_TEST));
    // glPolygonMode(GL_FRONT_AND_BACK, (GLenum)last_polygon_mode[0]);
    //gl && (last_viewport !== null) && gl.viewport(last_viewport[0], last_viewport[1], last_viewport[2], last_viewport[3]);
    //gl && (last_scissor_box !== null) && gl.scissor(last_scissor_box[0], last_scissor_box[1], last_scissor_box[2], last_scissor_box[3]);
}

export function CreateFontsTexture(): void {
    const io = ImGui.GetIO();

    // Backup GL state
    const last_texture: WebGLTexture | null = gl && gl.getParameter(gl.TEXTURE_BINDING_2D);

    // Build texture atlas
    // const width: number = 256;
    // const height: number = 256;
    // const pixels: Uint8Array = new Uint8Array(4 * width * height).fill(0xff);

    //const { width, height, pixels } = io.Fonts.GetTexDataAsRGBA32();   // Load as RGBA 32-bits (75% of the memory is wasted, but default font is so small) because it is more likely to be compatible with user's existing shaders. If your ImTextureId represent a higher-level concept than just a GL texture id, consider calling GetTexDataAsAlpha8() instead to save on GPU memory.
    const { width, height, pixels } = io.Fonts.GetTexDataAsAlpha8();
    if (width && height && pixels) {
        let rgba4: Uint16Array = new Uint16Array(width * height);
        let i = 0;
        pixels.forEach(p => {
            rgba4[i] = 0xFFF0 | (p >> 4);
            i++;
        })

        // Upload texture to graphics system
        g_FontTexture = gl && gl.createTexture();
        gl && gl.bindTexture(gl.TEXTURE_2D, g_FontTexture);
        gl && gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl && gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        // gl && gl.pixelStorei(gl.UNPACK_ROW_LENGTH); // WebGL2
        gl && gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_SHORT_4_4_4_4, rgba4);
        //gl && gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

        // Store our identifier
        io.Fonts.TexID = g_FontTexture || { foo: "bar" };
        // console.log("font texture id", g_FontTexture);
    }
    if (ctx) {
        const image_canvas: HTMLCanvasElement = document.createElement("canvas");
        image_canvas.width = width;
        image_canvas.height = height;
        const image_ctx = image_canvas.getContext("2d");
        if (image_ctx === null) { throw new Error(); }
        const image_data = image_ctx.getImageData(0, 0, width, height);
        image_data.data.set(pixels);
        image_ctx.putImageData(image_data, 0, 0);
        io.Fonts.TexID = image_canvas;
    }

    // Restore modified GL state
    gl && last_texture && gl.bindTexture(gl.TEXTURE_2D, last_texture);
}

export function DestroyFontsTexture(): void {
    const io = ImGui.GetIO();
    io.Fonts.TexID = null;
    gl && gl.deleteTexture(g_FontTexture); g_FontTexture = null;
    if (dom_font) {
        dom_font.Destroy();
        dom_font = null;
    }
}

export function CreateDeviceObjects(): void {
    const vertex_shader: string[] = [
        "uniform mat4 ProjMtx;",
        "attribute vec2 Position;",
        "attribute vec2 UV;",
        "attribute vec4 Color;",
        "varying vec2 Frag_UV;",
        "varying vec4 Frag_Color;",
        "void main() {",
        "	Frag_UV = UV;",
        "	Frag_Color = Color;",
        "	gl_Position = ProjMtx * vec4(Position.xy,0,1);",
        "}",
    ];

    const fragment_shader: string[] = [
        "precision mediump float;", // WebGL requires precision specifiers
        "uniform sampler2D Texture;",
        "varying vec2 Frag_UV;",
        "varying vec4 Frag_Color;",
        "void main() {",
        "	gl_FragColor = Frag_Color * texture2D(Texture, Frag_UV);",
        "}",
    ];

    g_ShaderHandle = gl && gl.createProgram();
    g_VertHandle = gl && gl.createShader(gl.VERTEX_SHADER);
    g_FragHandle = gl && gl.createShader(gl.FRAGMENT_SHADER);
    gl && gl.shaderSource(g_VertHandle as WebGLShader, vertex_shader.join("\n"));
    gl && gl.shaderSource(g_FragHandle as WebGLShader, fragment_shader.join("\n"));
    gl && gl.compileShader(g_VertHandle as WebGLShader);
    gl && gl.compileShader(g_FragHandle as WebGLShader);
    gl && gl.attachShader(g_ShaderHandle as WebGLProgram, g_VertHandle as WebGLShader);
    gl && gl.attachShader(g_ShaderHandle as WebGLProgram, g_FragHandle as WebGLShader);
    gl && gl.linkProgram(g_ShaderHandle as WebGLProgram);

    g_AttribLocationTex = gl && gl.getUniformLocation(g_ShaderHandle as WebGLProgram, "Texture");
    g_AttribLocationProjMtx = gl && gl.getUniformLocation(g_ShaderHandle as WebGLProgram, "ProjMtx");
    g_AttribLocationPosition = gl && gl.getAttribLocation(g_ShaderHandle as WebGLProgram, "Position") || 0;
    g_AttribLocationUV = gl && gl.getAttribLocation(g_ShaderHandle as WebGLProgram, "UV") || 0;
    g_AttribLocationColor = gl && gl.getAttribLocation(g_ShaderHandle as WebGLProgram, "Color") || 0;

    g_VboHandle = gl && gl.createBuffer();
    g_ElementsHandle = gl && gl.createBuffer();

    CreateFontsTexture();
}

export function DestroyDeviceObjects(): void {
    DestroyFontsTexture();

    const gl2: WebGL2RenderingContext | null = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext && gl || null;
    if (g_vao) {
        gl2 && gl2.deleteVertexArray(g_vao);
    }
    gl && gl.deleteBuffer(g_VboHandle); g_VboHandle = null;
    gl && gl.deleteBuffer(g_ElementsHandle); g_ElementsHandle = null;

    g_AttribLocationTex = null;
    g_AttribLocationProjMtx = null;
    g_AttribLocationPosition = -1;
    g_AttribLocationUV = -1;
    g_AttribLocationColor = -1;

    gl && gl.deleteProgram(g_ShaderHandle); g_ShaderHandle = null;
    gl && gl.deleteShader(g_VertHandle); g_VertHandle = null;
    gl && gl.deleteShader(g_FragHandle); g_FragHandle = null;
}

export interface ITextureParam {
    internalFormat?: number;
    srcFormat?: number;
    srcType?: number;
    width?: number;
    height?: number;
    level?: number;
}

export class Texture {
    public _texture: WebGLTexture;
    public _internalFormat: number = gl.RGBA;
    public _srcFormat: number = gl.RGBA;
    public _srcType: number = gl.UNSIGNED_BYTE;
    public _wrapS: number = gl.CLAMP_TO_EDGE;
    public _wrapT: number = gl.CLAMP_TO_EDGE;
    public _minFilter: number = gl.LINEAR;
    public _magFilter: number = gl.LINEAR;
    public _width: number = 1;
    public _height: number = 1;

    constructor(param?: ITextureParam) {

    }
    public Destroy(): void {
        if (this._texture) {
            gl && gl.deleteTexture(this._texture);
            this._texture = null;
        }
    }
    public Bind(index: number = gl.TEXTURE0): void {
        gl.activeTexture(index);
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
    }

    public Update(src: TexImageSource | Uint8Array | Uint16Array | null, param?: any): void {
        let w, h;
        if (src == null) {
            if (param) {
                w = param.width;
                h = param.height;
            }
        }
        else if (src instanceof HTMLVideoElement) {
            let srcVideo = src as HTMLVideoElement;
            if (srcVideo) {
                w = srcVideo.videoWidth;
                h = srcVideo.videoHeight;
            }
        }
        // else if (has_videoframe && src instanceof VideoFrame) {
        //     w = src.displayWidth;
        //     h = src.displayHeight;
        // }
        else if (src instanceof Uint8Array || src instanceof Uint16Array) {
            if (param) {
                w = param.width;
                h = param.height;
            } else {
                w = this._width;
                h = this._height;
            }
        } else {
            let s = src as HTMLCanvasElement | OffscreenCanvas | ImageBitmap | ImageData | HTMLImageElement;
            w = s.width;
            h = s.height;
        }
        if (!this._texture) {
            this._texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this._texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this._wrapS);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this._wrapT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
        const level = param ? param.level ? param.level : 0 : 0;
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl && gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._minFilter);
        gl && gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this._magFilter);
        if (w != this._width || h != this._height) {
            if (src == null) {
                const data: ArrayBufferView = null;
                gl.texImage2D(gl.TEXTURE_2D, level, this._internalFormat,
                    w, h, 0, this._srcFormat, this._srcType, data);
            }
            else if (src instanceof Uint8Array || src instanceof Uint16Array) {
                gl.texImage2D(gl.TEXTURE_2D, level, this._internalFormat,
                    w, h, 0, this._srcFormat, this._srcType, src);
            } else {
                gl.texImage2D(gl.TEXTURE_2D, level, this._internalFormat,
                    this._srcFormat, this._srcType, src);
            }
            this._width = w;
            this._height = h;
        } else {
            if (src instanceof Uint8Array || src instanceof Uint16Array) {
                gl.texSubImage2D(gl.TEXTURE_2D, level, 0, 0, w, h, this._srcFormat, this._srcType, src);
            } else {
                gl.texSubImage2D(gl.TEXTURE_2D, level, 0, 0, this._srcFormat, this._srcType, src);
            }
        }
    }

}

export class TextureCache {
    public constructor() {
    }

    public Destroy(): void {
        Object.entries(this.cache).forEach(([key, value]) => {
            value.Destroy();
        });
        this.cache = {};
    }

    public async Load(name: string, src: string): Promise<Texture> {
        var tex: Texture = new Texture();
        var image = new Image();
        image.crossOrigin = "anonymous";
        image.src = src;
        image.onload = () => {
            tex.Update(image);
        }
        this.cache[name] = tex;
        return tex;
    }

    public cache: { [key: string]: Texture } = {};
}

export class FrameBufferObject {
    public constructor() {
    }

    public Destroy(): void {
        if (this._target) {
            this._target.Destroy();
            this._target = null;
        }
        if (this._depth) {
            gl.deleteRenderbuffer(this._depth);
            this._depth = null;
        }
        if (this._fbo) {
            gl.deleteFramebuffer(this._fbo);
            this._fbo = null;
        }
    }

    public Create(width: number, height: number, format: number = gl.RGB, depth: number = gl.DEPTH_COMPONENT16): void {
        this.width = width;
        this.height = height;
        this.format = format;
        this.depth_format = depth;
    }

    public Bind(use: boolean = true): void {
        if (use) {
            if (!this._target) {
                let target = new Texture();
                target._srcFormat = target._internalFormat = this.format;
                target.Update(null, { width: this.width, height: this.height });
                this._target = target;
            }
            if (this.depth_format && !this._depth) {
                let depth = gl.createRenderbuffer();
                gl.bindRenderbuffer(gl.RENDERBUFFER, depth);
                gl.renderbufferStorage(gl.RENDERBUFFER, this.depth_format, this.width, this.height);
                this._depth = depth;
            }
            if (!this._fbo) {
                let fbo = gl.createFramebuffer();
                gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
                    gl.TEXTURE_2D, this._target._texture, 0);
                if (this._depth) {
                    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT,
                        gl.RENDERBUFFER, this._depth);
                }
                this._fbo = fbo;
            }
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo);
            gl.viewport(0, 0, this.width, this.height);
        } else {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
    }
    public get_texture(): WebGLTexture {
        return this._target ? this._target._texture : null;
    }

    private _fbo: WebGLFramebuffer;
    private _target: Texture;
    private _depth: WebGLRenderbuffer;
    public width: number;
    public height: number;
    public format: number;
    public depth_format: number;
}

export class Shader {
    constructor() {

    }
    public Destroy(): void {
        if (this._program) {
            gl && gl.deleteProgram(this._program);
            this._program = null;
        }
        if (this._vs) {
            gl && gl.deleteShader(this._vs);
            this._vs = null;
        }
        if (this._ps) {
            gl && gl.deleteShader(this._ps);
            this._ps = null;
        }
    }
    public Create(vsCode: string[], psCode: string[]): void {
        let vs;
        if (vsCode) {
            vs = gl && gl.createShader(gl.VERTEX_SHADER);
            gl && gl.shaderSource(vs as WebGLShader, vsCode.join("\n"));
            gl && gl.compileShader(vs as WebGLShader);
            if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
                console.log('VertexShader compile failed: ' + gl.getShaderInfoLog(vs));
            }
            this._vs = vs;
        } else {
            vs = g_VertHandle;
        }

        let ps;
        if (psCode) {
            ps = gl && gl.createShader(gl.FRAGMENT_SHADER);
            gl && gl.shaderSource(ps as WebGLShader, psCode.join("\n"));
            gl && gl.compileShader(ps as WebGLShader);
            if (!gl.getShaderParameter(ps, gl.COMPILE_STATUS)) {
                console.log('FragmentShader compile failed: ' + gl.getShaderInfoLog(ps));
            }
            this._ps = ps;
        } else {
            ps = g_FragHandle;
        }

        let program = gl && gl.createProgram();
        gl && gl.attachShader(program, vs as WebGLShader);
        gl && gl.attachShader(program, ps as WebGLShader);
        gl && gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.log('linkProgram failed: ' + gl.getProgramInfoLog(program));
        }
        this._program = program;
    }

    private _program: WebGLProgram;
    private _vs: WebGLShader;
    private _ps: WebGLShader;
}