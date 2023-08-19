let _getExecFunc = (_pipelineName: string, jobName: string) => {
  open Meta3dPipelineRootProtocol.StateType

  switch jobName {
  | jobName if jobName == job["Init"] => InitJob.execFunc
  | jobName if jobName == job["Update"] => UpdateJob.execFunc
  | jobName if jobName == job["Render"] => RenderJob.execFunc
  | _ => Js.Nullable.null->Obj.magic
  }
}

let _init = _state => {
  ()
}

let getContribute: Meta3dType.Index.getContribute<
  Meta3dEngineCoreProtocol.StateType.pipelineContribute<
    Meta3dPipelineRootProtocol.ConfigType.config,
    Meta3dPipelineRootProtocol.StateType.state,
  >,
> = api => {
  {
    pipelineName: Meta3dPipelineRootProtocol.StateType.pipelineName,
    createStateFunc: (meta3dState, _): Meta3dPipelineRootProtocol.StateType.state => {
      let mostService: Meta3dBsMostProtocol.ServiceType.service = api.getExtensionService(.
        meta3dState,
        "meta3d-bs-most-protocol",
      )

      {mostService: mostService}
    },
    initFunc: _init,
    getExecFunc: _getExecFunc->Obj.magic,
    allPipelineData: Meta3dPipelineRootProtocol.StateType.allPipelineData,
  }
}
