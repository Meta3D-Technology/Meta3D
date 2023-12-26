

import * as Most from "most";
import * as Js_exn from "../../../../../../../../../node_modules/rescript/lib/es6/js_exn.js";
import * as IDBFactory$IndexedDB from "../../../../../../../../../node_modules/rescript-indexeddb/lib/es6_global/src/IDBFactory.bs.js";
import * as IDBDatabase$IndexedDB from "../../../../../../../../../node_modules/rescript-indexeddb/lib/es6_global/src/IDBDatabase.bs.js";
import * as IDBObjectStore$IndexedDB from "../../../../../../../../../node_modules/rescript-indexeddb/lib/es6_global/src/IDBObjectStore.bs.js";

function _getDatabseName(param) {
  return "Meta3d_ElementVisualApp_Database";
}

function _getTabeleName(param) {
  return "Meta3d_ElementVisualApp_Table";
}

function _getKeyFieldName(param) {
  return "key";
}

function initForElementVisualApp(param) {
  var request = IDBFactory$IndexedDB.open_(indexedDB, undefined, "Meta3d_ElementVisualApp_Database");
  var db = {
    contents: 1
  };
  var __x = Most.fromPromise(new Promise((function (resolve, reject) {
              request.onerror = (function ($$event) {
                  reject(Js_exn.raiseError("open databse error: " + $$event.target.errorCode + ""));
                });
              request.onsuccess = (function ($$event) {
                  console.log("open onsuccess");
                  db.contents = $$event.target.result;
                  resolve(db.contents);
                });
              request.onupgradeneeded = (function ($$event) {
                  console.log("open onupgradeneeded");
                  db.contents = $$event.target.result;
                  if (db.contents.objectStoreNames.contains("Meta3d_ElementVisualApp_Table")) {
                    return reject(Js_exn.raiseError("database->table error: table shouldn't exist: Meta3d_ElementVisualApp_Table"));
                  }
                  IDBDatabase$IndexedDB.createObjectStore(db.contents, {
                        keyPath: {
                          TAG: /* String */0,
                          _0: "key"
                        },
                        autoIncrement: false
                      }, "Meta3d_ElementVisualApp_Table");
                  var transaction = $$event.target.transaction;
                  transaction.oncomplete = (function ($$event) {
                      console.log("transaction oncomplete");
                      resolve(db.contents);
                    });
                });
            })));
  return Most.map((function (param) {
                return db.contents;
              }), __x);
}

function getElementVisualApp(stream) {
  return Most.flatMap((function (db) {
                var transaction = IDBDatabase$IndexedDB.transaction(db, "readwrite", ["Meta3d_ElementVisualApp_Table"]);
                var objectStore = transaction.objectStore("Meta3d_ElementVisualApp_Table");
                var request = objectStore.get(IDBKeyRange.only(1));
                return Most.fromPromise(new Promise((function (resolve, reject) {
                                  request.onerror = (function ($$event) {
                                      reject(Js_exn.raiseError("get error: " + $$event.target.errorCode + ""));
                                    });
                                  request.onsuccess = (function ($$event) {
                                      var result = request.result;
                                      if (result) {
                                        console.log("get data");
                                        return resolve(result.appBinaryFile);
                                      } else {
                                        return reject(Js_exn.raiseError("get no data}"));
                                      }
                                    });
                                })));
              }), stream);
}

function setElementVisualApp(stream, appBinaryFile) {
  return Most.flatMap((function (db) {
                var transaction = IDBDatabase$IndexedDB.transaction(db, "readwrite", ["Meta3d_ElementVisualApp_Table"]);
                var objectStore = transaction.objectStore("Meta3d_ElementVisualApp_Table");
                var request = IDBObjectStore$IndexedDB.put(objectStore, undefined, {
                      key: 1,
                      appBinaryFile: appBinaryFile
                    });
                return Most.fromPromise(new Promise((function (resolve, reject) {
                                  request.onerror = (function ($$event) {
                                      reject(Js_exn.raiseError("set error: " + $$event.target.errorCode + ""));
                                    });
                                  request.onsuccess = (function ($$event) {
                                      console.log("set onsuccess");
                                      resolve(db);
                                    });
                                })));
              }), stream);
}

export {
  _getDatabseName ,
  _getTabeleName ,
  _getKeyFieldName ,
  initForElementVisualApp ,
  getElementVisualApp ,
  setElementVisualApp ,
}
/* most Not a pure module */
