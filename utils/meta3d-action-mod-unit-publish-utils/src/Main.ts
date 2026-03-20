import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
// import { language } from "meta3d-action-mod-unit-add-careerfeature-protocol"
import { action, armorRatio, armorStrength, armorType, attackFactor, category, critRatioFactor, defenseFactor, emitSpeedFactor, excitement, model, skillObject, hp, speed, emitPrecision, scale, emitSpeed, meleeRange, emitterSpeed, emitterLife, emitterSize, emitterCollisionSize, emitterCount, forceSize, armorPiercingForceRatio, weaponType, critRatio, explodeRange, emitterVolume, sceneChapter, countFactor, player, meleeDamageEffectType, subEffect, skillType, emitterType } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { autoDifficulty, gem, coin, rate, experienceValue, count } from "meta3d-action-mod-unit-publish-to-game-protocol/src/Type"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"
import { getSkillType } from "meta3d-action-mod-unit-skill-utils/src/Main"
// import { characterType } from "meta3d-action-mod-career-add-careerfeature-protocol"
// import { getLanguageTextData } from "meta3d-language-utils/src/Main"
// import { languageKey } from "meta3d-language-utils/src/Type"

let _buildDistFileContent = (api: api, meta3dState: meta3dState) => {
    let { category: category_ } = api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName)
    let {
        allModelData,
        allActionData,
        allSubEffects,
        allEmitterTypes,
        allEmitterParticleImages,
        allEmitterInstances,
        // allFeatureData,
        // allPropData,

        selectedModelIndex,

        selectedSmallSkillObjectActionIndex,
        selectedSmallSkillObjectEmitterParticleImageIndex,
        selectedSmallSkillObjectEmitterInstanceIndex,




        excitement,

        hasSmallSkillObject,
        hasBigSkillObject,

        // s_action,
        s_emitSpeed,

        s_damageType,

        s_force,

        s_hit_subEffects,

        s_emitterType,

        s_emitterSpeed,

        s_emitter_subEffects,

        // b_action,
        // b_emitSpeed,
        // b_emitterSpeed,




        features,


        hasAttackCitySceneChapterGenerateData,
        hasProtectCitySceneChapterGenerateData,
        hasBossSceneChapterGenerateData,

        ac_l_sceneData,
        ac_g_sceneData,



        prop,
    } = api.action.getActionState<initState>(meta3dState, initActionName)


    let model = api.nullable.getExn(allModelData.get(category_))[api.nullable.getExn(selectedModelIndex)].model


    let updateFuncStr
    switch (category_) {
        case category.EliteGiantess:
            updateFuncStr = "updateEliteGiantessValue"
            break
        default:
            throw new Error("error")
    }


    let skillObj = {}
    if (hasSmallSkillObject) {
        let emitter
        if (getSkillType(api, meta3dState, "selectedSmallSkillObjectActionIndex") == skillType.Ranged) {
            emitter = {
                type: s_emitterType,
                value: {
                    emitterSpeed: s_emitterSpeed,
                    emitterLife: emitterLife.Level6,
                    emitterSize: emitterSize.Level10,
                    emitterCollisionSize: emitterCollisionSize.Level10,
                    emitterCount: emitterCount.Level1,

                    explodeRange: explodeRange.Level5,
                },
                subEffects: s_emitter_subEffects,
            }

            if (s_emitterType == emitterType.Particle) {
                emitter.particleImage = allEmitterParticleImages.get(api.nullable.getExn(selectedSmallSkillObjectEmitterParticleImageIndex)).name
            }
            else {
                emitter.instance = allEmitterInstances.get(api.nullable.getExn(selectedSmallSkillObjectEmitterInstanceIndex)).name
            }
        }
        else {
            emitter = undefined
        }

        skillObj[skillObject.Small] = {
            action: {
                name: Array.from(api.nullable.getExn(allActionData.get(category_)).keys())[api.nullable.getExn(selectedSmallSkillObjectActionIndex)],
                value: {
                    emitSpeed: s_emitSpeed,

                    // meleeRange: api.nullable.return(meleeRange.Level4 * 1.5 * 1.1 / 22),

                    // emitterSpeed: s_emitterSpeed,
                    // emitterLife: emitterLife.Level0,
                    // emitterSize: emitterSize.Level0,
                    // emitterCollisionSize: emitterCollisionSize.Level0,
                    // emitterCount: emitterCount.Level0,

                    volume: emitterVolume.Level6,
                },
            },
            emitter,
            hit: {
                damage: {
                    type: s_damageType,
                    value: {
                        force: s_force,
                        armorPiercingForceRatio: armorPiercingForceRatio.Level4,

                        critRatio: critRatio.Level0,
                    },
                },
                subEffects: s_hit_subEffects
            },
        }
    }
    // if (hasBigSkillObject) {
    //     skillObj[skillObject.Big] = {
    //         action: {
    //             name: b_action,
    //             value: {
    //                 emitSpeed: b_emitSpeed,

    //                 meleeRange: api.nullable.return(meleeRange.Level4 * 1.5 * 1.1 / 22),

    //                 emitterSpeed: b_emitterSpeed,
    //                 emitterLife: emitterLife.Level0,
    //                 emitterSize: emitterSize.Level0,
    //                 emitterCollisionSize: emitterCollisionSize.Level0,
    //                 emitterCount: emitterCount.Level0,
    //             },
    //         },
    //         hit: {
    //             damage: {
    //                 type: meleeDamageEffectType.BodyDirectAndRangeDamage,
    //                 value: {
    //                     // force: forceSize.VeryLow4 * 0.4,
    //                     force: forceSize.Level1 * 3 / 8 * 0.4,
    //                     armorPiercingForceRatio: armorPiercingForceRatio.Level4,
    //                     // type: weaponType.Body,

    //                     critRatio: critRatio.Level0,
    //                     // explodeRange: explodeRange.Level0,
    //                 },
    //             },
    //             subEffects: [subEffect.StompDust, subEffect.FootDamageDecal]
    //         },
    //     }
    // }


    let generateData = []
    if (hasAttackCitySceneChapterGenerateData) {
        let playerGenerateData = {}
        if (ac_l_sceneData.length > 0) {
            playerGenerateData[player.LittleMan] = ac_l_sceneData
        }
        if (ac_g_sceneData.length > 0) {
            playerGenerateData[player.Giantess] = ac_g_sceneData
        }

        generateData = [
            ...generateData,
            {
                sceneChapter: sceneChapter.AttackCity,
                data: playerGenerateData
            }
        ]
    }



    return `
    (() => { 
    window.Mod = {
        createBlockState: (api) => {
            return {};
        },
        getBlockService: (api) => {
            return {
        getName: () => "精英近战巨大娘1_1",
        getDisplayName: () => {
            return {
                displayNameCN: "精英近战巨大娘1_1",
                displayNameEN: "Elite Giantess Melee 1_1",
            }
        },
        getModel: () => "${model}",
        getCategory: () => "${category_}",
        getValue: (api, state) => {
            return api.${updateFuncStr}(state, ${JSON.stringify({
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

        excitement: excitement,

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
        // moveSpeed: speed.Level8 / 22,
        moveSpeed: speed.Level2,

        emitPrecision: emitPrecision.Level0,

        // scale: scale.Level10,
        // scale: scale.Level0,
        scale: scale.Level5,

    })})
        },
        getSkillData: () => {
            return ${JSON.stringify(skillObj)}
 },
        getGenerateData: () => {
            return ${JSON.stringify(generateData)}
 },
        getRewardData: () => {
            return {
                gem: state => ${gem.Middle3},
                coin: state => ${coin.VeryHigh},
                prop: [${prop.map(item => {
        // 使用 JSON.stringify 安全处理 name 字符串（自动转义引号等）
        const safeName = JSON.stringify(item.name);
        return `        {
            name: ${safeName},
            getCountFunc: state => ${item.count},
            getRateFunc: state => ${item.rate}
        }`;
    }).join(',\n')
        }
    ],
                experienceValue: ${experienceValue.VeryHigh},
            }
        },
        getFeatureData: () => {
            return ${JSON.stringify(features)}
        },
    };
        }
    };
})();
    `
}

