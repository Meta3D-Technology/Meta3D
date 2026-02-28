import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
// import { language } from "meta3d-action-mod-unit-add-careerfeature-protocol"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-unit-publish-to-game-protocol"
import { eventName, inputData } from "meta3d-action-mod-unit-publish-to-game-protocol/src/EventType"
import { action, armorRatio, armorStrength, armorType, attackFactor, category, critRatioFactor, defenseFactor, effect, emitSpeedFactor, excitement, model, skillObject, hp, speed, emitPrecision, scale, emitSpeed, meleeRange, emitterSpeed, emitterLife, emitterSize, emitterCollisionSize, emitterCount, forceSize, armorPiercingForceRatio, weaponType, critRatio, explodeRange, emitterVolume, sceneChapter, countFactor, player } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { autoDifficulty, gem, coin, rate, experienceValue, count } from "meta3d-action-mod-unit-publish-to-game-protocol/src/Type"
// import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable"
// import { readAccount } from "meta3d-user-utils/src/Main"
// import { actionName as addCareerFeatureActionName, characterType, state as addCareerFeatureState } from "meta3d-action-mod-unit-add-careerfeature-protocol"
// import { actionName as selectCharacterTypeActionName, state as selectCharacterTypeState } from "meta3d-action-mod-unit-selectcharactertype-protocol"
// import { actionName as loadModPreviewActionName, state as loadModPreviewState } from "meta3d-action-mod-unit-load-modpreview-protocol"
// import { actionName as loadCareerPreviewActionName, state as loadCareerPreviewState } from "meta3d-action-mod-unit-load-careerpreview-protocol"
// import { actionName as infoActionName, state as infoState } from "meta3d-action-mod-unit-info-protocol"
// import { actionName as languageActionName, state as languageState } from "meta3d-action-mod-language-protocol"


// let _deserializeData = (api: api, value) => {
//     return api.nullable.map(
//         deserializeData,
//         value
//     )
// }

// let _getLoginedUserName = <T>(api: api, store) => {
//     return api.storage.getItem(store, "LoginedUserName").then(value => _deserializeData(api, value))
// }

// let _getLoginedUserName = () => {
//     // 获取当前URL的参数
//     const urlParams = new URLSearchParams(window.location.href);

//     return urlParams.get("username")
// }

// let _isDebugEnv = () => {
//     return globalThis.location.href.includes("localhost")
// }

// let _initAuthor = (api: api, meta3dState) => {
//     // let store = api.storage.createInstance({ name: "store_backend_temp" })


//     let userName = _getLoginedUserName()

//     if (api.nullable.isNullable(userName)) {
//         // alert("请从游戏中进入(Please Enter from Game)")

//         // globalThis.location.href = "https://gts-play.cn"
//         // return meta3dState

//         if (!_isDebugEnv()) {
//             alert("无法获得作者名，使用默认的作者名(Can't get author name, use default one instead)")
//         }

//         userName = api.nullable.return("Unknown")
//     }

//     return api.action.setActionState<state>(meta3dState, actionName, {
//         ...api.action.getActionState<state>(meta3dState, actionName),
//         author: api.nullable.getExn(userName)
//     })
// }



// //TODO duplicate
// let _isCharacterTypeEqual = (characterType1: characterType, characterType2: characterType) => {
//     if (characterType1 == characterType.GiantessOrLittleMan
//         || characterType2 == characterType.GiantessOrLittleMan
//     ) {
//         return true
//     }

//     return characterType1 == characterType2
// }

// // let _base64ToUint8Array = (base64String) => {
// //     // 移除 data URL 前缀
// //     const base64 = base64String.replace(/^data:image\/\w+;base64,/, '');

// //     // 解码 Base64
// //     const binaryString = atob(base64);

// //     // 使用 TextEncoder 转换为字节
// //     const encoder = new TextEncoder();
// //     return encoder.encode(binaryString);
// // }
// let _base64ToUint8Array = (base64String) => {
//     if (base64String.length == 0) {
//         return Promise.resolve(new Uint8Array())
//     }

//     // 获取 Base64 数据（移除前缀）
//     const base64Data = base64String.split(',')[1] || base64String;

//     // 将 Base64 转为 Blob，再转为 ArrayBuffer
//     // const response = await fetch(`data:image/jpeg;base64,${base64Data}`);
//     // const arrayBuffer = await response.arrayBuffer();

//     // 转为 Uint8Array
//     // return new Uint8Array(arrayBuffer);

