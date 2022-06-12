open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/extension_file_manager.feature")

defineFeature(feature, test => {
  let fileData = ref(Obj.magic(1))

  test(."load generated extension", ({given, \"when", \"and", then}) => {
    given("prepare", () => {
      FileTool.buildFakeTextDecoder(FileTool.convertUint8ArrayToBuffer)
      FileTool.buildFakeTextEncoder(.)
    })

    \"when"("generate extension and load it", () => {
      let file = Main.generateExtension(
        (
          {
            name: "meta3d-app",
            protocol: {
              name: "meta3d-app-protocol",
              version: "0.3.0",
            },
            dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
          }: ExtensionFileType.extensionPackageData
        ),
        `
        (()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{createExtensionState:()=>r,getExtensionLife:()=>a,getExtensionService:()=>n,getName:()=>o});let o=()=>"meta3d-app",n=(e,[{meta3dTest1ExtensionName:t},o])=>({run:o=>{let n=e.getExtensionState(o,t),{log:r,registerInfo:a}=e.getExtensionService(o,t);return n=a(n,o),r(n),e.setExtensionState(o,t,n)}}),r=()=>null,a=(e,t)=>({onRegister:(e,t)=>(console.log("meta3d-app onRegister"),e),onStart:(e,t)=>(console.log("meta3d-app onStart"),t.run(e))});window.Extension=t})();
        `,
      )

      fileData := Main.loadExtension(file)
    })

    then("get package data", () => {
      fileData.contents.extensionPackageData->expect ==
        (
          {
            name: "meta3d-app",
            protocol: {
              name: "meta3d-app-protocol",
              version: "0.3.0",
            },
            dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
          }: ExtensionFileType.extensionPackageData
        )
    })

    \"and"("get func data", () => {
      (
        fileData.contents.extensionFuncData.getExtensionServiceFunc->ExpectTool.isFunction,
        fileData.contents.extensionFuncData.createExtensionStateFunc->ExpectTool.isFunction,
        fileData.contents.extensionFuncData.getExtensionLifeFunc->ExpectTool.isFunction,
      )->expect == (true, true, true)
    })
  })
})
