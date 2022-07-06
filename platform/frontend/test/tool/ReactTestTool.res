open Meta3dBsJestCucumber

open Expect

let createSnapshotJsonStringify = component =>
  ReactTestRenderer.toJSON(component)->Js.Json.stringify

let createSnapshotAndMatch = component =>
  (toMatchSnapshotFunc->Obj.magic)(expect(ReactTestRenderer.toJSON(component)))