import { language, careerFeature, characterType } from "meta3d-action-mod-career-add-careerfeature-protocol"
// import { convertDecimalToPercent } from "./NumberUtils"

export enum careerFeatureName {
    // Empty = "Empty",
    IncreaseLuck = "IncreaseLuck",
    DecreaseLuck = "DecreaseLuck",
    IncreaseMoveSpeed = "IncreaseMoveSpeed",
    DecreaseMoveSpeed = "DecreaseMoveSpeed",
    DecreaseArmorStrength = "DecreaseArmorStrength",
    ReduceDamage = "ReduceDamage",
    // IncreaseFullHp = "IncreaseFullHp",
    IncreaseFullHp = "IncreaseFullHp2",
    IncreaseRestoreHpStrength = "IncreaseRestoreHpStrength",
    DecreaseRestoreHpStrength = "DecreaseRestoreHpStrength",
    IncreaseStubRate = "IncreaseStubRate",
    IncreaseItemPrice = "IncreaseItemPrice",
    DecreaseItemPrice = "DecreaseItemPrice",
    IncreaseGetCoin = "IncreaseGetCoin",
    DecreaseRewardPropCount = "DecreaseRewardPropCount",
    // IncreaseLevelGiantessExcitementClimaxRate = "IncreaseLevelGiantessExcitementClimaxRate",
    IncreaseTradeVariety = "IncreaseTradeVariety",
    IncreaseUpgradeWeaponCost = "IncreaseUpgradeWeaponCost",
    EnhenceByFreeUB = "EnhenceByFreeUB",
    EnhenceByFreeShoe = "EnhenceByFreeShoe",
    IncreaseUBCapacity = "IncreaseUBCapacity",
    IncreaseTrigoneAndButtDamage = "IncreaseTrigoneAndButtDamage",
    EnhenceByCarry = "EnhenceByCarry",
    IncreaseGiantessDamaged = "IncreaseGiantessDamaged",
    IncreaseExp = "IncreaseExp",
    DecreaseGiantessDefense = "DecreaseGiantessDefense",
    IncreaseAttack = "IncreaseAttack",

    AfterMissionComplete_AliveOneEnemy_GetReward = "AfterMissionComplete_AliveOneEnemy_GetReward",
    IncreaseMeleeDamageByMoveSpeed = "IncreaseMeleeDamageByMoveSpeed",
    DecreaseDefenseWhenNotMove = "DecreaseDefenseWhenNotMove",
    // ReduceDamageButIncreaseWhenDamaged = "ReduceDamageButIncreaseWhenDamaged",
    ReduceDamageButIncreaseWhenDamaged = "ReduceDamageButIncreaseWhenDamaged2",
    ReduceDamageButIncreaseWhenSingleDamage = "ReduceDamageButIncreaseWhenSingleDamage",
    ReduceGiantessDamage = "ReduceGiantessDamage",
    IncreaseDamageMMDGiantessWeakness = "IncreaseDamageMMDGiantessWeakness",
    IncreaseAttackWhenStubExcitementClimax = "IncreaseAttackWhenStubExcitementClimax",
    IncreaseFullHpByEat = "IncreaseFullHpByEat",
    RemainScaleByEat = "RemainScaleByEat",
    UseFullHpReplaceCoin = "UseFullHpReplaceCoin",
    AfterMissionComplete_ConvertCoinToFullHp = "AfterMissionComplete_ConvertCoinToFullHp",
    // GetRandomPropEveryMinute = "GetRandomPropEveryMinute",
    GetGoodsEveryMinute = "GetGoodsEveryMinute",
    EnhenceGiantessAfterBeat = "EnhenceGiantessAfterBeat",
    EnhenceArmyAfterBeat = "EnhenceArmyAfterBeat",
    // IncreaseDamageByCoin = "IncreaseDamageByCoin",
    IncreaseDamageByCoin = "IncreaseDamageByCoin2",
    IncreaseGetCoinEveryMimute = "IncreaseGetCoinEveryMimute",
    IncreaseGetCoinWithMaxHp = "IncreaseGetCoinWithMaxHp",
    // DecreaseLevelCoinEveryTwoMinutes = "DecreaseLevelCoinEveryTwoMinutes",
    DecreaseCoinAfterBuyTrade = "DecreaseCoinAfterBuyTrade",
    Duelist = "Duelist",
    BulletSpeedMax = "BulletSpeedMax",
    ConvertToFriendCampByFreeUB = "ConvertToFriendCampByFreeUB",
    ControlledUnitCanAttack = "ControlledUnitCanAttack",
    DamageControlledUnit = "DamageControlledUnit",
    AbsorbDeathControlledUnit = "AbsorbDeathControlledUnit",
    DamagedSprayMilk = "DamagedSprayMilk",
    BreastFeeding = "BreastFeeding",
    CharmNearFoot = "CharmNearFoot",
    // InhaleStompRangeUnits = "InhaleStompRangeUnits",
    ConvertToFriendCampForPutToShoe = "ConvertToFriendCampForPutToShoe",
    ConvertToFriendCampByDamage = "ConvertToFriendCampByDamage",
    PassengerCanAttack = "PassengerCanAttack",
    PassengerRestoreHp = "PassengerRestoreHp",
    DamagePassenger = "DamagePassenger",
    IncreaseMoveSpeedWhenMove = "IncreaseMoveSpeedWhenMove",
    DamageWhenMoveCollision = "DamageWhenMoveCollision",
    IncreaseEmitSpeedWhenShoot = "IncreaseEmitSpeedWhenShoot",
    IncreaseGetBulletCount = "IncreaseGetBulletCount",
    DecreaseMoveSpeedWhenShoot = "DecreaseMoveSpeedWhenShoot",
    IncreaseNonPlayerGiantessFriendUnitDamage = "IncreaseNonPlayerGiantessFriendUnitDamage",
    IncreasePlayerGiantessDamage = "IncreasePlayerGiantessDamage",
    FriendUnitCanDamagePlayerOrFriend = "FriendUnitCanDamagePlayerOrFriend",
    FriendUnitCanGetReward = "FriendUnitCanGetReward",
    AbsorbFriendUnitDamaged = "AbsorbFriendUnitDamaged",
    EnhenceCarryRandomAttribute = "EnhenceCarryRandomAttribute",
    HealNearbyFriendUnit = "HealNearbyFriendUnit",
    DecreaseDamageControlledUnit = "DecreaseDamageControlledUnit",
    NearbyFriendHpConsumeGiantessHp = "NearbyFriendHpConsumeGiantessHp",
    AddHpByBeat = "AddHpByBeat",
    ConvertLostHpToEmitSpeed = "ConvertLostHpToEmitSpeed",
    ContinueSubHp = "ContinueSubHp",
    ConvertedFriendUnitCauseReduceDamage = "ConvertedFriendUnitCauseReduceDamage",
    ConvertedFriendUnitCauseIncreaseScale = "ConvertedFriendUnitCauseIncreaseScale",
    ConvertedFriendHpConsumeHp = "ConvertedFriendHpConsumeHp",



}

