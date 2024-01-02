

import * as NullableSt$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as BatchAddComponentUtils$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/BatchAddComponentUtils.bs.js";

function _cloneComponent(componentState, param, isDebug, countRange, cloneConfig, param$1) {
  var clonedGameObjects = param$1[1];
  var addComponentFunc = param[2];
  var cloneComponentFunc = param[1];
  return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(param[0](componentState, param$1[0]), (function (component) {
                    var match = cloneComponentFunc(componentState, countRange, cloneConfig, component);
                    var clonedComponents = match[1];
                    var componentState$1 = BatchAddComponentUtils$Meta3dCommonlib.batchAdd(match[0], addComponentFunc, isDebug, clonedGameObjects, clonedComponents);
                    return [
                            componentState$1,
                            clonedComponents
                          ];
                  })), [
              componentState,
              []
            ]);
}

function clone(param, param$1, isDebug, countRange, param$2, sourceTransform, param$3) {
  var clonedGameObjects = param$3[1];
  var sourceGameObject = param$3[0];
  var match = param$1[0];
  var match$1 = match[0](param[0], countRange, undefined, sourceTransform);
  var clonedTransforms = match$1[1];
  var transformState = BatchAddComponentUtils$Meta3dCommonlib.batchAdd(match$1[0], match[1], isDebug, clonedGameObjects, clonedTransforms);
  var match$2 = _cloneComponent(param[1], param$1[1], isDebug, countRange, {
        isShare: param$2.isShareMaterial
      }, [
        sourceGameObject,
        clonedGameObjects
      ]);
  var match$3 = _cloneComponent(param[2], param$1[2], isDebug, countRange, undefined, [
        sourceGameObject,
        clonedGameObjects
      ]);
  var match$4 = _cloneComponent(param[3], param$1[3], isDebug, countRange, undefined, [
        sourceGameObject,
        clonedGameObjects
      ]);
  var match$5 = _cloneComponent(param[4], param$1[4], isDebug, countRange, undefined, [
        sourceGameObject,
        clonedGameObjects
      ]);
  var match$6 = _cloneComponent(param[5], param$1[5], isDebug, countRange, undefined, [
        sourceGameObject,
        clonedGameObjects
      ]);
  var match$7 = _cloneComponent(param[6], param$1[6], isDebug, countRange, undefined, [
        sourceGameObject,
        clonedGameObjects
      ]);
  return [
          [
            transformState,
            match$2[0],
            match$3[0],
            match$4[0],
            match$5[0],
            match$6[0],
            match$7[0]
          ],
          clonedTransforms
        ];
}

export {
  _cloneComponent ,
  clone ,
}
/* No side effect */