export let checkModData = (api: api, [getLanguageTextData, languageKey], meta3dState: meta3dState,
    {
        languageTextData,

        hasSmallSkillObject,
        hasBigSkillObject,

        hasAttackCitySceneChapterGenerateData,
        hasProtectCitySceneChapterGenerateData,
        hasBossSceneChapterGenerateData,

        selectedSmallSkillObjectEmitterParticleImageIndex,
        selectedSmallSkillObjectEmitterInstanceIndex,

    }: initState) => {
    let message = api.nullable.getEmpty<string>()

    if (!hasSmallSkillObject || !hasBigSkillObject) {
        message = api.nullable.return(getLanguageTextData(api, meta3dState, languageTextData, languageKey.NeedAllSkillObject))
    }
    else if (
        !hasAttackCitySceneChapterGenerateData &&
        !hasProtectCitySceneChapterGenerateData &&
        !hasBossSceneChapterGenerateData
    ) {
        message = api.nullable.return(getLanguageTextData(api, meta3dState, languageTextData, languageKey.NeedAtLeastOneGenerateData))
    }
    else if (getSkillType(api, meta3dState, "selectedSmallSkillObjectActionIndex") == skillType.Ranged
        && (
            api.nullable.isNullable(
                selectedSmallSkillObjectEmitterParticleImageIndex
            )
            && api.nullable.isNullable(
                selectedSmallSkillObjectEmitterInstanceIndex
            )
        )
    ) {
        message = api.nullable.return(getLanguageTextData(api, meta3dState, languageTextData, languageKey.NeedSmallSkillObjectEmitterData))
    }


    return api.nullable.getWithDefault(
        api.nullable.map((message) => {
            api.message.warn(message)
            return true
        }, message),
        false
    )
}

