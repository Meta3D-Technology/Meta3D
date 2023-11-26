import { inputFunc } from "meta3d-ui-protocol/src/contribute/InputContributeType"

type fileName = string

type fileId = string

export type data = Array<[fileName, fileId]>

export type func = inputFunc<data>