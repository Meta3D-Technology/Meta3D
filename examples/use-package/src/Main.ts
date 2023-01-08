import { loadPackage, getExtensionService, getExtensionState, setExtensionState } from "meta3d-package"

import { service } from "meta3d-extension-test1-protocol/src/service/ServiceType"
import { state } from "meta3d-extension-test1-protocol/src/state/StateType"

// import * as packageBinaryFile from "arraybuffer-loader!./packages/p1_0.0.2.package"
import * as packageBinaryFile from "arraybuffer-loader!./packages/package-test1_0.0.3.package"



// console.log(ab)

// fetch("../packages/p1_0.0.2.package").then(response => response.arrayBuffer())
// fetch("src/packages/p1_0.0.2.package").then(response => response.arrayBuffer())
// fetch("./packages/p1_0.0.2.package").then(response => response.arrayBuffer())
//     .then(packageBinaryFile => {
//         let [meta3dState, _, entryExtensionProtocolName] = loadPackage(packageBinaryFile)

//         let { log, registerInfo } = getExtensionService<service>(meta3dState, entryExtensionProtocolName)

//         let entryExtensionState = getExtensionState<state>(meta3dState, entryExtensionProtocolName)


//         // meta3dState = setExtensionState(
//         //     meta3dState
//         //     , entryExtensionProtocolName,
//         //     registerInfo(entryExtensionState, meta3dState)
//         // )
//         entryExtensionState = registerInfo(entryExtensionState, meta3dState)

//         // let entryExtensionState = getExtensionState<state>(meta3dState, entryExtensionProtocolName)

//         log(entryExtensionState)
//     })


// debugger
let [meta3dState, _, entryExtensionProtocolName] = loadPackage(packageBinaryFile)
//  loadPackage(packageBinaryFile)

let { log, registerInfo } = getExtensionService<service>(meta3dState, entryExtensionProtocolName)

// console.log(getExtensionState)


let entryExtensionState = getExtensionState<state>(meta3dState, entryExtensionProtocolName)


// meta3dState = setExtensionState(
//     meta3dState
//     , entryExtensionProtocolName,
//     registerInfo(entryExtensionState, meta3dState)
// )
entryExtensionState = registerInfo(entryExtensionState, meta3dState)

// let entryExtensionState = getExtensionState<state>(meta3dState, entryExtensionProtocolName)

log(entryExtensionState)
