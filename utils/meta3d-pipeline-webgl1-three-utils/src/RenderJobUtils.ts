import { rect } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import type { WebGLRenderer } from "three"

export let setSizeAndViewport = (renderer: WebGLRenderer, viewRect: rect, canvas: HTMLCanvasElement) => {
    /*! only want to set WebGLRenderer.js->_width, _height */
    renderer.setSize(viewRect.width, viewRect.height)

    renderer.setViewport(viewRect.x, canvas.height - viewRect.y - viewRect.height, viewRect.width, viewRect.height)
    renderer.setScissorTest(true)
    renderer.setScissor(viewRect.x, canvas.height - viewRect.y - viewRect.height, viewRect.width, viewRect.height)
}