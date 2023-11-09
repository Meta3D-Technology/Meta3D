/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/js/src/Main.bs.js":
/*!*******************************!*\
  !*** ./lib/js/src/Main.bs.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nvar InitJob$Meta3dPipelineRootSceneview = __webpack_require__(/*! ./jobs/InitJob.bs.js */ \"./lib/js/src/jobs/InitJob.bs.js\");\nvar RenderJob$Meta3dPipelineRootSceneview = __webpack_require__(/*! ./jobs/RenderJob.bs.js */ \"./lib/js/src/jobs/RenderJob.bs.js\");\nvar UpdateJob$Meta3dPipelineRootSceneview = __webpack_require__(/*! ./jobs/UpdateJob.bs.js */ \"./lib/js/src/jobs/UpdateJob.bs.js\");\nvar StateType$Meta3dPipelineRootSceneviewProtocol = __webpack_require__(/*! meta3d-pipeline-root-sceneview-protocol/lib/js/src/StateType.bs.js */ \"../../protocols/contribute_protocols/meta3d-pipeline-root-sceneview-protocol/lib/js/src/StateType.bs.js\");\n\nfunction _getExecFunc(_pipelineName, jobName) {\n  if (jobName === StateType$Meta3dPipelineRootSceneviewProtocol.job.Init) {\n    return InitJob$Meta3dPipelineRootSceneview.execFunc;\n  } else if (jobName === StateType$Meta3dPipelineRootSceneviewProtocol.job.Update) {\n    return UpdateJob$Meta3dPipelineRootSceneview.execFunc;\n  } else if (jobName === StateType$Meta3dPipelineRootSceneviewProtocol.job.Render) {\n    return RenderJob$Meta3dPipelineRootSceneview.execFunc;\n  } else {\n    return null;\n  }\n}\n\nfunction _init(_state) {\n  \n}\n\nfunction getContribute(api) {\n  return {\n          pipelineName: StateType$Meta3dPipelineRootSceneviewProtocol.pipelineName,\n          createStateFunc: (function (meta3dState, param) {\n              var mostService = api.getExtensionService(meta3dState, \"meta3d-bs-most-protocol\");\n              return {\n                      mostService: mostService\n                    };\n            }),\n          initFunc: _init,\n          getExecFunc: _getExecFunc,\n          allPipelineData: StateType$Meta3dPipelineRootSceneviewProtocol.allPipelineData,\n          restoreFunc: null,\n          deepCopyFunc: null\n        };\n}\n\nexports._getExecFunc = _getExecFunc;\nexports._init = _init;\nexports.getContribute = getContribute;\n/* InitJob-Meta3dPipelineRootSceneview Not a pure module */\n\n\n//# sourceURL=webpack://Contribute/./lib/js/src/Main.bs.js?");

/***/ }),

/***/ "./lib/js/src/jobs/InitJob.bs.js":
/*!***************************************!*\
  !*** ./lib/js/src/jobs/InitJob.bs.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nvar Utils$Meta3dPipelineRootSceneview = __webpack_require__(/*! ./Utils.bs.js */ \"./lib/js/src/jobs/Utils.bs.js\");\n\nfunction execFunc(meta3dState, param) {\n  var match = Utils$Meta3dPipelineRootSceneview.getState(param.getStatesFunc(meta3dState));\n  return match.mostService.callFunc(function (param) {\n              console.log(\"init root job exec\");\n              return meta3dState;\n            });\n}\n\nexports.execFunc = execFunc;\n/* Utils-Meta3dPipelineRootSceneview Not a pure module */\n\n\n//# sourceURL=webpack://Contribute/./lib/js/src/jobs/InitJob.bs.js?");

/***/ }),

