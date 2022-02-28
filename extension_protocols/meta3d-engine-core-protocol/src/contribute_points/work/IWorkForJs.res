type jobName = string

// @genType.import(("most", "Stream"))
type stream<'a> = Meta3dBsMostProtocol.StreamType.stream<'a>
// type stream<'a> = Meta3dBsMostProtocol.StreamType.stream<'a>

type elementFunc<'states> = 'states => stream<'states>

// @genType
type getElementFunc<'states> = (PipelineType.pipelineName, jobName) => Js.Nullable.t<elementFunc<'states>>

// @genType
type pipelineData = PipelineType.pipelineData

// @genType
type createStateFunc<'state> = unit => 'state

// @genType
type initFunc<'state> = 'state => unit

type pluginName = string

type allPipelineData = array<pipelineData>

// @genType
type workPluginContribute<'state, 'states> = {
  pluginName: pluginName,
  createStateFunc: createStateFunc<'state>,
  initFunc: initFunc<'state>,
  getElementFunc: getElementFunc<'states>,
  allPipelineData: allPipelineData,
}

// @genType
type getWorkPluginContribute<'state, 'config, 'states> = 'config => workPluginContribute<
  'state,
  'states,
>
