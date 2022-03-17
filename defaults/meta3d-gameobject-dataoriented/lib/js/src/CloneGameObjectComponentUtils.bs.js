'use strict';

var NullableSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/NullableSt.bs.js");
var BatchAddComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/BatchAddComponentUtils.bs.js");

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
  return [
          [
            transformState,
            match$2[0],
            match$3[0]
          ],
          clonedTransforms
        ];
}

exports._cloneComponent = _cloneComponent;
exports.clone = clone;
/* No side effect */
