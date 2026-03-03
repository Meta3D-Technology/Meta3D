import { category, model } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export let getAllModelData = () => {
    return {
        [category.EliteGiantess]: [{
            model: model.Melee1,
        }]
    }
}

let _getPathPrefix = (category_: category) => `./unit-model/src/asset/${category_.toLowerCase()}`

export let getModelSnapshotPath = (category: category, model: model) => {
    let model_ = model.toLowerCase()

    return `${_getPathPrefix(category)}/snapshot_${model_}.png`
}