open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/app_manager.feature")

defineFeature(feature, test => {
//   test(."load generated app", ({given, \"when", \"and", then}) => {
//     let firstExtension = ref(Obj.magic(1))
//     let secondExtension = ref(Obj.magic(1))
//     let firstContribute = ref(Obj.magic(1))

//     given("prepare", () => {
//       FileTool.buildFakeTextDecoder(FileTool.convertUint8ArrayToBuffer)
//       FileTool.buildFakeTextEncoder(.)
//     })

//     \"and"("generate two extensions that the seond is started", () => {
//       firstExtension :=
//         Main.generateExtension(
//           (
//             {
//               name: "first-extension",
//               protocol: {
//                 name: "protocol",
//                 version: "0.3.0",
//               },
//               dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
//                 "a1",
//                 "1",
//               ),
//               dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
//                 "b1",
//                 "2",
//               ),
//             }: ExtensionFileType.extensionPackageData
//           ),
//           `
// window.Extension = {
//       getExtensionService: () =>{},
//       createExtensionState: () => {},
//       getExtensionLife: (api, extensionName) =>{
// return {
//   onStart: (meta3dState, service) =>{
// window.startFlag += 1
//   }
// }
//       }
// }
//         `,
//         )

//       secondExtension :=
//         Main.generateExtension(
//           (
//             {
//               name: "second-extension",
//               protocol: {
//                 name: "protocol",
//                 version: "0.3.0",
//               },
//               dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
//                 "a2",
//                 "2",
//               ),
//               dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
//                 "b2",
//                 "3",
//               ),
//             }: ExtensionFileType.extensionPackageData
//           ),
//           `
// window.Extension = {
//       getExtensionService: () =>{},
//       createExtensionState: () => {},
//       getExtensionLife: (api, extensionName) =>{
// return {
//   onStart: (meta3dState, service) =>{
// window.startFlag += 2
//   }
// }
//       }
// }
//         `,
//         )

//         TODO set firstContribute
//     })

//     \"and"("generate one contribute", () => {
//       ()
//     })

//     \"and"("load them", () => {
//       ()
//     })

//     \"when"("generate app with them", () => {
//       ()
//     })

//     \"and"("load app", () => {
//       ()
//     })

//     then("the two extensions should be registered", () => {
//       ()
//     })

//     \"and"("the one contribute should be registered", () => {
//       ()
//     })

//     \"and"("the second extension should be started", () => {
//       ()
//     })
//   })
})
