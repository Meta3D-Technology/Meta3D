import { inputFunc } from "meta3d-ui-protocol/src/contribute/InputContributeType"
import { feature } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export type data = Array<[feature, string, number, number]>

export type func = inputFunc<data>