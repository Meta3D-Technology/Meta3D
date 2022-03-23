// type jobName = string

// // @genType.import(("most", "Stream"))
// type stream<'a> = Meta3dBsMostProtocol.StreamType.stream<'a>
// // type stream<'a> = Meta3dBsMostProtocol.StreamType.stream<'a>

// // type execFunc<'state> = 'state => stream<'state>
// type execFunc<'state> = StateType.state => stream<StateType.state>

// // @genType
// type getExecFunc<'state> = (PipelineType.pipelineName, jobName) => Js.Nullable.t<execFunc<'state>>

// // @genType
// type pipelineData = PipelineType.pipelineData

// // @genType
// type createStateFunc<'state> = unit => 'state

// // @genType
// type initFunc<'state> = 'state => unit

// type workPluginName = string

// type allPipelineData = array<pipelineData>

// // @genType
// type workPluginContribute<'state, 'states> = {
//   workPluginName: workPluginName,
//   createStateFunc: createStateFunc<'state>,
//   initFunc: initFunc<'state>,
//   getExecFunc: getExecFunc<'state>,
//   allPipelineData: allPipelineData,
// }

// // @genType
// type getWorkPluginContribute<'state, 'config, 'states> = 'config => workPluginContribute<
//   'state,
//   'states,
// >

// type workPluginContribute<'state, 'states> = StateType.workPluginContribute<'state, 'states>

// type getWorkPluginContribute<'state, 'config, 'states> = StateType.getWorkPluginContribute<'state, 'config, 'states>

type workPluginName = string
