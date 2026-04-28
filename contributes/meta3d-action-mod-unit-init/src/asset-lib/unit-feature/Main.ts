import { feature } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getAllFeatureData = () => {
    return {
        [feature.DamageBigger]: {
            maxLevel: 3
        },
        [feature.PassiveBigger]: {
            maxLevel: 3
        },
        [feature.PoisonSingle]: {
            maxLevel: 3
        },
        [feature.IceSingle]: {
            maxLevel: 3
        },
        [feature.StressProtect]: {
            maxLevel: 3
        },
        [feature.FragileGrowth]: {
            maxLevel: 3
        },
        [feature.DoorShield]: {
            maxLevel: 3
        },
        [feature.DecreaseScale]: {
            maxLevel: 5
        },
        [feature.Pull]: {
            maxLevel: 3
        },
        [feature.DefenseIncreaseDefense]: {
            maxLevel: 3
        },
        [feature.HpRatioDirect]: {
            maxLevel: 3
        },
        [feature.HpRatioInverse]: {
            maxLevel: 3
        },
        [feature.ShootDistanceDirect]: {
            maxLevel: 3
        },
        [feature.ShootDistanceInverse]: {
            maxLevel: 3
        },
    }
}
