open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let _getVisualExtensionName = () => "meta3d-ui-view-visual"

  let _getVisualExtensionVersion = () => "0.5.0"

  let _getVisualExtension = (service, (setIsLoaded, setVisualExtensionData)) => {
    service.backend.getAllPublishExtensions(.
      _getVisualExtensionName(),
      _getVisualExtensionVersion(),
    )->Meta3dBsMost.Most.map(data => {
      data->Meta3dCommonlib.ArraySt.map((
        {id, file, version, username}: FrontendUtils.BackendCloudbaseType.implement,
      ) => {
        Meta3d.Main.loadExtension(file)
      })
    }, _)
  }

  let _buildExtension = (name, data): FrontendUtils.ApViewStoreType.extension => {
    id: "",
    protocolIconBase64: "",
    newName: name->Some,
    isStart: false,
    data: data,
  }

  let _buildApp = (service, (selectedExtensions, selectedContributes), visualExtensionData) => {
    service.meta3d.loadApp(.
      AppUtils.generateApp(
        service,
        selectedExtensions->Meta3dCommonlib.ArraySt.push(
          _buildExtension(_getVisualExtensionName(), visualExtensionData),
        ),
        selectedContributes,
      ),
    )->Meta3dCommonlib.Tuple2.getFirst
  }

  let initOnce = (
    service,
    (setIsLoaded, setVisualExtensionData, setMeta3dState),
    (selectedExtensions, selectedContributes),
  ) => {
    _getVisualExtension(service, (setIsLoaded, setVisualExtensionData))
    ->Meta3dBsMost.Most.observe(allVisualExtensionData => {
      setIsLoaded(_ => true)

      let visualExtensionData = allVisualExtensionData[0]

      setMeta3dState(_ =>
        _buildApp(
          service,
          (
            selectedExtensions->Meta3dCommonlib.ListSt.toArray,
            selectedContributes->Meta3dCommonlib.ListSt.toArray,
          ),
          visualExtensionData,
        )->Some
      )

      setVisualExtensionData(_ => visualExtensionData->Some)
    }, _)
    ->Js.Promise.catch(e => {
      setIsLoaded(_ => false)

      FrontendUtils.ErrorUtils.error(e->Obj.magic, None)->Obj.magic
    }, _)
  }

  let _initApp = (meta3dState, service, data) => {
    service.meta3d.initExtension(. meta3dState, _getVisualExtensionName(), data)
  }

  let _updateApp = (meta3dState, service, data) => {
    service.meta3d.updateExtension(. meta3dState, _getVisualExtensionName(), data)
  }

  let handleWhenCanvasDataChange = (service, setMeta3dState, meta3dState) => {
    switch meta3dState {
    | Some(meta3dState) =>
      Meta3dBsMost.Most.fromPromise(
        _initApp(
          meta3dState,
          service,
          {
            "isDebug": true,
            "canvas": DomExtend.querySelector(
              DomExtend.document,
              "#ui-visual-canvas",
            )->Meta3dCommonlib.OptionSt.getExn,
          }->Obj.magic,
        ),
      )
      ->Meta3dBsMost.Most.flatMap(meta3dState => {
        meta3dState->_updateApp(service, Obj.magic(1))->Meta3dBsMost.Most.fromPromise
      }, _)
      ->Meta3dBsMost.Most.observe(meta3dState => {
        setMeta3dState(_ => meta3dState->Some)
      }, _)
    }->ignore
  }

  let useSelector = (
    {canvasData, selectedExtensions, selectedContributes}: FrontendUtils.ApViewStoreType.state,
  ) => {
    (canvasData, selectedExtensions, selectedContributes)
  }
}

@react.component
let make = (~service: service) => {
  let (canvasData, selectedExtensions, selectedContributes) = ReduxUtils.ApView.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )

  let (isLoaded, setIsLoaded) = service.react.useState(_ => false)
  let (visualExtensionData, setVisualExtensionData) = service.react.useState(_ => None)
  let (meta3dState, setMeta3dState) = service.react.useState(_ => None)

  service.react.useEffect1(. () => {
    Method.initOnce(
      service,
      (setIsLoaded, setVisualExtensionData, setMeta3dState),
      (selectedExtensions, selectedContributes),
    )->ignore

    None
  }, [])

  service.react.useEffect1(. () => {
    Method.handleWhenCanvasDataChange(service, setMeta3dState, meta3dState)

    None
  }, [canvasData])

  <>
    <canvas
      id="ui-visual-canvas"
      style={ReactDOM.Style.make(
        ~borderStyle="solid",
        ~borderColor="red",
        ~borderWidth="2px",
        ~width={j`${canvasData.width->Js.Int.toString}px`},
        ~height={j`${canvasData.height->Js.Int.toString}px`},
        (),
      )}
      width={j`${canvasData.width->Js.Int.toString}px`}
      height={j`${canvasData.height->Js.Int.toString}px`}
    />
  </>
}