export let getTextDataByVariable = () => {
    return {
        [language.Chinese]: {
            // [careerFeatureName.Empty]: (value) => `无`,
            [careerFeatureName.IncreaseLuck]: (value) => `增加${value}运气`,
            [careerFeatureName.DecreaseLuck]: (value) => `减少${value}运气`,
            [careerFeatureName.IncreaseMoveSpeed]: (value) => `移动速度增加${value}%`,
            [careerFeatureName.DecreaseMoveSpeed]: (value) => `移动速度减少${value}%`,
            [careerFeatureName.DecreaseArmorStrength]: (value) => `护甲强度减${value}%`,
            [careerFeatureName.ReduceDamage]: (value) => `减少${value}%伤害`,
            [careerFeatureName.IncreaseFullHp]: (value) => `最大生命值增加${value}%`,
            [careerFeatureName.IncreaseRestoreHpStrength]: (value) => `生命恢复强度增加${value}%`,
            [careerFeatureName.DecreaseRestoreHpStrength]: (value) => `生命恢复强度减少${value}%`,
            [careerFeatureName.IncreaseStubRate]: (value) => `硬直概率增加${value}%`,
            [careerFeatureName.IncreaseItemPrice]: (value) => `物品价格增加${value}%`,
            [careerFeatureName.DecreaseItemPrice]: (value) => `物品价格减少${value}%`,
            [careerFeatureName.IncreaseGetCoin]: (value) => `获得的金币增加${value}%`,
            [careerFeatureName.DecreaseRewardPropCount]: (value) => `奖励的道具数量减少${value}%`,
            // [careerFeatureName.IncreaseLevelGiantessExcitementClimaxRate]: (value) => `造成关卡巨大娘兴奋/高潮的概率提升${value}%`,
            [careerFeatureName.IncreaseTradeVariety]: (value) => `商店物品种类增加${value}%`,
            [careerFeatureName.IncreaseUpgradeWeaponCost]: (value) => `升级武器需要的金币增加${value}%`,
            [careerFeatureName.EnhenceByFreeUB]: (value) => `从阴道释放的单位会增强${value}级`,
            [careerFeatureName.EnhenceByFreeShoe]: (value) => `从鞋释放的单位会增加最大生命值${value}%`,
            [careerFeatureName.IncreaseUBCapacity]: (value) => `增加UB容量${value}%`,
            [careerFeatureName.IncreaseTrigoneAndButtDamage]: (value) => `阴部所受伤害增加${value}%`,
            [careerFeatureName.EnhenceByCarry]: (value) => `携带单位带来${value}级动作速度、兴奋速度加成`,
            [careerFeatureName.IncreaseGiantessDamaged]: (value) => `巨大娘受到的伤害增加${value}%`,
            [careerFeatureName.IncreaseExp]: (value) => `增加获得的经验值${value}%`,
            [careerFeatureName.DecreaseGiantessDefense]: (value) => `降低巨大娘防御力${value}%`,
            [careerFeatureName.IncreaseAttack]: (value) => `攻击力增加${value}%`,


            [careerFeatureName.AfterMissionComplete_AliveOneEnemy_GetReward]: (value) => `通关后，每存活1个敌人，获得对应的宝石、金币、经验值的${value}%`,
            [careerFeatureName.IncreaseMeleeDamageByMoveSpeed]: (value) => `每1点移动速度增加${value}%近战伤害`,
            [careerFeatureName.DecreaseDefenseWhenNotMove]: (value) => `站立不动时，护甲强度为0，防御力减${value}%`,
            [careerFeatureName.ReduceDamageButIncreaseWhenDamaged]: ([v1, v2, v3]) => `减少${v1}%伤害。受到攻击后，增加${v2}%伤害，持续${v3}秒`,
            [careerFeatureName.ReduceDamageButIncreaseWhenSingleDamage]: ([v1, v2, v3]) => `减少${v1}%伤害。对同一个目标的每次攻击都会增加${v2}%伤害，持续${v3}秒`,
            [careerFeatureName.ReduceGiantessDamage]: (value) => `受到巨大娘的伤害减${value}%`,
            [careerFeatureName.IncreaseDamageMMDGiantessWeakness]: (value) => `对MMD巨大娘弱点的伤害增加${value}%`,
            [careerFeatureName.IncreaseAttackWhenStubExcitementClimax]: (value) => `MMD巨大娘硬直/兴奋/高潮后，您增加攻击力${value}%`,
            [careerFeatureName.IncreaseFullHpByEat]: (value) => `吃一个单位增加最大生命值${value}点。通关后增加的生命值会保留到后续关卡`,
            [careerFeatureName.RemainScaleByEat]: (value) => `通关后，因吃而增加的身高、生命值会保留到后续关卡`,
            [careerFeatureName.UseFullHpReplaceCoin]: (value) => `使用最大生命值代替金币来交易（1生命值=10金币）`,
            [careerFeatureName.AfterMissionComplete_ConvertCoinToFullHp]: (value) => `通关后，获得的金币的${value}%转换为最大生命值（1生命值=10金币）`,
            // [careerFeatureName.GetRandomPropEveryMinute]: (value) => `每分钟随机获得${value}个道具`,
            [careerFeatureName.GetGoodsEveryMinute]: (value) => `每分钟获得${value}个商品（不可局外保留）`,
            // [careerFeatureName.EnhenceGiantessAfterBeat]: (value) => `你击杀一个精英巨大娘或者关卡巨大娘后，本局未来生成的所有的精英巨大娘或者关卡巨大娘会更强（巨大娘、小人角色均受影响）`,
            [careerFeatureName.EnhenceGiantessAfterBeat]: (value) => `你击杀一个精英巨大娘或者关卡巨大娘后，本局未来生成的所有的精英巨大娘或者关卡巨大娘会更强`,
            // [careerFeatureName.EnhenceArmyAfterBeat]: (value) => `你击杀一个军队单位后，本局未来生成的所有的军队单位会更强（巨大娘、小人角色均受影响）`,
            [careerFeatureName.EnhenceArmyAfterBeat]: (value) => `你击杀一个军队单位后，本局未来生成的所有的军队单位会更强`,
            [careerFeatureName.IncreaseDamageByCoin]: (value) => `每持有50金币，伤害增加${value}%`,
            [careerFeatureName.IncreaseGetCoinEveryMimute]: (value) => `每分钟，获得的金币增加${value}%`,
            [careerFeatureName.IncreaseGetCoinWithMaxHp]: (value) => `满血时捡起一个道具，获得的金币增加${value}%`,
            [careerFeatureName.DecreaseCoinAfterBuyTrade]: (value) => `商店购买后，金币减少${value}%`,
            [careerFeatureName.Duelist]: (value) => `每1分钟的最后5秒进入决斗时间（持续30秒）：关卡巨大娘、敌人的攻击目标锁定为玩家；新出现的敌人会更强（巨大娘、小人角色均受影响）`,
            [careerFeatureName.BulletSpeedMax]: (value) => `武器子弹速度最快`,
            [careerFeatureName.ConvertToFriendCampByFreeUB]: (value) => `从阴道释放的单位会转换为友方阵营`,
            [careerFeatureName.ControlledUnitCanAttack]: (value) => `被控制的单位可以攻击`,
            // [careerFeatureName.DamageControlledUnit]: (value) => `被控制的单位每隔3秒减${value}级的血量`,
            [careerFeatureName.DamageControlledUnit]: (value) => `被控制的单位每隔3秒被${value}级伤害`,
            [careerFeatureName.AbsorbDeathControlledUnit]: (value) => `被控制的单位被击败后会被吸收，${value}级增加巨大娘属性，对应部位局部变大`,
            [careerFeatureName.DamagedSprayMilk]: (value) => `站立或者走路时胸受击，可能会喷奶`,
            // [careerFeatureName.BreastFeeding]: (value) => `放入胸部的单位会被${value}级喂奶，导致单位持续加血、胸部持续变大、巨大娘持续减血`,
            [careerFeatureName.BreastFeeding]: (value) => `放入胸部的单位会被${value}级喂奶`,
            [careerFeatureName.CharmNearFoot]: (value) => `脚附近的人形单位可能被${value}级魅惑`,
            // [careerFeatureName.InhaleStompRangeUnits]: (value) => `踩踏范围受影响的单位有${value}几率被吸入鞋中`,
            [careerFeatureName.ConvertToFriendCampForPutToShoe]: () => `被放入鞋的单位在魅惑满级后会转换为友方阵营`,
            [careerFeatureName.ConvertToFriendCampByDamage]: ([v1, v2]) => `单位的生命值百分比小于${v1}%后，被伤害时有${v2}%概率会转换为友方阵营`,
            [careerFeatureName.PassengerCanAttack]: () => `搭乘巨大娘后可以攻击`,
            [careerFeatureName.PassengerRestoreHp]: (value) => `搭乘巨大娘后，每5秒恢复最大生命值的${value}%`,
            [careerFeatureName.DamagePassenger]: (value) => `搭乘巨大娘后，你会因挤压而承受搭乘的部位所受伤害的${value}%`,
            [careerFeatureName.IncreaseMoveSpeedWhenMove]: (value) => `移动时，速度逐渐增加${value}级`,
            [careerFeatureName.DamageWhenMoveCollision]: (value) => `移动时，与其他单位碰撞会造成和承受${value}级伤害`,
            [careerFeatureName.IncreaseEmitSpeedWhenShoot]: (value) => `射击时射速会不断增加${value}级`,
            [careerFeatureName.IncreaseGetBulletCount]: (value) => `获得的弹药数量增加${value}%`,
            [careerFeatureName.DecreaseMoveSpeedWhenShoot]: (value) => `射击时，移动速度会减少${value}%`,
            [careerFeatureName.IncreaseNonPlayerGiantessFriendUnitDamage]: (value) => `非玩家巨大娘的友方单位的伤害增加${value}%`,
            [careerFeatureName.IncreasePlayerGiantessDamage]: (value) => `玩家巨大娘的伤害增加${value}%`,
            [careerFeatureName.FriendUnitCanDamagePlayerOrFriend]: () => `友方单位能够伤害玩家或者友方单位`,
            [careerFeatureName.FriendUnitCanGetReward]: (value) => `在友方单位击败单位后获得${value}%奖励`,
            [careerFeatureName.AbsorbFriendUnitDamaged]: (value) => `承受友方单位受到的${value}%伤害`,
            [careerFeatureName.EnhenceCarryRandomAttribute]: (value) => `携带的单位每隔5秒会提升随机的一个属性（攻击/攻速/防御/最大生命值）${value}%`,
            [careerFeatureName.HealNearbyFriendUnit]: (value) => `周围的友方单位每隔5秒会恢复最大生命值的${value}%`,
            [careerFeatureName.DecreaseDamageControlledUnit]: (value) => `巨大娘宿主对被控制的单位的伤害减少${value}%`,
            [careerFeatureName.NearbyFriendHpConsumeGiantessHp]: (value) => `周围的友方单位每隔5秒会消耗巨大娘相当于该单位最大生命值的${value}%的血量`,
            [careerFeatureName.AddHpByBeat]: (value) => `击败单位后可回复自身最大生命值${value}%的血量`,
            [careerFeatureName.ConvertLostHpToEmitSpeed]: (value) => `失去的生命值会转换为攻速的增加${value}级`,
            [careerFeatureName.ContinueSubHp]: (value) => `每3秒流失最大生命值的${value}%`,
            [careerFeatureName.ConvertedFriendUnitCauseReduceDamage]: (value) => `每存在一个转换为友方阵营的单位，你受到的伤害减少${value}%`,
            [careerFeatureName.ConvertedFriendUnitCauseIncreaseScale]: (value) => `每存在一个转换为友方阵营的单位，你的身高增加${value}米`,
            [careerFeatureName.ConvertedFriendHpConsumeHp]: (value) => `转换的友方单位每隔5秒会消耗你相当于该单位最大生命值的${value}%的血量`,

        },
        [language.English]: {
            // [careerFeatureName.Empty]: (value) => `Empty`,
            [careerFeatureName.IncreaseLuck]: (value) => `Increase ${value} luck`,
            [careerFeatureName.DecreaseLuck]: (value) => `Decrease ${value} luck`,
            [careerFeatureName.IncreaseMoveSpeed]: (value) => `Move speed increase ${value}%`,
            [careerFeatureName.DecreaseMoveSpeed]: (value) => `Move speed decrease ${value}%`,
            [careerFeatureName.DecreaseArmorStrength]: (value) => `Armor strength decrease ${value}%`,
            [careerFeatureName.ReduceDamage]: (value) => `Decrease ${value}% damage`,
            [careerFeatureName.IncreaseFullHp]: (value) => `Maximum health increased by ${value}%`,
            [careerFeatureName.IncreaseRestoreHpStrength]: (value) => `Heath regeneration increased by ${value}%`,
            [careerFeatureName.DecreaseRestoreHpStrength]: (value) => `Heath regeneration decrease by ${value}%`,
            [careerFeatureName.IncreaseStubRate]: (value) => `The probability of stun increases ${value}%`,
            [careerFeatureName.IncreaseItemPrice]: (value) => `Increase item's price ${value}%`,
            [careerFeatureName.DecreaseItemPrice]: (value) => `Decrease item's price ${value}%`,
            [careerFeatureName.IncreaseGetCoin]: (value) => `The number of coins obtained has increased ${value}%`,
            [careerFeatureName.DecreaseRewardPropCount]: (value) => `Decrease rewarded item's count ${value}%`,
            // [careerFeatureName.IncreaseLevelGiantessExcitementClimaxRate]: (value) => `Increases the probability of causing level giantess to become excitement/climax by ${value}%`,
            [careerFeatureName.IncreaseTradeVariety]: (value) => `The variety of items in the trade has increased by ${value}%`,
            [careerFeatureName.IncreaseUpgradeWeaponCost]: (value) => `The cost of coin for upgrade weapon increased by ${value}%`,
            [careerFeatureName.EnhenceByFreeUB]: (value) => `Units released from the vagina will be enhenced ${value} level`,
            [careerFeatureName.EnhenceByFreeShoe]: (value) => `Units released from the shoe will be increase maximum health ${value}%`,
            [careerFeatureName.IncreaseUBCapacity]: (value) => `Increase UB capacity ${value}%`,
            [careerFeatureName.IncreaseTrigoneAndButtDamage]: (value) => `Injury to the genital area increases by ${value}%`,
            [careerFeatureName.EnhenceByCarry]: (value) => `Unit carried brings a level ${value} action speed, excitement speed bonus`,
            [careerFeatureName.IncreaseGiantessDamaged]: (value) => `The damage suffered by giantess increases by ${value}%`,
            [careerFeatureName.IncreaseExp]: (value) => `Increase exp ${value}%`,
            [careerFeatureName.DecreaseGiantessDefense]: (value) => `Decrease giantess defense ${value}%`,
            [careerFeatureName.IncreaseAttack]: (value) => `Increase attack ${value}%`,

            [careerFeatureName.AfterMissionComplete_AliveOneEnemy_GetReward]: (value) => `After completing the level, for every surviving enemy, receive ${value}% of the corresponding gems, coins, and experience points`,
            [careerFeatureName.IncreaseMeleeDamageByMoveSpeed]: (value) => `Every 1 move speed increase ${value}% melee damage`,
            [careerFeatureName.DecreaseDefenseWhenNotMove]: (value) => `When stand, armor strength decrease to 0, defense decrease ${value}%`,
            [careerFeatureName.ReduceDamageButIncreaseWhenDamaged]: ([v1, v2, v3]) => `Decrease ${v1}% damage. After be attacked, increase ${v2}% damage, keep ${v3}s`,
            [careerFeatureName.ReduceDamageButIncreaseWhenSingleDamage]: ([v1, v2, v3]) => `Reduce ${v1}% damage. Each attack on the same target will increase ${v2}% damage, keep ${v3}s`,
            [careerFeatureName.ReduceGiantessDamage]: (value) => `Reduce ${value}% of damage caused by giantess`,
            [careerFeatureName.IncreaseDamageMMDGiantessWeakness]: (value) => `Increases damage to the weakness of MMD giantess by ${value}%`,
            [careerFeatureName.IncreaseAttackWhenStubExcitementClimax]: (value) => `After MMD giantess stun/excitement/climax, you increase your attack power by ${value}%`,
            [careerFeatureName.IncreaseFullHpByEat]: (value) => `Eat a unit will increase ${value} maxium hp. After completing the level, the increase in maxium hp due to eating will be retained for subsequent levels`,
            [careerFeatureName.RemainScaleByEat]: (value) => `After completing the level, the increase in height and maxium hp due to eating will be retained for subsequent levels`,
            [careerFeatureName.UseFullHpReplaceCoin]: (value) => `Use maximum health instead of coins to trade (1 hp=10 coins)`,
            [careerFeatureName.AfterMissionComplete_ConvertCoinToFullHp]: (value) => `After completing the level, ${value}% of the obtained coins will be converted to the maximum health value (1 hp=10 coins)`,
            // [careerFeatureName.GetRandomPropEveryMinute]: (value) => `Randomly obtain ${value} items every minute`,
            [careerFeatureName.GetGoodsEveryMinute]: (value) => `Obtain ${value} goods every minute(can't save out of level)`,
            // [careerFeatureName.EnhenceGiantessAfterBeat]: (value) => `When you defeat an elite giantess or level giantess, all future elite giantesses or level giantesses spawned in the current level will be stronger(giantess/littleman character all affected)`,
            // [careerFeatureName.EnhenceArmyAfterBeat]: (value) => `When you defeat an army unit, all future army spawned in the current level will be stronger(giantess/littleman character all affected)`,
            [careerFeatureName.EnhenceGiantessAfterBeat]: (value) => `When you defeat an elite giantess or level giantess, all future elite giantesses or level giantesses spawned in the current level will be stronger`,
            [careerFeatureName.EnhenceArmyAfterBeat]: (value) => `When you defeat an army unit, all future army spawned in the current level will be stronger`,
            [careerFeatureName.IncreaseDamageByCoin]: (value) => `For every 50 coins held, damage increases by ${value}%`,
            [careerFeatureName.IncreaseGetCoinEveryMimute]: (value) => `Every minute, the amount of coins obtained increases by ${value}%`,
            [careerFeatureName.IncreaseGetCoinWithMaxHp]: (value) => `When picking up a item while at full health, the amount of coins obtained increases by ${value}%`,
            [careerFeatureName.DecreaseCoinAfterBuyTrade]: (value) => `After buy in the trade, coin decrease ${value}%`,
            [careerFeatureName.Duelist]: (value) => `Every 5 seconds of the last minute, the duel time begins (lasting for 30 seconds): level giantess and enemies will target the player; newly appearing enemies will be stronger (giantess/littleman character all affected)`,
            [careerFeatureName.BulletSpeedMax]: (value) => `Bullet speed max`,
            [careerFeatureName.ConvertToFriendCampByFreeUB]: (value) => `Units released from the vagina will be converted to friendly camp`,
            [careerFeatureName.ControlledUnitCanAttack]: (value) => `Units controlled can be attacked`,
            [careerFeatureName.DamageControlledUnit]: (value) => `The controlled units are level ${value} damaged every 3 seconds`,
            [careerFeatureName.AbsorbDeathControlledUnit]: (value) => `The controlled unit will be absorbed after being destoryed, and will increase level ${value} giantess attribute, corresponding to partial enlargement of the corresponding area`,
            [careerFeatureName.DamagedSprayMilk]: (value) => `When idling or walking, if the breast is hit, milk may be sprayed`,
            [careerFeatureName.BreastFeeding]: (value) => `The unit placed in the breast will be breastfed at the ${value} level`,
            [careerFeatureName.CharmNearFoot]: (value) => `The humanoid unit near foot may level ${value} charm`,
            // [careerFeatureName.InhaleStompRangeUnits]: (value) => `There is a ${value} chance that units affected by the stomp range will be sucked into the shoes`,
            [careerFeatureName.ConvertToFriendCampForPutToShoe]: () => `The unit placed in the shoe will convert to friendly camp after reaching the max charm level`,
            [careerFeatureName.ConvertToFriendCampByDamage]: ([v1, v2]) => `When the unit's health percent is less than ${v1}%, there is a ${v2}% probability of converting to a friendly camp by damaging`,
            [careerFeatureName.PassengerCanAttack]: () => `As a passenger on Giantess, you can attack`,
            [careerFeatureName.PassengerRestoreHp]: (value) => `As a passenger on Giantess, every 5 seconds recover ${value}% of maxium hp`,
            [careerFeatureName.DamagePassenger]: (value) => `After a passenger on Giantess, you will suffer ${value}% of the damage sustained by the part you are riding on due to compression`,
            [careerFeatureName.IncreaseMoveSpeedWhenMove]: (value) => `Move speed increase level ${value} when move`,
            [careerFeatureName.DamageWhenMoveCollision]: (value) => `When moving, collision with other units will cause and suffer ${value} damage`,
            [careerFeatureName.IncreaseEmitSpeedWhenShoot]: (value) => `Shoot speed increase level ${value} when shoot`,
            [careerFeatureName.IncreaseGetBulletCount]: (value) => `Obtain ${value}% more bullets`,
            [careerFeatureName.DecreaseMoveSpeedWhenShoot]: (value) => `Move speed decrease level ${value} when shoot`,
            [careerFeatureName.IncreaseNonPlayerGiantessFriendUnitDamage]: (value) => `Increase the damage of non player giantess friendly units by ${value}%`,
            [careerFeatureName.IncreasePlayerGiantessDamage]: (value) => `Increase the damage of player giantess by ${value}%`,
            [careerFeatureName.FriendUnitCanDamagePlayerOrFriend]: () => `Friend units can damage player or friend`,
            [careerFeatureName.FriendUnitCanGetReward]: (value) => `can get ${value}% reward after friend units beat unit`,
            [careerFeatureName.AbsorbFriendUnitDamaged]: (value) => `Absorb ${value}% of the damage received by friendly units`,
            [careerFeatureName.EnhenceCarryRandomAttribute]: (value) => `Carried unit random attribute(attack/emit speed/defense/maxium hp) increase ${value}%`,
            [careerFeatureName.HealNearbyFriendUnit]: (value) => `Nearby friend units will be healed by ${value}% of maxium hp every 5 seconds`,
            [careerFeatureName.DecreaseDamageControlledUnit]: (value) => `The damage dealt by the Giantess Host to controlled units is reduced by ${value}%`,
            [careerFeatureName.NearbyFriendHpConsumeGiantessHp]: (value) => `Nearby friend units will consume ${value}% of maxium hp of giantess every 5 seconds`,
            [careerFeatureName.AddHpByBeat]: (value) => `After beat unit, recover ${value}% of self maxium hp`,
            [careerFeatureName.ConvertLostHpToEmitSpeed]: (value) => `Lost hp will convert to emit speed increase level ${value}`,
            [careerFeatureName.ContinueSubHp]: (value) => `Continue subtract ${value}% of maxium hp every 3 seconds`,
            [careerFeatureName.ConvertedFriendUnitCauseReduceDamage]: (value) => `For every unit that converted to be friend unit, reduce your damaged by ${value}%`,
            [careerFeatureName.ConvertedFriendUnitCauseIncreaseScale]: (value) => `For every unit that converted to be friend unit, increase your height by ${value} meter`,
            [careerFeatureName.ConvertedFriendHpConsumeHp]: (value) => `Converted friend units will consume your ${value}% of maxium hp every 5 seconds`,

        },
    }
}

