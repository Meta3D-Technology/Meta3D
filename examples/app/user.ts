import { prepare as prepareMeta3D, registerExtension, registerContribute, startExtensions } from "meta3d"
import { getExtensionService as getAppExtensionService, getExtensionLife as getAppExtensionLife, createExtensionState as createAppExtensionState } from "meta3d-app"
import { getExtensionService as getTest1ExtensionService, getExtensionLife as getTest1ExtensionLife, createExtensionState as createTest1ExtensionState } from "meta3d-extension-test1"
import { getContribute as getTest1Contribute } from "meta3d-contribute-test1"


let meta3dState = prepareMeta3D()

meta3dState = registerExtension(meta3dState, "meta3d-app", getAppExtensionService,
    getAppExtensionLife,
    [
        {
            meta3dTest1ExtensionName: "meta3d-test1-extension"
        },
        null
    ], createAppExtensionState())

meta3dState = registerExtension(meta3dState, "meta3d-test1-extension", getTest1ExtensionService, getTest1ExtensionLife, [
    null,
    {
        meta3dTest1ContributeName: "meta3d-test1-contribute"
    }
], createTest1ExtensionState())




meta3dState = registerContribute(meta3dState, "meta3d-test1-contribute", getTest1Contribute, [
    null,
    null
])




meta3dState = startExtensions(meta3dState, [
    "meta3d-app"
])








// test publish extension

import { compressExtension, loadExtension } from "meta3d";


let file =
    compressExtension(
        `
        (()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{createExtensionState:()=>r,getExtensionLife:()=>a,getExtensionService:()=>n,getName:()=>o});let o=()=>"meta3d-app",n=(e,[{meta3dTest1ExtensionName:t},o])=>({run:o=>{let n=e.getExtensionState(o,t),{log:r,registerInfo:a}=e.getExtensionService(o,t);return n=a(n,o),r(n),e.setExtensionState(o,t,n)}}),r=()=>null,a=(e,t)=>({onRegister:(e,t)=>(console.log("meta3d-app onRegister"),e),onStart:(e,t)=>(console.log("meta3d-app onStart"),t.run(e))});window.Extension=t})();
        `
    )

let fileData = loadExtension(file)


console.log(fileData)
