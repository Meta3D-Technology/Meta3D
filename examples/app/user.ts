import { prepare as prepareMeta3D, registerExtension, registerContribute, startExtensions, compressContribute, loadContribute } from "meta3d"
// import { getExtensionService as getAppExtensionService, getExtensionLife as getAppExtensionLife, createExtensionState as createAppExtensionState } from "meta3d-app"
// import { getExtensionService as getTest1ExtensionService, getExtensionLife as getTest1ExtensionLife, createExtensionState as createTest1ExtensionState } from "meta3d-extension-test1"
// import { getContribute as getTest1Contribute } from "meta3d-contribute-test1"
import { compressExtension, loadExtension } from "meta3d";
// import { dependentExtensionNameMap as appExtensionDependentExtensionNameMap } from "../../protocols/extension_protocols/meta3d-app-protocol/src/service/DependentExtensionType";
// import { dependentContributeNameMap as appExtensionDependentContributeNameMap } from "../../protocols/extension_protocols/meta3d-app-protocol/src/service/DependentContributeType";
// import { service as appExtensionService } from "../../protocols/extension_protocols/meta3d-app-protocol/src/service/ServiceType";
// import { state as appExtensionState } from "../../protocols/extension_protocols/meta3d-app-protocol/src/state/StateType";
// import { dependentExtensionNameMap as test1ExtensionDependentExtensionNameMap } from "../../protocols/extension_protocols/meta3d-extension-test1-protocol/src/service/DependentExtensionType";
// import { dependentContributeNameMap as test1ExtensionDependentContributeNameMap } from "../../protocols/extension_protocols/meta3d-extension-test1-protocol/src/service/DependentContributeType";
// import { service as test1ExtensionService } from "../../protocols/extension_protocols/meta3d-extension-test1-protocol/src/service/ServiceType";
// import { state as test1ExtensionState } from "../../protocols/extension_protocols/meta3d-extension-test1-protocol/src/state/StateType";

let appExtensionFileData =
    loadExtension(compressExtension(
        `
        (()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{createExtensionState:()=>r,getExtensionLife:()=>a,getExtensionService:()=>n,getName:()=>o});let o=()=>"meta3d-app",n=(e,[{meta3dTest1ExtensionName:t},o])=>({run:o=>{let n=e.getExtensionState(o,t),{log:r,registerInfo:a}=e.getExtensionService(o,t);return n=a(n,o),r(n),e.setExtensionState(o,t,n)}}),r=()=>null,a=(e,t)=>({onRegister:(e,t)=>(console.log("meta3d-app onRegister"),e),onStart:(e,t)=>(console.log("meta3d-app onStart"),t.run(e))});window.Extension=t})();
        `
    ))
let appExtensionName = appExtensionFileData.extensionName

let test1ExtensionFileData =
    loadExtension(compressExtension(
        `
(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{createExtensionState:()=>i,getExtensionLife:()=>r,getExtensionService:()=>n,getName:()=>o});let o=()=>"meta3d-extension-test1",n=(e,[t,{meta3dTest1ContributeName:o}])=>({log:({infos:e})=>{console.log("meta3d-extension-test1 extension->log infos:",e)},registerInfo:(t,n)=>{let{getInfo:i}=e.getContribute(n,o);return t.infos[o]=i(),t}}),i=()=>({infos:{}}),r=(e,t)=>({onRegister:(e,t)=>(console.log("meta3d-extension-test1 onRegister"),e)});window.Extension=t})();
        `
    ))
let test1ExtensionName = "test1Extension"


let test1ContributeFileData =
    loadContribute(compressContribute(
        `
(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{getContribute:()=>r,getName:()=>o});let o=()=>"meta3d-contribute-test1",r=(e,t)=>({getInfo:()=>(console.log(e,t),"contribute_test1_info")});window.Contribute=t})();
        `
    ))
let test1ContributeName = test1ContributeFileData.contributeName








let meta3dState = prepareMeta3D()

meta3dState = registerExtension(meta3dState, appExtensionName, appExtensionFileData.getExtensionServiceFunc,
    appExtensionFileData.getExtensionLifeFunc,
    [
        {
            meta3dTest1ExtensionName: test1ExtensionName
        },
        null
    ], appExtensionFileData.createExtensionStateFunc())

meta3dState = registerExtension(meta3dState, test1ExtensionName, test1ExtensionFileData.getExtensionServiceFunc, test1ExtensionFileData.getExtensionLifeFunc, [
    null,
    {
        meta3dTest1ContributeName: test1ContributeName
    }
], test1ExtensionFileData.createExtensionStateFunc())




meta3dState = registerContribute(meta3dState, test1ContributeName, test1ContributeFileData.getContributeFunc, [
    null,
    null
])




meta3dState = startExtensions(meta3dState, [
    "meta3d-app"
])






