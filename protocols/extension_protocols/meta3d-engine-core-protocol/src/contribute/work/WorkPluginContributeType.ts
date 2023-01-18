import type { stream as Meta3dBsMostProtocol_StreamType_stream } from 'meta3d-bs-most-protocol/src/service/StreamType.gen';
import { state as meta3dState } from "meta3d-type"

import type { pipelineData as PipelineType_pipelineData } from '../../state/PipelineType';

import type { pipelineName as PipelineType_pipelineName } from '../../state/PipelineType';

import { operateStatesFuncs } from "../../state/StateType"

// tslint:disable-next-line:interface-over-type-literal
export type jobName = string;

// tslint:disable-next-line:interface-over-type-literal
export type stream<a> = Meta3dBsMostProtocol_StreamType_stream<a>;

// tslint:disable-next-line:interface-over-type-literal
export type execFunc = (_1: meta3dState, _2: operateStatesFuncs) => stream<meta3dState>;

// tslint:disable-next-line:interface-over-type-literal
export type getExecFunc = (_1: PipelineType_pipelineName, _2: jobName) => (null | undefined | execFunc);

// tslint:disable-next-line:interface-over-type-literal
export type pipelineData = PipelineType_pipelineData;

// tslint:disable-next-line:interface-over-type-literal
// export type createStateFunc<state> = () => state;
// export type createStateFunc<config, state> = (meta3dState: meta3dState, config: nullable<config>) => state
export type createStateFunc<config, state> = (meta3dState: meta3dState, config: config) => state

// tslint:disable-next-line:interface-over-type-literal
export type initFunc<state> = (_1: state) => void;

// tslint:disable-next-line:interface-over-type-literal
export type workPluginName = string;

// tslint:disable-next-line:interface-over-type-literal
export type allPipelineData = pipelineData[];

// tslint:disable-next-line:interface-over-type-literal
export type workPluginContribute<config, state> = {
    readonly workPluginName: workPluginName;
    readonly createStateFunc: createStateFunc<config, state>;
    readonly initFunc: initFunc<state>;
    readonly getExecFunc: getExecFunc;
    readonly allPipelineData: allPipelineData
};

// tslint:disable-next-line:interface-over-type-literal
// export type getWorkPluginContribute<state, config, states> = (_1: config) => workPluginContribute<state, states>;
