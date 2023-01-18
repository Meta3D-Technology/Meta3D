open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/extension_file_manager.feature")

defineFeature(feature, test => {
  test(."load generated extension", ({given, \"when", \"and", then}) => {
    let fileData = ref(Obj.magic(1))

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
              version:"0.4.1",
            },
            dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
          }: ExtensionFileType.extensionPackageData
        ),
        ` (()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{createExtensionState:()=>r,getExtensionLife:()=>a,getExtensionService:()=>n,getName:()=>o});let o=()=>"meta3d-app",n=(e,[{meta3dTest1ExtensionProtocolName:t},o])=>({run:o=>{let n=e.getExtensionState(o,t),{log:r,registerInfo:a}=e.getExtensionService(o,t);return n=a(n,o),r(n),e.setExtensionState(o,t,n)}}),r=()=>null,a=(e,t)=>({onRegister:(e,t)=>(console.log("meta3d-app onRegister"),e),onStart:(e,t)=>(console.log("meta3d-app onStart"),t.run(e))});window.Extension=t})(); `,
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
              version:"0.4.1",
            },
            dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
          }: ExtensionFileType.extensionPackageData
        )
    })

    \"and"("get func data", () => {
      fileData.contents.extensionFuncData->ExpectTool.isUint8Array->expect == true
    })
  })

  test(."load generated contribute", ({given, \"when", \"and", then}) => {
    let fileData = ref(Obj.magic(1))

    given("prepare", () => {
      FileTool.buildFakeTextDecoder(FileTool.convertUint8ArrayToBuffer)
      FileTool.buildFakeTextEncoder(.)
    })

    \"when"("generate contribute and load it", () => {
      let file = Main.generateContribute(
        (
          {
            name: "meta3d-contribute-test1",
            protocol: {
              name: "meta3d-contribute-test1-protocol",
              version:"0.4.1",
            },
            dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
          }: ExtensionFileType.contributePackageData
        ),
        ` (()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{getContribute:()=>r,getName:()=>o});let o=()=>"meta3d-contribute-test1",r=(e,t)=>({getInfo:()=>(console.log(e,t),"contribute_test1_info")});window.Contribute=t})(); `,
      )

      fileData := Main.loadContribute(file)
    })

    then("get package data", () => {
      fileData.contents.contributePackageData->expect ==
        (
          {
            name: "meta3d-contribute-test1",
            protocol: {
              name: "meta3d-contribute-test1-protocol",
              version:"0.4.1",
            },
            dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
          }: ExtensionFileType.contributePackageData
        )
    })

    \"and"("get func data", () => {
      fileData.contents.contributeFuncData->ExpectTool.isUint8Array->expect == true
    })
  })
})
