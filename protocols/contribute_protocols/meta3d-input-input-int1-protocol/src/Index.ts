import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { inputFunc } from "meta3d-ui-protocol/src/contribute/InputContributeType"

export type data = nullable<number>

export type func = inputFunc<data>