import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { inputFunc } from "meta3d-ui-protocol/src/contribute/InputContributeType"

export type careerFeatureName = string

type careerFeatureValue = number | [number, number] | [number, number, number] | any

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
        values,
        nullable<careerFeatureValue>,
        nullable<careerFeatureValue>,
    ]
>

export type func = inputFunc<data>