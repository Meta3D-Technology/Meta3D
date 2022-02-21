'use strict';

var Index$Meta3dComponentTransformProtocol = require("meta3d-component-transform-protocol/lib/js/index.bs.js");
var CreateStateUtils$Meta3dComponentTransform = require("./create_state/CreateStateUtils.bs.js");
var AddTransformUtils$Meta3dComponentTransform = require("./gameobject/AddTransformUtils.bs.js");
var GetTransformUtils$Meta3dComponentTransform = require("./gameobject/GetTransformUtils.bs.js");
var HasTransformUtils$Meta3dComponentTransform = require("./gameobject/HasTransformUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentTransform = require("./gameobject/GetGameObjectsUtils.bs.js");
var CreateTransformUtils$Meta3dComponentTransform = require("./operate_component/CreateTransformUtils.bs.js");
var GetAllTransformsUtils$Meta3dComponentTransform = require("./operate_component/GetAllTransformsUtils.bs.js");
var GetTransformDataUtils$Meta3dComponentTransform = require("./operate_data/GetTransformDataUtils.bs.js");
var SetTransformDataUtils$Meta3dComponentTransform = require("./operate_data/SetTransformDataUtils.bs.js");

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentTransformProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentTransform.createState(param.isDebug, param.transformCount, param.float9Array1, param.float32Array1);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentTransform.get,
          createComponentFunc: CreateTransformUtils$Meta3dComponentTransform.create,
          addComponentFunc: AddTransformUtils$Meta3dComponentTransform.add,
          hasComponentFunc: HasTransformUtils$Meta3dComponentTransform.has,
          getComponentFunc: GetTransformUtils$Meta3dComponentTransform.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetTransformDataUtils$Meta3dComponentTransform.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetTransformDataUtils$Meta3dComponentTransform.setData(state, component, dataName, dataValue);
            }),
          getAllComponentsFunc: GetAllTransformsUtils$Meta3dComponentTransform.getAll
        };
}

exports.getComponentContribute = getComponentContribute;
/* No side effect */
