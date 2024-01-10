let buildKey = (account, appName) => {
  j`${account}_${appName}`
}

let buildURL = (account: string, appName: string, version: string) =>
  j`EnterFinalApp?account=${account}&appName=${appName}&version=${version}`

let exportSingleEventFile = (
  service: FrontendType.service,
  //   (dispatch, dispatchForApAssembleStore, dispatchForElementAssembleStore),
  (setDownloadProgress, onFinish),
  //   eventEmitter: Event.eventEmitter,
  //   notUseCacheForFindFinalApp,
  //   release,
  item: BackendCloudbaseType.publishFinalAppInfo,
) => {
  // TODO use cache
  service.backend.findPublishFinalApp(.
    progress => setDownloadProgress(_ => progress),
    item.account,
    item.appName,
    // #singleEvent,
    // notUseCacheForFindFinalApp,
    true,
  )
  ->Meta3dBsMostDefault.Most.flatMap(sceneGLB => {
    Meta3dCommonlib.NullableSt.isNullable(sceneGLB)
      ? {
          onFinish()

          Meta3dCommonlib.Exception.throwErr(
            Meta3dCommonlib.Exception.buildErr(
              Meta3dCommonlib.Log.buildErrorMessage(
                ~title={
                  j`account: ${item.account} appName: ${item.appName} has no published final app`
                },
                ~description={
                  ""
                },
                ~reason="",
                ~solution=j``,
                ~params=j``,
              ),
            ),
          )
        }
      : {
          Meta3dFileUtils.DownloadUtils.createAndDownloadBlobFile(
            Meta3dEventDataUtils.Main.generateEventDataBuffer(
              Meta3dEventDataUtils.Main.getSingleEventAllEvents(
                sceneGLB->Meta3dCommonlib.NullableSt.getExn,
              ),
            ),
            "eventData",
            "arraybuffer",
          )
        }

    Meta3dBsMostDefault.Most.empty()->Obj.magic
  }, _)
  -> Meta3dBsMostDefault.Most.drain
  ->Js.Promise.then_(() => {
    onFinish()

    ()->Js.Promise.resolve
  }, _)
  ->Js.Promise.catch(e => {
    service.console.errorWithExn(. e->Error.promiseErrorToExn, None)->Obj.magic
  }, _)
  ->ignore
}
