import { api } from "type-api/src/Type"
import { category, model } from "unit-protocol/src/service/UnitType"
import { models } from "./Type"

// export let getModelData = () => {
//     return {
//         [model.Melee1]: {
//             category: category.EliteGiantess,
//             snapshotSrc: "./asset/elitegiantess/snapshot_melee1.png",
//         }
//     }
// }

let _getAllModelData = (api: api): models => {
    return {
        [category.EliteGiantess]: [{
            model: model.Melee1,
            scalar: 0.01,
            // initialEulerForMoveTween: api.NullableUtils.getEmpty(),

            updateBoxFunc: (box) => {
                return api.box3.setFromCenterAndSize(
                    api.box3.clone(box),
                    api.box3.getCenter(box, api.vector3.getTempVector1()),
                    api.vector3.multiply(
                        api.box3.getSize(box, api.vector3.getTempVector2()),
                        api.vector3.create(0.5, 0.8, 0.9)
                    )
                )
            }
        }]
    }
}

export let getAllModelData = (api: api, category_: category) => {
    const data = _getAllModelData(api)

    return api.NullableUtils.getWithDefault(
        data[category_],
        []
    )
}

export let getModelData = (api: api, category: category, model: model) => {
    const data = _getAllModelData(api)

    return api.NullableUtils.getExn(api.MutableRecordUtils.getExn(data, category).find(data => data.model == model))
}

// let _findModelCategory = (model_: model) => {
//     const data = _getAllModelData()

//     return MutableRecordUtils.reduce(data, (result, models, category_) => {
//         if (models.map(item => item.model).includes(model_)) {
//             return category_
//         }

//         return result
//     }, category.EliteGiantess)
// }

let _getPathPrefix = (category_: category) => `./unit-model/src/asset/${category_.toLowerCase()}`

export let getModelFilePaths = (api: api, category: category, model: model) => {
    // let category_ = _findModelCategory(model_).toLowerCase()
    let model_ = model.toLowerCase()

    return {
        modelPath: `${_getPathPrefix(category)}/model_${model_}.fbx`,
        snapshotPath: `${_getPathPrefix(category)}/snapshot_${model_}.png`,
    }
}