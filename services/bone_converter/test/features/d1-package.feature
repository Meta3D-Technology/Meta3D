Feature: bone_converter D1 package 骨架验证
    As a developer
    I want to verify the bone_converter D1 package skeleton
    So that the demo and tooling are correctly scaffolded

    Background:
        Given the bone_converter package directory exists

    Scenario: package.json 配置正确（name、three 依赖、脚本齐全）
        When checking the bone_converter package.json
        Then the package name should be bone_converter
        And the package should depend on three 0.159.0
        And the package should define the webpack:dev-server script
        And the package should define the test:e2e script
        And the package should define the test:bdd script
        And the tsconfig, webpack config and jest config should exist

    Scenario: 工具模块与 demo 文件齐全
        When listing modules in src/tool/bone_converter
        Then the module list should contain 12 files
        And the module list should contain index.ts
        And the module list should contain types.ts
        And the module list should contain BoneMapping.ts
        And the module list should contain renameBones.ts
        And the module list should contain fixSkinningIndices.ts
        And the module list should contain restructureHierarchy.ts
        And the module list should contain mergeBoneWeights.ts
        And the module list should contain normalizeRootMotion.ts
        And the module list should contain reposeModelBind.ts
        And the module list should contain utils.ts
        And the module list should contain rebindJointVerts.ts
        And the demo files main.ts, index.html and DebugPanel.ts should exist

    Scenario: 资产文件存在且非空（含 FBX magic bytes 校验）
        When checking the Tripo model FBX file
        Then the file should exist
        And the file should be non-empty
        And the file should have a valid FBX binary signature
        When checking the Mixamo Idle animation FBX file
        Then the file should exist
        And the file should be non-empty
        And the file should have a valid FBX binary signature
        When checking the Mixamo Death animation FBX file
        Then the file should exist
        And the file should be non-empty
        And the file should have a valid FBX binary signature

    Scenario: demo 资源 URL 对应真实文件
        When reading the model URL from demo/main.ts
        Then the model URL should resolve to an existing file
        When reading the animation URL from demo/main.ts
        Then the animation URL should resolve to an existing file

    Scenario: types.ts 含审核修正（幂等守卫 / 发骨策略）
        When reading src/tool/bone_converter/types.ts
        Then the source should contain the alreadyConverted field
        And the source should document deleteUnmapped defaults to false
