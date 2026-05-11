import { autoDifficulty } from "./Type";

export enum model {
    None = "None",
    EliteGiantess1 = "EliteGiantess1",
    EliteGiantess2 = "EliteGiantess2",
    EliteGiantess3 = "EliteGiantess3",
    EliteGiantess4 = "EliteGiantess4",
    EliteGiantess5 = "EliteGiantess5",
    EliteGiantess6 = "EliteGiantess6",
    EliteGiantess7 = "EliteGiantess7",
    EliteGiantess8 = "EliteGiantess8",
    EliteGiantess9 = "EliteGiantess9",
    EliteGiantess10 = "EliteGiantess10",
    // EliteGiantess11 = "EliteGiantess11",
}


export enum action {
    Death = "Death",
    DeathHeadshot = "DeathHeadshot",
    Idle = "Idle",
    Lie = "Lie",
    PickedControlled = "PickedControlled",
    Shake = "Shake",
    StandupFromLie = "StandupFromLie",
    Walk = "Walk",
    Run = "Run",
    Sprint = "Sprint",
    JumpForward = "JumpForward",

    StompLight = "StompLight",
    StompHeavy = "StompHeavy",
    Kick1 = "Kick1",
    Kick2 = "Kick2",
    TwistRub = "TwistRub",
    ChickenDance = "ChickenDance",
    RumbaDance = "RumbaDance",
    JumpHeavy = "JumpHeavy",
    JumpLight = "JumpLight",
    CrossJumps = "CrossJumps",
    LegSweep = "LegSweep",
    Punch = "Punch",
    Boxing = "Boxing",
    Bencao = "Bencao",
    Speedbag = "Speedbag",
    PunchCombo = "PunchCombo",
    KickTwice = "KickTwice",
    Cast = "Cast",
}

// export enum actionType {
//     Body,
//     Ranged,
// }

// export enum effect {
//     DamageBody,
//     LightStomp,
//     HeavyStomp,
//     FireballHit,
// }

// export enum particleType {
export enum emitterSubEffect {
    ShellEmit = "ShellEmit",
}

export enum meleeSubEffect {
    StompDust = "StompDust",
    FootDamageDecal = "FootDamageDecal",
}

export enum rangedSubEffect {
    FireballHit = "FireballHit",
    ShellExplode = "ShellExplode",
}



export enum category {
    EliteGiantess = "EliteGiantess",
}

export enum defenseFactor {
    // VeryLow = 0.5,
    // Low = 1,
    // Middle = 3,
    // High = 10,
    // VeryHigh = 30

    // VeryLow2 = 0.1,
    // VeryLow = 0.2,
    // Low = 0.5,
    // Middle = 1,
    // High = 3,
    // VeryHigh = 10

    Level0 = 0.01,
    Level1 = 0.025,
    Level2 = 0.05,
    Level3 = 0.08,
    Level4 = 0.1,
    Level5 = 0.16,
    Level6 = 0.3,
    Level7 = 0.45,
    Level8 = 0.6,
    Level9 = 0.7,
    Level10 = 0.8,
}

export enum attackFactor {
    // Zero=0,
    // VeryLow = 0.2,
    // Low = 0.5,
    // Middle = 1,
    // High = 2,
    // VeryHigh = 3

    Level0 = 0,
    Level1 = 0.1,
    Level2 = 0.25,
    Level3 = 0.5,
    Level4 = 0.75,
    Level5 = 1,
    Level6 = 1.2,
    Level7 = 1.5,
    Level8 = 2,
    Level9 = 2.5,
    Level10 = 3
}

export enum emitSpeedFactor {
    Level0 = 2.6,
    Level1 = 2.2,
    Level2 = 2,
    Level3 = 1.8,
    Level4 = 1.5,
    Level5 = 1,
    Level6 = 0.8,
    Level7 = 0.6,
    Level8 = 0.4,
    Level9 = 0.2,
    Level10 = 0.1,
}

export enum critRatioFactor {
    Level0 = 0,
    Level1 = 0.2,
    Level2 = 0.4,
    Level3 = 0.6,
    Level4 = 0.8,
    Level5 = 1,
    Level6 = 1.5,
    Level7 = 2,
    Level8 = 2.3,
    Level9 = 2.6,
    Level10 = 3
}

