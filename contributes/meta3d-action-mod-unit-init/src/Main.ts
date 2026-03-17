import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-unit-init-protocol"
import { eventName, inputData } from "meta3d-action-mod-unit-init-protocol/src/EventType"
// import { actionName as infoActionName, state as infoState } from "meta3d-action-mod-unit-info-protocol"
import { getAllModelData, getModelSnapshotPath } from "./asset-lib/unit-model/Main"
import { getActions, getActionSnapshotPath, getEmitterInstances, getEmitterInstanceSnapshotPath, getEmitterParticleImages, getEmitterParticleImageSnapshotPath, getEmitterTypes, getSubEffects } from "./asset-lib/unit-action/Main"
// import { getData } from "./CareerFeatureData"
// import { getRandomFloat, getRandomInteger, randomSelect, convertDecimalToPercent, getDecimal } from "./NumberUtils"
// import { actionName as languageActionName, state as languageState } from "meta3d-action-mod-language-protocol"
import { reducePromise } from "meta3d-structure-utils/src/ArrayUtils"
import { imageSrcToBase64 } from "meta3d-file-ts-utils/src/ImageUtils"
import { action, countFactor, emitSpeed, emitterSpeed, emitterType, excitement, forceSize, instance, meleeDamageEffectType, particleImage } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { getAllPropData, getPropSnapshotPath } from "./asset-lib/prop/Main"
import { gem } from "meta3d-action-mod-unit-publish-to-game-protocol/src/Type"
import { getAllFeatureData } from "./asset-lib/unit-feature/Main"

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

