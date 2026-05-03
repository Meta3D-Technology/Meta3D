import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
// import { language } from "meta3d-action-mod-unit-add-careerfeature-protocol"
import { action, armorRatio, armorStrength, armorType, attackFactor, category, critRatioFactor, defenseFactor, emitSpeedFactor, excitement, model, skillObject, hp, speed, emitPrecision, scale, emitSpeed, meleeRange, emitterSpeed, emitterLife, emitterSize, emitterCollisionSize, emitterCount, forceSize, armorPiercingForceRatio, weaponType, critRatio, explodeRange, emitterVolume, sceneChapter, countFactor, player, skillType, emitterType, instance } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { autoDifficulty, gem, coin, rate, experienceValue, count } from "meta3d-action-mod-unit-publish-to-game-protocol/src/Type"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as setCategoryActionName, state as setCategoryState } from "meta3d-action-mod-unit-set-category-protocol"
import { actionName as uploadModelFileActionName, state as uploadModelFileState } from "meta3d-action-mod-unit-upload-model-file-protocol"
import { actionName as uploadModelSnapshotActionName, state as uploadModelSnapshotState } from "meta3d-action-mod-unit-upload-model-snapshot-protocol"
import { actionName as uploadParticleInstanceActionName, state as uploadParticleInstanceState } from "meta3d-action-mod-unit-upload-particle-instance-protocol"
import { getActionData, getSkillType } from "meta3d-action-mod-unit-skill-utils/src/Main"
// import { characterType } from "meta3d-action-mod-career-add-careerfeature-protocol"
// import { getLanguageTextData } from "meta3d-language-utils/src/Main"
// import { languageKey } from "meta3d-language-utils/src/Type"

let _getArmorType = (category_: category) => {
    switch (category_) {
        case category.EliteGiantess:
            return armorType.Giantess
        default:
            throw new Error("error")
    }
}

let _addGenerateData = (result, sceneChapter, l_sceneData, g_sceneData) => {
    let playerGenerateData = {}
    if (l_sceneData.length > 0) {
        playerGenerateData[player.LittleMan] = l_sceneData
    }
    if (g_sceneData.length > 0) {
        playerGenerateData[player.Giantess] = g_sceneData
    }

    return [
        ...result,
        {
            sceneChapter,
            data: playerGenerateData
        }
    ]

}

