Feature: D7 网格顶点变换到 lod2 坐标系验收 —— 转换后 SkinnedMesh 网格顶点与 Mixamo 官方 lod2 网格一致，且骨骼 rest pose 保持与 lod2 一致（不扭曲）

    Background:
        Given the bone_converter package directory exists

    Scenario: R1 转换后网格顶点数与 lod2 网格一致
        Given a real Tripo model converted to Mixamo skeleton with official lod2 rest pose
        Then 转换后 SkinnedMesh 顶点数与 lod2 官方网格一致

    Scenario: R2 转换后网格顶点与 lod2 官方网格一致（最近邻 maxErr < 0.01）
        Given a real Tripo model converted to Mixamo skeleton with official lod2 rest pose
        Then 每个转换后网格顶点在 lod2 官方网格中有最近邻且最大距离小于 0.01

    Scenario: R3 转换后网格包围盒与 lod2 官方网格包围盒一致
        Given a real Tripo model converted to Mixamo skeleton with official lod2 rest pose
        Then 转换后网格包围盒 min/max 与 lod2 官方网格差应小于 0.05

    Scenario: R4 骨骼 rest pose 保持与 lod2 一致（转换不破坏 D6）
        Given a real Tripo model converted to Mixamo skeleton with official lod2 rest pose
        Then 同名骨骼 local quaternion 与 lod2 官方夹角仍小于 1 度且 position 距离仍小于 0.01
