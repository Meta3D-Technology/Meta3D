import { category, model } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getAllModelData = () => {
    return {
        [category.EliteGiantess]: [
            {
                model: model.EliteGiantessMelee1,
            },
            {
                model: model.EliteGiantessMagic1,
            },
        ]
    }
}

export let getModelSnapshotPath = (pathPrefix, category: category, model: model) => {
    return `${pathPrefix}/${category.toLowerCase()}/snapshot_${model}.png`
}