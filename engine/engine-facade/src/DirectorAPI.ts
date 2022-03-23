import { componentConfig } from "./Type";
import { registerExtension, getExtensionState, getExtensionService, setExtensionState } from "meta3d"
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

function _getMeta3DBsMostExtensionName(): string {
    return "meta3d-bs-most"
}

function _getMeta3DRegisterDefaultWorkPluginsExtensionName(): string {
    return "meta3d-register-default-work-plugins"
}

function _getMeta3DRegisterECSExtensionName(): string {
    return "meta3d-register-ecs"
}

export function prepare(meta3dState: meta3dState, engineCoreExtensionName: string, { isDebug, float9Array1, float32Array1, transformCount, geometryCount, geometryPointCount, pbrMaterialCount }: componentConfig): meta3dState {
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
            engineCoreExtensionName,
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
                meta3dEngineCoreExtensionName: engineCoreExtensionName,
            },
            createRegisterECSExtensionState()
        )
    meta3dState =
        registerExtension(
            meta3dState,
            _getMeta3DRegisterDefaultWorkPluginsExtensionName(),
            getRegisterDefaultWorkPluginsECSExtensionService,
            {
                meta3dEngineCoreExtensionName: engineCoreExtensionName,
                meta3dBsMostExtensionName: _getMeta3DBsMostExtensionName(),
            },
            createRegisterDefaultWorkPluginsECSExtensionState()
        )


    let engineCoreState = getExtensionState<engineCoreState>(
        meta3dState,
        engineCoreExtensionName,
    )

    let { setIsDebug } = getExtensionService<engineCoreService>(
        meta3dState,
        engineCoreExtensionName
    )

    engineCoreState = setIsDebug(engineCoreState, isDebug)


    let registerDefaultWorkPluginsService = getExtensionService<registerDefaultWorkPluginsService>(
        meta3dState,
        _getMeta3DRegisterDefaultWorkPluginsExtensionName(),
    )

    engineCoreState = registerDefaultWorkPluginsService.register(engineCoreState, meta3dState)

    let registerECSService = getExtensionService<registerECSService>(
        meta3dState,
        _getMeta3DRegisterECSExtensionName()
    )

    engineCoreState = registerECSService.register(engineCoreState, meta3dState, { isDebug, float9Array1, float32Array1, transformCount, geometryCount, geometryPointCount, pbrMaterialCount })

    meta3dState =
        setExtensionState(
            meta3dState,
            engineCoreExtensionName,
            engineCoreState
        )

    return meta3dState
}

function _runPipeline(meta3dState: meta3dState, engineCoreState: engineCoreState, engineCoreExtensionName: string, pipelineName: string): Promise<meta3dState> {
    //  TODO use NullableUtils for type
    let tempMeta3DStata: meta3dState | null = null

    let { map } = getExtensionService<mostService>(
        meta3dState,
        _getMeta3DBsMostExtensionName()
    )

    let { runPipeline } = getExtensionService<engineCoreService>(
        meta3dState,
        engineCoreExtensionName
    )

    return map(
        (engineCoreState: engineCoreState) => {
            tempMeta3DStata = setExtensionState(
                meta3dState,
                engineCoreExtensionName,
                engineCoreState
            )

            return null
        },
        runPipeline(engineCoreState, meta3dState, pipelineName)
    ).drain().then((_) => {
        //  TODO use NullableUtils for type
        return tempMeta3DStata as meta3dState
    })
}

export function init(meta3dState: meta3dState, engineCoreExtensionName: string): Promise<meta3dState> {
    let engineCoreState = getExtensionState<engineCoreState>(
        meta3dState,
        engineCoreExtensionName,
    )

    let { init } = getExtensionService<engineCoreService>(
        meta3dState,
        engineCoreExtensionName
    )

    engineCoreState = init(engineCoreState)

    return _runPipeline(meta3dState, engineCoreState, engineCoreExtensionName, "init")
}

export function update(meta3dState: meta3dState, engineCoreExtensionName: string): Promise<meta3dState> {
    return _runPipeline(meta3dState, getExtensionState<engineCoreState>(
        meta3dState,
        engineCoreExtensionName,
    ), engineCoreExtensionName, "update")
}


export function render(meta3dState: meta3dState, engineCoreExtensionName: string): Promise<meta3dState> {
    return _runPipeline(meta3dState, getExtensionState<engineCoreState>(
        meta3dState,
        engineCoreExtensionName,
    ), engineCoreExtensionName, "render")

}