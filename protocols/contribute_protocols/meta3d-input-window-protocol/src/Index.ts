import { inputFunc } from "meta3d-ui-protocol/src/contribute/InputContributeType"
import { windowFlags } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export type data = {
    isShow: boolean,
    flags: windowFlags
}

export type func = inputFunc<data>