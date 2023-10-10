import type { material as StateType_material } from '../.././src/state/StateType';

import type { state as StateType_state } from '../.././src/state/StateType';

import type { textureDataType as StateType_textureDataType } from '../.././src/state/StateType';

import type { texture as StateType_texture } from '../.././src/state/StateType';

import type { wrap as StateType_wrap } from '../.././src/state/StateType';

import type { filter as StateType_filter } from '../.././src/state/StateType';

import type { format as StateType_format } from '../.././src/state/StateType';

import type { htmlImageElement } from '../.././src/state/StateType';

// tslint:disable-next-line:interface-over-type-literal
export type service = {
    readonly createTexture: (_1: StateType_state) => [StateType_state, StateType_texture];
    readonly disposeTexture: (_1: StateType_state, _2: StateType_texture, _3: StateType_material) => StateType_state;
    readonly addMaterial: (_1: StateType_state, _2: StateType_texture, _3: StateType_material) => StateType_state;
    readonly getWrapS: (_1: StateType_state, _2: StateType_texture) => StateType_wrap;
    readonly setWrapS: (_1: StateType_state, _2: StateType_texture, _3: StateType_wrap) => StateType_state;
    readonly getWrapT: (_1: StateType_state, _2: StateType_texture) => StateType_wrap;
    readonly setWrapT: (_1: StateType_state, _2: StateType_texture, _3: StateType_wrap) => StateType_state;
    readonly getMagFilter: (_1: StateType_state, _2: StateType_texture) => StateType_filter;
    readonly setMagFilter: (_1: StateType_state, _2: StateType_texture, _3: StateType_filter) => StateType_state;
    readonly getMinFilter: (_1: StateType_state, _2: StateType_texture) => StateType_filter;
    readonly setMinFilter: (_1: StateType_state, _2: StateType_texture, _3: StateType_filter) => StateType_state;
    readonly getFormat: (_1: StateType_state, _2: StateType_texture) => StateType_format;
    readonly setFormat: (_1: StateType_state, _2: StateType_texture, _3: StateType_format) => StateType_state;
    readonly getType: (_1: StateType_state, _2: StateType_texture) => StateType_textureDataType;
    readonly setType: (_1: StateType_state, _2: StateType_texture, _3: StateType_textureDataType) => StateType_state;
    readonly getIsNeedUpdate: (_1: StateType_state, _2: StateType_texture) => boolean;
    readonly setIsNeedUpdate: (_1: StateType_state, _2: StateType_texture, _3: boolean) => StateType_state;
    readonly getFlipY: (_1: StateType_state, _2: StateType_texture) => boolean;
    readonly setFlipY: (_1: StateType_state, _2: StateType_texture, _3: boolean) => StateType_state;
    readonly getImage: (_1: StateType_state, _2: StateType_texture) => htmlImageElement;
    readonly setImage: (_1: StateType_state, _2: StateType_texture, _3: htmlImageElement) => StateType_state
};
