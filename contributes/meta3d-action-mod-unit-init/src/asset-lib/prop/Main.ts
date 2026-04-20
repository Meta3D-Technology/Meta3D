import { propName, props } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getAllPropData = (): props => {
    return ([
        {
            name: propName.AddHp1,
            maxCount: 3,
        },
        {
            name: propName.AddHp2,
            maxCount: 3,
        },
        {
            name: propName.AddHp3,
            maxCount: 2,
        },
        {
            name: propName.AddHp4,
            maxCount: 1,
        },
        {
            name: propName.AddExcitement1,
            maxCount: 3,
        },
        {
            name: propName.AddExcitement2,
            maxCount: 3,
        },
        {
            name: propName.AddExcitement3,
            maxCount: 2,
        },
        {
            name: propName.AddExcitement4,
            maxCount: 1,
        },
        {
            name: propName.LaserBullet,
            maxCount: 19,
        },
        {
            name: propName.RocketBullet,
            maxCount: 19,
        },
    ] as any)
        // .concat(
        //     api.getAllOtherPropData(state).filter(data => !api.isArtifact(state, data.name) && !api.isReviveOrCapture(state, data.name)).map(data => data.name) as any
        // ).concat(
        //     api.getAllBulletPropData(state).map(data => data.name) as any
        // )
        .concat(
            [
                {
                    name: "Weapon_BiggerBulletGun",
                    maxCount: 2,
                },
                {
                    name: "Weapon_SmallerBulletGun",
                    maxCount: 2,
                },
                {
                    name: "Weapon_ShotBulletGun",
                    maxCount: 19,
                },
                {
                    name: "Weapon_SubMachineBulletGun",
                    maxCount: 19,
                },
                {
                    name: "Prop_Other_Run",
                    maxCount: 1,
                },
                {
                    name: "Prop_Other_SmallerWater",
                    maxCount: 1,
                },
                {
                    name: "Prop_Other_Strong",
                    maxCount: 1,
                },
            ]
        )
}

// export let getPropSnapshotPath = (pathPrefix, propName: propName) => {
//     return `${pathPrefix}/${propName}.png`
// }