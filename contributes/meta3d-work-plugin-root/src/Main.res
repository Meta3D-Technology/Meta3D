let _getExecFunc = (_pipelineName: string, jobName: string) => {
  switch jobName {
  | "init_root_meta3d" => InitJob.execFunc
  | "update_root_meta3d" => UpdateJob.execFunc
  | "render_root_meta3d" => RenderJob.execFunc
  | _ => Js.Nullable.null->Obj.magic
  }
}

let _init = _state => {
  ()
}

let getContribute: Meta3dType.Index.getContribute<
  Meta3dWorkPluginRootProtocol.DependentMapType.dependentExtensionNameMap,
  Meta3dWorkPluginRootProtocol.DependentMapType.dependentContributeNameMap,
  Meta3dEngineCoreProtocol.StateType.workPluginContribute<Meta3dWorkPluginRootProtocol.StateType.state, Meta3dWorkPluginRootProtocol.StateType.states>,
> = (api, ({meta3dBsMostExtensionName}, _)) => {
  {
    workPluginName: Meta3dWorkPluginRootProtocol.StateType. workPluginName,
    createStateFunc: (meta3dState): Meta3dWorkPluginRootProtocol.StateType.state => {
  let mostService: Meta3dBsMostProtocol.ServiceType.service = api.getExtensionService(.
    meta3dState,
    meta3dBsMostExtensionName,
  )

{       mostService , }
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
                is_set_state: true->Js.Nullable.return,
              },
            ],
          },
        ],
        first_group: "first_root_meta3d",
      },
      {
        name: "update",
        groups: [
          {
            name: "first_root_meta3d",
            link: #concat,
            elements: [
              {
                name: "update_root_meta3d",
                type_: #job,
                is_set_state: true->Js.Nullable.return,
              },
            ],
          },
        ],
        first_group: "first_root_meta3d",
      },
      {
        name: "render",
        groups: [
          {
            name: "first_root_meta3d",
            link: #concat,
            elements: [
              {
                name: "render_root_meta3d",
                type_: #job,
                is_set_state: true->Js.Nullable.return,
              },
            ],
          },
        ],
        first_group: "first_root_meta3d",
      },
    ],
  }
}
