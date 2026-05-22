import { state as meta3dState, api } from "meta3d-type"
// import { action, attackMode, behaviourMode, behaviourModeKey, category, damageEffect, idleMode, idleModeKey, nearAttackTargetMode, nearAttackTargetModeKey, remoteAttackMode, skillObject, skillType, weaponType } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
import { armorRatio, armorStrength, attackFactor, countFactor, defenseFactor, emitSpeed, emitSpeedFactor, critRatioFactor, hp, emitPrecision, scale, emitterSpeed, emitterType, excitement, forceSize, speed, emitterVolume, critRatio, emitterLife, emitterSize, emitterCollisionSize, emitterCount, explodeRange, armorPiercingForceRatio, weaponType, behaviourMode, behaviourModeKey, idleMode, nearAttackTargetMode, attackMode, remoteAttackMode, armorType, idleModeKey, nearAttackTargetModeKey, category } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

export type singleBehaviourModeData = {
    key: string,
    minValue: number,
    maxValue: number,
}

export let getBehaviourModeData = (api: api, mode: behaviourMode | idleMode | nearAttackTargetMode | attackMode | remoteAttackMode): Array<singleBehaviourModeData> => {
    let data: any = {
        [behaviourMode.FindEnemy]: [
            {
                key: behaviourModeKey.FindEnemyDistanceFactor,
                minValue: 0,
                maxValue: +Infinity
            },
            {
                key: behaviourModeKey.PursuitDistanceFactor,
                minValue: 1,
                maxValue: +Infinity
            },
        ],
        [behaviourMode.EscapeWhenEnemeyNear]: [
            {
                key: behaviourModeKey.NearDistanceFactor,
                minValue: 0,
                maxValue: 10
            },
            {
                key: behaviourModeKey.EscapeDistanceFactor,
                minValue: 0,
                maxValue: 50
            },
        ],

        // [idleMode.WaitInPlace]: [
        // ],
        [idleMode.RoamAndWander]: [
            {
                key: idleModeKey.RoamAndWanderDistanceFactor,
                minValue: 0,
                maxValue: 10
            },
        ],

        // [nearAttackTargetMode.None]: [
        // ],
        [nearAttackTargetMode.Charge]: [
            {
                key: nearAttackTargetModeKey.ForceFactor,
                minValue: 0,
                maxValue: 10
            },
            {
                key: nearAttackTargetModeKey.DamageInterval,
                minValue: 0,
                maxValue: 3
            },
            {
                key: nearAttackTargetModeKey.CD,
                minValue: 0,
                maxValue: 20
            },
            {
                key: nearAttackTargetModeKey.DistanceFactor,
                minValue: 0,
                maxValue: 20
            },
            {
                key: nearAttackTargetModeKey.SpeedFactor,
                minValue: 0,
                maxValue: 5
            },
        ],
        [nearAttackTargetMode.JumpForward]: [
            {
                key: nearAttackTargetModeKey.ForceFactor,
                minValue: 0,
                maxValue: 10
            },
        ],

    }

    return api.nullable.getWithDefault(
        data[mode],
        []
    )
}

export let getModes = (key: string) => {
    let data: any = {
        ["behaviourMode"]: [
            behaviourMode.FindEnemy,
            behaviourMode.EscapeWhenEnemeyNear
        ],
        ["idleMode"]: [
            idleMode.WaitInPlace,
            idleMode.RoamAndWander
        ],
        ["nearAttackTargetMode"]: [
            nearAttackTargetMode.None,
            nearAttackTargetMode.Charge,
            nearAttackTargetMode.JumpForward,
        ],
        ["attackMode"]: [
            attackMode.None,
            attackMode.SideShift,
            attackMode.KeepDistance,
        ],
        ["remoteAttackMode"]: [
            remoteAttackMode.None,
            remoteAttackMode.ShootAroundObstacles
        ],
    }

    return data[key]
}

export let filterFeatureData = (api: api, category: category, initState: any) => {
    return initState.allFeatureData.filter((d: any) => {
        return api.nullable.getWithDefault(
            api.nullable.map(categories => categories.includes(category), d.categories),
            true
        ) && initState.features.filter((f: any) => f.name == d.name).length == 0
    })
}

export let resetInitState = (api: api, initState: any) => {
    return {
        ...initState,

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
        armorType: armorType.Light,
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


        animationData: api.immutable.createMap(),


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