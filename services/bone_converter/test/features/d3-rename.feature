Feature: D3 renameBones 基础映射实现

    作为开发者
    我希望 renameBones 能把 Tripo 骨骼名转换为 Mixamo 命名体系
    从而让 Tripo 模型能直接播放 Mixamo 动画

    Background:
        Given the bone_converter package directory exists

    # 场景 a：TWIST_BONE_PATTERNS 正则修复（R_UpperarmTwist01 无下划线）
    Scenario: TWIST_BONE_PATTERNS 能匹配无下划线/有下划线/ForeTwist 三种 Twist 骨名
        When checking the TWIST_BONE_PATTERNS patterns
        Then "R_UpperarmTwist01" should match a twist pattern
        And "R_Upperarm_Twist01" should match a twist pattern
        And "R_Forearm_ForeTwist01" should match a twist pattern
        And "R_Hand" should not match any twist pattern
        And "mixamorigRightArm" should not match any twist pattern

    # 场景 b：映射表 tripoName 校准（以真实 tripo_model 骨名清单为基准）
    Scenario: 映射表基础身骨 tripoName 全部在真实 Tripo 模型骨名清单中
        When loading the real tripo model FBX bone list
        Then the model should have 41 bones
        And every non-finger tripoName in the default map should exist in the real bone list
        And the finger tripoName entries should be documented as unverified

    # 场景 c：renameBones 对构造骨骼树改名/保留/unmatched
    Scenario: renameBones 对构造的测试骨骼树正确处理映射/白名单/unmatched
        Given a constructed test bone tree with mapped whitelisted and unmapped bones
        When calling renameBones with the default mapping
        Then the mapped bones should be renamed to their mixamorig names
        And the merged and deleted bones should keep their original names
        And the whitelisted bone should keep its original name
        And the unmatched count should be 1
        And the unmatched list should contain "Unknown_Extra"
        And the renamed count should be 2

    # 场景 d：userData.originalName 记录
    Scenario: renameBones 记录每个骨骼的 userData.originalName
        Given a constructed test bone tree with mapped whitelisted and unmapped bones
        When calling renameBones with the default mapping
        Then every bone should have userData.originalName set to its pre-rename name

    # 场景 e：幂等
    Scenario: renameBones 对已是 mixamorig 命名的骨骼树不重复改名
        Given a bone tree already named with mixamorig names
        When calling renameBones with the default mapping
        Then no bone name should change
        And the renamed count should be 0
        And every bone should be counted as unmatched

    # 场景 f：真实 FBX 验证（22 基础身骨全部 ^mixamorig）
    Scenario: renameBones 对真实 tripo_model FBX 执行后 22 个基础身骨全部以 mixamorig 开头
        When loading the real tripo model FBX and calling renameBones
        Then exactly 22 bones should start with mixamorig
        And the 22 base body target names should all be present
        And the root pelvis and twist bones should keep their original names
