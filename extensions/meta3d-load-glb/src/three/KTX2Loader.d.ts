import { LoadingManager, CompressedTextureLoader, CompressedTexture, WebGLRenderer } from 'three';
// import WebGPURenderer from '../renderers/webgpu/WebGPURenderer.js';

/*! add by meta3d
* 
*/
export function setThreeAPI(threeAPIObj: any): void



export class KTX2Loader extends CompressedTextureLoader {
    constructor(manager?: LoadingManager);

    setTranscoderPath(path: string): KTX2Loader;
    setWorkerLimit(limit: number): KTX2Loader;
    // detectSupport(renderer: WebGLRenderer | WebGPURenderer): KTX2Loader;
    detectSupport(renderer: WebGLRenderer ): KTX2Loader;
    dispose(): KTX2Loader;

    parse(
        buffer: ArrayBuffer,
        onLoad: (texture: CompressedTexture) => void,
        onError?: (event: ErrorEvent) => void,
    ): KTX2Loader;
}
