import { state as meta3dState, api } from "meta3d-type"
import { action, attackMode, behaviourMode, behaviourModeKey, category, damageEffect, idleMode, idleModeKey, nearAttackTargetMode, nearAttackTargetModeKey, remoteAttackMode, skillObject, skillType, weaponType } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

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