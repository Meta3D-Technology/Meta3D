open Meta3dBsJestCucumber

open Expect

let createSnapshotJsonStringify = component =>
  ReactTestRenderer.toJSON(component)->Js.Json.stringify

let createSnapshotAndMatch = component =>
  (toMatchSnapshotFunc->Obj.magic)(expect(ReactTestRenderer.toJSON(component)))

let prepare = %raw(`
    function(){
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
    }
    `)
