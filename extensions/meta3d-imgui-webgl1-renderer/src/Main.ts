import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { menuLabel, rect, service } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { state } from "meta3d-imgui-renderer-protocol/src/state/StateType"
import { uiControlName as assetUIControlName } from "meta3d-ui-control-asset-protocol"
import { dragDropType, dropGlbUIData } from "meta3d-ui-control-scene-view-protocol"
import * as ImGui from "./lib/imgui"
import * as ImGui_Impl from "./lib/imgui_impl"
import { return_ } from "meta3d-commonlib-ts/src/NullableUtils"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

// let _generateUniqueId = () => {
//     return Math.floor(Math.random() * 1000000.0).toString()
// }

let _initCanvas = (canvas: HTMLCanvasElement) => {
    ImGui_Impl.window_on_resize()
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

let _setNextWindowRect = (rect: rect) => {
    ImGui.SetNextWindowPos(new ImGui.ImVec2(rect.x, rect.y))
    ImGui.SetNextWindowSize(new ImGui.ImVec2(rect.width, rect.height))
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
        beginWindow: (label) => {
            // ImGui.Begin(label + "##" + _generateUniqueId())
            ImGui.Begin(label)

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
        setNextWindowRect: _setNextWindowRect,
        addFBOTexture: (texture, { x, y, width, height }) => {
            let pos = ImGui.GetCursorScreenPos()
            let rectMin = ImGui.GetItemRectMin()

            console.log(x, y, width, height)
            console.log(pos, rectMin)

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
        asset: ({ loadGlbTexture, removeAssetTexture, glbTexture }, glbs, label, rect) => {
            _setNextWindowRect(rect)

            ImGui.Begin(label)



            let isRemoveAsset = ImGui.ImageButton(removeAssetTexture._texture, new ImGui.ImVec2(20, 20))

            ImGui.SameLine()

            let isLoadGlb = ImGui.ImageButton(loadGlbTexture._texture, new ImGui.ImVec2(20, 20))





            let style: ImGui.Style = ImGui.GetStyle()
            let glbCount: number = glbs.length
            let window_visible_x2: number = ImGui.GetWindowPos().x + ImGui.GetWindowContentRegionMax().x
            let sizeX = 32
            let sizeY = sizeX

            let selectedGlbId = glbs.reduce<nullable<string>>((selectedGlbId, [glbName, glbId], glbIndex) => {
                ImGui.PushID(glbIndex)

                ImGui.BeginGroup() // Lock X position
                if (ImGui.ImageButton(glbTexture._texture, new ImGui.ImVec2(sizeX, sizeY))) {
                    selectedGlbId = return_(glbId)
                }

                if (ImGui.BeginDragDropSource(ImGui.DragDropFlags.None)) {
                    // Set payload to carry the index of our item (could be anything)
                    ImGui.SetDragDropPayload<dropGlbUIData>(dragDropType, {
                        fromUIControlName: assetUIControlName,
                        data: glbId
                    })

                    // Display preview (could be anything, e.g. when dragging an image we could decide to display
                    // the filename and a small preview of the image, etc.)
                    ImGui.Text(glbName)
                    ImGui.EndDragDropSource()
                }


                ImGui.Text(glbName.slice(0, 8))


                let last_button_x2: number = ImGui.GetItemRectMax().x
                let next_button_x2: number = last_button_x2 + style.ItemSpacing.x + sizeX // Expected position if next button was on same line
                ImGui.EndGroup() // Lock X position
                if (glbIndex + 1 < glbCount && next_button_x2 < window_visible_x2)
                    ImGui.SameLine()

                ImGui.PopID()

                return selectedGlbId
            }, null)

            ImGui.End()

            return [isRemoveAsset, isLoadGlb, selectedGlbId]
        },
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
            _setNextWindowRect(rect)

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
