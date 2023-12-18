let _buildAllUIControlsJsonKey = () => {j`meta3d_allUIControls_json_cache`}

let _buildAllUIControlsFileKey = () => {j`meta3d_allUIControls_file_cache`}

let _buildPackagesJsonKey = () => {j`meta3d_packages_json_cache`}

let _buildPackagesFileKey = () => {j`meta3d_packages_file_cache`}

let _cacheData = (jsonKey, fileKey, jsons, files) => {
  LocalForage.setItem(jsonKey, jsons->Obj.magic)->Js.Promise.then_(_ => {
    LocalForage.setItem(fileKey, files->Obj.magic)
  }, _)
}

let _getData = (jsonKey, fileKey) => {
  LocalForage.getItem(jsonKey)->Js.Promise.then_(jsons => {
    jsons->Meta3dCommonlib.NullableSt.isNullable
      ? Meta3dCommonlib.NullableSt.getEmpty()->Js.Promise.resolve
      : LocalForage.getItem(fileKey)->Js.Promise.then_(files => {
          files->Meta3dCommonlib.NullableSt.isNullable
            ? Meta3dCommonlib.NullableSt.getEmpty()->Js.Promise.resolve
            : (jsons->Meta3dCommonlib.NullableSt.getExn, files->Meta3dCommonlib.NullableSt.getExn)
              ->Meta3dCommonlib.NullableSt.return
              ->Js.Promise.resolve
        }, _)
  }, _)
}

let cacheAllUIControls = (jsons, files) => {
  _cacheData(_buildAllUIControlsJsonKey(), _buildAllUIControlsFileKey(), jsons, files)
}

let getAllUIControls = () => {
  _getData(_buildAllUIControlsJsonKey(), _buildAllUIControlsFileKey())
}

let cachePackages = (jsons, files) => {
  _cacheData(_buildPackagesJsonKey(), _buildPackagesFileKey(), jsons, files)
}

let getPackages = () => {
  _getData(_buildPackagesJsonKey(), _buildPackagesFileKey())
}
