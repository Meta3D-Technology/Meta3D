import { category, model } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getAllModelData = () => {
    return {
        [category.EliteGiantess]: [{
            model: model.Melee1,
        }]
    }
}

export let getModelSnapshotPath = (pathPrefix, category: category, model: model) => {
    let model_ = model.toLowerCase()

    return `${pathPrefix}/${category.toLowerCase()}/snapshot_${model_}.png`
}