export enum excitement {
    Level0 = 0,
    Level1 = 0.1,
    Level2 = 0.3,
    Level3 = 0.5,
    Level4 = 0.8,
    Level5 = 1,
    Level6 = 3,
    Level7 = 5,
    Level8 = 7,
    Level9 = 8,
    Level10 = 10
}

export enum armorType {
    Giantess,
    Mech,
    LittleMan,
    Building,
    Light,
    Heavy,
}

export enum armorRatio {
    Level0 = 0,
    Level1 = 0.08,
    Level2 = 0.15,
    Level3 = 0.3,
    Level4 = 0.4,
    Level5 = 0.5,
    Level6 = 0.6,
    Level7 = 0.7,
    Level8 = 0.8,
    Level9 = 0.9,
    Level10 = 1,
}

export enum armorStrength {
    Level0 = 0,
    Level1 = 1,
    Level2 = 2,
    Level3 = 5,
    Level4 = 10,
    Level5 = 20,
    Level6 = 30,
    Level7 = 40,
    Level8 = 50,
    Level9 = 55,
    Level10 = 60
}

export enum speed {
    Level0 = 0,
    Level1 = 1,
    Level2 = 1.5,
    Level3 = 2,
    Level4 = 2.5,
    Level5 = 3,
    Level6 = 5,
    Level7 = 7.5,
    Level8 = 10,
    Level9 = 20,
    Level10 = 40,
}

export enum hp {
    Level0 = 50,
    Level1 = 100,
    Level2 = 150,
    Level3 = 200,
    Level4 = 300,
    Level5 = 400,
    Level6 = 600,
    Level7 = 800,
    Level8 = 1000,
    Level9 = 1200,
    Level10 = 1600
}

/**
 * 发射精度枚举
 */
export enum emitPrecision {
    Level0 = 0.2,
    Level1 = 0.16,
    Level2 = 0.14,
    Level3 = 0.12,
    Level4 = 0.1,
    Level5 = 0.08,
    Level6 = 0.07,
    Level7 = 0.06,
    Level8 = 0.05,
    Level9 = 0.04,
    Level10 = 0.02,
}

/**
 * 发射速度枚举
 */
export enum emitSpeed {
    // VerySlow2 = 700,

    // VerySlow = 300,
    // Slow = 140,
    // Middle = 70,
    // Fast = 30,
    // VeryFast = 20

    // VerySlow = 600,
    // VerySlow = 560,
    Level0 = 560,
    Level1 = 400,
    Level2 = 300,
    Level3 = 240,
    Level4 = 200,
    Level5 = 160,
    Level6 = 80,
    Level7 = 40,
    Level8 = 20,
    Level9 = 10,
    Level10 = 5,
}

/**
 * 发射器生命周期枚举
 */
export enum emitterLife {
    Zero = 0,
    // VeryShort = 600,
    // Short = 2500,
    // Middle = 4000,
    // Long = 7000,
    // VeryLong = 14000,

    // VeryShort = 300,
    // Short = 1200,
    // Middle = 2000,
    // Long = 3500,
    // VeryLong = 7000,

    Level0 = 400,
    Level1 = 1000,
    Level2 = 1600,
    Level3 = 2000,
    Level4 = 2400,
    Level5 = 2800,
    Level6 = 4200,
    Level7 = 8400,
    Level8 = 15000,
    Level9 = 22000,
    Level10 = 30000,
}

/**
 * 发射器速度枚举
 */
export enum emitterSpeed {
    Level0 = 0.3,
    Level1 = 0.35,
    Level2 = 0.4,
    Level3 = 0.45,
    Level4 = 0.5,
    Level5 = 0.65,
    Level6 = 0.9,
    Level7 = 1.5,
    Level8 = 2,
    Level9 = 3.5,
    Level10 = 5,
}

export enum scale {
    // Level0 = 3,
    Level0 = 1,
    // Level1 = 4,
    // Level2 = 5,
    Level1 = 2,
    Level2 = 4,
    Level3 = 6,
    Level4 = 8,
    Level5 = 9,
    Level6 = 12,
    Level7 = 15,
    Level8 = 18,
    Level9 = 21,
    Level10 = 24,
}

