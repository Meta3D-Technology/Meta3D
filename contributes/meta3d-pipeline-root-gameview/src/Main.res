let _getExecFunc = (_pipelineName: string, jobName: string) => {
  open Meta3dPipelineRootGameviewProtocol.StateType

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
  Meta3dEngineCoreGameviewProtocol.StateType.pipelineContribute<
    Meta3dPipelineRootGameviewProtocol.ConfigType.config,
    Meta3dPipelineRootGameviewProtocol.StateType.state,
  >,
> = api => {
  {
    pipelineName: Meta3dPipelineRootGameviewProtocol.StateType.pipelineName,
    createStateFunc: (meta3dState, _): Meta3dPipelineRootGameviewProtocol.StateType.state => {
      let mostService: Meta3dBsMostProtocol.ServiceType.service = api.getExtensionService(.
        meta3dState,
        "meta3d-bs-most-protocol",
      )

      {mostService: mostService}
    },
    initFunc: _init,
    getExecFunc: _getExecFunc->Obj.magic,
    allPipelineData: Meta3dPipelineRootGameviewProtocol.StateType.allPipelineData,
    restoreFunc: Js.Nullable.null,
    deepCopyFunc: Js.Nullable.null,
  }
}
