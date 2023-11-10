import type { Scene, Camera, Material, Color } from 'three';

import { Pass } from './Pass';

/*! add by meta3d
* 
*/
export function setThreeAPI(threeAPIObj: any): void


export class RenderPass extends Pass {
    constructor(
        scene: Scene,
        camera: Camera,
        overrideMaterial?: Material | null,
        clearColor?: Color | null,
        clearAlpha?: number | null,
    );

    scene: Scene;
    camera: Camera;

    overrideMaterial: Material | null;

    clearColor: Color | null;
    clearAlpha: number | null;

    clearDepth: boolean;
}
