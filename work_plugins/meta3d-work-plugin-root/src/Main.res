open Type

let _getElementFunc = (_pipelineName: string, jobName: string) => {
  switch jobName {
  | "init_root_meta3d" => InitJob.exec
  | _ => Js.Nullable.null->Obj.magic
  }
}

let _init = _state => {
  ()
}

let getWorkPluginContribute: Meta3dEngineCoreProtocol.IWorkForJs.getWorkPluginContribute<
  state,
  config,
  states,
> = mostService => {
  {
    pluginName: "meta3d-work-plugin-root",
    createStateFunc: (): state => {
      mostService: mostService,
    },
    initFunc: _init,
    getElementFunc: _getElementFunc->Obj.magic,
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
