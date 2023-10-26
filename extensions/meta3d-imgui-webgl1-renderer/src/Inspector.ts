import { inspectorFunc } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { buildBind, buildRef, setNextWindowRect } from "./Utils"
import * as ImGui from "./lib/imgui"
import { bind, getExn, getWithDefault, isNullable, return_ } from "meta3d-commonlib-ts/src/NullableUtils"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { name } from "meta3d-gameobject-protocol"

let _buildReturnedVectorData = (x: nullable<number>, y: nullable<number>, z: nullable<number>, originData: [number, number, number]): nullable<[number, number, number]> => {
    if (isNullable(x) && isNullable(y) && isNullable(z)) {
        return null
    }

    return [
        isNullable(x) ? originData[0] : getExn(x),
        isNullable(y) ? originData[1] : getExn(y),
        isNullable(z) ? originData[2] : getExn(z)
    ]
}

export let inspector: inspectorFunc = (
    gameObjectName,
    localPosition,
    localEulerAngles,
    localScale,
    windowName, rect) => {

    let [localPositionX, localPositionY, localPositionZ] = localPosition
    let [localEulerAngleX, localEulerAngleY, localEulerAngleZ] = localEulerAngles
    let [localScaleX, localScaleY, localScaleZ] = localScale

    let gameObjectNameRef = buildRef(gameObjectName)
    let localPositionXRef = buildRef(localPositionX)
    let localPositionYRef = buildRef(localPositionY)
    let localPositionZRef = buildRef(localPositionZ)
    let localEulerAngleXRef = buildRef(localEulerAngleX)
    let localEulerAngleYRef = buildRef(localEulerAngleY)
    let localEulerAngleZRef = buildRef(localEulerAngleZ)
    let localScaleXRef = buildRef(localScaleX)
    let localScaleYRef = buildRef(localScaleY)
    let localScaleZRef = buildRef(localScaleZ)

    let newGameObjectName: nullable<name> = null
    let newLocalPositionX: nullable<number> = null
    let newLocalPositionY: nullable<number> = null
    let newLocalPositionZ: nullable<number> = null
    let newLocalEulerAngleX: nullable<number> = null
    let newLocalEulerAngleY: nullable<number> = null
    let newLocalEulerAngleZ: nullable<number> = null
    let newLocalScaleX: nullable<number> = null
    let newLocalScaleY: nullable<number> = null
    let newLocalScaleZ: nullable<number> = null


    setNextWindowRect(rect)

    ImGui.Begin(windowName, null, ImGui.WindowFlags.NoTitleBar)

    ImGui.PushItemWidth(rect.width)
    if (ImGui.InputText("Name", buildBind(gameObjectNameRef), 35)) {
        newGameObjectName = gameObjectNameRef.content
    }

    ImGui.SetNextItemOpen(true, ImGui.Cond.Always)
    if (ImGui.CollapsingHeader("Transform")) {
        ImGui.PushItemWidth(rect.width / 4)

        ImGui.PushID("position_x")
        if (ImGui.InputFloat("", buildBind(localPositionXRef), 0.01, 1.0, "%.5f")) {
            newLocalPositionX = localPositionXRef.content
        }
        ImGui.PopID()
        ImGui.SameLine()

        ImGui.PushID("position_y")
        if (ImGui.InputFloat("", buildBind(localPositionYRef), 0.01, 1.0, "%.5f")) {
            newLocalPositionY = localPositionYRef.content
        }
        ImGui.PopID()
        ImGui.SameLine()

        ImGui.PushID("position_z")
        if (ImGui.InputFloat("", buildBind(localPositionZRef), 0.01, 1.0, "%.5f")) {
            newLocalPositionZ = localPositionZRef.content
        }
        ImGui.PopID()


        ImGui.SameLine()

        ImGui.Text("Position")




        ImGui.PushID("eulerAngle_x")
        if (ImGui.InputFloat("", buildBind(localEulerAngleXRef), 0.01, 1.0, "%.5f")) {
            newLocalEulerAngleX = localEulerAngleXRef.content
        }
        ImGui.PopID()
        ImGui.SameLine()

        ImGui.PushID("eulerAngle_y")
        if (ImGui.InputFloat("", buildBind(localEulerAngleYRef), 0.01, 1.0, "%.5f")) {
            newLocalEulerAngleY = localEulerAngleYRef.content
        }
        ImGui.PopID()
        ImGui.SameLine()

        ImGui.PushID("eulerAngle_z")
        if (ImGui.InputFloat("", buildBind(localEulerAngleZRef), 0.01, 1.0, "%.5f")) {
            newLocalEulerAngleZ = localEulerAngleZRef.content
        }
        ImGui.PopID()


        ImGui.SameLine()

        ImGui.Text("EulerAngle")





        ImGui.PushID("scale_x")
        if (ImGui.InputFloat("", buildBind(localScaleXRef), 0.01, 1.0, "%.5f")) {
            newLocalScaleX = localScaleXRef.content
        }
        ImGui.PopID()
        ImGui.SameLine()

        ImGui.PushID("scale_y")
        if (ImGui.InputFloat("", buildBind(localScaleYRef), 0.01, 1.0, "%.5f")) {
            newLocalScaleY = localScaleYRef.content
        }
        ImGui.PopID()
        ImGui.SameLine()

        ImGui.PushID("scale_z")
        if (ImGui.InputFloat("", buildBind(localScaleZRef), 0.01, 1.0, "%.5f")) {
            newLocalScaleZ = localScaleZRef.content
        }
        ImGui.PopID()


        ImGui.SameLine()

        ImGui.Text("Scale")


        ImGui.PopItemWidth()
    }

    ImGui.End()

    return [
        newGameObjectName,
        _buildReturnedVectorData(newLocalPositionX, newLocalPositionY, newLocalPositionZ, localPosition),
        _buildReturnedVectorData(newLocalEulerAngleX, newLocalEulerAngleY, newLocalEulerAngleZ, localEulerAngles),
        _buildReturnedVectorData(newLocalScaleX, newLocalScaleY, newLocalScaleZ, localScale),
    ]
}