import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-unit-init-protocol"
import { eventName, inputData } from "meta3d-action-mod-unit-init-protocol/src/EventType"
import { actionName as infoActionName, state as infoState } from "meta3d-action-mod-career-info-protocol"
import { getAllModelData, getModelSnapshotPath } from "./asset-lib/unit-model/Main"
import { getActions, getActionSnapshotPath, getAllDamageEffectData, getEmitterInstances, getEmitterInstanceSnapshotPath, getEmitterParticleImages, getEmitterParticleImageSnapshotPath, getEmitterSubEffects, getEmitterSubEffectSnapshotPath, getEmitterTypes, getMeleeSubEffects, getMeleeSubEffectSnapshotPath, getRangedSubEffects, getRangedSubEffectSnapshotPath } from "./asset-lib/unit-action/Main"
// import { getData } from "./CareerFeatureData"
// import { getRandomFloat, getRandomInteger, randomSelect, convertDecimalToPercent, getDecimal } from "./NumberUtils"
// import { actionName as languageActionName, state as languageState } from "meta3d-action-mod-language-protocol"
import { reducePromise } from "meta3d-structure-utils/src/ArrayUtils"
import { imageSrcToBase64 } from "meta3d-file-ts-utils/src/ImageUtils"
import { armorRatio, armorStrength, attackFactor, countFactor, defenseFactor, emitSpeed, emitSpeedFactor, critRatioFactor, hp, emitPrecision, scale, emitterSpeed, emitterType, excitement, forceSize, speed, emitterVolume, critRatio, emitterLife, emitterSize, emitterCollisionSize, emitterCount, explodeRange, armorPiercingForceRatio, weaponType, behaviourMode, behaviourModeKey, idleMode, nearAttackTargetMode, attackMode, remoteAttackMode } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { getAllPropData } from "./asset-lib/prop/Main"
import { getAllFeatureData } from "./asset-lib/unit-feature/Main"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"
import { getTextData, getTextDataByVariable } from "meta3d-language-utils/src/Data"
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
                            (result, [feature, featureData]) => {
                                return result.push({
                                    name: feature,
                                    maxLevel: featureData.maxLevel
                                })
                            },
                            api.immutable.createList()
                        )

                        let newAllDamageEffectData = Array.from(api.immutable.createMapOfData(getAllDamageEffectData()).entries()).reduce(
                            (result, [damageEffect, damageEffectData]) => {
                                return result.push({
                                    name: damageEffect,
                                    maxLevel: damageEffectData.maxLevel
                                })
                            },
                            api.immutable.createList()
                        )


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

                                                allMeleeSubEffects: newMeleeSubEffects,
                                                allRangedSubEffects: newRangedSubEffects,
                                                allEmitterSubEffects: newEmitterSubEffects,
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
            return {
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

                selectedModelIndex: 0,
                selectedSmallSkillObjectActionIndex: 0,
                selectedSmallSkillObjectEmitterParticleImageIndex: api.nullable.getEmpty(),
                selectedSmallSkillObjectEmitterInstanceIndex: api.nullable.getEmpty(),
                selectedBigSkillObjectActionIndex: 0,
                selectedBigSkillObjectEmitterParticleImageIndex: api.nullable.getEmpty(),
                selectedBigSkillObjectEmitterInstanceIndex: api.nullable.getEmpty(),

                // isShowModelWindow: false,
                // isShowSkillWindow: false,
                currentTabKey: "Model",

                isShowModelModal: false,
                isShowEliteGiantessUnitValueModal: false,
                isShowOtherUnitValueModal: false,
                isShowSmallSkillModal: false,
                isShowBigSkillModal: false,
                isShowFeatureModal: false,
                isShowRewardModal: false,
                isShowBehaviourFindAttackTargetModeModal: false,
                isShowSmallSkillObjectActionValueModal: false,
                isShowSmallSkillObjectDamageValueModal: false,
                isShowSmallSkillObjectDamageEffectModal: false,
                isShowSmallSkillObjectSubEffectModal: false,
                isShowSmallSkillObjectEmitterParticleImageModal: false,
                isShowSmallSkillObjectEmitterInstanceModal: false,
                isShowSmallSkillObjectEmitterValueModal: false,
                isShowSmallSkillObjectEmitterSubEffectModal: false,
                isShowBigSkillObjectActionValueModal: false,
                isShowBigSkillObjectDamageValueModal: false,
                isShowBigSkillObjectDamageEffectModal: false,
                isShowBigSkillObjectSubEffectModal: false,
                isShowBigSkillObjectEmitterParticleImageModal: false,
                isShowBigSkillObjectEmitterInstanceModal: false,
                isShowBigSkillObjectEmitterValueModal: false,
                isShowBigSkillObjectEmitterSubEffectModal: false,
                isShowPropModal: false,

                excitement: excitement.Level5,
                defenseFactor: defenseFactor.Level5,
                armorRatio: armorRatio.Level5,
                armorStrength: armorStrength.Level5,
                attackFactor: attackFactor.Level5,
                emitSpeedFactor: emitSpeedFactor.Level5,
                critRatioFactor: critRatioFactor.Level5,
                hp: hp.Level5,
                moveSpeed: speed.Level5,
                emitPrecision: emitPrecision.Level5,
                scale: scale.Level5,



                hasSmallSkillObject: false,
                hasBigSkillObject: false,

                s_emitSpeed: emitSpeed.Level5,
                s_volume: emitterVolume.Level5,

                // s_damageType: meleeDamageEffectType.BodyDamage,
                s_damageType: weaponType.Body,
                s_damageEffects: [],

                s_force: forceSize.Level1,
                s_armorPiercingForceRatio: armorPiercingForceRatio.Level5,
                s_critRatio: critRatio.Level5,



                s_hit_subEffects: [],


                s_emitterType: emitterType.Particle,

                s_emitterSpeed: emitterSpeed.Level5,
                s_emitterLife: emitterLife.Level5,
                s_emitterSize: emitterSize.Level3,
                s_emitterCollisionSize: emitterCollisionSize.Level0,
                // s_emitterCount: emitterCount.Level1,
                s_explodeRange: explodeRange.Level5,


                s_emitter_subEffects: [],



                b_emitSpeed: emitSpeed.Level5,
                b_volume: emitterVolume.Level5,

                b_damageType: weaponType.Body,
                b_damageEffects: [],

                b_force: forceSize.Level1,
                b_armorPiercingForceRatio: armorPiercingForceRatio.Level5,
                b_critRatio: critRatio.Level5,



                b_hit_subEffects: [],


                b_emitterType: emitterType.Particle,

                b_emitterSpeed: emitterSpeed.Level5,
                b_emitterLife: emitterLife.Level5,
                b_emitterSize: emitterSize.Level3,
                b_emitterCollisionSize: emitterCollisionSize.Level0,
                // b_emitterCount: emitterCount.Level1,
                b_explodeRange: explodeRange.Level5,


                b_emitter_subEffects: [],



                behaviourData: {
                    findAttackTargetMode: {
                        changeAttackTargetRateFactor: 1,

                        selectGiantssBossRateFactor: 1,
                        selectEliteGiantessRateFactor: 1,
                        selectSoldierRateFactor: 1,
                        selectMilltaryVehicleRateFactor: 1,
                        selectMilltaryBuildingRateFactor: 1,
                        selectPlayerRateFactor: 1,
                        selectBuildingRateFactor: 1,
                    },
                    behaviourMode: {
                        mode: behaviourMode.FindEnemy,
                        values: {
                            [behaviourModeKey.FindEnemyDistanceFactor]: 500,
                            [behaviourModeKey.PursuitDistanceFactor]: 8,
                        }
                    },
                    idleMode: {
                        mode: idleMode.WaitInPlace
                    },
                    nearAttackTargetMode: {
                        mode: nearAttackTargetMode.None
                    },
                    attackMode: {
                        mode: attackMode.None
                    },
                    remoteAttackMode: {
                        mode: remoteAttackMode.None
                    },
                },


                features: [],


                hasAttackCitySceneChapterGenerateData: false,
                hasProtectCitySceneChapterGenerateData: false,
                hasBossSceneChapterGenerateData: false,

                ac_l_sceneData: [],
                ac_g_sceneData: [],

                pc_l_sceneData: [],
                pc_g_sceneData: [],

                bo_l_sceneData: [],
                bo_g_sceneData: [],



                prop: [],
                gem: 0,
                coin: 0,
                experienceValue: 0,



                isShowPublishModal: false,

                displayNameCN: "",
                displayNameEN: "",
                modIconBase64: api.nullable.getEmpty(),
                modIconTexture: api.nullable.getEmpty(),
                isPublic: false,
                description: "",
            }
        }
    }
}
