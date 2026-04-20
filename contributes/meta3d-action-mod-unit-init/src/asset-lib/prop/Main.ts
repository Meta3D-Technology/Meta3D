import { propName, props } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getAllPropData = (): props => {
    return ([
        {
            name: propName.AddHp1,
            maxCount: 9,
        },
        {
            name: propName.AddHp2,
            maxCount: 9,
        },
        {
            name: propName.AddHp3,
            maxCount: 9,
        },
        {
            name: propName.AddHp4,
            maxCount: 9,
        },
        {
            name: propName.AddExcitement1,
            maxCount: 9,
        },
        {
            name: propName.AddExcitement2,
            maxCount: 9,
        },
        {
            name: propName.AddExcitement3,
            maxCount: 9,
        },
        {
            name: propName.AddExcitement4,
            maxCount: 9,
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
                    maxCount: 3,
                },
                {
                    name: "Weapon_SmallerBulletGun",
                    maxCount: 3,
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
                    maxCount: 3,
                },
                {
                    name: "Prop_Other_SmallerWater",
                    maxCount: 3,
                },
                {
                    name: "Prop_Other_Strong",
                    maxCount: 3,
                },
            ]
        )
}

// export let getPropSnapshotPath = (pathPrefix, propName: propName) => {
//     return `${pathPrefix}/${propName}.png`
// }