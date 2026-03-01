import { damageType } from "type-api/src/ImportedTypes"
import { api } from "type-api/src/Type"
import { category, model, action, actionType, emitSpeed, meleeRange, effect, renderEffect, skillData } from "unit-protocol/src/service/UnitType"
import { actions, effects } from "./Type"

// export let getDefaultActions = (api: api) => {
//     return {
//         [category.EliteGiantess]: [
//             [action.Death]: {
//                 path: "./asset/action/elitegiantess/default/Death.fbx",
//             },
//         ]
//     }
// }

let _getAllDefaultActions = () => {
    return {
        [category.EliteGiantess]: [
            action.Death,
            action.DeathHeadshot,
            action.Idle,
            action.Lie,
            action.PickedControlled,
            action.Shake,
            action.StandupFromLie,
            action.Walk,
        ]
    }
}

let _getActions = (api: api): actions => {
    return {
        [category.EliteGiantess]: {
            [action.StompLight]: {
                type: actionType.Body,
                workFrameIndex: 38,
                getCollisionDirectionFunc: (api, forceDirection) => api.buildDownDirection(),
                computeAttackBoxDataFunc: (api, box, meleeRange, forceDirection) => {
                    let sizeY = api.box3.getSize(box, api.vector3.getTempVector3()).y

                    let center = api.vector3.add(
                        // api.box3.getCenter(box, api.vector3.getTempVector1()),
                        api.box3.getCenter(box, api.vector3.create(0, 0, 0)),
                        api.vector3.setY(
                            api.vector3.multiplyScalar(
                                forceDirection,
                                // meleeRange / (1.3 * 1.5)
                                meleeRange / (1.3)
                                // meleeRange / (1.3 * 1.2)
                            ),
                            - sizeY / 2
                        )
                    )
                    let attackBox = api.box3.setFromCenterAndSize(
                        // api.box3.getTempBox1(),
                        api.box3.createEmpty(),
                        center,
                        api.vector3.create(
                            meleeRange / 2,
                            // meleeRange,
                            sizeY / 2,
                            meleeRange / 2
                            // meleeRange
                        )
                    )

                    return [center, attackBox]
                },
            },
            [action.KickLight]: {
                type: actionType.Body,
                workFrameIndex: 38,
                getCollisionDirectionFunc: (api, forceDirection) => forceDirection,
                computeAttackBoxDataFunc: (api, box, meleeRange, forceDirection) => {
                    let sizeY = api.box3.getSize(box, api.vector3.getTempVector1()).y

                    let center = api.vector3.add(
                        api.box3.getCenter(box, api.vector3.getTempVector2()),
                        api.vector3.setY(
                            api.vector3.multiplyScalar(
                                api.vector3.clone(forceDirection),
                                meleeRange / (1.3)
                                // meleeRange / (1.3 * 1.5)
                                // meleeRange / (1.3 * 1.2)
                            ),
                            sizeY / 3
                            // sizeY / 1.5
                        )
                    )
                    let attackBox = api.box3.setFromCenterAndSize(
                        api.box3.getTempBox1(),
                        center,
                        api.vector3.create(
                            meleeRange / 1.5,
                            sizeY / 4,
                            // sizeY / 2,
                            meleeRange / 1.5
                        )
                    )

                    return [center, attackBox]
                },
            },
        }
    }
}

export let getAction = (api: api, category_: category) => {
    return api.MutableRecordUtils.getExn(_getActions(api), category_)
}

export let getActionData = (api: api, category_: category, action_: action) => {
    return api.MutableRecordUtils.getExn(getAction(api, category_), action_)
}


let _isDefaultAction = (api: api, category_: category, action_: action) => {
    return api.ArrayUtils.includes(_getAllDefaultActions()[category_], action_)
}

// let _getPath = (category_, isDefault, name, postfix) => {
//     return `./unit-action/src/asset/${isDefault ? "default/" : ""}${name}.${postfix}`
// }
let _getPathPrefix = () => `./unit-action/src/asset`

export let getActionFilePath = (api: api, category_: category, action_: action) => {
    let category__ = category_.toLowerCase()

    let actionPath, soundPath
    if (_isDefaultAction(api, category_, action_)) {
        actionPath = `${_getPathPrefix()}/action/${category__}/default/${action_}.fbx`
        soundPath = api.NullableUtils.getEmpty()
    }
    else {
        actionPath = `${_getPathPrefix()}/action/${category__}/${action_}.fbx`
        soundPath = api.NullableUtils.return_(`${_getPathPrefix()}/sound/${action_}.mp3`)
    }

    return {
        action: action_,
        actionPath: actionPath,
        soundPath: soundPath
    }
}

let _getAllDefaultActionFilePaths = (api: api, category_: category) => {
    return _getAllDefaultActions()[category_].reduce((result, action_) => {
        return api.ArrayUtils.push(result, getActionFilePath(api, category_, action_))
    }, api.ArrayUtils.create())
}

export let getAllActionFilePaths = (api: api, category: category, skillData: skillData) => {
    return api.ArrayUtils.pushArrs(
        _getAllDefaultActionFilePaths(api, category),
        api.MutableRecordUtils.toArray(
            api.MutableRecordUtils.map(
                skillData,
                (skill) => {
                    return getActionFilePath(api, category, skill.action)
                })
        )
    )
}


export let buildActionAnimationName = (category_: category, action_: action) => {
    return `animation_${category_}_${action_}`
}

export let buildActionSoundId = (category_: category, action_: action) => {
    return `sound_${category_}_${action_}`
}

let _getEffects = (api: api): effects => {
    return {
        [effect.DamageBody]: {
            actionType: actionType.Body,
            damageType: damageType.Direct,

            renderEffects: [],
        },
        [effect.Stomp]: {
            actionType: actionType.Body,
            damageType: damageType.Direct,

            // particleParam: {
            //     TODO
            // },
            // particleData: [particleType.Smoke],
            // particleTypes: [particleType.Smoke],
            renderEffects: [renderEffect.StompDust, renderEffect.FootDamageDecal],

            // value: {
            //     force: forceSize.VeryLow4 * 0.4,
            //     armorPiercingForceRatio: armorPiercingForceRatio.Low,
            //     type: weaponType.Body,

            //     critRatio: critRatio.Zero,
            //     explodeRange: explodeRange.Zero,
            // },
            // handleFunc:(api, effectValue) =>{

            // }
        },
    }
}

export let getEffect = (api: api, effectName) => {
    const data = _getEffects(api)

    return api.MutableRecordUtils.getExn(data, effectName)
}

export let getEffectData = (api: api, actionType: actionType) => {
    const data = _getEffects(api)

    return api.MutableRecordUtils.reduce(data, (result, value) => {
        if (value.actionType_ === actionType) {
            return api.ArrayUtils.push(result, value)
        }

        return result
    }, api.ArrayUtils.create())
}