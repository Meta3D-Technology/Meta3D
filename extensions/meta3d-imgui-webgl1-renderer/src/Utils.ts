import { getValueFunc, rect, ref, setValueFunc } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import * as ImGui from "./lib/imgui"

export let setNextWindowRect = (rect: rect) => {
    ImGui.SetNextWindowPos(new ImGui.ImVec2(rect.x, rect.y))
    ImGui.SetNextWindowSize(new ImGui.ImVec2(rect.width, rect.height))
}

export let buildRef = <T>(value: T): ref<T> => {
    return {
        content: value
    }
}

let _buildBindFunc = <T>(getValueFunc: getValueFunc<T>, setValueFunc: setValueFunc<T>): ImGui.Bind.ImAccess<T> => {
    return (_ = getValueFunc()) => {
        setValueFunc(_)

        return _
    }
}

export let buildBind = <T>(ref: ref<T>): ImGui.Bind.ImAccess<T> => {
    return _buildBindFunc(() => ref.content, (_) => {
        ref.content = _
    })
}