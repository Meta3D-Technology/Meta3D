import type { t as Meta3dCommonlibType_ImmutableHashMapType_t } from 'meta3d-commonlib-type/src/structure/hash_map/ImmutableHashMapType.gen';

import type { pipelineName as PipelineContributeType_pipelineName } from '../contribute/work/PipelineContributeType';

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class state { protected opaque: any } /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type states = Meta3dCommonlibType_ImmutableHashMapType_t<PipelineContributeType_pipelineName, state>;

export type config = any