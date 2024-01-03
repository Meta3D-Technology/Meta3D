let _buildAllUIControlsVersionKey = () => {j`meta3d_allUIControls_version_cache`}

let _buildAllUIControlsJsonKey = () => {j`meta3d_allUIControls_json_cache`}

let _buildAllUIControlsFileKey = () => {j`meta3d_allUIControls_file_cache`}

let _buildPackagesVersionKey = () => {j`meta3d_packages_version_cache`}

let _buildPackagesJsonKey = () => {j`meta3d_packages_json_cache`}

let _buildPackagesFileKey = () => {j`meta3d_packages_file_cache`}

let _cacheData = (versionKey, jsonKey, fileKey, version, jsons, files) => {
  switch version {
  | None => ()->Js.Promise.resolve
  | Some(version) =>
    LocalForage.setItem(versionKey, version->Obj.magic)->Meta3dCommonlib.PromiseSt.map(_ => ())
  }
  ->Js.Promise.then_(_ => {
    LocalForage.setItem(jsonKey, jsons->Obj.magic)
  }, _)
  ->Js.Promise.then_(_ => {
    LocalForage.setItem(fileKey, files->Obj.magic)
  }, _)
}

let _getData = (versionKey, jsonKey, fileKey, newestVersion) => {
  LocalForage.getItem(versionKey)->Js.Promise.then_(version => {
    switch newestVersion {
    | None => true
    | Some(newestVersion) =>
      version
      ->Meta3dCommonlib.NullableSt.map((. version) => {
        version->Obj.magic != newestVersion
      })
      ->Meta3dCommonlib.NullableSt.getWithDefault(true)
    }
      ? Meta3dCommonlib.NullableSt.getEmpty()->Js.Promise.resolve
      : LocalForage.getItem(jsonKey)->Js.Promise.then_(jsons => {
          jsons->Meta3dCommonlib.NullableSt.isNullable
            ? Meta3dCommonlib.NullableSt.getEmpty()->Js.Promise.resolve
            : LocalForage.getItem(fileKey)->Js.Promise.then_(
                files => {
                  files->Meta3dCommonlib.NullableSt.isNullable
                    ? Meta3dCommonlib.NullableSt.getEmpty()->Js.Promise.resolve
                    : (
                        jsons->Meta3dCommonlib.NullableSt.getExn,
                        files->Meta3dCommonlib.NullableSt.getExn,
                      )
                      ->Meta3dCommonlib.NullableSt.return
                      ->Js.Promise.resolve
                },
                _,
              )
        }, _)
  }, _)
}

let cacheAllUIControls = (version, jsons, files) => {
  _cacheData(
    _buildAllUIControlsVersionKey(),
    _buildAllUIControlsJsonKey(),
    _buildAllUIControlsFileKey(),
    version,
    jsons,
    files,
  )
}

let getAllUIControls = version => {
  _getData(
    _buildAllUIControlsVersionKey(),
    _buildAllUIControlsJsonKey(),
    _buildAllUIControlsFileKey(),
    version,
  )
}

let cachePackages = (version, jsons, files) => {
  _cacheData(
    _buildPackagesVersionKey(),
    _buildPackagesJsonKey(),
    _buildPackagesFileKey(),
    version,
    jsons,
    files,
  )
}

let getPackages = version => {
  _getData(_buildPackagesVersionKey(), _buildPackagesJsonKey(), _buildPackagesFileKey(), version)
}
