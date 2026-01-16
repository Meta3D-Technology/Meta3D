

import * as Curry from "./../../../../../rescript/lib/es6/curry.js";
import * as Belt_List from "./../../../../../rescript/lib/es6/belt_List.js";

function printForDebug(value) {
  console.log(JSON.stringify(value));
  return value;
}

function printStringForDebug(value) {
  console.log(value);
  return value;
}

function printListForDebug(list) {
  console.log(Belt_List.toArray(list));
  return list;
}

function error(message) {
  console.error(message);
}

function logForDebug(value) {
  console.log(value);
  console.trace();
}

function log(value) {
  console.log(JSON.stringify(value));
}

function debugWithFunc(func, isTest) {
  if (isTest) {
    return Curry._1(func, undefined);
  }
  
}

function _debug(msg) {
  console.debug(msg);
}

function debug(buildMessageFunc, isTest) {
  if (!isTest) {
    return ;
  }
  var msg = Curry._1(buildMessageFunc, undefined);
  console.debug(msg);
  console.trace();
}

function getJsonStr(json) {
  return JSON.stringify(json);
}

function buildDebugMessage(description, params, param) {
  return "\r\n  Debug:\r\n\r\n  description\r\n  " + description + "\r\n\r\n  params\r\n  " + params + "\r\n\r\n  ";
}

function buildDebugJsonMessage(description, $$var, param) {
  var varStr = JSON.stringify($$var);
  return "\r\n  DebugJson:\r\n\r\n  description\r\n  " + description + "\r\n\r\n  variable value\r\n  " + varStr + "\r\n  ";
}

function buildFatalMessage(title, description, reason, solution, params) {
  return "\r\n  Fatal:\r\n\r\n  title\r\n  " + title + "\r\n\r\n  description\r\n  " + description + "\r\n\r\n  reason\r\n  " + reason + "\r\n\r\n  solution\r\n  " + solution + "\r\n\r\n  params\r\n  " + params + "\r\n\r\n   ";
}

function buildErrorMessage(title, description, reason, solution, params) {
  return "\r\n  Error:\r\n\r\n  title\r\n  " + title + "\r\n\r\n  description\r\n  " + description + "\r\n\r\n  reason\r\n  " + reason + "\r\n\r\n  solution\r\n  " + solution + "\r\n\r\n  params\r\n  " + params + "\r\n\r\n   ";
}

function buildAssertMessage(expect, actual) {
  return "expect " + expect + ", but actual " + actual;
}

export {
  printForDebug ,
  printStringForDebug ,
  printListForDebug ,
  error ,
  logForDebug ,
  log ,
  debugWithFunc ,
  _debug ,
  debug ,
  getJsonStr ,
  buildDebugMessage ,
  buildDebugJsonMessage ,
  buildFatalMessage ,
  buildErrorMessage ,
  buildAssertMessage ,
}
/* No side effect */