export let getData = (api): Array<careerFeature> => {
    return [
        // {
        //     name: careerFeatureName.Empty,
        //     positive: true,
        //     characterType: characterType.GiantessOrLittleMan,
        //     valueCount: 0,
        //     getDescriptionFunc: (language, name) => {
        //         return getTextDataByVariable()[language][name]()
        //     }
        // },
        {
            name: careerFeatureName.IncreaseLuck,
            positive: true,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.getDecimal(v1, 1))
            }
        },
        {
            name: careerFeatureName.DecreaseLuck,
            positive: false,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.getDecimal(v1, 1))
            }
        },
        {
            name: careerFeatureName.IncreaseMoveSpeed,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.DecreaseMoveSpeed,
            positive: false,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.DecreaseArmorStrength,
            positive: false,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.ReduceDamage,
            positive: true,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.IncreaseFullHp,
            positive: true,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.IncreaseRestoreHpStrength,
            positive: true,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.DecreaseRestoreHpStrength,
            positive: false,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.IncreaseStubRate,
            positive: false,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.IncreaseItemPrice,
            positive: false,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.DecreaseItemPrice,
            positive: true,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.IncreaseGetCoin,
            positive: true,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.DecreaseRewardPropCount,
            positive: false,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.IncreaseTradeVariety,
            positive: true,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.IncreaseUpgradeWeaponCost,
            positive: false,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.EnhenceByFreeUB,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](v1)
            }
        },
        {
            name: careerFeatureName.EnhenceByFreeShoe,
            positive: false,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](Math.round(v1 * 100))
            }
        },
        {
            name: careerFeatureName.IncreaseUBCapacity,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](Math.round(v1 * 100))
            }
        },
        {
            name: careerFeatureName.IncreaseTrigoneAndButtDamage,
            positive: false,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](Math.round(v1 * 100))
            }
        },
        {
            name: careerFeatureName.EnhenceByCarry,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](v1)
            }
        },
        {
            name: careerFeatureName.IncreaseGiantessDamaged,
            positive: false,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](Math.round(v1 * 100))
            }
        },
        {
            name: careerFeatureName.IncreaseExp,
            positive: true,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](Math.round(v1 * 100))
            }
        },
        {
            name: careerFeatureName.DecreaseGiantessDefense,
            positive: false,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](Math.round(v1 * 100))
            }
        },
        {
            name: careerFeatureName.IncreaseAttack,
            positive: true,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](Math.round(v1 * 100))
            }
        },
        {
            name: careerFeatureName.AfterMissionComplete_AliveOneEnemy_GetReward,
            positive: true,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.IncreaseMeleeDamageByMoveSpeed,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.DecreaseDefenseWhenNotMove,
            positive: false,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.ReduceDamageButIncreaseWhenDamaged,
            positive: false,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 3,
            getDescriptionFunc: (language, name, [v1, v2, v3]) => {
                return getTextDataByVariable()[language][name]([Math.round(v1 * 100), Math.round(v2 * 100), v3])
            }
        },
        {
            name: careerFeatureName.ReduceDamageButIncreaseWhenSingleDamage,
            positive: false,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 3,
            getDescriptionFunc: (language, name, [v1, v2, v3]) => {
                return getTextDataByVariable()[language][name]([Math.round(v1 * 100), Math.round(v2 * 100), v3])
            }
        },
        {
            name: careerFeatureName.ReduceGiantessDamage,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.IncreaseDamageMMDGiantessWeakness,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.IncreaseAttackWhenStubExcitementClimax,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.IncreaseFullHpByEat,
            characterType: characterType.Giantess,
            positive: true,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](v1)
            }
        },
        {
            name: careerFeatureName.RemainScaleByEat,
            characterType: characterType.Giantess,
            positive: true,
            valueCount: 0,
            getDescriptionFunc: (language, name) => {
                return getTextDataByVariable()[language][name]()
            }
        },
        {
            name: careerFeatureName.UseFullHpReplaceCoin,
            positive: true,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 0,
            getDescriptionFunc: (language, name) => {
                return getTextDataByVariable()[language][name]()
            }
        },
        {
            name: careerFeatureName.AfterMissionComplete_ConvertCoinToFullHp,
            positive: true,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.GetGoodsEveryMinute,
            positive: true,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](v1)
            }
        },
        {
            name: careerFeatureName.EnhenceGiantessAfterBeat,
            positive: false,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 0,
            getDescriptionFunc: (language, name) => {
                return getTextDataByVariable()[language][name]()
            }
        },
        {
            name: careerFeatureName.EnhenceArmyAfterBeat,
            positive: false,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 0,
            getDescriptionFunc: (language, name) => {
                return getTextDataByVariable()[language][name]()
            }
        },
        {
            name: careerFeatureName.IncreaseDamageByCoin,
            positive: true,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.IncreaseGetCoinEveryMimute,
            positive: true,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.IncreaseGetCoinWithMaxHp,
            positive: true,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.DecreaseCoinAfterBuyTrade,
            positive: false,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.Duelist,
            positive: false,
            characterType: characterType.GiantessOrLittleMan,
            valueCount: 0,
            getDescriptionFunc: (language, name) => {
                return getTextDataByVariable()[language][name]()
            }
        },
        {
            name: careerFeatureName.BulletSpeedMax,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 0,
            getDescriptionFunc: (language, name) => {
                return getTextDataByVariable()[language][name]()
            }
        },
        {
            name: careerFeatureName.ConvertToFriendCampByFreeUB,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 0,
            getDescriptionFunc: (language, name) => {
                return getTextDataByVariable()[language][name]()
            }
        },
        {
            name: careerFeatureName.ControlledUnitCanAttack,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 0,
            getDescriptionFunc: (language, name) => {
                return getTextDataByVariable()[language][name]()
            }
        },
        {
            name: careerFeatureName.DamageControlledUnit,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](v1)
            }
        },
        {
            name: careerFeatureName.AbsorbDeathControlledUnit,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](v1)
            }
        },
        {
            name: careerFeatureName.DamagedSprayMilk,
            positive: false,
            characterType: characterType.Giantess,
            valueCount: 0,
            getDescriptionFunc: (language, name) => {
                return getTextDataByVariable()[language][name]()
            }
        },
        {
            name: careerFeatureName.BreastFeeding,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](v1)
            }
        },
        {
            name: careerFeatureName.CharmNearFoot,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](v1)
            }
        },
        {
            name: careerFeatureName.ConvertToFriendCampForPutToShoe,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name) => {
                return getTextDataByVariable()[language][name]()
            }
        },
        {
            name: careerFeatureName.ConvertToFriendCampByDamage,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 2,
            getDescriptionFunc: (language, name, [v1, v2]) => {
                return getTextDataByVariable()[language][name]([api.NumberUtils.convertDecimalToPercent(v1, 3), api.NumberUtils.convertDecimalToPercent(v2, 3)])
            }
        },
        {
            name: careerFeatureName.ConvertToFriendCampByDamage,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 2,
            getDescriptionFunc: (language, name, [v1, v2]) => {
                return getTextDataByVariable()[language][name]([api.NumberUtils.convertDecimalToPercent(v1, 3), api.NumberUtils.convertDecimalToPercent(v2, 3)])
            }
        },
        {
            name: careerFeatureName.PassengerCanAttack,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 0,
            getDescriptionFunc: (language, name) => {
                return getTextDataByVariable()[language][name]()
            }
        },
        {
            name: careerFeatureName.PassengerRestoreHp,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.DamagePassenger,
            positive: false,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.IncreaseMoveSpeedWhenMove,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](v1)
            }
        },
        {
            name: careerFeatureName.DamageWhenMoveCollision,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](v1)
            }
        },
        {
            name: careerFeatureName.IncreaseEmitSpeedWhenShoot,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](v1)
            }
        },
        {
            name: careerFeatureName.IncreaseGetBulletCount,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.DecreaseMoveSpeedWhenShoot,
            positive: false,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.IncreaseNonPlayerGiantessFriendUnitDamage,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.IncreaseNonPlayerGiantessFriendUnitDamage,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.IncreasePlayerGiantessDamage,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.FriendUnitCanDamagePlayerOrFriend,
            positive: false,
            characterType: characterType.LittleMan,
            valueCount: 0,
            getDescriptionFunc: (language, name) => {
                return getTextDataByVariable()[language][name]()
            }
        },
        {
            name: careerFeatureName.FriendUnitCanDamagePlayerOrFriend,
            positive: false,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name) => {
                return getTextDataByVariable()[language][name]()
            }
        },
        {
            name: careerFeatureName.FriendUnitCanGetReward,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.FriendUnitCanGetReward,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.AbsorbFriendUnitDamaged,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.AbsorbFriendUnitDamaged,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.EnhenceCarryRandomAttribute,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.HealNearbyFriendUnit,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.DecreaseDamageControlledUnit,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.NearbyFriendHpConsumeGiantessHp,
            positive: false,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.AddHpByBeat,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.AddHpByBeat,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.ConvertLostHpToEmitSpeed,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](v1)
            }
        },
        {
            name: careerFeatureName.ConvertLostHpToEmitSpeed,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](v1)
            }
        },
        {
            name: careerFeatureName.ContinueSubHp,
            positive: false,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.ContinueSubHp,
            positive: false,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.ConvertedFriendUnitCauseReduceDamage,
            positive: true,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.ConvertedFriendUnitCauseIncreaseScale,
            positive: true,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](v1)
            }
        },
        {
            name: careerFeatureName.ConvertedFriendHpConsumeHp,
            positive: false,
            characterType: characterType.LittleMan,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        },
        {
            name: careerFeatureName.ConvertedFriendHpConsumeHp,
            positive: false,
            characterType: characterType.Giantess,
            valueCount: 1,
            getDescriptionFunc: (language, name, v1) => {
                return getTextDataByVariable()[language][name](api.NumberUtils.convertDecimalToPercent(v1, 3))
            }
        }
    ]
}