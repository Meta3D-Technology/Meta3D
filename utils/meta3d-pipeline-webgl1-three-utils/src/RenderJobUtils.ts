import { api, state as meta3dState } from "meta3d-type"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { setSizeAndViewport } from "./SetSizeAndViewportUtils"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import type { WebGLRenderer, PerspectiveCamera, Scene } from "three"
import { EffectComposer, setThreeAPI } from "./three/EffectComposer"
import { RenderPass } from "./three/RenderPass"
import { service as threeAPIService } from "meta3d-three-api-protocol/src/service/ServiceType"

export let createComposerAndRenderTarget = (threeAPIService: threeAPIService, renderer: WebGLRenderer, [viewWidth, viewHeight]: [number, number]) => {
    let renderTarget = new threeAPIService.WebGLRenderTarget(viewWidth, viewHeight, { type: threeAPIService.HalfFloatType, depthTexture: new (threeAPIService.DepthTexture as any)() });

    setThreeAPI(threeAPIService)

    let composer = new EffectComposer(renderer, renderTarget);

    let renderModel = new RenderPass(null as any, null as any);

    composer.renderToScreen = false

    renderModel.clearColor = new threeAPIService.Color(0x9C9C9C)
    renderModel.clearAlpha = 1.0

    composer.addPass(renderModel)

    return [composer, renderModel]
}

export let render = (
    meta3dState: meta3dState,
    getViewRect: any,
    api: api,
    scene: Scene,
    perspectiveCamera: PerspectiveCamera,
    canvas: HTMLCanvasElement,
    renderer: WebGLRenderer,
    composer: any,
    renderPass: any,
    textureID: string
) => {
    let uiService = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")
    let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

    setSizeAndViewport(renderer, composer, getExn(getViewRect(
        uiService,
        uiState
    )), canvas)


    // renderer.autoClear = false;

    renderPass.scene = scene
    renderPass.camera = perspectiveCamera

    composer.render()


    let webglTexture = renderer.properties.get(composer.renderTarget2.texture).__webglTexture

    if (!isNullable(webglTexture)) {
        uiState = uiService.setFBOTexture(uiState, textureID, getExn(webglTexture))

        meta3dState = api.setExtensionState<uiState>(meta3dState, "meta3d-ui-protocol", uiState)
    }


    return meta3dState
}