//     return fetch(`data:image/jpeg;base64,${base64Data}`).then(response => response.arrayBuffer()).then(arrayBuffer => new Uint8Array(arrayBuffer))
// }

// let _buildFeatures = (api: api, features) => {
//     return JSON.stringify(features.reduce((object, { name, values }) => {
//         let value = values.count() == 1 ? values.first() : values.toArray()

//         /*! AddHpByBeat, IncreaseUBCapacity's value may be null!(why?) so need fixed here!
//         * 
//         */
//         if (!api.nullable.isNullable(value)) {
//             object[name] = value
//         }

//         return object
//     }, {}))
// }

let _buildDistFileContent = (api, state) => {
    return `
    (() => { 
    window.Mod = {
        createBlockState: (api) => {
            return {};
        },
        getBlockService: (api) => {
            return {
        getName: () => "精英近战巨大娘1",
        getDisplayName: () => {
            return {
                displayNameCN: "精英近战巨大娘1",
                displayNameEN: "Elite Giantess Melee 1",
            }
        },
        getModel: () => ${model.Melee1},
        getCategory: () => ${category.EliteGiantess},
        getValue: (api: api, state) => {
            // TODO judge getCategory when by editor

            return api.updateEliteGiantessValue(state, ${JSON.stringify({
        // excitement: excitement.MostHigh,

        // defenseFactor: defenseFactor.Low,
        // armorType: armorType.Giantess,
        // armorRatio: armorRatio.Light2,
        // armorStrength: armorStrength.Low * 1.5,
        // // attackFactor: attackFactor.Low,
        // attackFactor: attackFactor.VeryLow,
        // // emitSpeedFactor: emitSpeedFactor.Low,
        // emitSpeedFactor: emitSpeedFactor.VeryLow2,
        // critRatioFactor: critRatioFactor.VeryLow,
        // //missRatio: missRatio.VeryLow,

        // hp: hp.VeryHigh2,

        // // moveSpeed: speed.High2,
        // // moveSpeed: speed.VeryHigh,
        // moveSpeed: speed.VeryHigh / 22,

        // emitPrecision: emitPrecision.Low,

        // scale: scale.High,

        excitement: excitement.Level10,

        defenseFactor: defenseFactor.Level4,
        armorType: armorType.Giantess,
        armorRatio: armorRatio.Level2,
        armorStrength: armorStrength.Level4 * 1.5,
        // attackFactor: attackFactor.Low,
        attackFactor: attackFactor.Level5,
        // emitSpeedFactor: emitSpeedFactor.Low,
        emitSpeedFactor: emitSpeedFactor.Level0,
        critRatioFactor: critRatioFactor.Level1,
        //missRatio: missRatio.VeryLow,

        hp: hp.Level9,

        // moveSpeed: speed.High2,
        // moveSpeed: speed.VeryHigh,
        moveSpeed: speed.Level8 / 22,

        emitPrecision: emitPrecision.Level0,

        // scale: scale.Level5,
        scale: scale.Level10,

    })})
        },
        getSkillData: () => ${JSON.stringify({
        [skillObject.Small]: {
            action: action.StompLight,
            value: {
                emitSpeed: emitSpeed.Level5,

                meleeRange: api.nullable.return(meleeRange.Level4 * 1.5 * 1.1 / 22),

                emitterSpeed: emitterSpeed.Level0,
                emitterLife: emitterLife.Level0,
                emitterSize: emitterSize.Level0,
                emitterCollisionSize: emitterCollisionSize.Level0,
                emitterCount: emitterCount.Level0,
            },
            effect: {
                name: effect.Stomp,

                // particleData: [
                //     {
                //         type: particleType.Smoke,

                //         TODO
                //     }
                // ],

                value: {
                    // force: forceSize.VeryLow4 * 0.4,
                    force: forceSize.Level1 * 3 / 8 * 0.4,
                    armorPiercingForceRatio: armorPiercingForceRatio.Level4,
                    type: weaponType.Body,

                    critRatio: critRatio.Level0,
                    explodeRange: explodeRange.Level0,
                    emitterVolume: emitterVolume.Level6,
                },
            },
        },
        [skillObject.Big]: {
            action: action.KickLight,
            value: {
                emitSpeed: emitSpeed.Level5,

                meleeRange: api.nullable.return(meleeRange.Level6 * 1.5 * 1.1 / 22),

                emitterSpeed: emitterSpeed.Level0,
                emitterLife: emitterLife.Level0,
                emitterSize: emitterSize.Level0,
                emitterCollisionSize: emitterCollisionSize.Level0,
                emitterCount: emitterCount.Level0,
            },
            effect: {
                name: effect.DamageBody,

                value: {
                    force: forceSize.Level1 * 3 / 8,
                    armorPiercingForceRatio: armorPiercingForceRatio.Level4,
                    type: weaponType.Body,

                    critRatio: critRatio.Level0,
                    explodeRange: explodeRange.Level0,
                    emitterVolume: emitterVolume.Level5,
                },
            },
        },
    })},
        getGenerateData: () => ${JSON.stringify({
        [sceneChapter.AttackCity]: {
            [player.LittleMan]: [
                {
                    difficulty: autoDifficulty.Easy,
                    countFactor: countFactor.Level10,
                },
                {
                    difficulty: autoDifficulty.VeryHard5,
                    countFactor: countFactor.Level0,
                },
            ],
            [player.Giantess]: [
                {
                    difficulty: autoDifficulty.VeryHard,
                    countFactor: countFactor.Level10,
                },
                {
                    difficulty: autoDifficulty.VeryHard1,
                    countFactor: countFactor.Level0,
                },
            ],
        },
        [sceneChapter.ProtectCity]: {
            rate: 0.5,
            countFactor: countFactor.Level10,
        },
        [sceneChapter.Boss]: {
            rate: 0.5,
            countFactor: countFactor.Level10,
        },
    })},
        getRewardData: () => {
            return ${JSON.stringify({
        gem: state => gem.Middle3,
        coin: state => coin.VeryHigh,
        prop: [
            {
                // name: propName.AddHp2,
                name: "AddHp2",

                getCountFunc: state => count.VeryLow,
                getRateFunc: state => rate.Low,
            },

            // {
            //     // name: propName.BiggerBullet,
            //     name: api.block.getBlockService<service>(state, getPropBulletProtocolName(), getPropBulletBiggerBlockName()).getWeaponName(),

            //     getCountFunc: state => count.VeryLow,
            //     getRateFunc: state => rate.VeryLow,
            // },
            // {
            //     // name: propName.SmallerToLastBiggerCount,
            //     name: api.block.getBlockService<service>(state, getPropBulletProtocolName(), getPropBulletSmallerBlockName()).getWeaponName(),

            //     getCountFunc: state => count.VeryLow,
            //     getRateFunc: state => rate.VeryLow2,
            // },

            // {
            //     name: api.block.getBlockService<propOtherService>(state, getPropOtherProtocolName(), getPropStrongBiggerBlockName()).getName(),

            //     getCountFunc: state => count.VeryLow,
            //     getRateFunc: state => rate.Low,
            // },
        ],
        experienceValue: experienceValue.VeryHigh,
    })}
        },
    };
        }
    };
})();
    `
}
// let _getDisplayName = (state: state, isChinese) => {
//     return isChinese ? state.displayName_cn : state.displayName_en
// }

