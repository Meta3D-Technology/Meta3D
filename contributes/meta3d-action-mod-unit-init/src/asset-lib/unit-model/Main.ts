import { category, model } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getAllModelData = () => {
    return {
        [category.EliteGiantess]: [
            {
                model: model.EliteGiantess1,
            },
            {
                model: model.EliteGiantess2,
            },
            {
                model: model.EliteGiantess3,
            },
            {
                model: model.EliteGiantess4,
            },
            {
                model: model.EliteGiantess5,
            },
            {
                model: model.EliteGiantess6,
            },
            {
                model: model.EliteGiantess7,
            },
            {
                model: model.EliteGiantess8,
            },
            {
                model: model.EliteGiantess9,
            },
            {
                model: model.EliteGiantess10,
            },
            // {
            //     model: model.EliteGiantess11,
            // },
        ],
        [category.Soldier]: [
            {
                model: model.Soldier1,
            },
            {
                model: model.Soldier2,
            },
            {
                model: model.Soldier3,
            },
            {
                model: model.Soldier4,
            },
            {
                model: model.Soldier5,
            },
        ]
    }
}

export let getModelSnapshotPath = (pathPrefix, category: category, model: model) => {
    return `${pathPrefix}/${category.toLowerCase()}/snapshot_${model}.png`
}