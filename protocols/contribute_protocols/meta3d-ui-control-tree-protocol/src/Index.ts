
import { func } from "meta3d-input-tree-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { imguiImplTexture, treeIndexData, treeReturnData } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export const uiControlName = "Tree"

export const dragDropType = "DND_TreeNode"

export type imageBase64 = string

export type state = {
    id: string,
    lastTreeSelectedData: nullable<treeIndexData>,
    nodeType1Texture: nullable<imguiImplTexture>,
    lastNodeType1TextureImageBase64: nullable<imageBase64>,
    nodeType2Texture: nullable<imguiImplTexture>,
    lastNodeType2TextureImageBase64: nullable<imageBase64>,
    nodeType3Texture: nullable<imguiImplTexture>,
    lastNodeType3TextureImageBase64: nullable<imageBase64>,
}

export type inputFunc = nullable<func>

export type specificData = {
    label: string,
    rootNodeLabel: string,
    nodeType1Image: nullable<imageBase64>,
    nodeType2Image: nullable<imageBase64>,
    nodeType3Image: nullable<imageBase64>,
}

// type treeNodeId = string

// type selectedTreeNodeId = nullable<treeNodeId>

// type dragData = nullable<{
//     source: nullable<treeNodeId>,
//     target: nullable<treeNodeId>
// }>

// export type outputData = [selectedTreeNodeId, dragData]
export type outputData = treeReturnData