let _buildDistFileContent = (api: api, meta3dState: meta3dState, name, displayNameCN, displayNameEN) => {
    let { category: category_ } = api.action.getActionState<setCategoryState>(meta3dState, setCategoryActionName)
    let state = api.action.getActionState<initState>(meta3dState, initActionName)
    let {
        allModelData,
        allActionData,
        allEmitterParticleImages,
        allEmitterInstances,
        // allFeatureData,
        // allPropData,

        selectedModelIndex,

        selectedSmallSkillObjectActionIndex,
        selectedSmallSkillObjectEmitterParticleImageIndex,
        selectedSmallSkillObjectEmitterInstanceIndex,

        selectedBigSkillObjectActionIndex,
        selectedBigSkillObjectEmitterParticleImageIndex,
        selectedBigSkillObjectEmitterInstanceIndex,



        excitement,
        defenseFactor,
        armorRatio,
        armorStrength,
        attackFactor,
        emitSpeedFactor,
        critRatioFactor,
        hp,
        moveSpeed,
        emitPrecision,
        scale,


        hasSmallSkillObject,
        hasBigSkillObject,

        s_emitSpeed,
        s_volume,

        s_damageType,
        s_damageEffects,

        s_force,
        s_armorPiercingForceRatio,
        s_critRatio,

        s_hit_subEffects,

        s_emitterType,

        s_emitterSpeed,
        s_emitterLife,
        s_emitterSize,
        s_emitterCollisionSize,
        // s_emitterCount,
        s_explodeRange,

        s_emitter_subEffects,



        b_emitSpeed,
        b_volume,

        b_damageType,
        b_damageEffects,


        b_force,
        b_armorPiercingForceRatio,
        b_critRatio,

        b_hit_subEffects,

        b_emitterType,

        b_emitterSpeed,
        b_emitterLife,
        b_emitterSize,
        b_emitterCollisionSize,
        // b_emitterCount,
        b_explodeRange,

        b_emitter_subEffects,



        behaviourData,



        features,


        // hasAttackCitySceneChapterGenerateData,
        // hasProtectCitySceneChapterGenerateData,
        // hasBossSceneChapterGenerateData,

        ac_l_sceneData,
        ac_g_sceneData,

        pc_l_sceneData,
        pc_g_sceneData,

        bo_l_sceneData,
        bo_g_sceneData,




        prop,
        gem,
        coin,
        experienceValue,
    } = state


    let model_ = api.nullable.getWithDefault(
        api.nullable.map(selectedModelIndex => {
            return api.nullable.getExn(allModelData.get(category_))[selectedModelIndex].model
        }, selectedModelIndex),
        model.None
    )


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
                    emitterLife: s_emitterLife,
                    emitterSize: s_emitterSize,
                    emitterCollisionSize: s_emitterCollisionSize,
                    // emitterCount: s_emitterCount,
                    emitterCount: 1,

                    explodeRange: s_explodeRange,
                },
                subEffects: s_emitter_subEffects,
            }

            if (s_emitterType == emitterType.Particle) {
                emitter.particleImage = allEmitterParticleImages.get(api.nullable.getExn(selectedSmallSkillObjectEmitterParticleImageIndex)).name
            }
            else {
                // emitter.instance = allEmitterInstances.get(api.nullable.getExn(selectedSmallSkillObjectEmitterInstanceIndex)).name
                // emitter.instance = api.nullable.getWithDefault(
                //     api.nullable.map(data => data.name, allEmitterInstances.get(api.nullable.getExn(selectedSmallSkillObjectEmitterInstanceIndex))),
                //     instance.None
                // )
                emitter.instance = api.nullable.getWithDefault(
                    api.nullable.map(selectedSmallSkillObjectEmitterInstanceIndex => {
                        return allEmitterInstances.get(selectedSmallSkillObjectEmitterInstanceIndex).name
                    }, selectedSmallSkillObjectEmitterInstanceIndex
                    ),
                    instance.None
                )
            }
        }
        else {
            emitter = undefined
        }

        skillObj[skillObject.Small] = {
            action: {
                // name: Array.from(api.nullable.getExn(allActionData.get(category_)).keys())[api.nullable.getExn(selectedSmallSkillObjectActionIndex)],
                name: getActionData(api, state, "selectedSmallSkillObjectActionIndex", category_)[0],
                value: {
                    emitSpeed: s_emitSpeed,

                    volume: s_volume,
                },
            },
            emitter,
            hit: {
                damage: {
                    type: s_damageType,
                    value: {
                        force: s_force,
                        armorPiercingForceRatio: s_armorPiercingForceRatio,

                        critRatio: s_critRatio,
                    },
                    damageEffects: s_damageEffects
                },
                subEffects: s_hit_subEffects
            },
        }
    }
    if (hasBigSkillObject) {
        let emitter
        if (getSkillType(api, meta3dState, "selectedBigSkillObjectActionIndex") == skillType.Ranged) {
            emitter = {
                type: b_emitterType,
                value: {
                    emitterSpeed: b_emitterSpeed,
                    emitterLife: b_emitterLife,
                    emitterSize: b_emitterSize,
                    emitterCollisionSize: b_emitterCollisionSize,
                    emitterCount: 1,

                    explodeRange: b_explodeRange,
                },
                subEffects: b_emitter_subEffects,
            }

            if (b_emitterType == emitterType.Particle) {
                emitter.particleImage = allEmitterParticleImages.get(api.nullable.getExn(selectedBigSkillObjectEmitterParticleImageIndex)).name
            }
            else {
                emitter.instance = api.nullable.getWithDefault(
                    api.nullable.map(selectedBigSkillObjectEmitterInstanceIndex => {
                        return allEmitterInstances.get(selectedBigSkillObjectEmitterInstanceIndex).name
                    }, selectedBigSkillObjectEmitterInstanceIndex
                    ),
                    instance.None
                )
            }
        }
        else {
            emitter = undefined
        }

        skillObj[skillObject.Big] = {
            action: {
                // name: Array.from(api.nullable.getExn(allActionData.get(category_)).keys())[api.nullable.getExn(selectedBigSkillObjectActionIndex)],
                name: getActionData(api, state, "selectedBigSkillObjectActionIndex", category_)[0],
                value: {
                    emitSpeed: b_emitSpeed,

                    volume: b_volume,
                },
            },
            emitter,
            hit: {
                damage: {
                    type: b_damageType,
                    value: {
                        force: b_force,
                        armorPiercingForceRatio: b_armorPiercingForceRatio,

                        critRatio: b_critRatio,
                    },
                    damageEffects: b_damageEffects
                },
                subEffects: b_hit_subEffects
            },
        }
    }


    let generateData = []
    generateData = _addGenerateData(generateData, sceneChapter.AttackCity, ac_l_sceneData, ac_g_sceneData)
    generateData = _addGenerateData(generateData, sceneChapter.ProtectCity, pc_l_sceneData, pc_g_sceneData)
    generateData = _addGenerateData(generateData, sceneChapter.Boss, bo_l_sceneData, bo_g_sceneData)



    let result = `
    (() => { 
    window.Mod = {
        createBlockState: (api) => {
            return {};
        },
        getBlockService: (api) => {
            return {
        getName: () => "${name}",
        getDisplayName: () => {
            return {
                displayNameCN: "${displayNameCN}",
                displayNameEN: "${displayNameEN}",
            }
        },
        getModel: () => "${model_}",
        getCategory: () => "${category_}",
        getValue: (api, state) => {
            return api.${updateFuncStr}(state, ${JSON.stringify({
        excitement: excitement,
        defenseFactor: defenseFactor,
        armorType: _getArmorType(category_),
        armorRatio: armorRatio,
        armorStrength: armorStrength,
        attackFactor: attackFactor,
        emitSpeedFactor: emitSpeedFactor,
        critRatioFactor: critRatioFactor,
        hp: hp,
        moveSpeed,
        emitPrecision: emitPrecision,
        scale,
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
                gem: state => ${gem},
                coin: state => ${coin},
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
                experienceValue: ${experienceValue},
            }
        },
        getFeatureData: () => {
            return ${JSON.stringify(features)}
        },
        getBehaviourData: () =>{
            return ${JSON.stringify(behaviourData)}
        }
    };
        }
    };
})();
    `

    console.log(result)

    return result
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
        selectedBigSkillObjectEmitterParticleImageIndex,
        selectedBigSkillObjectEmitterInstanceIndex,

    }: initState, isForQuicktest) => {
    let message = api.nullable.getEmpty<string>()

    if (!isForQuicktest) {
        if (
            !hasAttackCitySceneChapterGenerateData &&
            !hasProtectCitySceneChapterGenerateData &&
            !hasBossSceneChapterGenerateData
        ) {
            message = api.nullable.return(getLanguageTextData(api, meta3dState, languageTextData, languageKey.NeedAtLeastOneGenerateData))
        }
    }

    if (!hasSmallSkillObject || !hasBigSkillObject) {
        message = api.nullable.return(getLanguageTextData(api, meta3dState, languageTextData, languageKey.NeedAllSkillObject))
    }
    else if (getSkillType(api, meta3dState, "selectedSmallSkillObjectActionIndex") == skillType.Ranged
        && (
            api.nullable.isNullable(
                selectedSmallSkillObjectEmitterParticleImageIndex
            )
            // && api.nullable.isNullable(
            //     selectedSmallSkillObjectEmitterInstanceIndex
            // )
        )
    ) {
        if (api.nullable.isNullable(
            selectedSmallSkillObjectEmitterInstanceIndex
        )) {
            let uploadParticleInstanceState = api.action.getActionState<uploadParticleInstanceState>(meta3dState, uploadParticleInstanceActionName)

            if (api.nullable.isNullable(uploadParticleInstanceState.instances.get("selectedSmallSkillObjectEmitterInstanceIndex"))) {
                message = api.nullable.return(getLanguageTextData(api, meta3dState, languageTextData, languageKey.NeedSmallSkillObjectEmitterData))
            }
        }
    }
    else if (getSkillType(api, meta3dState, "selectedBigSkillObjectActionIndex") == skillType.Ranged
        && (
            api.nullable.isNullable(
                selectedBigSkillObjectEmitterParticleImageIndex
            )
            // && api.nullable.isNullable(
            //     selectedBigSkillObjectEmitterInstanceIndex
            // )
        )
    ) {
        if (api.nullable.isNullable(
            selectedBigSkillObjectEmitterInstanceIndex
        )) {
            let uploadParticleInstanceState = api.action.getActionState<uploadParticleInstanceState>(meta3dState, uploadParticleInstanceActionName)

            if (api.nullable.isNullable(uploadParticleInstanceState.instances.get("selectedBigSkillObjectEmitterInstanceIndex"))) {
                message = api.nullable.return(getLanguageTextData(api, meta3dState, languageTextData, languageKey.NeedBigSkillObjectEmitterData))
            }
        }
    }


    return api.nullable.getWithDefault(
        api.nullable.map((message) => {
            api.message.warn(message)
            return true
        }, message),
        false
    )
}

