let buildKey = (account, appName) => {
  j`${account}_${appName}`
}

let buildURL = (account: string, appName: string) =>
  j`EnterApp?account=${account}&appName=${appName}`

let _generateAppId = (account: string, appName: string) => {
  j`${account}_${appName}`
}

let importApp = (
  service: FrontendType.service,
  (dispatch, dispatchForApAssembleStore, dispatchForElementAssembleStore),
  (setDownloadProgress, onFinish),
  item: BackendCloudbaseType.publishAppInfo,
) => {
  service.backend.findPublishApp(.
    progress => setDownloadProgress(_ => progress),
    item.account,
    item.appName,
  )
  ->Meta3dBsMostDefault.Most.flatMap(file => {
    Meta3dCommonlib.NullableSt.isNullable(file)
      ? {
          onFinish()

          Meta3dCommonlib.Exception.throwErr(
            Meta3dCommonlib.Exception.buildErr(
              Meta3dCommonlib.Log.buildErrorMessage(
                ~title={j`account: ${item.account} appName: ${item.appName} has no published app`},
                ~description={
                  ""
                },
                ~reason="",
                ~solution=j``,
                ~params=j``,
              ),
            ),
          )

          Meta3dBsMostDefault.Most.empty()->Obj.magic
        }
      : {
          let (data1, data2, configData, allElements) = Meta3d.Main.getAllDataOfApp(
            file->Meta3dCommonlib.NullableSt.getExn,
          )

          let (canvasData, otherConfigData) = configData

          let apInspectorData: ApAssembleStoreType.apInspectorDataFromFile =
            otherConfigData->Obj.magic

          dispatchForApAssembleStore(ApAssembleStoreType.SetApInspectorData(apInspectorData))

          dispatch(
            AppStoreType.UserCenterAction(
              UserCenterStoreType.SelectAllElements(
                allElements->Obj.magic->Meta3dCommonlib.ListSt.fromArray,
              ),
            ),
          )

          dispatchForElementAssembleStore(ElementAssembleStoreType.SetCanvasData(canvasData))

          (data1, data2)->Meta3dBsMostDefault.Most.just
        }
  }, _)
  ->ImportUtils.importApp(
    (
      service,
      (
        () => {
          onFinish()
        },
        (selectedExtensions, selectedContributes, selectedPackages) =>
          dispatch(
            AppStoreType.UserCenterAction(
              UserCenterStoreType.ImportApp(
                _generateAppId(item.account, item.appName),
                item.appName,
                selectedExtensions,
                selectedContributes,
                selectedPackages,
              ),
            ),
          ),
        packageIds =>
          dispatchForApAssembleStore(ApAssembleStoreType.BatchStorePackagesInApp(packageIds)),
      ),
    ),
    _,
  )
  ->Js.Promise.then_(() => {
    RescriptReactRouter.push("/AssembleSpace")

    ()->Js.Promise.resolve
  }, _)
  ->Js.Promise.catch(e => {
    service.console.errorWithExn(. e->Error.promiseErrorToExn, None)->Obj.magic
  }, _)
  ->ignore
}
