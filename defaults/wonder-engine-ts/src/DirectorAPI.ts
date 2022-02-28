import { componentConfig } from "./Type";
import { prepare as prepareMeta3d, registerExtension, getExtensionStateExn, getServiceExn, setExtensionState } from "meta3d"
import { state as meta3dState } from "meta3d-type"
import { getExtensionService as getMostExtensionService, createExtensionState as createMostExtensionState } from "meta3d-bs-most"
import { getExtensionService as getEngineCoreExtensionService, createExtensionState as createEngineCoreExtensionState } from "meta3d-engine-core"
import { getExtensionService as getRegisterECSExtensionService, createExtensionState as createRegisterECSExtensionState } from "meta3d-register-ecs"
import { getExtensionService as getRegisterDefaultWorkPluginsECSExtensionService, createExtensionState as createRegisterDefaultWorkPluginsECSExtensionState } from "meta3d-register-default-work-plugins"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as registerDefaultWorkPluginsService } from "meta3d-register-default-work-plugins-protocol/src/service/ServiceType"
import { service as registerECSService } from "meta3d-register-ecs-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"

function _getMeta3DEngineCoreExtensionName(): string {
    return "meta3d-engine-core"
}

function _getMeta3DBsMostExtensionName(): string {
    return "meta3d-bs-most"
}

function _getMeta3DRegisterDefaultWorkPluginsExtensionName(): string {
    return "meta3d-register-default-work-plugins"
}

function _getMeta3DRegisterECSExtensionName(): string {
    return "meta3d-register-ecs"
}

export function prepare({ isDebug, float9Array1, float32Array1, transformCount }: componentConfig): meta3dState {
    let meta3dState = prepareMeta3d()

    // TODO use pipe

    meta3dState =
        registerExtension(
            meta3dState,
            _getMeta3DBsMostExtensionName(),
            getMostExtensionService,
            null,
            createMostExtensionState()
        )
    meta3dState =
        registerExtension(
            meta3dState,
            _getMeta3DEngineCoreExtensionName(),
            getEngineCoreExtensionService,
            {
                meta3dBsMostExtensionName: _getMeta3DBsMostExtensionName(),
            },
            createEngineCoreExtensionState()
        )
    meta3dState =
        registerExtension(
            meta3dState,
            _getMeta3DRegisterECSExtensionName(),
            getRegisterECSExtensionService,
            {
                meta3dEngineCoreExtensionName: _getMeta3DEngineCoreExtensionName(),
            },
            createRegisterECSExtensionState()
        )
    meta3dState =
        registerExtension(
            meta3dState,
            _getMeta3DRegisterDefaultWorkPluginsExtensionName(),
            getRegisterDefaultWorkPluginsECSExtensionService,
            {
                meta3dEngineCoreExtensionName: _getMeta3DEngineCoreExtensionName(),
                meta3dBsMostExtensionName: _getMeta3DBsMostExtensionName(),
            },
            createRegisterDefaultWorkPluginsECSExtensionState()
        )


    let engineCoreState = getExtensionStateExn<engineCoreState>(
        meta3dState,
        _getMeta3DEngineCoreExtensionName(),
    )

    let { setIsDebug } = getServiceExn<engineCoreService>(
        meta3dState,
        _getMeta3DEngineCoreExtensionName()
    )

    engineCoreState = setIsDebug(engineCoreState, isDebug)


    let registerDefaultWorkPluginsService = getServiceExn<registerDefaultWorkPluginsService>(
        meta3dState,
        _getMeta3DRegisterDefaultWorkPluginsExtensionName(),
    )

    engineCoreState = registerDefaultWorkPluginsService.register(engineCoreState, meta3dState)

    let registerECSService = getServiceExn<registerECSService>(
        meta3dState,
        _getMeta3DRegisterECSExtensionName()
    )

    engineCoreState = registerECSService.register(engineCoreState, meta3dState, { isDebug, float9Array1, float32Array1, transformCount })

    meta3dState =
        setExtensionState(
            meta3dState,
            _getMeta3DEngineCoreExtensionName(),
            engineCoreState
        )

    return meta3dState
}

export function init(meta3dState: meta3dState): Promise<meta3dState> {
    let engineCoreState = getExtensionStateExn<engineCoreState>(
        meta3dState,
        _getMeta3DEngineCoreExtensionName(),
    )

    let { map } = getServiceExn<mostService>(
        meta3dState,
        _getMeta3DBsMostExtensionName()
    )

    let { init, runPipeline } = getServiceExn<engineCoreService>(
        meta3dState,
        _getMeta3DEngineCoreExtensionName()
    )

    engineCoreState = init(engineCoreState)

    return map(
        (engineCoreState: engineCoreState) => {
            return setExtensionState(
                meta3dState,
                _getMeta3DEngineCoreExtensionName(),
                engineCoreState
            )
        },
        runPipeline(engineCoreState, meta3dState, "init")
    ).drain()
}
