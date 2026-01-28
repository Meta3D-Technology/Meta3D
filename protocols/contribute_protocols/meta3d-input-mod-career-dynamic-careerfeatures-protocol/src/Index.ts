import { inputFunc } from "meta3d-ui-protocol/src/contribute/InputContributeType"

export type careerFeatureName = string

// export enum language {
//     Chinese = "Chinese",
//     English = "English"
// }

// type getDescriptionFunc = (language: language, value: number | Array<number>) => string

type description = string

// type valueCount = number
type values = Array<number>

export type data = Array<
    [
        careerFeatureName,
        // getDescriptionFunc,
        boolean,
        description,
        values
    ]
>

export type func = inputFunc<data>