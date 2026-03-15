import { feature } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getAllFeatureData = () => {
    return {
        [feature.DamageBigger]: {
            maxLevel: 1
        }
    }
}
