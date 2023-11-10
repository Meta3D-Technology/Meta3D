import { api, state as meta3dState } from "meta3d-type"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { setSizeAndViewport, setSizeAndViewportForEngine } from "./SetSizeAndViewportUtils"
// import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
// import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import type { WebGLRenderer, PerspectiveCamera, Scene } from "three"
import { EffectComposer, setThreeAPI } from "./three/EffectComposer"
import { RenderPass } from "./three/RenderPass"
import { service as threeAPIService } from "meta3d-three-api-protocol/src/service/ServiceType"
import { ShaderPass } from "./three/ShaderPass"
import { GammaCorrectionShader } from "./three/GammaCorrectionShader"
import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"

let _createComposerAndRenderTarget = (threeAPIService: threeAPIService, renderer: WebGLRenderer, [viewWidth, viewHeight]: [number, number], renderToScreen: boolean): [EffectComposer, RenderPass] => {
    /*! "colorSpace: threeAPIService.SRGBColorSpace" not work! it equal NoColorSpace, so use the latter directly here
    
    let renderTarget = new threeAPIService.WebGLRenderTarget(viewWidth, viewHeight, { type: threeAPIService.HalfFloatType, depthTexture: new (threeAPIService.DepthTexture as any)(), colorSpace: threeAPIService.SRGBColorSpace });
    */
    let renderTarget = new threeAPIService.WebGLRenderTarget(viewWidth, viewHeight, { type: threeAPIService.HalfFloatType, depthTexture: new (threeAPIService.DepthTexture as any)(), colorSpace: threeAPIService.NoColorSpace });

    setThreeAPI(threeAPIService)

    let composer = new EffectComposer(renderer, renderTarget);

    let renderModel = new RenderPass(null as any, null as any);

    composer.renderToScreen = renderToScreen

    renderModel.clearColor = new threeAPIService.Color(0x9C9C9C)
    renderModel.clearAlpha = 1.0

    composer.addPass(renderModel)

    return [composer, renderModel]
}

export let createComposerAndRenderTarget = (threeAPIService: threeAPIService, renderer: WebGLRenderer, viewSize: [number, number]) => {
    let [composer, renderModel] = _createComposerAndRenderTarget(threeAPIService, renderer, viewSize, false)

    /*! because set renderTarget->colorSpace not work, so need use gamma correction here
    */
    let gammaCorrection = new ShaderPass(GammaCorrectionShader)
    gammaCorrection.needsSwap = false
    composer.addPass(gammaCorrection)


    /*! clear color after gamma is increased! should restore it correctly */
    renderModel.clearColor = new threeAPIService.Color(0x595959)

    return [composer, renderModel]
}

export let createComposerAndRenderTargetForEngine = (threeAPIService: threeAPIService, renderer: WebGLRenderer, viewSize: [number, number]) => {
    return _createComposerAndRenderTarget(threeAPIService, renderer, viewSize, true)
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
    // let uiService = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")
    // let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

    // setSizeAndViewport(renderer, composer, getExn(getViewRect(
    //     uiService,
    //     uiState
    // )), canvas)

    setSizeAndViewport(renderer, composer, getExn(getViewRect(
        meta3dState
    )), canvas)

    // renderer.autoClear = false;

    renderPass.scene = scene
    renderPass.camera = perspectiveCamera

    composer.render()


    /*! use gammaCorrection pass which set to write buffer(render target1) while render pass which set to read buffer(render target2) */
    // let webglTexture = renderer.properties.get(composer.renderTarget2.texture).__webglTexture
    let webglTexture = renderer.properties.get(composer.renderTarget1.texture).__webglTexture

    if (!isNullable(webglTexture)) {
        // uiState = uiService.setFBOTexture(uiState, textureID, getExn(webglTexture))

        // meta3dState = api.setExtensionState<uiState>(meta3dState, "meta3d-ui-protocol", uiState)


        let editorWholeService = api.getExtensionService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")

        meta3dState = editorWholeService.ui(meta3dState).setFBOTexture(meta3dState, textureID, getExn(webglTexture))
    }


    return meta3dState
}

export let renderForEngine = (
    meta3dState: meta3dState,
    scene: Scene,
    perspectiveCamera: PerspectiveCamera,
    composer: any,
    renderPass: any,
) => {
    // renderer.autoClear = false;

    renderPass.scene = scene
    renderPass.camera = perspectiveCamera

    composer.render()

    return meta3dState
}