open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let _getVisualExtensionName = () => "meta3d-ui-view-visual"

  let _getVisualExtensionVersion = () => "0.5.0"

  let getVisualExtension = (service, (setIsLoaded, setVisualExtensionData)) => {
    service.backend.getAllPublishExtensions(
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

  let buildApp = (service, (selectedExtensions, selectedContributes), visualExtensionData) => {
    AppUtils.generateApp(
      service,
      selectedExtensions->Meta3dCommonlib.ArraySt.push(
        _buildExtension(_getVisualExtensionName(), visualExtensionData),
      ),
      selectedContributes,
    )
    ->service.meta3d.loadApp(. _)
    ->Meta3dCommonlib.Tuple2.getFirst
  }

  let initVisual = (meta3dState, service, data) => {
    service.meta3d.initExtension(. meta3dState, _getVisualExtensionName(), data)
  }

  let updateVisual = (meta3dState, service) => {
    service.meta3d.updateExtension(. meta3dState, _getVisualExtensionName(), Obj.magic(1))
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

  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (visualExtensionData, setVisualExtensionData) = React.useState(_ => None)
  let (meta3dState, setMeta3dState) = React.useState(_ => None)

  React.useEffect1(() => {
    Method.getVisualExtension(service, (setIsLoaded, setVisualExtensionData))
    ->Meta3dBsMost.Most.observe(allVisualExtensionData => {
      setIsLoaded(_ => true)

      let visualExtensionData = allVisualExtensionData[0]

      setMeta3dState(_ =>
        Method.buildApp(
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
    ->ignore

    None
  }, [])

  React.useEffect1(() => {
    switch meta3dState {
    | Some(meta3dState) =>
      Meta3dBsMost.Most.fromPromise(
        Method.initVisual(
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
        meta3dState->Method.updateVisual(service)->Meta3dBsMost.Most.fromPromise
      }, _)
      ->Meta3dBsMost.Most.observe(meta3dState => {
        setMeta3dState(_ => meta3dState->Some)
      }, _)
    }->ignore

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
