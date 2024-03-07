

import * as BinaryFileOperator$Meta3d from "../../../../../../../node_modules/meta3d/lib/es6_global/src/file/BinaryFileOperator.bs.js";

function getExtensionService(api) {
  return {
          loadGlb: (function (meta3dState, glb){
      return api.getExtensionService(
        meta3dState,
        "meta3d-load-glb-protocol",
      ).loadGlb(meta3dState, glb)
  }),
          exportAsset: (function (param) {
              return BinaryFileOperator$Meta3d.generate([
                          param[0],
                          param[1],
                          param[2],
                          new Uint8Array(BinaryFileOperator$Meta3d.generate(param[3]))
                        ]);
            }),
          parseAsset: (function (assetData) {
              new TextDecoder("utf-8");
              var match = BinaryFileOperator$Meta3d.load(assetData);
              if (match.length !== 4) {
                throw {
                      RE_EXN_ID: "Match_failure",
                      _1: [
                        "Main.res",
                        25,
                        8
                      ],
                      Error: new Error()
                    };
              }
              var assetTypes = match[0];
              var ids = match[1];
              var names = match[2];
              var allDataUint8 = match[3];
              return [
                      assetTypes,
                      ids,
                      names,
                      BinaryFileOperator$Meta3d.load(allDataUint8.buffer)
                    ];
            })
        };
}

function createExtensionState(param, param$1) {
  null;
}

function getExtensionLife(api, extensionProtocolName) {
  return {
          onRegister: null,
          onRestore: null,
          onDeepCopy: null,
          onStart: null,
          onInit: null,
          onUpdate: null
        };
}

export {
  getExtensionService ,
  createExtensionState ,
  getExtensionLife ,
}
/* No side effect */