/***/ "./lib/js/src/jobs/RenderJob.bs.js":
/*!*****************************************!*\
  !*** ./lib/js/src/jobs/RenderJob.bs.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nvar Utils$Meta3dPipelineRootSceneview = __webpack_require__(/*! ./Utils.bs.js */ \"./lib/js/src/jobs/Utils.bs.js\");\n\nfunction execFunc(meta3dState, param) {\n  var match = Utils$Meta3dPipelineRootSceneview.getState(param.getStatesFunc(meta3dState));\n  return match.mostService.callFunc(function (param) {\n              console.log(\"render root job exec\");\n              return meta3dState;\n            });\n}\n\nexports.execFunc = execFunc;\n/* Utils-Meta3dPipelineRootSceneview Not a pure module */\n\n\n//# sourceURL=webpack://Contribute/./lib/js/src/jobs/RenderJob.bs.js?");

/***/ }),

/***/ "./lib/js/src/jobs/UpdateJob.bs.js":
/*!*****************************************!*\
  !*** ./lib/js/src/jobs/UpdateJob.bs.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nvar Utils$Meta3dPipelineRootSceneview = __webpack_require__(/*! ./Utils.bs.js */ \"./lib/js/src/jobs/Utils.bs.js\");\n\nfunction execFunc(meta3dState, param) {\n  var match = Utils$Meta3dPipelineRootSceneview.getState(param.getStatesFunc(meta3dState));\n  return match.mostService.callFunc(function (param) {\n              console.log(\"update root job exec\");\n              return meta3dState;\n            });\n}\n\nexports.execFunc = execFunc;\n/* Utils-Meta3dPipelineRootSceneview Not a pure module */\n\n\n//# sourceURL=webpack://Contribute/./lib/js/src/jobs/UpdateJob.bs.js?");

/***/ }),

/***/ "./lib/js/src/jobs/Utils.bs.js":
/*!*************************************!*\
  !*** ./lib/js/src/jobs/Utils.bs.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nvar Caml_array = __webpack_require__(/*! rescript/lib/js/caml_array.js */ \"../../node_modules/rescript/lib/js/caml_array.js\");\nvar StateType$Meta3dPipelineRootSceneviewProtocol = __webpack_require__(/*! meta3d-pipeline-root-sceneview-protocol/lib/js/src/StateType.bs.js */ \"../../protocols/contribute_protocols/meta3d-pipeline-root-sceneview-protocol/lib/js/src/StateType.bs.js\");\n\nfunction getState(states) {\n  return Caml_array.get(states, StateType$Meta3dPipelineRootSceneviewProtocol.pipelineName);\n}\n\nexports.getState = getState;\n/* StateType-Meta3dPipelineRootSceneviewProtocol Not a pure module */\n\n\n//# sourceURL=webpack://Contribute/./lib/js/src/jobs/Utils.bs.js?");

/***/ }),

