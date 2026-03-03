import { inputFunc } from "meta3d-ui-protocol/src/contribute/InputContributeType"

type itemsWithImageBase64 = Array<{
    imageBase64: string,
    name: string,
}>

export type data = itemsWithImageBase64

export type func = inputFunc<data>