// let _buildUniqueName = (state: state, isChinese) => {
//     return `${state.author}_${_getDisplayName(state, isChinese)}`
// }

// let _buildIconId = (state: state, isChinese) => {
//     return `${_buildUniqueName(state, isChinese)}_icon`
// }

// let _unifyCareerFeatureValueToArray = (value) => {
//     if (Array.isArray(value)) {
//         return value
//     }

//     return [value]
// }

// let _range = (a, b) => {
//     let res = []
//     for (let i = a; i <= b; i++) {
//         res.push(i)
//     }

//     return res
// }

// let _isFeaturesInRange = (api: api, features) => {
//     return features.reduce((result, { values, minValue, maxValue }) => {
//         if (!result) {
//             return result
//         }

//         let valueCount = values.count()

//         minValue = api.nullable.getWithDefault(
//             api.nullable.map(_unifyCareerFeatureValueToArray, minValue),
//             _range(0, valueCount - 1).map(_ => -Infinity)
//         )
//         maxValue = api.nullable.getWithDefault(
//             api.nullable.map(_unifyCareerFeatureValueToArray, maxValue),
//             _range(0, valueCount - 1).map(_ => Infinity)
//         )

//         return values.reduce((result, value, i) => {
//             if (!result) {
//                 return result
//             }

//             return value >= minValue[i] && value <= maxValue[i]
//         }, result)
//     }, true)
// }

// let _check = (api: api, state: state, isChinese, features) => {
//     let {
//         displayName_cn,
//         displayName_en,
//         readme,
//     } = state

