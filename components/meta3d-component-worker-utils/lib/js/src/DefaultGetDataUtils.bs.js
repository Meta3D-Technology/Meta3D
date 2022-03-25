'use strict';


function createComponentFunc(state) {
  return [
          state,
          -1
        ];
}

function addComponentFunc(state, param, param$1) {
  return state;
}

function removeComponentFunc(state, param, param$1) {
  return state;
}

function hasComponentFunc(state, param) {
  return false;
}

function getComponentFunc(state, param) {
  return -1;
}

function getGameObjectsFunc(state, param) {
  return [];
}

function setComponentDataFunc(state, param, param$1, param$2) {
  return state;
}

function getAllComponentsFunc(state) {
  return [];
}

function getNeedDisposedComponentsFunc(state) {
  return [];
}

function deferDisposeComponentFunc(state, param) {
  return state;
}

function disposeComponentsFunc(state, param) {
  return state;
}

function cloneComponentFunc(state, param, param$1, param$2) {
  return [
          state,
          []
        ];
}

exports.createComponentFunc = createComponentFunc;
exports.addComponentFunc = addComponentFunc;
exports.removeComponentFunc = removeComponentFunc;
exports.hasComponentFunc = hasComponentFunc;
exports.getComponentFunc = getComponentFunc;
exports.getGameObjectsFunc = getGameObjectsFunc;
exports.setComponentDataFunc = setComponentDataFunc;
exports.getAllComponentsFunc = getAllComponentsFunc;
exports.getNeedDisposedComponentsFunc = getNeedDisposedComponentsFunc;
exports.deferDisposeComponentFunc = deferDisposeComponentFunc;
exports.disposeComponentsFunc = disposeComponentsFunc;
exports.cloneComponentFunc = cloneComponentFunc;
/* No side effect */
