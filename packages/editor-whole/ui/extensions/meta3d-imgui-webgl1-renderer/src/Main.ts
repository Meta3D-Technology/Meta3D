import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { menuLabel, service } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { cond, windowFlags } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { state } from "meta3d-imgui-renderer-protocol/src/state/StateType"
import * as ImGui from "./lib/imgui"
import * as ImGui_Impl from "./lib/imgui_impl"
import { buildBind, buildRef, setNextWindowRect } from "./Utils"
import { tree } from "./Tree"
import { asset } from "./Asset"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
// import { inspector } from "./Inspector"

// let _generateUniqueId = () => {
//     return Math.floor(Math.random() * 1000000.0).toString()
// }

let _initCanvas = (canvas: HTMLCanvasElement) => {
    // ImGui_Impl.window_on_resize()

    canvas.style.touchAction = "none" // Disable browser handling of all panning and zooming gestures.
}

let _initEvent = (canvas: HTMLCanvasElement) => {
    canvas.addEventListener("blur", ImGui_Impl.canvas_on_blur)
    ImGui_Impl.add_key_event()
    ImGui_Impl.add_pointer_event()
    // canvas.addEventListener("contextmenu", ImGui_Impl.canvas_on_contextmenu)

    // canvas.addEventListener('webglcontextlost', canvas_on_contextlost, false)
    // canvas.addEventListener('webglcontextrestored', canvas_on_contextrestored, false)
}


export let getExtensionService: getExtensionServiceMeta3D<
    service