//     let message = api.nullable.getEmpty<string>()
//     // if (author.length <= 0) {
//     //     message = api.nullable.return(isChinese ? "请输入作者" : "Please enter the author")

//     // }
//     if (isChinese && displayName_cn.length <= 0) {
//         message = api.nullable.return("请输入职业名（中文）")
//     }
//     else if (!isChinese && displayName_en.length <= 0) {
//         message = api.nullable.return("Please enter the unit name (English)")
//     }
//     else if (readme.length <= 0) {
//         message = api.nullable.return(isChinese ? "请输入描述" : "Please enter the description")
//     }
//     else if (features.count() <= 0) {
//         message = api.nullable.return(isChinese ? "请选择职业特性" : "Please select the unit features")
//     }
//     else if (!_isFeaturesInRange(api, features)) {
//         message = api.nullable.return(isChinese ? "职业特性值超出范围" : "Career feature's value exceed the specified range")
//     }

//     return api.nullable.getWithDefault(
//         api.nullable.map((message) => {
//             api.message.warn(message)
//             return true
//         }, message),
//         false
//     )
// }

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            // meta3dState = _initAuthor(api, meta3dState)

            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    // let characterType_ = api.action.getActionState<selectCharacterTypeState>(meta3dState, selectCharacterTypeActionName).characterType
                    // let features = api.action.getActionState<addCareerFeatureState>(meta3dState, addCareerFeatureActionName).allSelectedCareerFeatureData.filter(d => {
                    //     return _isCharacterTypeEqual(d.characterType, characterType_)
                    // })

                    // let assetIconBase64 = api.nullable.getWithDefault(
                    //     api.action.getActionState<loadModPreviewState>(meta3dState, loadModPreviewActionName).preview,
                    //     ""
                    // )
                    // let careerIconBase64 = api.nullable.getWithDefault(
                    //     api.action.getActionState<loadCareerPreviewState>(meta3dState, loadCareerPreviewActionName).preview,
                    //     ""
                    // )

                    // let isChinese = api.action.getActionState<languageState>(meta3dState, languageActionName).language == language.Chinese

                    // if (_check(api, api.action.getActionState<state>(meta3dState, actionName), isChinese, features)) {
                    //     return Promise.resolve(meta3dState)
                    // }

                    console.log("publish mod")


                    // meta3dState = api.action.setActionState<state>(meta3dState, actionName, {
                    //     ...api.action.getActionState<state>(meta3dState, actionName),
                    //     isShowModal: false
                    // })
                    // meta3dState = api.action.setActionState<infoState>(meta3dState, infoActionName, {
                    //     ...api.action.getActionState<infoState>(meta3dState, infoActionName),
                    //     info: isChinese ? api.nullable.return("正在发布中...") : api.nullable.return("Publishing...")
                    // })
                    api.flow.deferExec(api, (meta3dState) => {
                        // return _base64ToUint8Array(assetIconBase64).then(uint8Array => {
                        api.writeState(meta3dState)

                        return api.backend.handleNetworkRequest(api, meta3dState => {
                            let state = api.action.getActionState<state>(meta3dState, actionName)

                            return api.backend.publishMod(
                                ` {
    "name": "unit-test1",
    "mod": {
        "protocolName": "unit-protocol",
        "author": "Official",
        "displayName_cn": "Test1",
        "displayName_en": "Test1",
        "repoLink": "",
        "isPublic": false,
        "dependentMods": [
        ]
    }
                        }`,
                                // `${state.readme}`,
                                "ReadMe",
                                // _buildDistFileContent(api, state, characterType_, features, isChinese),
                                _buildDistFileContent(api, state),
                                [
                                    // [
                                    //     // `./${_buildIconId(state, isChinese)}.png`,
                                    //     // uint8Array
                                    //     "",
                                    //     new Uint8Array()
                                    // ],
                                ],
                                // careerIconBase64,
                                "",
                                // characterType_
                                2
                            )
                        }, meta3dState => {
                            // meta3dState = api.action.setActionState<infoState>(meta3dState, infoActionName, {
                            //     ...api.action.getActionState<infoState>(meta3dState, infoActionName),
                            //     info: api.nullable.getEmpty()
                            // })
                            console.log("publish success")

                            return meta3dState
                        }, meta3dState => Promise.resolve(meta3dState), 3)
                            .catch(e => {
                                api.message.error(e)
                            })
                    })

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
            return null
        }
    }
}
