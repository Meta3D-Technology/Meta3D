

import * as Js_typed_array from "./../../../../../../rescript/lib/es6/js_typed_array.js";

function getFloat16TypeArray(index, typeArray) {
  return Js_typed_array.$$Float32Array.subarray(index, index + 16 | 0, typeArray);
}

function setFloat1(index, value, typeArray) {
  typeArray[index] = value;
}

function setFloat3(index, param, typeArray) {
  typeArray[index] = param[0];
  typeArray[index + 1 | 0] = param[1];
  typeArray[index + 2 | 0] = param[2];
}

function setFloat4(index, param, typeArray) {
  typeArray[index] = param[0];
  typeArray[index + 1 | 0] = param[1];
  typeArray[index + 2 | 0] = param[2];
  typeArray[index + 3 | 0] = param[3];
}

function setFloat16(index, param, typeArray) {
  typeArray[index + 0 | 0] = param[0];
  typeArray[index + 1 | 0] = param[1];
  typeArray[index + 2 | 0] = param[2];
  typeArray[index + 3 | 0] = param[3];
  typeArray[index + 4 | 0] = param[4];
  typeArray[index + 5 | 0] = param[5];
  typeArray[index + 6 | 0] = param[6];
  typeArray[index + 7 | 0] = param[7];
  typeArray[index + 8 | 0] = param[8];
  typeArray[index + 9 | 0] = param[9];
  typeArray[index + 10 | 0] = param[10];
  typeArray[index + 11 | 0] = param[11];
  typeArray[index + 12 | 0] = param[12];
  typeArray[index + 13 | 0] = param[13];
  typeArray[index + 14 | 0] = param[14];
  typeArray[index + 15 | 0] = param[15];
}

function setUint32_1(index, value, typeArray) {
  typeArray[index] = value;
}

function getFloat3Tuple(index, typeArray) {
  return [
          typeArray[index],
          typeArray[index + 1 | 0],
          typeArray[index + 2 | 0]
        ];
}

function getFloat4Tuple(index, typeArray) {
  return [
          typeArray[index],
          typeArray[index + 1 | 0],
          typeArray[index + 2 | 0],
          typeArray[index + 3 | 0]
        ];
}

function getUint32_1(index, typeArray) {
  return typeArray[index];
}

function getFloat1(index, typeArray) {
  return typeArray[index];
}

function getFloat32Array(typeArray, startIndex, endIndex) {
  return Js_typed_array.$$Float32Array.slice(startIndex, endIndex, typeArray);
}

function getUint32Array(typeArray, startIndex, endIndex) {
  return Js_typed_array.$$Uint32Array.slice(startIndex, endIndex, typeArray);
}

function fillFloat32ArrayWithOffset(targetTypeArr, sourceTypeArr, offset) {
  Js_typed_array.$$Float32Array.setArrayOffset(sourceTypeArr, offset, targetTypeArr);
}

function fillUint32ArrayWithOffset(targetTypeArr, sourceTypeArr, offset) {
  Js_typed_array.$$Uint32Array.setArrayOffset(sourceTypeArr, offset, targetTypeArr);
}

function reduceFloat32Array(typeArr, acc, f) {
  return Js_typed_array.$$Float32Array.reduce(f, acc, typeArr);
}

export {
  getFloat16TypeArray ,
  setFloat1 ,
  setFloat3 ,
  setFloat4 ,
  setFloat16 ,
  setUint32_1 ,
  getFloat3Tuple ,
  getFloat4Tuple ,
  getUint32_1 ,
  getFloat1 ,
  getFloat32Array ,
  getUint32Array ,
  fillFloat32ArrayWithOffset ,
  fillUint32ArrayWithOffset ,
  reduceFloat32Array ,
}
/* No side effect */
