let selectEditorWholeAndEngineWholePackages = (
  service: FrontendType.service,
  dispatch,
  release,
) => {
  let version =
    release->Meta3dCommonlib.OptionSt.map(({version}: UserCenterStoreType.release) => version)

  CacheUtils.getPackages(version)->Js.Promise.then_(data => {
    switch data->Meta3dCommonlib.OptionSt.fromNullable {
    | None =>
      InitPackageUtils.getEditorWholeAndEngineWholePackageData()
      ->Meta3dCommonlib.ListSt.traverseReducePromiseM((list{}, list{}), (
        (jsons, files),
        (name, entryExtensionName, protocolName),
      ) => {
        service.backend.findNewestPublishPackage(. progress => (), protocolName, name)
        ->Meta3dBsMostDefault.Most.map(
          data => {
            data->Meta3dCommonlib.NullableSt.isNullable
              ? Meta3dCommonlib.Exception.throwErr(
                  Meta3dCommonlib.Exception.buildErr(
                    Meta3dCommonlib.Log.buildErrorMessage(
                      ~title={j`package not exist`},
                      ~description={
                        j``
                      },
                      ~reason="",
                      ~solution=j``,
                      ~params=j`protocolName: ${protocolName}, name: ${name}`,
                    ),
                  ),
                )
              : ()

            let (
              file,
              entryExtensionProtocolVersion,
              packageVersion,
              entryExtensionProtocolIconBase64,
              entryExtensionProtocolConfigStr,
            ) =
              data->Meta3dCommonlib.NullableSt.getExn

            (
              (
                name,
                entryExtensionName,
                protocolName,
                entryExtensionProtocolVersion,
                packageVersion,
                entryExtensionProtocolIconBase64,
                entryExtensionProtocolConfigStr,
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

        CacheUtils.cachePackages(version, jsons, files)->Js.Promise.then_(
          _ => (jsons, files)->Js.Promise.resolve,
          _,
        )
      }, _)
    | Some((jsons, files)) => (jsons->Obj.magic, files->Obj.magic)->Js.Promise.resolve
    }
  }, _)->Js.Promise.then_(((jsons, files)) => {
    jsons->Meta3dCommonlib.ArraySt.reduceOneParami((. packages, json, i) => {
      let file = files->Meta3dCommonlib.ArraySt.getExn(i)
      let (
        name,
        entryExtensionName,
        protocolName,
        entryExtensionProtocolVersion,
        packageVersion,
        entryExtensionProtocolIconBase64,
        entryExtensionProtocolConfigStr,
      ) =
        json->Js.Json.parseExn->Obj.magic

      packages->Meta3dCommonlib.ArraySt.push(
        (
          {
            id: IdUtils.generateId(Js.Math.random),
            name,
            entryExtensionName,
            version: packageVersion,
            protocol: {
              name: protocolName,
              iconBase64: entryExtensionProtocolIconBase64,
              version: entryExtensionProtocolVersion,
            },
            binaryFile: file,
            protocolConfigStr: entryExtensionProtocolConfigStr->Some,
            isStart: false,
          }: UserCenterStoreType.packageData
        ),
      )
    }, [])->Meta3dCommonlib.ListSt.fromArray->Js.Promise.resolve
  }, _)->Js.Promise.then_(editorWholeAndEngineWholePackages => {
    dispatch(
      AppStoreType.UserCenterAction(
        UserCenterStoreType.SetPackages(editorWholeAndEngineWholePackages),
      ),
    )

    ()->Js.Promise.resolve
  }, _)
//   ->Js.Promise.then_(() => {
//     Js.log("finish2")
//     ()->Js.Promise.resolve
//   }, _)
}
