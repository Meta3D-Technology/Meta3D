import { inputFunc } from "meta3d-ui-protocol/src/contribute/InputContributeType"
import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

type fileName = string

type fileId = string

export type data = Array<[fileName, fileId, imguiImplTexture]>

export type func = inputFunc<data>