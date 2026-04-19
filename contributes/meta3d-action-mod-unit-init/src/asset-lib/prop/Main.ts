import { propName, props } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getAllPropData = (): props => {
    return ([
        {
            name: propName.AddHp1,
        },
        {
            name: propName.AddHp2,
        },
        {
            name: propName.AddHp3,
        },
        {
            name: propName.AddHp4,
        },
        {
            name: propName.AddExcitement1,
        },
        {
            name: propName.AddExcitement2,
        },
        {
            name: propName.AddExcitement3,
        },
        {
            name: propName.AddExcitement4,
        },
        {
            name: propName.LaserBullet,
        },
        {
            name: propName.RocketBullet,
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
                    name: "Weapon_BiggerBulletGun"
                },
                {
                    name: "Weapon_SmallerBulletGun"
                },
                {
                    name: "Weapon_ShotBulletGun"
                },
                {
                    name: "Weapon_SubMachineBulletGun"
                },
                {
                    name: "Prop_Other_Run"
                },
                {
                    name: "Prop_Other_SmallerWater"
                },
                {
                    name: "Prop_Other_Strong"
                },
            ]
        )
}

// export let getPropSnapshotPath = (pathPrefix, propName: propName) => {
//     return `${pathPrefix}/${propName}.png`
// }