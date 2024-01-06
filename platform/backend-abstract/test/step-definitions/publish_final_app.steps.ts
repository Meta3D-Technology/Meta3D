import { loadFeature, defineFeature } from "jest-cucumber"
import { empty, just, map } from "most";
import { createSandbox, match } from "sinon";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool";
import { getFileID } from "meta3d-backend-cloudbase";
import { findAllPublishFinalApps, findPublishFinalApp, publish } from "../../src/application_layer/publish/PublishFinalAppService";
import { buildKey } from "../tool/PublishFinalAppTool"

const feature = loadFeature("./test/features/publish_final_app.feature")

defineFeature(feature, test => {
    let sandbox = null
    let onUploadProgressFunc, deleteFileFunc, updateDataFunc, uploadFileFunc, getDataByKeyFunc, addDataFunc, getFileIDFunc
    // let getDataByKeyContainFunc
    let downloadFileFunc
    let getDataFunc

    let _createFuncsForPublish = (sandbox) => {
        onUploadProgressFunc = "onUploadProgressFunc"
        uploadFileFunc = sandbox.stub()
        getDataByKeyFunc = sandbox.stub()
        addDataFunc = sandbox.stub().returns(
            resolve(null)
        )
        deleteFileFunc = sandbox.stub().returns(
            just(null)
        )
        updateDataFunc = sandbox.stub().returns(
            resolve(null)
        )
        getFileIDFunc = getFileID
    }

    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('if not exist, publish should add finalApp', ({ given, and, when, then }) => {
        let contentBinaryFile, singleEventBinaryFile, finalAppName, account, description,
            previewBase64, isRecommend
        let contentFileID = "1"
        let singleEventFileID = "2"

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncsForPublish(sandbox)

            uploadFileFunc.onCall(0).returns(
                just({ fileID: contentFileID })
            )
            uploadFileFunc.onCall(1).returns(
                just({ fileID: singleEventFileID })
            )
            getDataByKeyFunc.returns(
                resolve([])
            )
        });

        and('generate a finalApp', () => {
            contentBinaryFile = new ArrayBuffer(10)
            singleEventBinaryFile = new ArrayBuffer(11)
            finalAppName = "FinalApp1"
            account = "account1"
            description = "d1"
            previewBase64 = "p1"
            // useCount = 1
            isRecommend = true
        });

        when('publish the finalApp', () => {
            return publish(
                [onUploadProgressFunc, uploadFileFunc, deleteFileFunc, getDataByKeyFunc, addDataFunc, updateDataFunc, getFileIDFunc],
                contentBinaryFile,
                singleEventBinaryFile,
                finalAppName,
                account,
                description,
                previewBase64,
                // useCount,
                isRecommend,
            ).drain()
        });

        then('should upload finalApp', () => {
            expect(uploadFileFunc.getCall(0)).toCalledWith([
                onUploadProgressFunc,
                "finalapps/account1_FinalApp1_content.arrayBuffer",
                contentBinaryFile,
                "account1_FinalApp1_content"
            ])
            expect(uploadFileFunc.getCall(1)).toCalledWith([
                onUploadProgressFunc,
                "finalapps/account1_FinalApp1_singleEvent.arrayBuffer",
                singleEventBinaryFile,
                "account1_FinalApp1_singleEvent"
            ])
        });

        and('add to collection', () => {
            expect(addDataFunc).toCalledWith([
                "publishedfinalapps",
                buildKey(finalAppName, account),
                {
                    account,
                    finalAppName,
                    description,
                    previewBase64,
                    // useCount,
                    isRecommend,
                    contentFileID,
                    singleEventFileID
                }
            ])
        });
    });

    test('if exist, publish should overwrite finalApp', ({ given, and, when, then }) => {
        let contentFileID1 = "1"
        let singleEventFileID1 = "1_1"
        let contentFileID2 = "2"
        let singleEventFileID2 = "2_1"
        let contentBinaryFile1, singleEventBinaryFile1, finalAppName1, account1, description1,
            previewBase641, isRecommend1
        let contentBinaryFile2, singleEventBinaryFile2, finalAppName2, account2, description2,
            previewBase642, isRecommend2

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncsForPublish(sandbox)


            uploadFileFunc.onCall(0).returns(
                just({ fileID: contentFileID1 })
            )
            uploadFileFunc.onCall(1).returns(
                just({ fileID: singleEventFileID1 })
            )
            uploadFileFunc.onCall(2).returns(
                just({ fileID: contentFileID2 })
            )
            uploadFileFunc.onCall(3).returns(
                just({ fileID: singleEventFileID2 })
            )
            getDataByKeyFunc.onCall(0).returns(
                resolve([])
            )
            getDataByKeyFunc.onCall(1).returns(
                resolve([{
                    contentFileID: contentFileID1,
                    singleEventFileID: singleEventFileID1
                }])
            )
        });

        and('generate two finalApps with the same key', () => {
            contentBinaryFile1 = new ArrayBuffer(10)
            singleEventBinaryFile1 = new ArrayBuffer(11)
            finalAppName1 = "finalApp1"
            account1 = "account1"
            description1 = "d1"
            previewBase641 = "p1"
            // useCount1 = 0
            isRecommend1 = false

            contentBinaryFile2 = new ArrayBuffer(20)
            singleEventBinaryFile2 = new ArrayBuffer(21)
            finalAppName2 = finalAppName1
            account2 = account1
            description2 = "d2"
            previewBase642 = null
            // useCount1 = 1
            isRecommend2 = true
        });

        and('publish the first finalApp', () => {
            return publish(
                [onUploadProgressFunc, uploadFileFunc, deleteFileFunc, getDataByKeyFunc, addDataFunc, updateDataFunc, getFileIDFunc],
                contentBinaryFile1,
                singleEventBinaryFile1,
                finalAppName1,
                account1,
                description1,
                previewBase641,
                // useCount1,
                isRecommend1,
            ).drain()
        });

        when('publish the second finalApp', () => {
            return publish(
                [onUploadProgressFunc, uploadFileFunc, deleteFileFunc, getDataByKeyFunc, addDataFunc, updateDataFunc, getFileIDFunc],
                contentBinaryFile2,
                singleEventBinaryFile2,
                finalAppName2,
                account2,
                description2,
                previewBase642,
                // useCount2,
                isRecommend2,
            ).drain()
        });

        then("should delete the first finalApp's binary file", () => {
            expect(deleteFileFunc.getCall(0)).toCalledWith([contentFileID1])
            expect(deleteFileFunc.getCall(1)).toCalledWith([singleEventFileID1])
        });

        and("upload the second finalApp's binary file", () => {
            expect(uploadFileFunc.getCall(2)).toCalledWith([
                onUploadProgressFunc,
                "finalapps/account1_finalApp1_content.arrayBuffer",
                contentBinaryFile2,
                "account1_finalApp1_content"
            ])
            expect(uploadFileFunc.getCall(3)).toCalledWith([
                onUploadProgressFunc,
                "finalapps/account1_finalApp1_singleEvent.arrayBuffer",
                singleEventBinaryFile2,
                "account1_finalApp1_singleEvent"
            ])
        });

        and('update collection', () => {
            expect(addDataFunc).toCalledOnce()

            expect(updateDataFunc).toCalledOnce()
            expect(updateDataFunc).toCalledWith([
                "publishedfinalapps",
                buildKey(finalAppName1, account1),
                {
                    account: account1,
                    finalAppName: finalAppName1,
                    description: description2,
                    previewBase64: previewBase642,
                    // useCount: useCount2,
                    isRecommend: isRecommend2,
                    contentFileID: contentFileID2,
                    singleEventFileID: singleEventFileID2
                }
            ])
        });
    });


    // let _createFuncsForFindPublishFinalApp = (sandbox) => {
    //     getDataByKeyFunc = sandbox.stub()
    //     downloadFileFunc = sandbox.stub()
    // }

    // let _createFuncsForFindAllPublishFinalAppsByAccount = (sandbox) => {
    //     getDataByKeyContainFunc = sandbox.stub()
    // }

    // let _createFuncsForFindAllPublishFinalApps = (sandbox) => {
    //     getDataFunc = sandbox.stub()
    // }

    // test('if not find, findPublishFinalApp return empty', ({ given, and, when, then }) => {
    //     _prepare(given)

    //     given('prepare funcs', () => {
    //         _createFuncsForFindPublishFinalApp(sandbox)

    //         getDataByKeyFunc.returns(
    //             resolve([])
    //         )
    //     });

    //     when('find the published finalApp', () => {
    //     });

    //     then('should return empty', () => {
    //         return findPublishFinalApp(
    //             [getDataByKeyFunc, downloadFileFunc],
    //             "", "", false
    //         ).observe(result => {
    //             expect(result).toBeNull()
    //         })
    //     });
    // });

    // test('if find, findPublishFinalApp return published finalApp file', ({ given, and, when, then }) => {
    //     let finalAppBinaryFile = new ArrayBuffer(10)
    //     let fileID = "id1"
    //     let account = "a1"
    //     let finalAppName = "AN1"

    //     _prepare(given)

    //     given('prepare funcs', () => {
    //         _createFuncsForFindPublishFinalApp(sandbox)

    //         getDataByKeyFunc.returns(
    //             resolve([
    //                 {
    //                     fileID: fileID
    //                 }
    //             ])
    //         )
    //         downloadFileFunc.returns(just(finalAppBinaryFile))
    //     });

    //     and('generate a finalApp', () => {
    //     });

    //     and('publish the finalApp', () => {
    //     });

    //     when('find the published finalApp by not use cache', () => {
    //     });

    //     then('should return the finalApp file not use cache', () => {
    //         return findPublishFinalApp(
    //             [getDataByKeyFunc, downloadFileFunc],
    //             account,
    //             finalAppName,
    //             true
    //         ).observe(result => {
    //             expect(getDataByKeyFunc).toCalledWith(
    //                 [
    //                     match.string,
    //                     "a1_an1"
    //                 ]
    //             )
    //             expect(downloadFileFunc).toCalledWith([
    //                 fileID, true
    //             ])
    //             expect(result).toEqual(finalAppBinaryFile)
    //         })
    //     });
    // });



    // // test('if not find, findAllPublishFinalApps return empty array', ({ given, and, when, then }) => {
    // //     _prepare(given)

    // //     given('prepare funcs', () => {
    // //         _createFuncsForFindAllPublishFinalApps(sandbox)

    // //         getDataFunc.returns(
    // //             resolve([])
    // //         )
    // //     });

    // //     when('find all published finalApps', () => {
    // //     });

    // //     then('should return empty array', () => {
    // //         return findAllPublishFinalApps(
    // //             getDataFunc,
    // //             10,
    // //             0
    // //         ).observe(result => {
    // //             expect(result).toEqual([])
    // //         })
    // //     });
    // // });

    // // test('if find, findAllPublishFinalApps return all publish finalApp data', ({ given, and, when, then }) => {
    // //     let fileID1 = "1"
    // //     let fileID2 = "2"
    // //     let account1
    // //     let account2
    // //     let finalAppName1
    // //     let finalAppName2
    // //     let description1
    // //     let description2


    // //     _prepare(given)

    // //     and('generate two finalApps by two users', () => {
    // //         account1 = "account1"
    // //         account2 = "account2"

    // //         finalAppName1 = "finalApp1"
    // //         finalAppName2 = "finalApp2"

    // //         description1 = "d1"
    // //         description2 = "d2"
    // //     });

    // //     given('prepare funcs', () => {
    // //         _createFuncsForFindAllPublishFinalApps(sandbox)

    // //         getDataFunc.returns(
    // //             resolve([
    // //                 {
    // //                     account: account1, finalAppName: finalAppName1,
    // //                     description: description1,
    // //                     fileID: fileID1
    // //                 },
    // //                 {
    // //                     account: account1, finalAppName: finalAppName2,
    // //                     description: description2,
    // //                     fileID: fileID2
    // //                 }
    // //             ])
    // //         )
    // //     });

    // //     and('publish the finalApps', () => {
    // //     });

    // //     when('find all published finalApps', () => {
    // //     });

    // //     then('should return the finalApps\' data', () => {
    // //         return findAllPublishFinalApps(
    // //             getDataFunc,
    // //             2,
    // //             0
    // //         ).observe(result => {
    // //             expect(getDataFunc).toCalledWith([
    // //                 "publishedfinalapps",
    // //                 2, 0
    // //             ])
    // //             expect(result).toEqual([{
    // //                 account: account1, finalAppName: finalAppName1,
    // //                 description: description1,
    // //                 fileID: fileID1
    // //             },
    // //             {
    // //                 account: account1, finalAppName: finalAppName2,
    // //                 description: description2,
    // //                 fileID: fileID2
    // //             }])
    // //         })
    // //     });
    // // });
})