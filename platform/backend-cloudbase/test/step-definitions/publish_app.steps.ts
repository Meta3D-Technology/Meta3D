import { loadFeature, defineFeature } from "jest-cucumber"
import { empty, just } from "most";
import { createSandbox } from "sinon";
import { resolve } from "../../../../services/meta3d-tool-utils/src/publish/PromiseTool";
import { findAllPublishApps, findPublishApp, publish } from "../../src/application_layer/publish/PublishAppService";

const feature = loadFeature("./test/features/publish_app.feature")

defineFeature(feature, test => {
    let sandbox = null
    let onUploadProgressFunc, updateDataFunc, uploadFileFunc, hasDataFunc, addDataFunc
    let getDataFunc, getFileFunc

    function _createFuncsForPublish(sandbox) {
        onUploadProgressFunc = "onUploadProgressFunc"
        uploadFileFunc = sandbox.stub()
        hasDataFunc = sandbox.stub()
        addDataFunc = sandbox.stub().returns(
            resolve(null)
        )
        updateDataFunc = sandbox.stub().returns(
            resolve(null)
        )
    }

    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('if not exist, publish should add app', ({ given, and, when, then }) => {
        let appBinaryFile, appName, username
        let fileID = "1"

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncsForPublish(sandbox)


            uploadFileFunc.returns(
                just(fileID)
            )
            hasDataFunc.returns(
                just(false)
            )
        });

        and('generate a app', () => {
            appBinaryFile = new ArrayBuffer(10)
            appName = "app1"
            username = "username1"
        });

        when('publish the app', () => {
            return publish(
                [onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc],
                appBinaryFile,
                appName,
                username
            ).drain()
        });

        then('should upload app', () => {
            expect(uploadFileFunc).toCalledWith([
                onUploadProgressFunc,
                "apps/username1_app1.arrayBuffer",
                appBinaryFile,
                "username1_app1"
            ])
        });

        and('add to collection', () => {
            expect(addDataFunc).toCalledWith([
                "publishedApps",
                {
                    username,
                    appName,
                    fileID
                }
            ])
        });
    });

    test('if exist, publish should overwrite app', ({ given, and, when, then }) => {
        let fileID1 = "1"
        let fileID2 = "2"
        let appBinaryFile1, appName1, username1
        let appBinaryFile2, appName2, username2

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncsForPublish(sandbox)


            uploadFileFunc.onCall(0).returns(
                just(fileID1)
            )
            uploadFileFunc.onCall(1).returns(
                just(fileID2)
            )
            hasDataFunc.onCall(0).returns(
                just(false)
            )
            hasDataFunc.onCall(1).returns(
                just(true)
            )
        });

        and('generate two apps with the same appName, username', () => {
            appBinaryFile1 = new ArrayBuffer(10)
            appName1 = "app1"
            username1 = "username1"

            appBinaryFile2 = new ArrayBuffer(11)
            appName2 = "app2"
            username2 = "username2"
        });

        and('publish the first app', () => {
            return publish(
                [onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc],
                appBinaryFile1,
                appName1,
                username1
            ).drain()
        });

        when('publish the second app', () => {
            return publish(
                [onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc],
                appBinaryFile2,
                appName2,
                username2
            ).drain()
        });

        then('should upload app', () => {
            expect(uploadFileFunc.getCall(1)).toCalledWith([
                onUploadProgressFunc,
                "apps/username2_app2.arrayBuffer",
                appBinaryFile2,
                "username2_app2"
            ])
        });

        and('update it in collection', () => {
            expect(addDataFunc).toCalledOnce()

            expect(updateDataFunc).toCalledOnce()
            expect(updateDataFunc).toCalledWith([
                "publishedApps",
                { username: username2, appName: appName2 },
                {
                    username: username2,
                    appName: appName2,
                    fileID: fileID2
                }
            ])
        });
    });


    function _createFuncsForFindPublishApp(sandbox) {
        getDataFunc = sandbox.stub()
        getFileFunc = sandbox.stub()
    }

    test('if not find, findPublishApp return empty', ({ given, and, when, then }) => {
        _prepare(given)

        given('prepare funcs', () => {
            _createFuncsForFindPublishApp(sandbox)

            getDataFunc.returns(
                resolve({
                    data: []
                })
            )
        });

        when('find the published app', () => {
        });

        then('should return empty', () => {
            return findPublishApp(
                [getDataFunc, getFileFunc],
                "", ""
            ).observe(result => {
                expect(result).toBeNull()
            })
        });
    });

    test('if find, findPublishApp return published app file', ({ given, and, when, then }) => {
        let appBinaryFile = new ArrayBuffer(10)
        let fileID = "id1"

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncsForFindPublishApp(sandbox)

            getDataFunc.returns(
                resolve({
                    data: [
                        {
                            fileID: fileID
                        }
                    ]
                })
            )
            getFileFunc.returns(just(appBinaryFile))
        });

        and('generate a app', () => {
        });

        and('publish the app', () => {
        });

        when('find the published app', () => {
        });

        then('should return the app file', () => {
            return findPublishApp(
                [getDataFunc, getFileFunc],
                "", ""
            ).observe(result => {
                expect(getFileFunc).toCalledWith([
                    fileID
                ])
                expect(result).toEqual(appBinaryFile)
            })
        });
    });

    test('if not find, findAllPublishApps return empty array', ({ given, and, when, then }) => {
        _prepare(given)

        given('prepare funcs', () => {
            _createFuncsForFindPublishApp(sandbox)

            getDataFunc.returns(
                resolve({
                    data: []
                })
            )
        });

        when('find all published apps', () => {
        });

        then('should return empty array', () => {
            return findAllPublishApps(
                [getDataFunc, getFileFunc],
                ""
            ).observe(result => {
                expect(result).toEqual([])
            })
        });
    });

    test('if find, findAllPublishApps return all publish app data', ({ given, and, when, then }) => {
        let fileID1 = "1"
        let fileID2 = "2"
        let username1
        let appBinaryFile1, appName1
        let appBinaryFile2, appName2


        _prepare(given)

        and('generate two apps by the same user', () => {
            username1 = "username1"

            appBinaryFile1 = new ArrayBuffer(10)
            appName1 = "app1"

            appBinaryFile2 = new ArrayBuffer(11)
            appName2 = "app2"
        });

        given('prepare funcs', () => {
            _createFuncsForFindPublishApp(sandbox)

            getDataFunc.returns(
                resolve({
                    data: [
                        {
                            username: username1, appName: appName1, fileID: fileID1
                        },
                        {
                            username: username1, appName: appName2, fileID: fileID2
                        }
                    ]
                })
            )
            getFileFunc.withArgs(fileID1).returns(just(appBinaryFile1))
            getFileFunc.withArgs(fileID2).returns(just(appBinaryFile2))
        });

        and('publish the apps', () => {
        });

        when('find all published apps', () => {
        });

        then('should return the apps\' data', () => {
            return findAllPublishApps(
                [getDataFunc, getFileFunc],
                username1
            ).observe(result => {
                expect(getFileFunc.getCall(0)).toCalledWith([
                    fileID1
                ])
                expect(getFileFunc.getCall(1)).toCalledWith([
                    fileID2
                ])
                expect(result).toEqual([{
                    username: username1, appName: appName1, appBinaryFile: appBinaryFile1
                },
                {
                    username: username1, appName: appName2, appBinaryFile: appBinaryFile2
                }])
            })
        });
    });
})