/***/ "../../node_modules/rescript/lib/js/caml_array.js":
/*!********************************************************!*\
  !*** ../../node_modules/rescript/lib/js/caml_array.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\n\nfunction sub(x, offset, len) {\n  var result = new Array(len);\n  var j = 0;\n  var i = offset;\n  while(j < len) {\n    result[j] = x[i];\n    j = j + 1 | 0;\n    i = i + 1 | 0;\n  };\n  return result;\n}\n\nfunction len(_acc, _l) {\n  while(true) {\n    var l = _l;\n    var acc = _acc;\n    if (!l) {\n      return acc;\n    }\n    _l = l.tl;\n    _acc = l.hd.length + acc | 0;\n    continue ;\n  };\n}\n\nfunction fill(arr, _i, _l) {\n  while(true) {\n    var l = _l;\n    var i = _i;\n    if (!l) {\n      return ;\n    }\n    var x = l.hd;\n    var l$1 = x.length;\n    var k = i;\n    var j = 0;\n    while(j < l$1) {\n      arr[k] = x[j];\n      k = k + 1 | 0;\n      j = j + 1 | 0;\n    };\n    _l = l.tl;\n    _i = k;\n    continue ;\n  };\n}\n\nfunction concat(l) {\n  var v = len(0, l);\n  var result = new Array(v);\n  fill(result, 0, l);\n  return result;\n}\n\nfunction set(xs, index, newval) {\n  if (index < 0 || index >= xs.length) {\n    throw {\n          RE_EXN_ID: \"Invalid_argument\",\n          _1: \"index out of bounds\",\n          Error: new Error()\n        };\n  }\n  xs[index] = newval;\n}\n\nfunction get(xs, index) {\n  if (index < 0 || index >= xs.length) {\n    throw {\n          RE_EXN_ID: \"Invalid_argument\",\n          _1: \"index out of bounds\",\n          Error: new Error()\n        };\n  }\n  return xs[index];\n}\n\nfunction make(len, init) {\n  var b = new Array(len);\n  for(var i = 0; i < len; ++i){\n    b[i] = init;\n  }\n  return b;\n}\n\nfunction make_float(len) {\n  var b = new Array(len);\n  for(var i = 0; i < len; ++i){\n    b[i] = 0;\n  }\n  return b;\n}\n\nfunction blit(a1, i1, a2, i2, len) {\n  if (i2 <= i1) {\n    for(var j = 0; j < len; ++j){\n      a2[j + i2 | 0] = a1[j + i1 | 0];\n    }\n    return ;\n  }\n  for(var j$1 = len - 1 | 0; j$1 >= 0; --j$1){\n    a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];\n  }\n}\n\nfunction dup(prim) {\n  return prim.slice(0);\n}\n\nexports.dup = dup;\nexports.sub = sub;\nexports.concat = concat;\nexports.make = make;\nexports.make_float = make_float;\nexports.blit = blit;\nexports.get = get;\nexports.set = set;\n/* No side effect */\n\n\n//# sourceURL=webpack://Contribute/../../node_modules/rescript/lib/js/caml_array.js?");

/***/ }),

/***/ "../../protocols/contribute_protocols/meta3d-pipeline-root-sceneview-protocol/lib/js/src/StateType.bs.js":
/*!***************************************************************************************************************!*\
  !*** ../../protocols/contribute_protocols/meta3d-pipeline-root-sceneview-protocol/lib/js/src/StateType.bs.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\n\nvar pipeline = {\n  Init: \"init\",\n  Update: \"update\",\n  Render: \"render\"\n};\n\nvar job = {\n  Init: \"init_root_meta3d\",\n  Update: \"update_root_meta3d\",\n  Render: \"render_root_meta3d\"\n};\n\nvar allPipelineData = [\n  {\n    name: pipeline.Init,\n    groups: [{\n        name: \"first_root_meta3d\",\n        link: \"concat\",\n        elements: [{\n            name: job.Init,\n            type_: \"job\",\n            is_set_state: true\n          }]\n      }],\n    first_group: \"first_root_meta3d\"\n  },\n  {\n    name: pipeline.Update,\n    groups: [{\n        name: \"first_root_meta3d\",\n        link: \"concat\",\n        elements: [{\n            name: job.Update,\n            type_: \"job\",\n            is_set_state: true\n          }]\n      }],\n    first_group: \"first_root_meta3d\"\n  },\n  {\n    name: pipeline.Render,\n    groups: [{\n        name: \"first_root_meta3d\",\n        link: \"concat\",\n        elements: [{\n            name: job.Render,\n            type_: \"job\",\n            is_set_state: true\n          }]\n      }],\n    first_group: \"first_root_meta3d\"\n  }\n];\n\nvar pipelineName = \"Root_SceneView\";\n\nexports.pipelineName = pipelineName;\nexports.pipeline = pipeline;\nexports.job = job;\nexports.allPipelineData = allPipelineData;\n/* allPipelineData Not a pure module */\n\n\n//# sourceURL=webpack://Contribute/../../protocols/contribute_protocols/meta3d-pipeline-root-sceneview-protocol/lib/js/src/StateType.bs.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./lib/js/src/Main.bs.js");
/******/ 	window.Contribute = __webpack_exports__;
/******/ 	
/******/ })()
;