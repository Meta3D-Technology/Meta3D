let _getAllUIControlData = () => {
  list{
    ("meta3d-ui-control-asset", "meta3d-ui-control-asset-protocol"),
    ("meta3d-ui-control-button", "meta3d-ui-control-button-protocol"),
    ("meta3d-ui-control-collapsing", "meta3d-ui-control-collapsing-protocol"),
    ("meta3d-ui-control-game-view", "meta3d-ui-control-game-view-protocol"),
    ("meta3d-ui-control-image-button", "meta3d-ui-control-image-button-protocol"),
    ("meta3d-ui-control-input-float1", "meta3d-ui-control-input-float1-protocol"),
    ("meta3d-ui-control-input-float3", "meta3d-ui-control-input-float3-protocol"),
    ("meta3d-ui-control-input-text", "meta3d-ui-control-input-text-protocol"),
    ("meta3d-ui-control-checkbox", "meta3d-ui-control-checkbox-protocol"),
    ("meta3d-ui-control-menu", "meta3d-ui-control-menu-protocol"),
    ("meta3d-ui-control-scene-view", "meta3d-ui-control-scene-view-protocol"),
    ("meta3d-ui-control-switch-button", "meta3d-ui-control-switch-button-protocol"),
    ("meta3d-ui-control-tree", "meta3d-ui-control-tree-protocol"),
    ("meta3d-ui-control-window", "meta3d-ui-control-window-protocol"),
    ("meta3d-ui-control-image", "meta3d-ui-control-image-protocol"),
    ("meta3d-ui-control-modal", "meta3d-ui-control-modal-protocol"),
  }
}

let selectAllUIControls = (service: FrontendType.service, dispatch, release) => {
  let version =
    release->Meta3dCommonlib.OptionSt.map(({version}: UserCenterStoreType.release) => version)

  CacheUtils.getAllUIControls(version)->Js.Promise.then_(data => {
    switch data->Meta3dCommonlib.OptionSt.fromNullable {
    | None =>
      _getAllUIControlData()
      ->Meta3dCommonlib.ListSt.traverseReducePromiseM((list{}, list{}), (
        (jsons, files),
        (name, protocolName),
      ) => {
        service.backend.findNewestPublishContribute(. progress => (), name, protocolName)
        ->Meta3dBsMostDefault.Most.map(
          ((
            (description, displayName, repoLink, implementVersion, file, account),
            (protocolVersion, protocolIconBase64, _, _, _),
            protocolConfig,
          )) => {
            (
              (
                (description, displayName, repoLink, implementVersion, account),
                (protocolName, protocolVersion, protocolIconBase64),
                protocolConfig,
              )
              ->Obj.magic
              ->Js.Json.stringify,
              file,
            )
          },
          _,
        )
        ->MostUtils.toPromise
        ->Js.Promise.then_(
          ((json, file)) => {
            (
              jsons->Meta3dCommonlib.ListSt.push(json),
              files->Meta3dCommonlib.ListSt.push(file),
            )->Js.Promise.resolve
          },
          _,
        )
      })
      ->Js.Promise.then_(((jsons, files)) => {
        let jsons = jsons->Meta3dCommonlib.ListSt.toArray
        let files = files->Meta3dCommonlib.ListSt.toArray

        CacheUtils.cacheAllUIControls(version, jsons, files)->Js.Promise.then_(
          _ => (jsons, files)->Js.Promise.resolve,
          _,
        )
      }, _)
    | Some((jsons, files)) => (jsons->Obj.magic, files->Obj.magic)->Js.Promise.resolve
    }
  }, _)->Js.Promise.then_(((jsons, files)) => {
    jsons->Meta3dCommonlib.ArraySt.reduceOneParami((. allUIControls, json, i) => {
      let file = files->Meta3dCommonlib.ArraySt.getExn(i)
      let (
        (description, displayName, repoLink, implementVersion, account),
        (protocolName, protocolVersion, protocolIconBase64),
        protocolConfig,
      ) =
        json->Js.Json.parseExn->Obj.magic

      allUIControls->Meta3dCommonlib.ArraySt.push((
        (
          {
            id: IdUtils.generateId(Js.Math.random),
            protocolName,
            protocolVersion,
            protocolIconBase64,
            version: implementVersion,
            account,
            data: Meta3d.Main.loadContribute(file),
          }: UserCenterStoreType.contribute
        ),
        protocolConfig->Meta3dCommonlib.OptionSt.fromNullable,
      ))
    }, [])->Meta3dCommonlib.ListSt.fromArray->Js.Promise.resolve
  }, _)->Js.Promise.then_(allUIControls => {
    dispatch(AppStoreType.UserCenterAction(UserCenterStoreType.SelectAllUIControls(allUIControls)))

    ()->Js.Promise.resolve
  }, _)
  // ->Js.Promise.then_(
  //   () => {
  //     Js.log("finish")
  //     ()->Js.Promise.resolve
  //   },
  //   _,
  // )
}
