type jobName = string

// @genType.import(("most", "Stream"))
type stream<'a> = Meta3dBsMostProtocol.StreamType.stream<'a>
// type stream<'a> = Meta3dBsMostProtocol.StreamType.stream<'a>

type execFunc<'states> = 'states => stream<'states>

// @genType
type getExecFunc<'states> = (PipelineType.pipelineName, jobName) => Js.Nullable.t<execFunc<'states>>

// @genType
type pipelineData = PipelineType.pipelineData

// @genType
type createStateFunc<'state> = unit => 'state

// @genType
type initFunc<'state> = 'state => unit

type workPluginName = string

type allPipelineData = array<pipelineData>

// @genType
type workPluginContribute<'state, 'states> = {
  workPluginName: workPluginName,
  createStateFunc: createStateFunc<'state>,
  initFunc: initFunc<'state>,
  getExecFunc: getExecFunc<'states>,
  allPipelineData: allPipelineData,
}

// @genType
type getWorkPluginContribute<'state, 'config, 'states> = 'config => workPluginContribute<
  'state,
  'states,
>
