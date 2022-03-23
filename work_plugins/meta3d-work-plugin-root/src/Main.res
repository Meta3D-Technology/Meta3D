open Meta3dWorkPluginRootProtocol.Index

let _getExecFunc = (_pipelineName: string, jobName: string) => {
  switch jobName {
  | "init_root_meta3d" => InitJob.execFunc
  | _ => Js.Nullable.null->Obj.magic
  }
}

let _init = _state => {
  ()
}

let getWorkPluginContribute: Meta3dEngineCoreProtocol.StateType.getWorkPluginContribute<
  state,
  config,
  states,
> = mostService => {
  {
    workPluginName: workPluginName,
    createStateFunc: (): state => {
      mostService: mostService,
    },
    initFunc: _init,
    getExecFunc: _getExecFunc->Obj.magic,
    allPipelineData: [
      {
        name: "init",
        groups: [
          {
            name: "first_root_meta3d",
            link: #concat,
            elements: [
              {
                name: "init_root_meta3d",
                type_: #job,
              },
            ],
          },
        ],
        first_group: "first_root_meta3d",
      },
    ],
  }
}
