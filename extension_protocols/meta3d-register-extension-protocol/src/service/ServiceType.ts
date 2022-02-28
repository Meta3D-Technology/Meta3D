import { state as meta3dState } from "meta3d-type/src/Index"

export type service = {
    readonly register: (
        meta3dState: meta3dState,
    ) => Promise<meta3dState>;
};
