// import { loadFeature, defineFeature } from "jest-cucumber"
// import { empty, just, map } from "most";
// import { createSandbox } from "sinon";
// import { resolve } from "../../../../services/meta3d-tool-utils/src/publish/PromiseTool";
// import { getFileID } from "meta3d-backend-cloudbase";
// // import { findAllPublishAppsByAccount, findAllPublishApps, findPublishApp, publish } from "../../src/application_layer/publish/PublishAppService";
// import {  findAllPublishApps, findPublishApp, publish } from "../../src/application_layer/publish/PublishAppService";
// import { buildKey } from "../tool/PublishAppTool"
// const feature = loadFeature("./test/features/publish_app.feature")
// defineFeature(feature, test => {
//     let sandbox = null
//     let onUploadProgressFunc, updateDataFunc, uploadFileFunc, hasAccountFunc, addDataFunc, getFileIDFunc
//     let getDataByKeyFunc, downloadFileFunc
//     let getDataByKeyContainFunc
//     let getDataFunc
//     function _createFuncsForPublish(sandbox) {
//         onUploadProgressFunc = "onUploadProgressFunc"
//         uploadFileFunc = sandbox.stub()
//         hasAccountFunc = sandbox.stub()
//         addDataFunc = sandbox.stub().returns(
//             resolve(null)
//         )
//         updateDataFunc = sandbox.stub().returns(
//             resolve(null)
//         )
//         getFileIDFunc = getFileID
//     }
//     function _prepare(given) {
//         given('prepare sandbox', () => {
//             sandbox = createSandbox()
//         });
//     }
//     test('if not exist, publish should add app', ({ given, and, when, then }) => {
//         let appBinaryFile, appName, account, description
//         let fileID = "1"
//         _prepare(given)
//         given('prepare funcs', () => {
//             _createFuncsForPublish(sandbox)
//             uploadFileFunc.returns(
//                 just({ fileID })
//             )
//             hasAccountFunc.returns(
//                 just(false)
//             )
//         });
//         and('generate a app', () => {
//             appBinaryFile = new ArrayBuffer(10)
//             appName = "app1"
//             account = "account1"
//             description = "d1"
//         });
//         when('publish the app', () => {
//             return publish(
//                 [onUploadProgressFunc, uploadFileFunc, hasAccountFunc, addDataFunc, updateDataFunc, getFileIDFunc],
//                 appBinaryFile,
//                 appName,
//                 account,
//                 description
//             ).drain()
//         });
//         then('should upload app', () => {
//             expect(uploadFileFunc).toCalledWith([
//                 onUploadProgressFunc,
//                 "apps/account1_app1.arrayBuffer",
//                 appBinaryFile,
//                 "account1_app1"
//             ])
//         });
//         and('add to collection', () => {
//             expect(addDataFunc).toCalledWith([
//                 "publishedapps",
//                 buildKey(appName, account),
//                 {
//                     account,
//                     appName,
//                     description,
//                     fileID
//                 }
//             ])
//         });
//     });
//     test('if exist, publish should overwrite app', ({ given, and, when, then }) => {
//         let fileID1 = "1"
//         let fileID2 = "2"
//         let appBinaryFile1, appName1, account1, description1
//         let appBinaryFile2, appName2, account2, description2
//         _prepare(given)
//         given('prepare funcs', () => {
//             _createFuncsForPublish(sandbox)
//             uploadFileFunc.onCall(0).returns(
//                 just({ fileID: fileID1 })
//             )
//             uploadFileFunc.onCall(1).returns(
//                 just({ fileID: fileID2 })
//             )
//             hasAccountFunc.onCall(0).returns(
//                 just(false)
//             )
//             hasAccountFunc.onCall(1).returns(
//                 just(true)
//             )
//         });
//         and('generate two apps with the same key', () => {
//             appBinaryFile1 = new ArrayBuffer(10)
//             appName1 = "app1"
//             account1 = "account1"
//             description1 = "d1"
//             appBinaryFile2 = new ArrayBuffer(11)
//             appName2 = appName1
//             account2 = account1
//             description2 = "d2"
//         });
//         and('publish the first app', () => {
//             return publish(
//                 [onUploadProgressFunc, uploadFileFunc, hasAccountFunc, addDataFunc, updateDataFunc, getFileIDFunc],
//                 appBinaryFile1,
//                 appName1,
//                 account1,
//                 description1
//             ).drain()
//         });
//         when('publish the second app', () => {
//             return publish(
//                 [onUploadProgressFunc, uploadFileFunc, hasAccountFunc, addDataFunc, updateDataFunc, getFileIDFunc],
//                 appBinaryFile2,
//                 appName2,
//                 account2,
//                 description2
//             ).drain()
//         });
//         then(/^should upload app(\d+)'s binary file$/, () => {
//             expect(uploadFileFunc.getCall(1)).toCalledWith([
//                 onUploadProgressFunc,
//                 "apps/account1_app1.arrayBuffer",
//                 appBinaryFile2,
//                 "account1_app1"
//             ])
//         });
//         and('update collection', () => {
//             expect(addDataFunc).toCalledOnce()
//             expect(updateDataFunc).toCalledOnce()
//             expect(updateDataFunc).toCalledWith([
//                 "publishedapps",
//                 buildKey(appName1, account1),
//                 {
//                     account: account1,
//                     appName: appName1,
//                     description: description2,
//                     fileID: fileID2
//                 }
//             ])
//         });
//     });
//     function _createFuncsForFindPublishApp(sandbox) {
//         getDataByKeyFunc = sandbox.stub()
//         downloadFileFunc = sandbox.stub()
//     }
//     function _createFuncsForFindAllPublishAppsByAccount(sandbox) {
//         getDataByKeyContainFunc = sandbox.stub()
//     }
//     function _createFuncsForFindAllPublishApps(sandbox) {
//         getDataFunc = sandbox.stub()
//     }
//     test('if not find, findPublishApp return empty', ({ given, and, when, then }) => {
//         _prepare(given)
//         given('prepare funcs', () => {
//             _createFuncsForFindPublishApp(sandbox)
//             getDataByKeyFunc.returns(
//                 resolve([])
//             )
//         });
//         when('find the published app', () => {
//         });
//         then('should return empty', () => {
//             return findPublishApp(
//                 [getDataByKeyFunc, downloadFileFunc],
//                 "", ""
//             ).observe(result => {
//                 expect(result).toBeNull()
//             })
//         });
//     });
//     test('if find, findPublishApp return published app file', ({ given, and, when, then }) => {
//         let appBinaryFile = new ArrayBuffer(10)
//         let fileID = "id1"
//         _prepare(given)
//         given('prepare funcs', () => {
//             _createFuncsForFindPublishApp(sandbox)
//             getDataByKeyFunc.returns(
//                 resolve([
//                     {
//                         fileID: fileID
//                     }
//                 ])
//             )
//             downloadFileFunc.returns(just(appBinaryFile))
//         });
//         and('generate a app', () => {
//         });
//         and('publish the app', () => {
//         });
//         when('find the published app', () => {
//         });
//         then('should return the app file', () => {
//             return findPublishApp(
//                 [getDataByKeyFunc, downloadFileFunc],
//                 "", ""
//             ).observe(result => {
//                 expect(downloadFileFunc).toCalledWith([
//                     fileID
//                 ])
//                 expect(result).toEqual(appBinaryFile)
//             })
//         });
//     });
//     // test('if not find, findAllPublishAppsByAccount return empty array', ({ given, and, when, then }) => {
//     //     _prepare(given)
//     //     given('prepare funcs', () => {
//     //         _createFuncsForFindAllPublishAppsByAccount(sandbox)
//     //         getDataByKeyContainFunc.returns(
//     //             just([])
//     //         )
//     //     });
//     //     when('find all published apps', () => {
//     //     });
//     //     then('should return empty array', () => {
//     //         return findAllPublishAppsByAccount(
//     //             getDataByKeyContainFunc,
//     //             ""
//     //         ).observe(result => {
//     //             expect(result).toEqual([])
//     //         })
//     //     });
//     // });
//     // test('if find, findAllPublishAppsByAccount return all publish app data', ({ given, and, when, then }) => {
//     //     let fileID1 = "1"
//     //     let fileID2 = "2"
//     //     let account1
//     //     let appName1
//     //     let appName2
//     //     let description1
//     //     let description2
//     //     _prepare(given)
//     //     and('generate two apps by the same user', () => {
//     //         account1 = "account1"
//     //         appName1 = "app1"
//     //         appName2 = "app2"
//     //         description1 = "d1"
//     //         description2 = "d2"
//     //     });
//     //     given('prepare funcs', () => {
//     //         _createFuncsForFindAllPublishAppsByAccount(sandbox)
//     //         getDataByKeyContainFunc.returns(
//     //             just([
//     //                 {
//     //                     account: account1, appName: appName1,
//     //                     description: description1,
//     //                     fileID: fileID1
//     //                 },
//     //                 {
//     //                     account: account1, appName: appName2,
//     //                     description: description2,
//     //                     fileID: fileID2
//     //                 }
//     //             ])
//     //         )
//     //     });
//     //     and('publish the apps', () => {
//     //     });
//     //     when('find all published apps', () => {
//     //     });
//     //     then('should return the apps\' data', () => {
//     //         return findAllPublishAppsByAccount(
//     //             getDataByKeyContainFunc,
//     //             account1
//     //         ).observe(result => {
//     //             expect(getDataByKeyContainFunc).toCalledWith([
//     //                 "publishedapps",
//     //                 [account1]
//     //             ])
//     //             expect(result).toEqual([{
//     //                 account: account1, appName: appName1,
//     //                 description: description1
//     //             },
//     //             {
//     //                 account: account1, appName: appName2,
//     //                 description: description2
//     //             }])
//     //         })
//     //     });
//     // });
//     test('if not find, findAllPublishApps return empty array', ({ given, and, when, then }) => {
//         _prepare(given)
//         given('prepare funcs', () => {
//             _createFuncsForFindAllPublishApps(sandbox)
//             getDataFunc.returns(
//                 resolve([])
//             )
//         });
//         when('find all published apps', () => {
//         });
//         then('should return empty array', () => {
//             return findAllPublishApps(
//                 getDataFunc,
//             ).observe(result => {
//                 expect(result).toEqual([])
//             })
//         });
//     });
//     test('if find, findAllPublishApps return all publish app data', ({ given, and, when, then }) => {
//         let fileID1 = "1"
//         let fileID2 = "2"
//         let account1
//         let account2
//         let appName1
//         let appName2
//         let description1
//         let description2
//         _prepare(given)
//         and('generate two apps by two users', () => {
//             account1 = "account1"
//             account2 = "account2"
//             appName1 = "app1"
//             appName2 = "app2"
//             description1 = "d1"
//             description2 = "d2"
//         });
//         given('prepare funcs', () => {
//             _createFuncsForFindAllPublishApps(sandbox)
//             getDataFunc.returns(
//                 resolve([
//                     {
//                         account: account1, appName: appName1,
//                         description: description1,
//                         fileID: fileID1
//                     },
//                     {
//                         account: account1, appName: appName2,
//                         description: description2,
//                         fileID: fileID2
//                     }
//                 ])
//             )
//         });
//         and('publish the apps', () => {
//         });
//         when('find all published apps', () => {
//         });
//         then('should return the apps\' data', () => {
//             return findAllPublishApps(
//                 getDataFunc
//             ).observe(result => {
//                 expect(getDataFunc).toCalledWith([
//                     "publishedapps"
//                 ])
//                 expect(result).toEqual([{
//                     account: account1, appName: appName1,
//                     description:description1
//                 },
//                 {
//                     account: account1, appName: appName2,
//                     description:description2
//                 }])
//             })
//         });
//     });
// })
