


function getExtensionService(api) {
  return {
          engineBasic: (function (meta3dState) {
              return api.getExtensionService(meta3dState, "meta3d-engine-basic-protocol");
            }),
          engineCore: (function (meta3dState) {
              return api.getExtensionService(meta3dState, "meta3d-engine-core-protocol");
            }),
          most: (function (meta3dState) {
              return api.getExtensionService(meta3dState, "meta3d-bs-most-protocol");
            }),
          immutable: (function (meta3dState) {
              return api.getExtensionService(meta3dState, "meta3d-immutable-protocol");
            })
        };
}

function createExtensionState(param) {
  return null;
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
