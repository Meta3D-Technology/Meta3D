Feature: bone_converter upload_pipeline —— tripo 模型压缩包解压、FBX 加载、骨骼转 Mixamo、纹理嵌入 FBX 导出、ArrayBuffer 输出

    Background:
        Given the bone_converter package directory exists

    Scenario: S1 解压 tripo zip 得到 fbx 与纹理
        Given a tripo zip built in-memory from the real snapshot_EliteGiantess10 assets
        When unzipping the tripo zip
        Then the unzipped result should contain an fbx with at least 100KB and a matching fbx name
        And the unzipped textures should contain exactly 1 entry whose bytes equal the original PNG

    Scenario: S2 无 fbx 的 zip 抛出明确错误
        Given a zip without any fbx file
        When unzipping the tripo zip
        Then the unzip should reject with a clear error message

    Scenario: S3 加载 tripo fbx 得到含蒙皮网格与骨骼的场景
        Given the unzipped tripo fbx bytes
        When loading the fbx into a THREE.Object3D
        Then the loaded object should contain a SkinnedMesh and more than 20 bones

    Scenario: S4 转换骨骼为 Mixamo 命名体系
        Given the loaded tripo Object3D
        When converting the bones to Mixamo skeleton
        Then all bones should start with mixamorig and the count should be 22
        And no Root Pelvis or Twist bones should remain
        And every skinIndex should be less than the bone count
        And the convert report fields should be complete

    Scenario: S5 转换时传入官方 rest pose 对齐生效
        Given the loaded tripo Object3D and the official lod2 rest pose
        When converting the bones with the official rest pose
        Then the report should count positive rest pose aligned bones

    Scenario: S6 导出 ASCII FBX 可被 FBXLoader 重新解析
        Given a converted Mixamo model with its embedded textures
        When exporting the model to an ASCII FBX ArrayBuffer
        Then the exported ArrayBuffer should be non-empty
        And the exported FBX should reparse successfully with bones named mixamorig
        And the reparsed mesh skinIndex values should be less than the bone count
        And the reparsed per-vertex skin weight sums should be approximately 1

    Scenario: S7 纹理嵌入后 FBXLoader 可读出 data URL 且字节一致
        Given a converted Mixamo model with its embedded textures
        When exporting and reparsing the FBX
        Then the reparsed material map should exist and its image src should start with data:image/png;base64,
        And decoding the embedded base64 should equal the original PNG bytes

    Scenario: S8 主流程 processTripoZip 输出可解析且带嵌入纹理的 fbxData
        Given a tripo zip built in-memory from the real snapshot_EliteGiantess10 assets
        When calling processTripoZip on the zip bytes
        Then the result fbxData should reparse with all bones starting with mixamorig
        And the result should embed at least 1 texture
        And the fbxByteLength should be less than 3MB
        And the result report warnings should be an array

    Scenario: S9 幂等守卫
        Given a bone tree already named with mixamorig names
        When converting the bones to Mixamo skeleton
        Then the report should mark the model as already converted
