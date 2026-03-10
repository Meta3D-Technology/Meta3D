import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
// import { language } from "meta3d-action-mod-unit-add-careerfeature-protocol"
import { action, armorRatio, armorStrength, armorType, attackFactor, category, critRatioFactor, defenseFactor, effect, emitSpeedFactor, excitement, model, skillObject, hp, speed, emitPrecision, scale, emitSpeed, meleeRange, emitterSpeed, emitterLife, emitterSize, emitterCollisionSize, emitterCount, forceSize, armorPiercingForceRatio, weaponType, critRatio, explodeRange, emitterVolume, sceneChapter, countFactor, player } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { autoDifficulty, gem, coin, rate, experienceValue, count } from "meta3d-action-mod-unit-publish-to-game-protocol/src/Type"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"

let _buildDistFileContent = (api: api, meta3dState: meta3dState) => {
    let { category: category_ } = api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName)
    let {
        allModelData,
        selectedModelIndex,

        excitement,

        hasSmallSkillObject,
        hasBigSkillObject,

        s_action,
        s_emitSpeed,
        s_emitterSpeed,

        b_action,
        b_emitSpeed,
        b_emitterSpeed,


        hasAttackCitySceneChapterGenerateData,
        hasProtectCitySceneChapterGenerateData,
        hasBossSceneChapterGenerateData,

        ac_l_sceneData,
        ac_g_sceneData,

        pc_sceneData_rate,
        pc_sceneData_countFactor,

        bo_sceneData_rate,
        bo_sceneData_countFactor,


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
        skillObj[skillObject.Small] = {
            action: s_action,
            value: {
                emitSpeed: s_emitSpeed,

                meleeRange: api.nullable.return(meleeRange.Level4 * 1.5 * 1.1 / 22),

                emitterSpeed: s_emitterSpeed,
                emitterLife: emitterLife.Level0,
                emitterSize: emitterSize.Level0,
                emitterCollisionSize: emitterCollisionSize.Level0,
                emitterCount: emitterCount.Level0,
            },
            effect: {
                name: effect.Stomp,

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
        }
    }
    if (hasBigSkillObject) {
        skillObj[skillObject.Big] = {
            action: b_action,
            value: {
                emitSpeed: b_emitSpeed,

                meleeRange: api.nullable.return(meleeRange.Level4 * 1.5 * 1.1 / 22),

                emitterSpeed: b_emitterSpeed,
                emitterLife: emitterLife.Level0,
                emitterSize: emitterSize.Level0,
                emitterCollisionSize: emitterCollisionSize.Level0,
                emitterCount: emitterCount.Level0,
            },
            effect: {
                name: effect.Stomp,

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
        }
    }


    let generateData = {}
    if (hasAttackCitySceneChapterGenerateData) {
        let playerGenerateData = {}
        if (ac_l_sceneData.length > 0) {
            playerGenerateData[player.LittleMan] = ac_l_sceneData
        }
        if (ac_g_sceneData.length > 0) {
            playerGenerateData[player.Giantess] = ac_g_sceneData
        }

        generateData[sceneChapter.AttackCity] = playerGenerateData
    }
    if (hasProtectCitySceneChapterGenerateData) {
        generateData[sceneChapter.ProtectCity] = {
            rate: pc_sceneData_rate,
            countFactor: pc_sceneData_countFactor,
        }
    }
    if (hasBossSceneChapterGenerateData) {
        generateData[sceneChapter.Boss] = {
            rate: bo_sceneData_rate,
            countFactor: bo_sceneData_countFactor,
        }
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
        moveSpeed: speed.Level8 / 22,

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
    };
        }
    };
})();
    `
}

export let publish = (api: api, meta3dState: meta3dState, name, author) => {
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
            _buildDistFileContent(api, meta3dState),
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
}