import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { inputFunc } from "meta3d-ui-protocol/src/contribute/InputContributeType"

type text = string

export type data = nullable<text>

export type func = inputFunc<data>