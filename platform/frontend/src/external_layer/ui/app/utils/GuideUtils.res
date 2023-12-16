type guideStatus = {isFinishFirstLogin: bool}

let _buildKey = () => {j`meta3d_guide_status`}

let _createDefaultStatus = (): guideStatus => {
  isFinishFirstLogin: false,
}

let _readGuideStatus = (): guideStatus => {
  LocalStorageUtils.get(_buildKey())
  ->Meta3dCommonlib.OptionSt.fromNullable
  ->Meta3dCommonlib.OptionSt.map(Js.Json.parseExn)
  ->Meta3dCommonlib.OptionSt.getWithDefault(_createDefaultStatus()->Obj.magic)
  ->Obj.magic
}

let readIsFinishFirstLogin = () => {
  _readGuideStatus().isFinishFirstLogin
}

let markFinishFirstLogin = () => {
  LocalStorageUtils.set(
    _buildKey(),
    {
      ..._readGuideStatus(),
      isFinishFirstLogin: true,
    }->Js.Json.stringifyAny,
  )
}
