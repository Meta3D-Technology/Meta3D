import { state as meta3dState } from "meta3d-type"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as converterService } from "meta3d-scenegraph-converter-three-sceneview-protocol/src/service/ServiceType"
import { service as threeAPIService } from "meta3d-three-api-protocol/src/service/ServiceType"

export let init = <converterService_ extends converterService>(meta3dState: meta3dState, [converterService, threeAPIService, uiService]: [converterService_, threeAPIService, uiService], canvas: HTMLCanvasElement) => {
    meta3dState = converterService.init(meta3dState)


    let renderer = new threeAPIService.WebGLRenderer({
        antialias: true,
        /*! clone canvas to avoid change canvas by three.js
        e.g. change canvas.width when invoke WebGLRenderer->setSize
        */
        canvas: canvas.cloneNode(),
        context: uiService.getContext(meta3dState)
    })

    // renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(canvas.width, canvas.height);
    // document.body.appendChild(renderer.domElement);
    renderer.setClearColor(new threeAPIService.Color(0x9C9C9C))
    renderer.setClearAlpha(1.0)

    return [meta3dState, renderer]
}
