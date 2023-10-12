import { nullable } from "meta3d-commonlib-ts/src/nullable"

export type t<_index, value> = Array<nullable<value>>
export type t2<value> = t<number, value>