// export type armyValue = {
//     excitement: excitement;
//     defenseFactor: defenseFactor;
//     armorType: armorType;
//     armorRatio: armorRatio;
//     armorStrength: armorStrength;
//     attackFactor: attackFactor;
//     moveSpeed: speed;
//     emitSpeedFactor: emitSpeedFactor;
//     critRatioFactor: critRatioFactor;
//     hp: hp;
//     emitPrecision: emitPrecision;
// }

// export type eliteGiantessValue = {
//     scale: scale;
// }

export type unitValue = {
    // excitement: excitement;
    // defenseFactor: defenseFactor;
    // armorType: armorType;
    // armorRatio: armorRatio;
    // armorStrength: armorStrength;
    // attackFactor: attackFactor;
    // moveSpeed: speed;
    // emitSpeedFactor: emitSpeedFactor;
    // critRatioFactor: critRatioFactor;
    // hp: hp;
    // emitPrecision: emitPrecision;

    // scale: scale;
    excitement: number;
    defenseFactor: number;
    armorType: armorType;
    armorRatio: number;
    armorStrength: number;
    attackFactor: number;
    moveSpeed: number;
    emitSpeedFactor: number;
    critRatioFactor: number;
    hp: number;
    emitPrecision: number;

    scale: number;
}


export enum skillObject {
    All,
    Small,
    Big,
}



export enum forceSize {
    // NoAttackForce = -1,
    Level0 = 0,
    // VeryLow6 = 1,
    // VeryLow5 = 2,
    // VeryLow4 = 3,
    // VeryLow3 = 7,
    Level1 = 8,
    Level2 = 15,
    Level3 = 30,
    Level4 = 60,
    Level5 = 100,
    Level6 = 130,
    Level7 = 170,
    Level8 = 220,
    Level9 = 300,
    Level10 = 500,
}

export enum armorPiercingForceRatio {
    // None = 0,
    // VeryLow = 40,
    // Low = 80,
    // Middle = 150,
    // High = 250,
    // VeryHigh = 500,

    Level0 = 0,
    Level1 = 0.012,
    Level2 = 0.025,
    Level3 = 0.05,
    Level4 = 0.1,
    Level5 = 0.2,
    Level6 = 0.3,
    Level7 = 0.4,
    Level8 = 0.5,
    Level9 = 0.6,
    L3vel10 = 0.7,
}

export enum weaponType {
    // None,
    // Light,
    // Middle,
    // Heavy,
    // VeryHeavy

    Explode = "Explode",
    Impact = "Impact",
    Magic = "Magic",
    Body = "Body",
    Power = "Power",
    Common = "Common",

    Effect = "Effect",
    EffectSelf = "EffectSelf",
}

export enum critRatio {
    Level0 = 0,
    Level1 = 0.01,
    Level2 = 0.02,
    Level3 = 0.03,
    Level4 = 0.04,
    Level5 = 0.05,
    Level6 = 0.1,
    Level7 = 0.2,
    Level8 = 0.3,
    Level9 = 0.4,
    Level10 = 0.5,
}

export enum explodeRange {
    Level0 = 0,
    Level1 = 1,
    Level2 = 1.5,
    Level3 = 2,
    Level4 = 2.5,
    Level5 = 3,
    Level6 = 4,
    Level7 = 5,
    Level8 = 6,
    Level9 = 7,
    Level10 = 8
}

export enum emitterSize {
    Level0 = 2,
    Level1 = 2.4,
    Level2 = 2.8,
    Level3 = 3.2,
    Level4 = 3.6,
    Level5 = 4,
    Level6 = 5,
    Level7 = 6,
    Level8 = 7,
    Level9 = 8,
    Level10 = 10,
}

export enum emitterCollisionSize {
    Level0 = 1.5,
    Level1 = 2,
    Level2 = 2.5,
    Level3 = 3,
    Level4 = 3.5,
    Level5 = 4,
    Level6 = 6,
    Level7 = 12,
    Level8 = 17,
    Level9 = 22,
    Level10 = 28,
}

