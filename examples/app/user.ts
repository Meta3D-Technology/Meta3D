import { generateContribute, loadContribute, convertAllFileDataForApp, generateApp, loadApp } from "meta3d"
import { generateExtension, loadExtension } from "meta3d";





let appExtensionFileData =
	loadExtension(generateExtension(
		{
			"name": "meta3d-app",
			"protocol": {
				"name": "meta3d-app-protocol",
				"version": "0.3.0"
			},
			"dependentExtensionNameMap": {
				"meta3dTest1ExtensionName": {
					"protocolName": "meta3d-extension-test1-protocol",
					"protocolVersion": "^0.3.0"
				}
			},
			"dependentContributeNameMap": {}
		},
		`
        (()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{createExtensionState:()=>r,getExtensionLife:()=>a,getExtensionService:()=>n,getName:()=>o});let o=()=>"meta3d-app",n=(e,[{meta3dTest1ExtensionName:t},o])=>({run:o=>{let n=e.getExtensionState(o,t),{log:r,registerInfo:a}=e.getExtensionService(o,t);return n=a(n,o),r(n),e.setExtensionState(o,t,n)}}),r=()=>null,a=(e,t)=>({onRegister:(e,t)=>(console.log("meta3d-app onRegister"),e),onStart:(e,t)=>(console.log("meta3d-app onStart"),t.run(e))});window.Extension=t})();
        `
	))
let appExtensionName = appExtensionFileData.extensionPackageData.name

let test1ExtensionFileData =
	loadExtension(generateExtension(
		{
			"name": "meta3d-extension-test1",
			"protocol": {
				"name": "meta3d-extension-test1-protocol",
				"version": "0.3.0"
			},
			"dependentExtensionNameMap": {},
			"dependentContributeNameMap": {
				"meta3dTest1ContributeName": {
					"protocolName": "meta3d-contribute-test1-protocol",
					"protocolVersion": "^0.3.0"
				}
			}
		},
		`
(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{createExtensionState:()=>i,getExtensionLife:()=>r,getExtensionService:()=>n,getName:()=>o});let o=()=>"meta3d-extension-test1",n=(e,[t,{meta3dTest1ContributeName:o}])=>({log:({infos:e})=>{console.log("meta3d-extension-test1 extension->log infos:",e)},registerInfo:(t,n)=>{let{getInfo:i}=e.getContribute(n,o);return t.infos[o]=i(),t}}),i=()=>({infos:{}}),r=(e,t)=>({onRegister:(e,t)=>(console.log("meta3d-extension-test1 onRegister"),e)});window.Extension=t})();
        `
	))
let test1ExtensionName = "test1Extension"


let test1ContributeFileData =
	loadContribute(generateContribute(
		{
			"name": "meta3d-contribute-test1",
			"protocol": {
				"name": "meta3d-contribute-test1-protocol",
				"version": "0.3.0"
			},
			"dependentExtensionNameMap": {},
			"dependentContributeNameMap": {}
		},
		`
(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{getContribute:()=>r,getName:()=>o});let o=()=>"meta3d-contribute-test1",r=(e,t)=>({getInfo:()=>(console.log(e,t),"contribute_test1_info")});window.Contribute=t})();
        `
	))
let test1ContributeName = test1ContributeFileData.contributePackageData.name









let allExtensionNewNames = [appExtensionName, test1ExtensionName]
let allContributeNewNames = [test1ContributeName]

let isStartedExtensions = [appExtensionName]








let meta3dState = loadApp(generateApp(convertAllFileDataForApp([appExtensionFileData, test1ExtensionFileData], [test1ContributeFileData], [allExtensionNewNames, isStartedExtensions, allContributeNewNames])))