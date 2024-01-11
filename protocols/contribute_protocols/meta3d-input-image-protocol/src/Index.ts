import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { inputFunc } from "meta3d-ui-protocol/src/contribute/InputContributeType"

type imageBase64 = string

export type data = nullable<imageBase64>

export type func = inputFunc<data>