export enum emitterVolume {
    // Small = 0.1,
    // Middle = 0.2,
    // Middle2 = 0.3,
    // Big = 0.4,
    // VeryBig = 0.8,
    Level0 = 0.05,
    Level1 = 0.07,
    Level2 = 0.07,
    Level3 = 0.08,
    Level4 = 0.09,
    Level5 = 0.1,
    Level6 = 0.15,
    Level7 = 0.2,
    Level8 = 0.25,
    Level9 = 0.3,
    Level10 = 0.4,
}

export enum emitterCount {
    Level0 = 0,
    Level1 = 1,
    Level2 = 2,
    Level3 = 3,
    Level4 = 4,
    Level5 = 5,
    Level6 = 6,
    Level7 = 7,
    Level8 = 8,
    Level9 = 15,
    // Most = 50,
    Level10 = 20,
}

export enum meleeRange {
    /*! avoid too near that bullet can't hit(because >= particleNeedCollisionCheckLoopFrames.Two)
     
    Near = 2.5,
    Middle = 3.5,
    */
    // Girl = -1,
    Level0 = 0,
    Level1 = 1,
    Level2 = 2.5,
    Level3 = 3.5,
    Level4 = 5,
    Level5 = 7,
    Level6 = 10,
    Level7 = 13,
    Level8 = 16,
    Level9 = 19,
    Level10 = 25
}

export type nullable<Value extends any> = Value | null | undefined

// export type weaponValue = {
//     force: forceSize,
//     armorPiercingForceRatio: armorPiercingForceRatio,


//     type: weaponType,

//     emitSpeed: emitSpeed,
//     critRatio: critRatio,
//     explodeRange: explodeRange,

//     emitterSpeed: emitterSpeed,
//     emitterLife: emitterLife,
//     emitterSize: emitterSize,
//     emitterCollisionSize: emitterCollisionSize,
//     emitterVolume: emitterVolume,
//     emitterCount: emitterCount,

//     meleeRange: nullable<meleeRange>,
// }

export type skillValue = {
    // force: forceSize,
    // armorPiercingForceRatio: armorPiercingForceRatio,


    // type: weaponType,

    emitSpeed: emitSpeed,
    // critRatio: critRatio,
    // explodeRange: explodeRange,

    // emitterSpeed: emitterSpeed,
    // emitterLife: emitterLife,
    // emitterSize: emitterSize,
    // emitterCollisionSize: emitterCollisionSize,
    // // emitterVolume: emitterVolume,
    // emitterCount: emitterCount,

    // meleeRange: nullable<meleeRange>,

    volume: emitterVolume,
}

// export type effectData = {
//     name: effect,
//     value: {
//         force: forceSize,
//         armorPiercingForceRatio: armorPiercingForceRatio,


//         type: weaponType,

//         // emitSpeed: emitSpeed,
//         critRatio: critRatio,
//         explodeRange: explodeRange,

//         // emitterSpeed: emitterSpeed,
//         // emitterLife: emitterLife,
//         // emitterSize: emitterSize,
//         // emitterCollisionSize: emitterCollisionSize,
//         emitterVolume: emitterVolume,
//         // emitterCount: emitterCount,

//         // meleeRange: nullable<meleeRange>,

//     }
// }

export enum emitterType {
    Particle = "Particle",
    Instance = "Instance",
}

export enum particleImage {
    None = "None",

    // Fireball1 = "Fireball1",
    I1 = "1",
    I2 = "2",
    I3 = "3",
    I4 = "4",
    I5 = "5",
    I6 = "6",
    I7 = "7",
    I8 = "8",
    I9 = "9",
    I10 = "10",
    I11 = "11",
    I12 = "12",
    I13 = "13",
    I14 = "14",
    I15 = "15",
    I16 = "16",
    I17 = "17",
    I18 = "18",
    I19 = "19",
}

export enum instance {
    None = "None",

    Arrow1 = "Arrow1",
    Arrow2 = "Arrow2",

    Missile1 = "Missile1",
    Missile2 = "Missile2",
    Missile3 = "Missile3",
    Missile4 = "Missile4",
    Missile5 = "Missile5",
    Missile6 = "Missile6",
    Missile7 = "Missile7",
    Missile8 = "Missile8",
    Missile9 = "Missile9",

    Building1 = "Building1",
    Building2 = "Building2",

    Airplane1 = "Airplane1",