let _base64ToUint8Array = (base64String) => {
    if (base64String.length == 0) {
        return Promise.resolve(new Uint8Array())
    }

    // 获取 Base64 数据（移除前缀）
    const base64Data = base64String.split(',')[1] || base64String;

    // 将 Base64 转为 Blob，再转为 ArrayBuffer
    // const response = await fetch(`data:image/jpeg;base64,${base64Data}`);
    // const arrayBuffer = await response.arrayBuffer();

    // 转为 Uint8Array
    // return new Uint8Array(arrayBuffer);

    return fetch(`data:image/jpeg;base64,${base64Data}`).then(response => response.arrayBuffer()).then(arrayBuffer => new Uint8Array(arrayBuffer))
}

let _getAssetFiles = (api: api, meta3dState: meta3dState, name) => {
    let result = api.action.getActionState<uploadParticleInstanceState>(meta3dState, uploadParticleInstanceActionName).instances.reduce((result, [glbName, glbData], key) => {
        result.push([
            `./${name}_instance_${key.includes("Small") ? "Small" : "Big"}.glb`,
            new Uint8Array(glbData)
        ])
        return result
    }, [])

    if (api.nullable.isNullable(api.action.getActionState<uploadModelSnapshotState>(meta3dState, uploadModelSnapshotActionName).snapshot)) {
        return Promise.resolve(result)
    }

    result = api.action.getActionState<uploadModelFileState>(meta3dState, uploadModelFileActionName).files.reduce((result, [fbxName, fbxData], key) => {
        result.push([
            `./${name}_model_${key}.fbx`,
            new Uint8Array(fbxData)
        ])
        return result
    }, result)

    return _base64ToUint8Array(api.nullable.getExn(api.action.getActionState<uploadModelSnapshotState>(meta3dState, uploadModelSnapshotActionName).snapshot)).then(data => {
        result.push([
            `./${name}_model_snapshot.png`,
            data
        ])

        return result
    })
}

export let publish = (api: api, meta3dState: meta3dState, name, author, displayNameCN, displayNameEN, description, isPublic, modIconBase64: string) => {
    // return _base64ToUint8Array(assetIconBase64).then(uint8Array => {
    api.writeState(meta3dState)

    return api.backend.handleNetworkRequest(api, meta3dState => {
        // let state = api.action.getActionState<state>(meta3dState, actionName)
        return _getAssetFiles(api, meta3dState, name).then(assetFiles => {
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
                _buildDistFileContent(api, meta3dState, name, displayNameCN, displayNameEN),
                assetFiles,
                modIconBase64,
                // characterType.GiantessOrLittleMan
                2
            )
        })

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

export let isDebugEnv = () => {
    return globalThis.location.href.includes("localhost")
}

export let getUserName = (api: api) => {
    // let store = api.storage.createInstance({ name: "store_backend_temp" })


    let userName = _getLoginedUserName()

    if (api.nullable.isNullable(userName)) {
        // alert("请从游戏中进入(Please Enter from Game)")

        // globalThis.location.href = "https://gts-play.cn"
        // return meta3dState

        if (!isDebugEnv()) {
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
