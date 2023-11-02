import type { ShaderMaterial } from 'three';

import { Pass, FullScreenQuad } from './Pass';

/*! add by meta3d
* 
*/
export function setThreeAPI(threeAPIObj: any): void


export class ShaderPass extends Pass {
    constructor(shader: object, textureID?: string);
    textureID: string;
    uniforms: { [name: string]: { value: any } };
    material: ShaderMaterial;
    fsQuad: FullScreenQuad;
}
