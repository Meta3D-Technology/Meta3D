import { propName, props } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getAllPropData = (): props => {
    return [
        {
            name: propName.AddHp1,
        },
        {
            name: propName.AddHp2,
        },
    ]
}

export let getPropSnapshotPath = (pathPrefix, propName: propName) => {
    return `${pathPrefix}/${propName}.png`
}