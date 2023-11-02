import { Loader, LoadingManager, BufferGeometry } from 'three';

/*! add by meta3d
* 
*/
export function setThreeAPI(threeAPIObj: any): void

export class DRACOLoader extends Loader<BufferGeometry> {
    constructor(manager?: LoadingManager);

    setDecoderPath(path: string): DRACOLoader;
    setDecoderConfig(config: object): DRACOLoader;
    setWorkerLimit(workerLimit: number): DRACOLoader;

    load(
        url: string,
        onLoad?: (data: BufferGeometry) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (err: unknown) => void,
    ): void;

    preload(): DRACOLoader;
    dispose(): DRACOLoader;
}
