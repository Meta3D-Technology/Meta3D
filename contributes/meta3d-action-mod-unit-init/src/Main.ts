import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
// import { language } from "meta3d-action-mod-career-add-careerfeature-protocol"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-unit-init-protocol"
import { eventName, inputData } from "meta3d-action-mod-unit-init-protocol/src/EventType"
// import { actionName as infoActionName, state as infoState } from "meta3d-action-mod-unit-info-protocol"
import { getAllModelData, getModelSnapshotPath } from "./asset-lib/unit-model/Main"
// import { getData } from "./CareerFeatureData"
// import { getRandomFloat, getRandomInteger, randomSelect, convertDecimalToPercent, getDecimal } from "./NumberUtils"
// import { actionName as languageActionName, state as languageState } from "meta3d-action-mod-language-protocol"
import { reducePromise } from "meta3d-structure-utils/src/ArrayUtils"
import { imageSrcToBase64 } from "meta3d-file-ts-utils/src/ImageUtils"
import { excitement } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

// let _buildAllDefaultCareerFeatures = (api: api) => {
//     // let modAPI = _buildFakeModAPI()

//     // return api.backend.findModsByProtocol("career-feature-protocol").then(data => {
//     //     return data.map(([_, getBlockService]) => {
//     //         let { name, characterType, positive, minValue, maxValue, getDescriptionFunc, generateRandomValueFunc } = getBlockService(modAPI).getFeatureData(modAPI, null)

//     //         let randomValue = generateRandomValueFunc()
//     //         let valueCount
//     //         if (Array.isArray(randomValue)) {
//     //             valueCount = randomValue.length
//     //         }

//     //         else if (!isFinite(randomValue)) {
//     //             valueCount = 0
//     //         }
//     //         else {
//     //             valueCount = 1
//     //         }

//     //         return {
//     //             name,
//     //             valueCount,
//     //             characterType,
//     //             positive,
//     //             minValue,
//     //             maxValue,
//     //             getDescriptionFunc: (language, name, value) => {
//     //                 // return getDescriptionFunc(null, value)
//     //                 return getDescriptionFunc(language, value)
//     //             },
//     //         }
//     //     })
//     // })
//     //     .then(publishedCareerFeatures => {
//     //         return getData(modAPI).concat(
//     //             publishedCareerFeatures
//     //         )
//     //     })
// }

let _getPathPrefix = () => {
    return "/unit-mod/asset-lib/unit-model/asset"
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            // let isChinese = api.action.getActionState<languageState>(meta3dState, languageActionName).language == language.Chinese

            // meta3dState = api.action.setActionState(meta3dState, infoActionName, {
            //     ...api.nullable.getExn(api.action.getActionState<infoState>(meta3dState, infoActionName)),
            //     info: isChinese ? api.nullable.return("加载中...") : api.nullable.return("Loading...")
            // })

            api.flow.deferExec(api, (meta3dState) => {
                return reducePromise(
                    Array.from(api.immutable.createMapOfData(getAllModelData()).entries()),
                    (result, [category, models]) => {
                        return reducePromise(
                            models,
                            (result, modelData) => {
                                return new Promise((resolve, reject) => {
                                    imageSrcToBase64(
                                        resolve,
                                        reject,
                                        getModelSnapshotPath(_getPathPrefix(), category, modelData.model)

                                    )
                                }).then((imageBase64) => {
                                    return result.concat({
                                        ...modelData,
                                        snapshotImageBase64: imageBase64,
                                    })
                                })
                            },
                            []
                        ).then(newModels => {
                            return result.set(category, newModels)
                        })
                    },
                    api.immutable.createMap()
                ).then(newAllModelData => {
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName)),
                        allModelData: newAllModelData
                    })

                    return meta3dState
                })
            })

            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })

        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    isOnlyRead: true,
                    inputData: []
                }))
            })
        },
        createState: () => {
            return {
                // allModelData: api.immutable.createMapOfData(getAllModelData()),
                allModelData: api.immutable.createMap(),
                selectedModelIndex: api.nullable.getEmpty(),
                isShowModelModal: false,
                isShowUnitValueModal: false,

                excitement: excitement.Level5,
            }
        }
    }
}
