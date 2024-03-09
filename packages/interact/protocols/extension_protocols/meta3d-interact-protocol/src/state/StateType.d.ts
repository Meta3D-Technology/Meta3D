import type { Map } from "immutable"
import { tweenId } from "../service/ServiceType"

type tween = any

type animation = {
    tweens: Map<tweenId, tween>
}

export type state = {
    animation: animation
}