    Weapon1 = "Weapon1",
    Weapon2 = "Weapon2",
}


export type emitterValue = {
    emitterSpeed: emitterSpeed,
    emitterLife: emitterLife,
    emitterSize: emitterSize,
    emitterCollisionSize: emitterCollisionSize,
    emitterCount: emitterCount,
    explodeRange: explodeRange,
}

export type emitter = {
    type: emitterType,
    particleImage?: particleImage,
    instance?: instance,
    value: emitterValue,
    subEffects: Array<emitterSubEffect>,
}

export type actionData = {
    name: action,
    value: skillValue
}

export type damage = {
    // type: meleeDamageEffectType | rangedDamageEffectType,
    type: weaponType,
    damageEffects: damageEffectData,
    value: {
        force: number,
        armorPiercingForceRatio: number,
        critRatio: number,
        // explodeRange?: number
    },
}

export type hit = {
    // damage: Array<singleDamage>,
    damage: damage,
    subEffects: Array<meleeSubEffect | rangedSubEffect>,
}


export type skill = {
    action: actionData,
    emitter?: emitter,
    hit: hit,
}

// export type skillData = Record<
//     skillObject,
//     skill
// >
export type skillData = {
    [skillObject.Small]?: skill,
    [skillObject.Big]?: skill,
}


export type displayName = {
    displayNameCN: string,
    displayNameEN: string,
}





export enum sceneChapter {
    AttackCity = "AttackCity",
    ProtectCity = "ProtectCity",
    Boss = "Boss",
}

export enum player {
    LittleMan,
    Giantess
}

export enum countFactor {
    Level0 = 0.1,
    Level1 = 0.2,
    Level2 = 0.4,
    Level3 = 0.6,
    Level4 = 0.8,
    Level5 = 1,
    Level6 = 1.5,
    Level7 = 2,
    Level8 = 2.5,
    Level9 = 3,
    Level10 = 4
}

// export type attackCityGenerateData = Record<
//     player,
//     Array<{
//         difficulty: autoDifficulty,
//         countFactor: countFactor
//     }>
// >

export type singleGenerateDataForPlayer = {
    difficulty: autoDifficulty,
    weight: number,
    countFactor: countFactor
}

export type generateDataForPlayer = Array<singleGenerateDataForPlayer>

export type commonGenerateData = {
    [player.LittleMan]?: generateDataForPlayer,
    [player.Giantess]?: generateDataForPlayer,
}

// export type protectCityGenerateData = commonGenerateData

// export type bossGenerateData = commonGenerateData


// export type generateData = Record<
//     sceneChapter,
//     attackCityGenerateData | protectCityGenerateData
// >

// export type generateData = {
//     [sceneChapter.AttackCity]?: commonGenerateData,
//     [sceneChapter.ProtectCity]?: commonGenerateData,
//     [sceneChapter.Boss]?: commonGenerateData,
// }

export type generateData = Array<{
    sceneChapter: sceneChapter,
    data: commonGenerateData,
}>


export type unitUniqueName = string


export enum skillType {
    Melee,
    Ranged,
}

// export enum modPropName {

// }

// export type propName = bulletPropName | waterPropName | assistantPropName 


export enum propName {
    AddHp1 = "AddHp1",
    AddHp2 = "AddHp2",
    AddHp3 = "AddHp3",
    AddHp4 = "AddHp4",
    AddExcitement1 = "AddExcitement1",
    AddExcitement2 = "AddExcitement2",
    AddExcitement3 = "AddExcitement3",
    AddExcitement4 = "AddExcitement4",

    LaserBullet = "LaserBullet",
    RocketBullet = "RocketBullet",

    // CallGiantess = "CallGiantess",
    // ClearHatred = "ClearHatred",
}

export type propData = {
    name: propName,
    maxCount: number,
}

export type props = Array<propData>



export enum feature {
    DamageBigger = "DamageBigger",
    PassiveBigger = "PassiveBigger",
    PoisonSingle = "PoisonSingle",
    IceSingle = "IceSingle",
    StressProtect = "StressProtect",
    FragileGrowth = "FragileGrowth",
    DoorShield = "DoorShield",
    DecreaseScale = "DecreaseScale",
    Pull = "Pull",
    DefenseIncreaseDefense = "DefenseIncreaseDefense",
    HpRatioDirect = "HpRatioDirect",
    HpRatioInverse = "HpRatioInverse",
    ShootDistanceDirect = "ShootDistanceDirect",
    ShootDistanceInverse = "ShootDistanceInverse",
}