let _getPathPrefix = (unit) => {
    return `/unit-mod/asset-lib/${unit}/asset`
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
                                        getModelSnapshotPath(_getPathPrefix("unit-model"), category, modelData.model)

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
                    return reducePromise(
                        Array.from(api.immutable.createMapOfData(getActions()).entries()),
                        (result, [category, actions]) => {
                            return reducePromise(
                                Array.from(api.immutable.createMapOfData(actions).entries()),
                                (result, [action, actionData]) => {
                                    return new Promise((resolve, reject) => {
                                        imageSrcToBase64(
                                            resolve,
                                            reject,
                                            getActionSnapshotPath(_getPathPrefix("unit-action"), category, action)
                                        )
                                    }).then((imageBase64) => {
                                        return result.set(action, {
                                            ...actionData,
                                            snapshotImageBase64: imageBase64,
                                        })
                                    })
                                },
                                api.immutable.createMap()
                            ).then(map => {
                                return result.set(category, map)
                            })
                        },
                        api.immutable.createMap()
                    ).then(newAllActionData => {
                        let newAlLFeatureData = Array.from(api.immutable.createMapOfData(getAllFeatureData()).entries()).reduce(
                            (result, [feature, featureData]) => {
                                return result.push({
                                    name: feature,
                                    maxLevel: featureData.maxLevel
                                })
                            },
                            api.immutable.createList()
                        )

                        return reducePromise(
                            getAllPropData(),
                            (result, data) => {
                                return new Promise((resolve, reject) => {
                                    imageSrcToBase64(
                                        resolve,
                                        reject,
                                        getPropSnapshotPath(_getPathPrefix("prop"), data.name)
                                    )
                                }).then((imageBase64) => {
                                    return result.push({
                                        ...data,
                                        snapshotImageBase64: imageBase64,
                                    })
                                })
                            },
                            api.immutable.createList()
                        ).then(newProps => {
                            return reducePromise(
                                getEmitterParticleImages(),
                                (result, data) => {
                                    return new Promise((resolve, reject) => {
                                        imageSrcToBase64(
                                            resolve,
                                            reject,
                                            getEmitterParticleImageSnapshotPath(_getPathPrefix("unit-action"), data)
                                        )
                                    }).then((imageBase64) => {
                                        return result.push({
                                            name: data,
                                            snapshotImageBase64: imageBase64,
                                        })
                                    })
                                },
                                api.immutable.createList()
                            ).then(newEmitterParticleImages => {
                                return reducePromise(
                                    getEmitterInstances(),
                                    (result, data) => {
                                        return new Promise((resolve, reject) => {
                                            imageSrcToBase64(
                                                resolve,
                                                reject,
                                                getEmitterInstanceSnapshotPath(_getPathPrefix("unit-action"), data)
                                            )
                                        }).then((imageBase64) => {
                                            return result.push({
                                                name: data,
                                                snapshotImageBase64: imageBase64,
                                            })
                                        })
                                    },
                                    api.immutable.createList()
                                ).then(newEmitterInstances => {
                                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                                        ...api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName)),
                                        allModelData: newAllModelData,
                                        allActionData: newAllActionData,
                                        allEmitterParticleImages: newEmitterParticleImages,
                                        allEmitterInstances: newEmitterInstances,
                                        allFeatureData: newAlLFeatureData,
                                        allPropData: newProps,
                                    })

                                    return meta3dState
                                })
                            })
                        })
                    })
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
                allActionData: api.immutable.createMap(),
                allSubEffects: api.immutable.createListOfData(getSubEffects()),
                allEmitterTypes: api.immutable.createListOfData(getEmitterTypes()),
                allEmitterParticleImages: api.immutable.createList(),
                allEmitterInstances: api.immutable.createList(),
                allFeatureData: api.immutable.createList(),
                allPropData: api.immutable.createList(),

                selectedModelIndex: 0,
                selectedSmallSkillObjectActionIndex: 0,
                selectedSmallSkillObjectEmitterParticleImageIndex: api.nullable.getEmpty(),
                selectedSmallSkillObjectEmitterInstanceIndex: api.nullable.getEmpty(),
                // selectedBigSkillObjectActionIndex: api.nullable.getEmpty(),

                // isShowModelWindow: false,
                // isShowSkillWindow: false,
                currentTabKey: "Model",

                isShowModelModal: false,
                isShowUnitValueModal: false,
                isShowSkillModal: false,
                isShowFeatureModal: false,
                isShowRewardModal: false,
                isShowSmallSkillObjectActionValueModal: false,
                isShowSmallSkillObjectDamageValueModal: false,
                isShowSmallSkillObjectDamageSubEffectModal: false,
                isShowSmallSkillObjectEmitterParticleImageModal: false,
                isShowSmallSkillObjectEmitterInstanceModal: false,
                isShowSmallSkillObjectEmitterValueModal: false,
                isShowSmallSkillObjectEmitterSubEffectModal: false,
                // isShowBigSkillObjectActionValueModal: false,
                isShowPropModal: false,

                excitement: excitement.Level5,


                // skillType: api.nullable.getEmpty(),

                hasSmallSkillObject: false,
                hasBigSkillObject: false,

                // s_action: action.StompLight,
                s_emitSpeed: emitSpeed.Level5,

                s_damageType: meleeDamageEffectType.BodyDamage,

                s_force: forceSize.Level1,

                s_hit_subEffects: [],


                s_emitterType: emitterType.Particle,
                // s_emitterInstance: instance.Missile1,
                // s_emitterParticleImage: particleImage.Fireball1,

                s_emitterSpeed: emitterSpeed.Level5,

                s_emitter_subEffects: [],



                // TODO update
                b_emitSpeed: emitSpeed.Level5,
                b_emitterSpeed: emitterSpeed.Level0,





                features: [],


                hasAttackCitySceneChapterGenerateData: false,
                hasProtectCitySceneChapterGenerateData: false,
                hasBossSceneChapterGenerateData: false,

                ac_l_sceneData: [],
                ac_g_sceneData: [],

                pc_sceneData_rate: 0,
                pc_sceneData_countFactor: countFactor.Level5,

                bo_sceneData_rate: 0,
                bo_sceneData_countFactor: countFactor.Level5,


                prop: [],
            }
        }
    }
}
