import { state as meta3dState } from "meta3d-type"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as converterService } from "meta3d-scenegraph-converter-three-sceneview-protocol/src/service/ServiceType"
import { service as threeAPIService } from "meta3d-three-api-protocol/src/service/ServiceType"

export let init = <converterService_ extends converterService>(meta3dState: meta3dState, [converterService, threeAPIService, uiService]: [converterService_, threeAPIService, uiService], canvas: HTMLCanvasElement) => {
    meta3dState = converterService.init(meta3dState)


    let renderer = new threeAPIService.WebGLRenderer({
        antialias: true,
        canvas: canvas,
        context: uiService.getContext(meta3dState)
    })

    // renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(canvas.width, canvas.height);
    // document.body.appendChild(renderer.domElement);
    renderer.setClearAlpha(1.0)

    return [meta3dState, renderer]
}
