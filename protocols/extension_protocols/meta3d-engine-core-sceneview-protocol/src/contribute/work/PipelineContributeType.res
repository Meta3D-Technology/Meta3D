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

// type pipelineName = string

// type allPipelineData = array<pipelineData>

// // @genType
// type pipelineContribute<'state, 'states> = {
//   pipelineName: pipelineName,
//   createStateFunc: createStateFunc<'state>,
//   initFunc: initFunc<'state>,
//   getExecFunc: getExecFunc<'state>,
//   allPipelineData: allPipelineData,
// }

// // @genType
// type getPipelineContribute<'state, 'config, 'states> = 'config => pipelineContribute<
//   'state,
//   'states,
// >

// type pipelineContribute<'state, 'states> = StateType.pipelineContribute<'state, 'states>

// type getPipelineContribute<'state, 'config, 'states> = StateType.getPipelineContribute<'state, 'config, 'states>

type pipelineName = string
