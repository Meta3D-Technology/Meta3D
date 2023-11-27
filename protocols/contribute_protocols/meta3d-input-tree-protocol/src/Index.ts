import { inputFunc } from "meta3d-ui-protocol/src/contribute/InputContributeType"

export type nodeLabel = string

export enum nodeType {
    Type1,
    Type2,
    Type3
}

export type data = Array<[nodeLabel, nodeType, data]>

export type func = inputFunc<data>