export type singleFeatureData = {
    name: feature,
    level: number,
}

export type featureData = Array<singleFeatureData>


// export enum damageEffectType {
//     BodyDamage = "BodyDamage",
//     BodyDirectAndRangeDamage = "BodyDirectAndRangeDamage",

//     MagicDamage = "MagicDamage",
// }
// export enum meleeDamageEffectType {
//     BodyDamage = "BodyDamage",
//     BodyDirectAndRangeDamage = "BodyDirectAndRangeDamage",
// }

// export enum rangedDamageEffectType {
//     MagicDamage = "MagicDamage",
// }

// export type damageEffectType = meleeDamageEffectType | rangedDamageEffectType

export enum damageEffect {
    // BodyDamage = "BodyDamage",
    // MagicDamage = "MagicDamage",

    RangeDamage = "RangeDamage",
    Repel = "Repel",
}

export type singleDamageEffectData = {
    name: damageEffect,
    level?: number,
}

export type damageEffectData = Array<singleDamageEffectData>






export enum behaviourMode {
    FindEnemy = "FindEnemy",
    // Wait = "Wait",
    EscapeWhenEnemeyNear = "EscapeWhenEnemeyNear",
    // Wander = "Wander",
}

export enum idleMode {
    WaitInPlace = "WaitInPlace",
    // WonderInPlace = "WonderInPlace",
    RoamAndWander = "RoamAndWander",
}

export enum nearAttackTargetMode {
    None = "None",
    Charge = "Charge",
    JumpForward = "JumpForward",
}

export enum attackMode {
    None = "None",
    KeepDistance = "KeepDistance",
    SideShift = "SideShift",
}

export enum remoteAttackMode {
    None = "None",
    ShootAroundObstacles = "ShootAroundObstacles",
}



export enum behaviourModeKey {
    FindEnemyDistanceFactor = "FindEnemyDistanceFactor",
    NearDistanceFactor = "NearDistanceFactor",
    EscapeDistanceFactor = "EscapeDistanceFactor",
}

export enum idleModeKey {
    // WonderInPlaceRadius = "WonderInPlaceRadius",
    RoamAndWanderDistanceFactor = "RoamAndWanderDistanceFactor",
}

export enum nearAttackTargetModeKey {
    ForceFactor = "ForceFactor",
    DamageInterval = "DamageInterval",
    CD = "CD",
    SpeedFactor = "SpeedFactor",
    DistanceFactor = "DistanceFactor",
}

export enum attackModeKey {
}

export enum remoteAttackModeKey {
}


export type behaviourModeData = {
    mode: behaviourMode,
    values?: Partial<Record<behaviourModeKey, number>>,
}

export type idleModeData = {
    mode: idleMode,
    values?: Partial<Record<idleModeKey, number>>,
}


export type nearAttackTargetModeData = {
    mode: nearAttackTargetMode,
    values?: Partial<Record<nearAttackTargetModeKey, number>>,
}

export type attackModeData = {
    mode: attackMode,
    values?: Partial<Record<attackModeKey, number>>,
}

export type remoteAttackModeData = {
    mode: remoteAttackMode,
    values?: Partial<Record<remoteAttackModeKey, number>>,
}

export type findAttackTargetModeData = {
    changeAttackTargetRateFactor: number,
    selectGiantssBossRateFactor: number,
    selectEliteGiantessRateFactor: number,
    selectSoldierRateFactor: number,
    selectMilltaryVehicleRateFactor: number,
    selectMilltaryBuildingRateFactor: number,
    selectPlayerRateFactor: number,
    selectBuildingRateFactor: number,
}

export type behaviourData = {
    findAttackTargetMode?: findAttackTargetModeData,

    behaviourMode: behaviourModeData,
    idleMode: idleModeData,
    nearAttackTargetMode: nearAttackTargetModeData,
    attackMode: attackModeData,
    remoteAttackMode: remoteAttackModeData,
}