export let publish = (api: api, meta3dState: meta3dState, name, author, displayNameCN, displayNameEN, description, isPublic, modIconBase64: string) => {
    // return _base64ToUint8Array(assetIconBase64).then(uint8Array => {
    api.writeState(meta3dState)

    return api.backend.handleNetworkRequest(api, meta3dState => {
        // let state = api.action.getActionState<state>(meta3dState, actionName)

        return api.backend.publishMod(
            ` {
    "name": "${name}",
    "mod": {
        "protocolName": "unit-protocol",
        "author": "${author}",
        "displayName_cn": "${displayNameCN}",
        "displayName_en": "${displayNameEN}",
        "repoLink": "",
        "isPublic": ${isPublic},
        "dependentMods": [
        ]
    }
                        }`,
            // `${state.readme}`,
            `${description}`,
            // _buildDistFileContent(api, state, characterType_, features, isChinese),
            _buildDistFileContent(api, meta3dState),
            [
                // [
                //     // `./${_buildIconId(state, isChinese)}.png`,
                //     // uint8Array
                //     "",
                //     new Uint8Array()
                // ],
            ],
            modIconBase64,
            // characterType.GiantessOrLittleMan
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
}

let _getLoginedUserName = () => {
    // 获取当前URL的参数
    const urlParams = new URLSearchParams(window.location.href);

    return urlParams.get("username")
}

let _isDebugEnv = () => {
    return globalThis.location.href.includes("localhost")
}

export let getUserName = (api: api) => {
    // let store = api.storage.createInstance({ name: "store_backend_temp" })


    let userName = _getLoginedUserName()

    if (api.nullable.isNullable(userName)) {
        // alert("请从游戏中进入(Please Enter from Game)")

        // globalThis.location.href = "https://gts-play.cn"
        // return meta3dState

        if (!_isDebugEnv()) {
            alert("无法获得作者名，使用默认的作者名(Can't get author name, use default one instead)")
        }

        userName = api.nullable.return("Unknown")
    }

    return userName
}

let _getDisplayName = (displayNameCN, displayNameEN, isChinese) => {
    return isChinese ? displayNameCN : displayNameEN
}

export let buildUniqueName = (author, displayNameCN, displayNameEN, isChinese) => {
    return `${author}_${_getDisplayName(displayNameCN, displayNameEN, isChinese)}`
}
