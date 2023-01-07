import type { t as Meta3dCommonlibType_ImmutableHashMapType_t } from 'meta3d-commonlib-type/src/structure/hash_map/ImmutableHashMapType.gen';

import type { workPluginName as WorkPluginContributeType_pluginName } from '../../src/contribute/work/WorkPluginContributeType';

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class state { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type states = Meta3dCommonlibType_ImmutableHashMapType_t<WorkPluginContributeType_pluginName, state>;

export type config = any