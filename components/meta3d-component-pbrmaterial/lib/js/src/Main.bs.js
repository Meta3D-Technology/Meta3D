'use strict';

var Index$Meta3dComponentPbrmaterialProtocol = require("meta3d-component-pbrmaterial-protocol/lib/js/src/Index.bs.js");
var CreateStateUtils$Meta3dComponentPbrmaterial = require("./create_state/CreateStateUtils.bs.js");
var AddPBRMaterialUtils$Meta3dComponentPbrmaterial = require("./gameobject/AddPBRMaterialUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentPbrmaterial = require("./gameobject/GetGameObjectsUtils.bs.js");
var GetPBRMaterialUtils$Meta3dComponentPbrmaterial = require("./gameobject/GetPBRMaterialUtils.bs.js");
var HasPBRMaterialUtils$Meta3dComponentPbrmaterial = require("./gameobject/HasPBRMaterialUtils.bs.js");
var CreatePBRMaterialUtils$Meta3dComponentPbrmaterial = require("./operate_component/CreatePBRMaterialUtils.bs.js");
var GetAllPBRMaterialsUtils$Meta3dComponentPbrmaterial = require("./operate_component/GetAllPBRMaterialsUtils.bs.js");
var GetPBRMaterialDataUtils$Meta3dComponentPbrmaterial = require("./operate_data/GetPBRMaterialDataUtils.bs.js");
var SetPBRMaterialDataUtils$Meta3dComponentPbrmaterial = require("./operate_data/SetPBRMaterialDataUtils.bs.js");

function getData(param) {
  return {
          componentName: Index$Meta3dComponentPbrmaterialProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentPbrmaterial.createState(param.isDebug, param.pbrMaterialCount);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentPbrmaterial.get,
          createComponentFunc: CreatePBRMaterialUtils$Meta3dComponentPbrmaterial.create,
          addComponentFunc: AddPBRMaterialUtils$Meta3dComponentPbrmaterial.add,
          hasComponentFunc: HasPBRMaterialUtils$Meta3dComponentPbrmaterial.has,
          getComponentFunc: GetPBRMaterialUtils$Meta3dComponentPbrmaterial.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetPBRMaterialDataUtils$Meta3dComponentPbrmaterial.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetPBRMaterialDataUtils$Meta3dComponentPbrmaterial.setData(state, component, dataName, dataValue);
            }),
          deferDisposeComponentFunc: (function (state, component) {
              return state;
            }),
          batchDisposeComponentsFunc: (function (state, components) {
              return state;
            }),
          getAllComponentsFunc: GetAllPBRMaterialsUtils$Meta3dComponentPbrmaterial.getAll
        };
}

exports.getData = getData;
/* No side effect */
