

import * as Caml_array from "../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as ListSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as Index$Meta3dComponentTransformProtocol from "../../../../../node_modules/meta3d-component-transform-protocol/lib/es6_global/src/Index.bs.js";
import * as CreateGameObjectUtils$Meta3dGameobjectDataoriented from "./CreateGameObjectUtils.bs.js";
import * as CloneGameObjectComponentUtils$Meta3dGameobjectDataoriented from "./CloneGameObjectComponentUtils.bs.js";

function _createClonedGameObjects(gameObjectState, countRange) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(countRange, (function (param, param$1) {
                var match = CreateGameObjectUtils$Meta3dGameobjectDataoriented.create(param[0]);
                return [
                        match[0],
                        ArraySt$Meta3dCommonlib.push(param[1], match[1])
                      ];
              }), [
              gameObjectState,
              []
            ]);
}

function _setParent(transformState, setTransformDataFunc, clonedParentTransforms, clonedTransforms) {
  return ArraySt$Meta3dCommonlib.reduceOneParami(clonedParentTransforms, (function (transformState, clonedParentTransform, i) {
                return setTransformDataFunc(transformState, Caml_array.get(clonedTransforms, i), Index$Meta3dComponentTransformProtocol.dataName.parent, clonedParentTransform);
              }), transformState);
}

function _clone(param, funcs, isDebug, countRange, cloneConfig, param$1, param$2) {
  var sourceTransform = param$1[0];
  var match = funcs[6];
  var match$1 = funcs[5];
  var match$2 = funcs[4];
  var match$3 = funcs[3];
  var match$4 = funcs[2];
  var match$5 = funcs[1];
  var match$6 = funcs[0];
  var getTransformGameObjectsFunc = match$6[3];
  var match$7 = _createClonedGameObjects(param[0], countRange);
  var clonedGameObjects = match$7[1];
  var gameObjectState = match$7[0];
  var totalClonedGameObjects = ListSt$Meta3dCommonlib.push(param$2[1], clonedGameObjects);
  var match$8 = CloneGameObjectComponentUtils$Meta3dGameobjectDataoriented.clone([
        param[1],
        param[2],
        param[3],
        param[4],
        param[5],
        param[6],
        param[7]
      ], [
        [
          match$6[1],
          match$6[2]
        ],
        [
          match$5[0],
          match$5[1],
          match$5[2]
        ],
        [
          match$4[0],
          match$4[1],
          match$4[2]
        ],
        [
          match$3[0],
          match$3[1],
          match$3[2]
        ],
        [
          match$2[0],
          match$2[1],
          match$2[2]
        ],
        [
          match$1[0],
          match$1[1],
          match$1[2]
        ],
        [
          match[0],
          match[1],
          match[2]
        ]
      ], isDebug, countRange, cloneConfig, sourceTransform, [
        param$2[0],
        clonedGameObjects
      ]);
  var clonedTransforms = match$8[1];
  var match$9 = match$8[0];
  var perspectiveCameraProjectionState = match$9[6];
  var basicCameraViewState = match$9[5];
  var arcballCameraControllerState = match$9[4];
  var directionLightState = match$9[3];
  var geometryState = match$9[2];
  var pbrMaterialState = match$9[1];
  var transformState = _setParent(match$9[0], match$6[5], param$1[1], clonedTransforms);
  return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(match$6[4](transformState, sourceTransform, Index$Meta3dComponentTransformProtocol.dataName.children), (function (children) {
                    return ArraySt$Meta3dCommonlib.reduceOneParam(children, (function (param, childTransform) {
                                  return _clone(param[0], funcs, isDebug, countRange, cloneConfig, [
                                              childTransform,
                                              clonedTransforms
                                            ], [
                                              ArraySt$Meta3dCommonlib.unsafeGetFirst(getTransformGameObjectsFunc(transformState, childTransform)),
                                              param[1]
                                            ]);
                                }), [
                                [
                                  gameObjectState,
                                  transformState,
                                  pbrMaterialState,
                                  geometryState,
                                  directionLightState,
                                  arcballCameraControllerState,
                                  basicCameraViewState,
                                  perspectiveCameraProjectionState
                                ],
                                totalClonedGameObjects
                              ]);
                  })), [
              [
                gameObjectState,
                transformState,
                pbrMaterialState,
                geometryState,
                directionLightState,
                arcballCameraControllerState,
                basicCameraViewState,
                perspectiveCameraProjectionState
              ],
              totalClonedGameObjects
            ]);
}

function clone(states, funcs, isDebug, count, cloneConfig, sourceGameObject) {
  var countRange = ArraySt$Meta3dCommonlib.range(0, count - 1 | 0);
  return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(funcs[0][0](states[1], sourceGameObject), (function (sourceTransform) {
                    var match = _clone(states, funcs, isDebug, countRange, cloneConfig, [
                          sourceTransform,
                          []
                        ], [
                          sourceGameObject,
                          /* [] */0
                        ]);
                    return [
                            match[0],
                            ListSt$Meta3dCommonlib.toArray(match[1])
                          ];
                  })), [
              states,
              []
            ]);
}

export {
  _createClonedGameObjects ,
  _setParent ,
  _clone ,
  clone ,
}
/* No side effect */
