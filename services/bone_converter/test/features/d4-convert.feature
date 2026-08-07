Feature: D4 层级重组 + skinIndex 修复 + Twist 骨合并 + convertTripoToMixamo 主流程

    作为开发者
    我希望 restructureHierarchy / fixSkinningIndices / mergeBoneWeights / convertTripoToMixamo
    能把 Tripo 骨骼层级与蒙皮索引正确重组修复
    从而让 Tripo 模型转换后能直接播放 Mixamo 动画

    Background:
        Given the bone_converter package directory exists

    # 场景 1：S2 层级重组 —— Root 删除、Hip 提升、Pelvis 合并、世界变换保持
    Scenario: S2 restructureHierarchy 删除 Root 合并 Pelvis 并保持世界变换
        Given a bone tree with Root Hip Pelvis and R_Thigh
        When calling restructureHierarchy with the default mapping
        Then the Root and Pelvis bones should no longer exist in the tree
        And R_Thigh should be a direct child of Hip
        And Hip should be the root of the bone hierarchy
        And every bone world transform should be preserved within 0.001
        And the returned deleted bone names should include Root and Pelvis

    # 场景 2：S3 skinIndex 修复 —— 指向被删骨的索引被重映射，权重和保持
    Scenario: S3 fixSkinningIndices 修复指向被删骨的 skinIndex
        Given a SkinnedMesh with 3 bones and skinIndex referencing a deleted bone
        When calling fixSkinningIndices with a full index map
        Then the maximum skinIndex should be less than the bone count
        And no skinIndex value should be -1 or 65535
        And the per-vertex skin weight sum should be approximately 1
        And the fixed vertex count should be 2

    # 场景 3：S4 Twist 骨合并 —— Twist 骨槽重定向到父骨新索引，权重不动
    Scenario: S4 mergeBoneWeights 将 Twist 骨槽重定向到父骨
        Given a SkinnedMesh with a twist bone influence slot
        When calling mergeBoneWeights with the twist bone names
        Then the twist bone slot should redirect to the parent new index
        And the skin weights should remain unchanged

    # 场景 4：B2 多 SkinnedMesh —— 两个 mesh 共享同一份 Skeleton，只重建一份
    Scenario: B2 两个 SkinnedMesh 共享同一 Skeleton
        Given a model with two SkinnedMeshes sharing one Skeleton
        When calling convertTripoToMixamo on the model
        Then both meshes should share the same skeleton instance
        And the report should mark the skeleton as rebuilt
        And every mesh skinIndex should be valid after conversion

    # 场景 5：主流程 —— 真实 Tripo FBX 完整转换
    Scenario: convertTripoToMixamo 对真实 Tripo FBX 完成完整转换
        Given the real tripo model FBX
        When calling convertTripoToMixamo on a fresh parse
        Then all remaining bones should start with mixamorig
        And the bone count should go from 41 to 22
        And no twist Root or Pelvis bones should remain
        And every skinIndex should be less than the bone count after conversion
        And the rebuilt skeleton should contain all 22 bones including the main chain
        And skinIndex slots should map to semantic parent bones not all collapse to index 0
        And surviving bone world transforms should be preserved within 0.001
        And the report should contain complete fields

    # 场景 6：幂等守卫 —— 已是 mixamorig 命名的树 early-return
    Scenario: convertTripoToMixamo 幂等守卫
        Given a bone tree already named with mixamorig names
        When calling convertTripoToMixamo on the tree
        Then the report should mark the model as already converted
        And no bone names should change

    # 场景 7（S1）：无骨骼模型 —— 不含 Bone 的 Object3D 返回 boneCountBefore=0 且无异常
    Scenario: convertTripoToMixamo 对无骨骼模型返回 0 骨骼数
        Given an object without any bones
        When calling convertTripoToMixamo on the object
        Then the report should report boneCountBefore 0
        And the conversion should not throw any exception

    # 场景 8（S1）：handleTwistBones=false —— Twist 骨走白名单保留而非删除
    Scenario: convertTripoToMixamo 关闭 handleTwistBones 时保留 Twist 骨
        Given a model with a Twist bone and handleTwistBones disabled
        When calling convertTripoToMixamo on the model
        Then the Twist bone should still exist in the tree
        And the report should count zero merged twist bones

    # 场景 9（V12.3）：关节区权重重绑 —— 脚踝/上臂/肩区（rebindJointVerts）
    Scenario: V12.3 rebindJointVerts 重绑脚踝上臂肩区顶点
        Given the real EliteGiantess model FBX with official lod2 reference
        When calling convertTripoToMixamo with officialRestPose enabling joint rebind
        Then the foot region dominant bone should be Foot not Leg
        And the arm region Shoulder-dominant count should exceed Arm-dominant count
        And the shoulder region should have no Head-dominant vertices

    # 场景 10（V12.4）：boneInverse 参考系统一 —— 转换后 skeleton.boneInverses 对齐官方 lod2 TransformLink 帧
    Scenario: V12.4 boneInverse 参考系统一为官方 lod2 TransformLink 帧
        Given the real EliteGiantess model FBX with official lod2 reference
        When calling convertTripoToMixamo with officialRestPose enabling joint rebind
        Then the report should count 22 bones with official boneInverse frames
        And every shared bone boneInverse should match official lod2 within 0.01
        And the reposed model should still render skin within 0.5 of official raw output
