open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let _getVisualExtensionName = () => "meta3d-ui-view-visual"

  let _getVisualExtensionProtocolName = () => "meta3d-ui-view-visual-protocol"

  let _getVisualExtensionProtocolVersion = () => "0.5.0"

  let _buildExtension = (name, data): FrontendUtils.ApViewStoreType.extension => {
    id: "",
    protocolIconBase64: "",
    newName: name->Some,
    isStart: false,
    data: data,
  }

  let _loadAndBuildVisualExtension = file => {
    Meta3d.Main.loadExtension(file)->_buildExtension(_getVisualExtensionName(), _)
  }

  let getAndSetVisualExtension = (service, dispatch) => {
    service.backend.getAllPublishExtensions(.
      _getVisualExtensionProtocolName(),
      _getVisualExtensionProtocolVersion(),
    )
    ->Meta3dBsMost.Most.map(initData => {
      initData->Meta3dCommonlib.ArraySt.map((
        {id, file, version, username}: FrontendUtils.BackendCloudbaseType.implement,
      ) => {
        _loadAndBuildVisualExtension(file)
      })
    }, _)
    ->Meta3dBsMost.Most.map(dataArr => {
      dataArr[0]
    }, _)
    ->Meta3dBsMost.Most.observe(extension => {
      dispatch(FrontendUtils.UIViewStoreType.SetVisualExtension(extension))
    }, _)
    ->Js.Promise.catch(e => {
      service.console.error(.
        e->Obj.magic->Js.Exn.message->Meta3dCommonlib.OptionSt.getExn->Obj.magic,
        None,
      )->Obj.magic
    }, _)
  }

  let _buildApp = (service, (selectedExtensions, selectedContributes), visualExtension) => {
    service.meta3d.loadApp(.
      AppUtils.generateApp(
        service,
        selectedExtensions->Meta3dCommonlib.ArraySt.push(visualExtension),
        selectedContributes,
      ),
    )->Meta3dCommonlib.Tuple2.getFirst
  }

  let _initApp = (meta3dState, service, initData) => {
    service.meta3d.initExtension(. meta3dState, _getVisualExtensionName(), initData)
  }

  let _updateApp = (meta3dState, service, initData) => {
    service.meta3d.updateExtension(. meta3dState, _getVisualExtensionName(), initData)
  }

  let _initAndUpdateApp = (meta3dState, service, initData) => {
    Meta3dBsMost.Most.fromPromise(
      _initApp(meta3dState, service, initData),
    )->Meta3dBsMost.Most.flatMap(meta3dState => {
      meta3dState->_updateApp(service, Obj.magic(1))->Meta3dBsMost.Most.fromPromise
    }, _)
  }

  let renderApp = (
    service,
    (selectedExtensions, selectedContributes),
    initData,
    visualExtension,
  ) => {
    _buildApp(
      service,
      (
        selectedExtensions->Meta3dCommonlib.ListSt.toArray,
        selectedContributes->Meta3dCommonlib.ListSt.toArray,
      ),
      visualExtension,
    )
    ->_initAndUpdateApp(service, initData)
    ->Meta3dBsMost.Most.drain
    ->Js.Promise.catch(e => {
      service.console.error(.
        e->Obj.magic->Js.Exn.message->Meta3dCommonlib.OptionSt.getExn->Obj.magic,
        None,
      )->Obj.magic
    }, _)
  }

  let getInitData = () => {
    {
      "isDebug": true,
      "canvas": DomExtend.querySelector(
        DomExtend.document,
        "#ui-visual-canvas",
      )->Meta3dCommonlib.OptionSt.getExn,
    }->Obj.magic
  }

  let isLoaded = visualExtension => {
    visualExtension->Meta3dCommonlib.OptionSt.isSome
  }

  let useSelector = ({apViewState, uiViewState}: FrontendUtils.AssembleSpaceStoreType.state) => {
    let {canvasData, selectedExtensions, selectedContributes} = apViewState
    let {visualExtension} = uiViewState

    (canvasData, selectedExtensions, selectedContributes, visualExtension)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.UIView.useDispatch(service.react.useDispatch)

  let (
    canvasData,
    selectedExtensions,
    selectedContributes,
    visualExtension,
  ) = service.react.useSelector(Method.useSelector)

  service.react.useEffect1(. () => {
    switch visualExtension {
    | Some(_) => ()
    | None => Method.getAndSetVisualExtension(service, dispatch)->ignore
    }

    None
  }, [])

  service.react.useEffect1(. () => {
    switch visualExtension {
    | Some(visualExtension) => FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
        Method.renderApp(
          service,
          (selectedExtensions, selectedContributes),
          Method.getInitData(),
          visualExtension,
        )->ignore
      }, 5->Some)

    | None => ()
    }

    None
  }, [])

  !Method.isLoaded(visualExtension)
    ? <p> {React.string(`loading...`)} </p>
    : <canvas
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
}
