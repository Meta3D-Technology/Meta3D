import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-unit-init-protocol"
import { eventName, inputData } from "meta3d-action-mod-unit-init-protocol/src/EventType"
import { actionName as infoActionName, state as infoState } from "meta3d-action-mod-career-info-protocol"
import { getAllModelData, getModelSnapshotPath } from "./asset-lib/unit-model/Main"
import { getActions, getActionSnapshotPath, getAllDamageEffectData, getEmitterInstances, getEmitterInstanceSnapshotPath, getEmitterParticleImages, getEmitterParticleImageSnapshotPath, getEmitterSubEffects, getEmitterSubEffectSnapshotPath, getEmitterTypes, getMeleeSubEffects, getMeleeSubEffectSnapshotPath, getRangedSubEffects, getRangedSubEffectSnapshotPath, getAllDefaultAnimationData } from "./asset-lib/unit-action/Main"
// import { getData } from "./CareerFeatureData"
// import { getRandomFloat, getRandomInteger, randomSelect, convertDecimalToPercent, getDecimal } from "./NumberUtils"
// import { actionName as languageActionName, state as languageState } from "meta3d-action-mod-language-protocol"
import { reducePromise } from "meta3d-structure-utils/src/ArrayUtils"
import { imageSrcToBase64 } from "meta3d-file-ts-utils/src/ImageUtils"
import { armorRatio, armorStrength, attackFactor, countFactor, defenseFactor, emitSpeed, emitSpeedFactor, critRatioFactor, hp, emitPrecision, scale, emitterSpeed, emitterType, excitement, forceSize, speed, emitterVolume, critRatio, emitterLife, emitterSize, emitterCollisionSize, emitterCount, explodeRange, armorPiercingForceRatio, weaponType, behaviourMode, behaviourModeKey, idleMode, nearAttackTargetMode, attackMode, remoteAttackMode, armorType } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { getAllPropData } from "./asset-lib/prop/Main"
import { getAllFeatureData } from "./asset-lib/unit-feature/Main"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"
import { getTextData, getTextDataByVariable } from "meta3d-language-utils/src/Data"
import { resetInitState } from "meta3d-action-mod-unit-utils/src/Main"
import { languageKey } from "meta3d-language-utils/src/Type"
import { actionData } from "meta3d-action-mod-unit-init-protocol/src/Type"

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
            meta3dState = api.action.setActionState(meta3dState, infoActionName, {
                ...api.nullable.getExn(api.action.getActionState<infoState>(meta3dState, infoActionName)),
                info: api.nullable.return(getLanguageTextData(api, meta3dState, api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName)).languageTextData, languageKey.Loading))
            })

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
                                Array.from(api.immutable.createMapOfData(actions as any).entries()),
                                (result, [action, actionData]: any) => {
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
                                // return result.set(category, map)
                                return result.set(category, map.sortBy((_, key) => key))
                            })
                        },
                        api.immutable.createMap()
                    ).then(newAllActionData => {
                        let newAllFeatureData = Array.from(api.immutable.createMapOfData(getAllFeatureData()).entries()).reduce(
                            (result, [feature, featureData]: any) => {
                                return result.push({
                                    name: feature,
                                    maxLevel: featureData.maxLevel,
                                    categories: featureData.categories,
                                })
                            },
                            api.immutable.createList()
                        ).sort((a: any, b: any) => {
                            return a.name.localeCompare(b.name)
                        })

                        let newAllDamageEffectData = Array.from(api.immutable.createMapOfData(getAllDamageEffectData()).entries()).reduce(
                            (result, [damageEffect, damageEffectData]) => {
                                return result.push({
                                    name: damageEffect,
                                    maxLevel: damageEffectData.maxLevel
                                })
                            },
                            api.immutable.createList()
                        ).sort((a: any, b: any) => {
                            return a.name.localeCompare(b.name)
                        })


                        // return reducePromise(
                        //     getAllPropData(),
                        //     (result, data) => {
                        //         return new Promise((resolve, reject) => {
                        //             imageSrcToBase64(
                        //                 resolve,
                        //                 reject,
                        //                 getPropSnapshotPath(_getPathPrefix("prop"), data.name)
                        //             )
                        //         }).then((imageBase64) => {
                        //             return result.push({
                        //                 ...data,
                        //                 snapshotImageBase64: imageBase64,
                        //             })
                        //         })
                        //     },
                        //     api.immutable.createList()
                        // )
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
                                return reducePromise(
                                    getMeleeSubEffects(),
                                    (result, data) => {
                                        return new Promise((resolve, reject) => {
                                            imageSrcToBase64(
                                                resolve,
                                                reject,
                                                getMeleeSubEffectSnapshotPath(_getPathPrefix("unit-action"), data)
                                            )
                                        }).then((imageBase64) => {
                                            return result.push({
                                                name: data,
                                                snapshotImageBase64: imageBase64,
                                            })
                                        })
                                    },
                                    api.immutable.createList()
                                ).then(newMeleeSubEffects => {
                                    return reducePromise(
                                        getRangedSubEffects(),
                                        (result, data) => {
                                            return new Promise((resolve, reject) => {
                                                imageSrcToBase64(
                                                    resolve,
                                                    reject,
                                                    getRangedSubEffectSnapshotPath(_getPathPrefix("unit-action"), data)
                                                )
                                            }).then((imageBase64) => {
                                                return result.push({
                                                    name: data,
                                                    snapshotImageBase64: imageBase64,
                                                })
                                            })
                                        },
                                        api.immutable.createList()
                                    ).then(newRangedSubEffects => {
                                        return reducePromise(
                                            getEmitterSubEffects(),
                                            (result, data) => {
                                                return new Promise((resolve, reject) => {
                                                    imageSrcToBase64(
                                                        resolve,
                                                        reject,
                                                        getEmitterSubEffectSnapshotPath(_getPathPrefix("unit-action"), data)
                                                    )
                                                }).then((imageBase64) => {
                                                    return result.push({
                                                        name: data,
                                                        snapshotImageBase64: imageBase64,
                                                    })
                                                })
                                            },
                                            api.immutable.createList()
                                        ).then(newEmitterSubEffects => {
                                            meta3dState = api.action.setActionState(meta3dState, actionName, {
                                                ...api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName)),
                                                allModelData: newAllModelData,
                                                allActionData: newAllActionData,
                                                allEmitterParticleImages: newEmitterParticleImages,
                                                allEmitterInstances: newEmitterInstances,
                                                allDamageEffects: newAllDamageEffectData,
                                                allFeatureData: newAllFeatureData,

                                                allMeleeSubEffects: newMeleeSubEffects.sort((a: any, b: any) => {
                                                    return a.name.localeCompare(b.name)
                                                }),
                                                allRangedSubEffects: newRangedSubEffects.sort((a: any, b: any) => {
                                                    return a.name.localeCompare(b.name)
                                                }),
                                                allEmitterSubEffects: newEmitterSubEffects.sort((a: any, b: any) => {
                                                    return a.name.localeCompare(b.name)
                                                }),
                                            })

                                            return meta3dState
                                        })
                                    })
                                })
                            })
                        })

                    })
                })
                    .then(meta3dState => {
                        return api.action.setActionState(meta3dState, infoActionName, {
                            ...api.nullable.getExn(api.action.getActionState<infoState>(meta3dState, infoActionName)),
                            info: api.nullable.getEmpty()
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
            return resetInitState(api, {
                languageTextData: getTextData(),
                languageTextDataByVariable: getTextDataByVariable(),


                // allModelData: api.immutable.createMapOfData(getAllModelData()),
                allModelData: api.immutable.createMap(),
                allActionData: api.immutable.createMap(),
                // allSubEffects: api.immutable.createListOfData(getSubEffects()),
                allDamageEffects: api.immutable.createList(),
                allMeleeSubEffects: api.immutable.createList(),
                allRangedSubEffects: api.immutable.createList(),
                allEmitterSubEffects: api.immutable.createList(),
                allEmitterTypes: api.immutable.createListOfData(getEmitterTypes()),
                allEmitterParticleImages: api.immutable.createList(),
                allEmitterInstances: api.immutable.createList(),
                allFeatureData: api.immutable.createList(),
                allPropData: api.immutable.createListOfData(getAllPropData()),
                allAnimationData: api.immutable.createMapOfData(getAllDefaultAnimationData()).map(data => api.immutable.createMapOfData(data)),
            })
        }
    }
}