> = (api) => {
    return {
        init: (state, isInitEvent, isDebug, canvas) => {
            return ImGui.default().then(_ => {
                if (isDebug) {
                    ImGui.CHECKVERSION()
                    console.log("ImGui.CreateContext() VERSION=", ImGui.VERSION)
                }

                ImGui.CreateContext()

                // if(ImGui.isMobile.any())    {
                //     ImGui_Impl.setCanvasScale(1)
                //     ImGui_Impl.setFontScale(1.5)
                // }

                let io: ImGui.IO = ImGui.GetIO()
                let font = io.Fonts.AddFontDefault()
                //font.FontName="Microsoft JhengHei"
                //font.FontName="Arial"
                font.FontName = "sans-serif"
                font.FontStyle = "bold"
                //font.FontSize=32
                //font.Ascent=2.5

                // let canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
                ImGui_Impl.Init(canvas)

                _initCanvas(canvas)

                if (isInitEvent) {
                    _initEvent(canvas)
                }

                return {
                    ...state,
                    isDebug
                }
            })
        },
        beforeExec: (state, time) => {
            ImGui_Impl.NewFrame(time)
            ImGui.NewFrame()

            switch (state.style) {
                case "dark":
                    ImGui.StyleColorsDark()
                    break
                case "light":
                    ImGui.StyleColorsLight()
                    break
                case "classic":
                    ImGui.StyleColorsClassic()
                    break
                default:
                    throw new Error("unknown style: " + state.style)
            }

            return state
        },
        afterExec: () => {
            ImGui.EndFrame()
            ImGui.Render()
        },
        clear: (clearColor) => {
            let [r, g, b, a] = clearColor

            ImGui_Impl.ClearBuffer(new ImGui.ImVec4(r, g, b, a))
        },
        render: () => {
            ImGui_Impl.RenderDrawData(ImGui.GetDrawData())
        },
        setStyle: (state, style) => {
            return {
                ...state,
                style: style
            }
        },
        beginWindow: (label, flags) => {
            let imguiWindowFlags = null
            switch (flags) {
                case windowFlags.None:
                    imguiWindowFlags = ImGui.WindowFlags.None
                    break
                case windowFlags.NoTitleBar:
                    imguiWindowFlags = ImGui.WindowFlags.NoTitleBar
                    break
                default:
                    throw new Error("unknown flags: " + flags)
            }

            // ImGui.Begin(label + "##" + _generateUniqueId())
            // ImGui.Begin(label)
            ImGui.Begin(label, null, imguiWindowFlags)

            // console.log(
            //     ImGui.IsWindowFocused(),
            //     ImGui.IsWindowAppearing(),
            //     ImGui.IsWindowCollapsed(),
            //     ImGui.IsWindowHovered(),
            //     ImGui.GetWindowDrawList(),
            // )
        },
        endWindow: () => {
            ImGui.End()
        },
        beginChild: (label) => {
            ImGui.BeginChild(label)
        },
        endChild: () => {
            ImGui.EndChild()
        },
        setNextWindowRect: setNextWindowRect,
        addFBOTexture: (texture, { x, y, width, height }) => {
            // let pos = ImGui.GetCursorScreenPos()
            // let rectMin = ImGui.GetItemRectMin()

            // console.log(x, y, width, height)
            // console.log(pos, rectMin)

            ImGui.GetWindowDrawList().AddImage(
                texture,
                // new ImGui.ImVec2(rectMin.x + pos.x, rectMin.y + pos.y),
                // new ImGui.ImVec2(pos.x + width / 2, pos.y + height / 2),
                new ImGui.ImVec2(x, y),
                // new ImGui.ImVec2(width, height),
                new ImGui.ImVec2(x + width, y + height),
                new ImGui.ImVec2(0, 1),
                new ImGui.ImVec2(1, 0),
            )
        },
        getWindowBarHeight: () => {
            return ImGui.GetFrameHeight()
        },
        button: (label, [width, height]) => {
            let isClick = ImGui.Button(label, new ImGui.ImVec2(width, height))

            return isClick
        },
        setCursorPos: ([x, y]) => {
            ImGui.SetCursorPos(
                new ImGui.ImVec2(x, y)
            )
        },
        loadImage: (src) => {
            var tex = new ImGui_Impl.Texture();
            var image = new Image();
            image.crossOrigin = "anonymous";
            image.src = src;

            return new Promise((resolve, reject) => {
                image.onload = () => {
                    tex.Update(image);

                    resolve(tex)
                }
                image.onerror = (e) => {
                    reject(e)
                }
            })
        },
        asset: asset,
        handleDragDropTarget: (type) => {
            let data = null

            if (ImGui.BeginDragDropTarget()) {
                let payload = ImGui.AcceptDragDropPayload(type)

                if (payload !== null) {
                    // ImGui.ASSERT(payload.DataSize === sizeof(int));

                    data = payload.Data
                }
                ImGui.EndDragDropTarget();
            }

            return data as any
        },
        menu: (allLabels, windowName, rect) => {
            setNextWindowRect(rect)

            ImGui.Begin(windowName, null, ImGui.WindowFlags.NoTitleBar | ImGui.WindowFlags.MenuBar | ImGui.WindowFlags.NoBackground | ImGui.WindowFlags.NoCollapse)

            let selectItemLabel = null

            if (ImGui.BeginMenuBar()) {
                selectItemLabel = allLabels.reduce<menuLabel>((selectItemLabel, [firstLabel, secondLabels]) => {
                    if (ImGui.BeginMenu(firstLabel)) {
                        selectItemLabel = secondLabels.reduce((selectItemLabel, secondLabel) => {
                            if (ImGui.MenuItem(secondLabel)) {
                                selectItemLabel = secondLabel
                            }

                            return selectItemLabel
                        }, selectItemLabel)

                        ImGui.EndMenu();
                    }

                    return selectItemLabel
                }, selectItemLabel)

                ImGui.EndMenuBar();
            }

            ImGui.End()

            return selectItemLabel
        },
        tree: tree,
        switchButton: (isClick1State, { click1Texture, click2Texture }, [width, height]) => {
            let isClick1 = false
            let isClick2 = false

            if (isClick1State) {
                if (ImGui.ImageButton(click2Texture._texture, new ImGui.ImVec2(width, height))) {
                    isClick2 = true
                }
            }
            else if (ImGui.ImageButton(click1Texture._texture, new ImGui.ImVec2(width, height))) {
                isClick1 = true
            }


            return [isClick1, isClick2]
        },
        imageButton: (clickTexture, [width, height]) => {
            let isClick = ImGui.ImageButton(clickTexture._texture, new ImGui.ImVec2(width, height))

            return isClick
        },
        image: (clickTexture, [width, height]) => {
            ImGui.ImageButton(clickTexture._texture, new ImGui.ImVec2(width, height))
        },
        inputText: (label, value, maxLength, width) => {
            let newValue: nullable<string> = null
            let valueRef = buildRef(value)

            ImGui.PushItemWidth(width)

            if (ImGui.InputText(label, buildBind(valueRef), maxLength)) {
                newValue = valueRef.content
            }

            return newValue
        },
        inputFloat1: (label, value, step, stepFast, width) => {
            let valueRef = buildRef(value)
            let newValue: nullable<number> = null

            ImGui.PushItemWidth(width)

            ImGui.PushID(label + "_x")
            if (ImGui.InputFloat("", buildBind(valueRef), step, stepFast, "%.3f")) {
                newValue = valueRef.content
            }
            ImGui.PopID()
            ImGui.SameLine()

            ImGui.Text(label)

            return newValue
        },
        inputFloat3: (label, [x, y, z], step, stepFast, width) => {
            let valueXRef = buildRef(x)
            let valueYRef = buildRef(y)
            let valueZRef = buildRef(z)
            let newValueX: nullable<number> = null
            let newValueY: nullable<number> = null
            let newValueZ: nullable<number> = null

            ImGui.PushItemWidth(width)

            // ImGui.PushID(_generateUniqueId())
            ImGui.PushID(label + "_x")
            if (ImGui.InputFloat("", buildBind(valueXRef), step, stepFast, "%.3f")) {
                newValueX = valueXRef.content
                newValueY = api.nullable.return(y)
                newValueZ = api.nullable.return(z)
            }
            ImGui.PopID()
            ImGui.SameLine()

            ImGui.PushID(label + "_y")
            if (ImGui.InputFloat("", buildBind(valueYRef), step, stepFast, "%.3f")) {
                newValueY = valueYRef.content
                newValueX = api.nullable.return(x)
                newValueZ = api.nullable.return(z)
            }
            ImGui.PopID()
            ImGui.SameLine()

            ImGui.PushID(label + "_z")
            if (ImGui.InputFloat("", buildBind(valueZRef), step, stepFast, "%.3f")) {
                newValueZ = valueZRef.content
                newValueX = api.nullable.return(x)
                newValueY = api.nullable.return(y)
            }
            ImGui.PopID()
            ImGui.SameLine()

            ImGui.Text(label)

            return api.nullable.bind(newValueX => {
                return api.nullable.bind(newValueY => {
                    return api.nullable.map(newValueZ => {
                        return [newValueX, newValueY, newValueZ]
                    }, newValueZ)
                }, newValueY)
            }, newValueX)
        },
        checkbox: (label, isSelect) => {
            let isSelectRef = buildRef(isSelect)

            if (ImGui.Checkbox(label, buildBind(isSelectRef))) {
                return isSelectRef.content
            }

            return null
        },
        collapsing: (label, isOpen, cond_) => {
            let imguiCond = null
            switch (cond_) {
                case cond.Always:
                    imguiCond = ImGui.Cond.Always
                    break
                case cond.Once:
                    imguiCond = ImGui.Cond.Once
                    break
                default:
                    throw new Error("unknown cond: " + cond)
            }

            ImGui.SetNextItemOpen(isOpen, imguiCond)

            return ImGui.CollapsingHeader(label)
        },
        openModal: (label) => {
            ImGui.OpenPopup(label)
        },
        closeCurrentModal: () => {
            ImGui.CloseCurrentPopup()
        },
        beginModal: (label) => {
            return ImGui.BeginPopupModal(label, null, ImGui.WindowFlags.AlwaysAutoResize)
        },
        endModal: () => {
            ImGui.EndPopup()
        },
        popup: (label, selectedValues, id) => {
            let result = null

            if (ImGui.Button(label)) {
                ImGui.OpenPopup(id);
            }

            if (ImGui.BeginPopup(id)) {
                for (let i = 0; i < ImGui.ARRAYSIZE(selectedValues); i++)
                    if (ImGui.Selectable(selectedValues[i])) {
                        result = i
                    }
                ImGui.EndPopup();
            }

            return result
        },
        getContext: () => {
            return ImGui_Impl.gl
        },
    }
}

export let createExtensionState: createExtensionStateMeta3D<
    state
> = () => {
    return {
        isDebug: false,
        style: "classic"
    }
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionName) => {
    return {
        onRegister: (meta3dState, service) => {
            return meta3dState
        }
    }
}
