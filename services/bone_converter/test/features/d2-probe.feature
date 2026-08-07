Feature: D2 探针数据质量与映射表校准验证
    As a developer
    I want to verify the D2 probe results and mapping table calibration
    So that D3 bone renaming uses accurate, measured data

    Background:
        Given the bone_converter D2 probe output exists

    Scenario: 探针输出 JSON 结构有效
        When reading the probe-output.json file
        Then the JSON should have a generatedAt timestamp
        And the models array should contain EliteGiantess1 and Soldier1 entries
        And the model bone counts should be greater than 20
        And all model bone names should be non-empty
        And the animations array should contain Idle and Death entries

    Scenario: 映射表目标名全部在动画轨道中确认存在（mixamoName 校准）
        When reading the BoneMapping.ts default map
        And reading the probe animation track bone name sets
        Then every non-empty mixamoName in the mapping should exist in the animation track bone name set
        And no mixamoName should contain a colon character
        And all mixamoName should start with the mixamorig prefix

    Scenario: 模型骨骼已含 mixamorig 命名（asset-lib 旧模型，已转换；幂等守卫对已转换模型适用）
        When reading the probe model bone lists
        Then all bones in EliteGiantess1 and Soldier1 should start with mixamorig
        And EliteGiantess1 should have exactly 33 bones
        And Soldier1 should have exactly 25 bones
        And no model bone should be named Root, Hip, or Pelvis

    Scenario: 动画轨道均无冒号（根因①验证）
        When reading the probe animation track lists
        Then no animation track bone name should contain a colon
        And the animation bone name sets for Idle and Death should be identical
        And the number of animation clips should be 1 for each animation

    Scenario: SkinnedMesh skinIndex 范围有效
        When reading the probe model SkinnedMesh data
        Then for each model the maxSkinIndex should be less than the skeleton boneCount used by that mesh
        And for each model the minSkinIndex should be 0
