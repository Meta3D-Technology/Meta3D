Feature: D6 rest pose 对齐验收 —— 转换后骨骼 rest pose（local pos/quat）与 Mixamo 官方 lod2 骨架完全一致，且为官方骨架子集，层级一致

    Background:
        Given the bone_converter package directory exists

    Scenario: R1 转换后骨骼是 Mixamo lod2 官方骨架的子集
        Given a real Tripo model converted to Mixamo skeleton with official lod2 rest pose
        Then 转换后骨骼名称应全部属于 lod2 官方骨骼集合

    Scenario: R2 同名骨骼 local quaternion 与 lod2 官方一致（< 1 度）
        Given a real Tripo model converted to Mixamo skeleton with official lod2 rest pose
        Then 每个同名骨骼的 local quaternion 与 lod2 官方的夹角应小于 1 度

    Scenario: R3 同名骨骼 local position 与 lod2 官方一致（< 0.01）
        Given a real Tripo model converted to Mixamo skeleton with official lod2 rest pose
        Then 每个同名骨骼的 local position 与 lod2 官方的距离应小于 0.01

    Scenario: R4 骨骼层级一致层级与 lod2 官方一致
        Given a real Tripo model converted to Mixamo skeleton with official lod2 rest pose
        Then 每个同名骨骼的父骨骼名称应与 lod2 官方一致
