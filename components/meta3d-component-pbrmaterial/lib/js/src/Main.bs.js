'use strict';

var Index$Meta3dComponentPbrmaterialProtocol = require("meta3d-component-pbrmaterial-protocol/lib/js/src/Index.bs.js");
var CreateStateUtils$Meta3dComponentPbrmaterial = require("./create_state/CreateStateUtils.bs.js");
var AddPBRMaterialUtils$Meta3dComponentPbrmaterial = require("./gameobject/AddPBRMaterialUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentPbrmaterial = require("./gameobject/GetGameObjectsUtils.bs.js");
var GetPBRMaterialUtils$Meta3dComponentPbrmaterial = require("./gameobject/GetPBRMaterialUtils.bs.js");
var HasPBRMaterialUtils$Meta3dComponentPbrmaterial = require("./gameobject/HasPBRMaterialUtils.bs.js");
var CreatePBRMaterialUtils$Meta3dComponentPbrmaterial = require("./operate_component/CreatePBRMaterialUtils.bs.js");
var RemovePBRMaterialUtils$Meta3dComponentPbrmaterial = require("./gameobject/RemovePBRMaterialUtils.bs.js");
var DisposePBRMaterialUtils$Meta3dComponentPbrmaterial = require("./operate_data/DisposePBRMaterialUtils.bs.js");
var GetAllPBRMaterialsUtils$Meta3dComponentPbrmaterial = require("./operate_component/GetAllPBRMaterialsUtils.bs.js");
var GetPBRMaterialDataUtils$Meta3dComponentPbrmaterial = require("./operate_data/GetPBRMaterialDataUtils.bs.js");
var SetPBRMaterialDataUtils$Meta3dComponentPbrmaterial = require("./operate_data/SetPBRMaterialDataUtils.bs.js");
var GetNeedDisposedPBRMaterialsUtils$Meta3dComponentPbrmaterial = require("./gameobject/GetNeedDisposedPBRMaterialsUtils.bs.js");

function getComponentContribute(param) {
  return {
          componentName: Index$Meta3dComponentPbrmaterialProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentPbrmaterial.createState(param.isDebug, param.pbrMaterialCount);
            }),
          getGameObjectsFunc: (function (state, component) {
              return GetGameObjectsUtils$Meta3dComponentPbrmaterial.get(state)(component);
            }),
          createComponentFunc: CreatePBRMaterialUtils$Meta3dComponentPbrmaterial.create,
          addComponentFunc: (function (state, gameObject, component) {
              return AddPBRMaterialUtils$Meta3dComponentPbrmaterial.add(state)(gameObject, component);
            }),
          removeComponentFunc: (function (state, gameObject, component) {
              return RemovePBRMaterialUtils$Meta3dComponentPbrmaterial.remove(state)(gameObject, component);
            }),
          hasComponentFunc: (function (state, gameObject) {
              return HasPBRMaterialUtils$Meta3dComponentPbrmaterial.has(state)(gameObject);
            }),
          getComponentFunc: (function (state, gameObject) {
              return GetPBRMaterialUtils$Meta3dComponentPbrmaterial.get(state)(gameObject);
            }),
          getNeedDisposedComponentsFunc: GetNeedDisposedPBRMaterialsUtils$Meta3dComponentPbrmaterial.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetPBRMaterialDataUtils$Meta3dComponentPbrmaterial.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetPBRMaterialDataUtils$Meta3dComponentPbrmaterial.setData(state, component, dataName, dataValue);
            }),
          deferDisposeComponentFunc: (function (state, param) {
              return DisposePBRMaterialUtils$Meta3dComponentPbrmaterial.deferDisposeComponent(state)([
                          param[0],
                          param[1]
                        ]);
            }),
          disposeComponentsFunc: DisposePBRMaterialUtils$Meta3dComponentPbrmaterial.disposeComponents,
          getAllComponentsFunc: GetAllPBRMaterialsUtils$Meta3dComponentPbrmaterial.getAll
        };
}

exports.getComponentContribute = getComponentContribute;
/* No side effect */
