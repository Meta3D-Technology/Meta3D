open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let _getVisualExtensionName = () => "meta3d-ui-view-visual"

  let _getVisualExtensionProtocolName = () => "meta3d-ui-view-visual-protocol"

  let _getVisualExtensionProtocolVersion = () => "0.5.4"

  let _getVisualExtensionVersion = () => "0.5.5"

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
    ->Meta3dBsMost.Most.map(dataArr => {
      (
        dataArr->Meta3dCommonlib.ArraySt.filter((
          {version}: FrontendUtils.BackendCloudbaseType.implement,
        ) => {
          version == _getVisualExtensionVersion()
        })
      )[0]
    }, _)
    ->Meta3dBsMost.Most.map((data: FrontendUtils.BackendCloudbaseType.implement) => {
      _loadAndBuildVisualExtension(data.file)
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

  let _buildApp = (
    service,
    (selectedExtensions, selectedContributes),
    (visualExtension, elementContribute),
  ) => {
    service.meta3d.loadApp(.
      AppUtils.generateApp(
        service,
        selectedExtensions->Meta3dCommonlib.ArraySt.push(visualExtension),
        selectedContributes->Meta3dCommonlib.ArraySt.push(elementContribute),
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
    (visualExtension, elementContribute),
  ) => {
    _buildApp(
      service,
      (
        selectedExtensions->Meta3dCommonlib.ListSt.toArray,
        selectedContributes->Meta3dCommonlib.ListSt.toArray,
      ),
      (visualExtension, elementContribute),
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

  let _getElementContributeName = () => "meta3d-ui-view-element"

  let _getElementContributeProtocolName = () => "meta3d-ui-view-element-protocol"

  let _getElementContributeProtocolVersion = () => "0.5.1"

  let buildElementContributeFileStr = selectedUIControls => {
    ElementMRUtils.buildElementMR(
      selectedUIControls->Meta3dCommonlib.ListSt.toArray,
    )->ElementMRUtils.generateElementContributeFileStr
  }

  let _buildContribute = (name, data): FrontendUtils.ApViewStoreType.contribute => {
    id: "",
    protocolIconBase64: "",
    newName: name->Some,
    data: data,
  }

  let generateElementContribute = (service, fileStr) => {
    service.meta3d.generateContribute(.
      (
        {
          name: _getElementContributeName(),
          protocol: {
            name: _getElementContributeProtocolName(),
            version: _getElementContributeProtocolVersion(),
          },
          dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
            "meta3dUIExtensionName",
            (
              {
                protocolName: "meta3d-ui-protocol",
                protocolVersion: "^0.5.0",
              }: Meta3d.ExtensionFileType.dependentData
            ),
          ),
          dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
        }: Meta3d.ExtensionFileType.contributePackageData
      ),
      fileStr,
    )
    ->service.meta3d.loadContribute(. _)
    ->_buildContribute(_getElementContributeName(), _)
  }

  let updateElementContribute = (dispatch, elementContribute) => {
    dispatch(FrontendUtils.UIViewStoreType.SetElementContribute(elementContribute))
  }

  let useSelector = ({apViewState, uiViewState}: FrontendUtils.AssembleSpaceStoreType.state) => {
    let {canvasData, selectedExtensions, selectedContributes} = apViewState
    let {selectedUIControls, visualExtension, elementContribute} = uiViewState

    (
      (canvasData, selectedExtensions, selectedContributes),
      (selectedUIControls, visualExtension, elementContribute),
    )
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.UIView.useDispatch(service.react.useDispatch)

  let (
    (canvasData, selectedExtensions, selectedContributes),
    (selectedUIControls, visualExtension, elementContribute),
  ) = service.react.useSelector(Method.useSelector)

  service.react.useEffect1(. () => {
    switch visualExtension {
    | Some(_) => ()
    | None => Method.getAndSetVisualExtension(service, dispatch)->ignore
    }

    None
  }, [])

  service.react.useEffect1(. () => {
    selectedUIControls->Meta3dCommonlib.ListSt.length > 0
      ? Method.generateElementContribute(
          service,
          Method.buildElementContributeFileStr(selectedUIControls),
        )->Method.updateElementContribute(dispatch, _)
      : ()

    None
  }, [selectedUIControls])

  service.react.useEffect1(. () => {
    switch (visualExtension, elementContribute) {
    | (Some(visualExtension), Some(elementContribute)) =>
      FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
        Method.renderApp(
          service,
          (selectedExtensions, selectedContributes),
          Method.getInitData(),
          (visualExtension, elementContribute),
        )->ignore
      }, 5->Some)
    | _ => ()
    }

    None
  }, [elementContribute])

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
