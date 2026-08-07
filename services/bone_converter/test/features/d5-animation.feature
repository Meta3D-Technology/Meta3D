Feature: D5 动画播放验收 —— 播放 Mixamo Idle 动画时模型不移动、手臂/躯干/腿/头在正确移动、站立不横躺、尺度正常

    Background:
        Given the bone_converter package directory exists

    Scenario: S1 normalizeRootMotion 后播放 Idle，Hips 世界位置稳定不漂移
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并多帧采样（0-6s 每 0.5s）
        Then Hips 骨骼世界位置最大位移应小于 0.1 单位
        And Hips 世界位置在 t=0 时应处于模型绑定位置附近

    Scenario: S2 normalizeRootMotion 后播放 Idle，手臂骨骼在移动（非 T-pose 僵硬）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并多帧采样（0-6s 每 0.5s）
        Then LeftForeArm 骨骼世界旋转相对 Hips 的变化量应大于 5 度
        And LeftHand 骨骼世界位置相对 Hips 的位移应大于 0.004 单位

    Scenario: S3 normalizeRootMotion 后播放 Idle，头部骨骼在移动（呼吸/点头）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并多帧采样（0-6s 每 0.5s）
        Then Head 骨骼世界旋转相对 Hips 的变化量应大于 0.8 度
        And Head 骨骼世界位置相对 Hips 的位移应大于 0.002 单位

    Scenario: S4 normalizeRootMotion 后播放 Idle，t=0 时手臂自然下垂（非 A-pose 外展）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并采样 t=0 姿态
        Then LeftShoulder 到 LeftHand 的手臂方向与竖直向下的夹角应小于 30 度

    Scenario: S5 normalizeRootMotion 后播放 Idle，躯干在动（Spine 有真实摆动）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并多帧采样（0-6s 每 0.5s）
        Then Spine 骨骼世界旋转相对 Hips 的变化量应大于 0.2 度

    Scenario: S6 normalizeRootMotion 后播放 Idle，下半身在动（UpLeg 有真实摆动）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并多帧采样（0-6s 每 0.5s）
        Then LeftUpLeg 或 RightUpLeg 骨骼世界旋转相对 Hips 的变化量应大于 0.3 度

    Scenario: S7 normalizeRootMotion 后播放 Idle，头部动画方向正确（转动/点头，非错误方向）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并多帧采样（0-6s 每 0.5s）
        Then Head 骨骼世界旋转相对 Hips 的变化量应大于 1 度
        And Head 世界方向相对绑定姿态的变化量应大于 0.5 度

    Scenario: S8 normalizeRootMotion 后 t=0 模型应站立（Hips 世界朝向正确）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并采样 t=0 姿态
        Then Hips 骨骼世界旋转 X 轴分量应在 [-30, 30] 度范围内
        And Hips 骨骼世界旋转 Z 轴分量应在 [-35, 35] 度范围内
        And Hips 骨骼世界旋转 Y 轴分量应在 [-45, 45] 度范围内
        And Head 骨骼世界位置应在 Hips 上方（world.y > Hips.world.y）

    Scenario: S9 normalizeRootMotion 后模型整体尺度正常（无飞出视锥）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并采样 t=0 姿态
        Then Hips 世界位置 Y 应在 [0, 3] 范围内
        And Head 世界位置 Y 应大于 0.7 且小于 3.0

    Scenario: S10 无扭曲（骨骼不脱离模型 bind 位置，防拉丝）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并多帧采样（0-6s 每 0.5s）
        Then 每个被驱动骨骼的世界位置与模型 bind 世界位置偏差应小于 1.0 单位

    Scenario: S11 无扭曲（骨骼链不拉伸：段长保持 bind 长度，无压缩/拉长）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并多帧采样（0-6s 每 0.5s）
        Then 每个子骨骼相对父骨骼的偏移长度与模型 bind 偏移长度的比值应在 0.8 到 1.25 之间

    Scenario: S12 无扭曲（躯干骨骼朝向稳定，骨盆/脊柱不被扭转）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并采样 t=0 姿态
        Then Hips/Spine/Neck/Head 骨骼世界朝向相对模型 bind 的旋转角应小于 35 度

    Scenario: S13 无扭曲（手臂链关节角度自然，肘部无反折；骨滚动角对比动画）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并采样 t=0 姿态
        Then Left 上臂段（肩到肘）方向与竖直向下的夹角应小于 45 度
        And Right 上臂段（肩到肘）方向与竖直向下的夹角应小于 45 度
        And Left 前臂段（肘到腕）方向与竖直向下的夹角应小于 45 度
        And Right 前臂段（肘到腕）方向与竖直向下的夹角应小于 45 度
        And Left 肘部弯曲角（上臂段与前臂段夹角）应小于 60 度
        And Right 肘部弯曲角（上臂段与前臂段夹角）应小于 60 度
        And Left Shoulder 手臂骨相对动画的滚动角应小于 20 度
        And Left Arm 手臂骨相对动画的滚动角应小于 20 度
        And Left ForeArm 手臂骨相对动画的滚动角应小于 20 度
        And Left Hand 手臂骨相对动画的滚动角应小于 20 度
        And Right Shoulder 手臂骨相对动画的滚动角应小于 20 度
        And Right Arm 手臂骨相对动画的滚动角应小于 20 度
        And Right ForeArm 手臂骨相对动画的滚动角应小于 20 度
        And Right Hand 手臂骨相对动画的滚动角应小于 20 度

    Scenario: S14 无扭曲（手臂蒙皮相对旋转与正确 retarget 目标一致，防前臂内旋/掌心朝后）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并采样 t=0 姿态
        Then Left Shoulder 蒙皮相对旋转偏差应小于 10 度
        And Left Arm 蒙皮相对旋转偏差应小于 10 度
        And Left ForeArm 蒙皮相对旋转偏差应小于 10 度
        And Left Hand 蒙皮相对旋转偏差应小于 10 度
        And Right Shoulder 蒙皮相对旋转偏差应小于 10 度
        And Right Arm 蒙皮相对旋转偏差应小于 10 度
        And Right ForeArm 蒙皮相对旋转偏差应小于 10 度
        And Right Hand 蒙皮相对旋转偏差应小于 10 度

    Scenario: S15 无扭曲（蒙皮后手臂区域顶点与帧校正目标一致，防网格扭曲）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并采样 t=0 姿态
        Then 手臂蒙皮顶点平均位移应小于 0.02 单位
        And 手臂蒙皮顶点最大位移应小于 0.1 单位

    Scenario: S16 多时间点输出骨架方向/twist/掌向跟随原始动画源（锚定不经转换的动画数据）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并多时间点采样输出骨架 vs 原始动画（t=0,0.5,1.5,2.5,3.5,4.5）
        Then 每个时间点 左右上臂 输出骨架段方向与原始动画段方向的偏差应小于 20 度
        And 每个时间点 左右前臂 输出骨架段方向与原始动画段方向的偏差应小于 20 度
        And 每个时间点 左右上臂/前臂 输出骨骼绕段轴 twist 与原始动画 twist 的偏差应小于 20 度
        And 每个时间点 左右 Hand 掌向（绕前臂段轴滚动）与原始动画的偏差应小于 20 度

    Scenario: S17 蒙皮顶点质心段方向 vs 骨骼位置段方向（帧内自洽，独立于公式构造目标）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并多时间点采样蒙皮质心段方向 vs 骨位置段方向（t=0,0.5,1.5,2.5,3.5,4.5）
        Then 每个时间点 左右上臂 蒙皮质心段方向与骨位置段方向的偏差应小于 15 度
        And 每个时间点 左右前臂 蒙皮质心段方向与骨位置段方向的偏差应小于 15 度

    Scenario: S18 V11 翻转后 Idle 角色绝对面朝 +Z（朝向相机）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并应用 180°Y 翻转采样 t=0 姿态
        Then Hips 骨骼世界前向（局部 -Z 轴）与 +Z 轴夹角应小于 10 度
        And Head 骨骼局部 -Z 轴在世界空间的方向与 +Z 轴夹角应小于 10 度

    Scenario: S18w V11 翻转后 Walk 角色绝对面朝 +Z（两时刻）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Walk 动画并应用 180°Y 翻转采样 t=0 与 t=0.15 姿态
        Then 两时刻的 Hips 骨骼世界前向（局部 -Z 轴）与 +Z 轴夹角均小于 15 度
        And 两时刻的 Head 骨骼局部 -Z 轴在世界空间的方向与 +Z 轴夹角均小于 10 度

    Scenario: S19 normalizeRootMotion 后未播放时 Idle 双脚应踩在地面上
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并读取未播放模型骨骼世界位置
        Then LeftToeBase 世界位置 Y 应在 [-0.05, 0.05] 范围内
        And RightToeBase 世界位置 Y 应在 [-0.05, 0.05] 范围内
        And LeftFoot 世界位置 Y 应在 [-0.05, 0.30] 范围内
        And RightFoot 世界位置 Y 应在 [-0.05, 0.30] 范围内

    Scenario: S19w 播放 Walk 动画时至少一个支撑脚踩在地面上（0-1s）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Walk 动画并多帧采样（0-1s 每 0.1s）
        Then 至少一个 ToeBase 世界位置 Y 在 [-0.05, 0.05] 内（支撑脚贴地）
        And 至少一个 Foot 世界位置 Y 在 [-0.05, 0.10] 内（踝部近地）

    Scenario: S20 播放 Walk 动画时膝弯曲角应在生理合理范围（0-1s 每 0.1s）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Walk 动画并多帧采样（0-1s 每 0.1s）
        Then 所有时刻 LeftUpLeg→LeftLeg→LeftFoot 段夹角应在 [0, 100] 度范围内
        And 所有时刻 RightUpLeg→RightLeg→RightFoot 段夹角应在 [0, 100] 度范围内

    Scenario: S20i 播放 Idle 动画时膝弯曲角应在生理合理范围（0-6s 每 0.5s）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并多帧采样（0-6s 每 0.5s）
        Then 所有时刻 LeftUpLeg→LeftLeg→LeftFoot 段夹角应在 [0, 45] 度范围内
        And 所有时刻 RightUpLeg→RightLeg→RightFoot 段夹角应在 [0, 45] 度范围内

    Scenario: S21 躯干链（Spine/Spine1/Spine2/Neck/Head）的 worldQ 与动画 S_w 一致
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并采样 t=0, t=0.5, t=1.0 对比躯干链 S_w
        Then Spine 骨骼每帧 world 旋转与动画 S_w 的 cos 距离应小于 0.01
        And Spine1 骨骼每帧 world 旋转与动画 S_w 的 cos 距离应小于 0.01
        And Spine2 骨骼每帧 world 旋转与动画 S_w 的 cos 距离应小于 0.01
        And Neck 骨骼每帧 world 旋转与动画 S_w 的 cos 距离应小于 0.01
        And Head 骨骼每帧 world 旋转与动画 S_w 的 cos 距离应小于 0.01

    Scenario: S22 re-pose 后躯干链骨骼世界 Y 朝向接近 Mixamo 标准（非 Tripo 原 180°）
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Idle 动画并读取 re-pose 后躯干链世界 Y 朝向
        Then mixamorigSpine 世界 Y euler（YXZ）绝对值应小于 15 度
        And mixamorigSpine1 世界 Y euler 绝对值应小于 15 度
        And mixamorigSpine2 世界 Y euler 绝对值应小于 15 度
        And mixamorigNeck 世界 Y euler 绝对值应小于 15 度
        And mixamorigHead 世界 Y euler 绝对值应小于 15 度

    Scenario: S23 播放 Walk 动画时头部面朝方向与动画一致
        Given a real Tripo model converted to Mixamo skeleton
        When normalizeRootMotion 处理 Mixamo Walk 动画并采样 t=0, t=0.15, t=0.5 对比头部朝向
        Then Head 骨骼局部 -Z 轴在世界空间的方向与动画 S_w(Head) 对应的方向余弦相似度应大于 0.99（每帧）
