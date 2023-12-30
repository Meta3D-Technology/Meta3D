import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox, match } from "sinon";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { updateAllDatabaseData, updateAllStorageData } from "../../src/publish/compatible/CompatibleService"
import { mapMarketImplementCollection, getKey, parseMarketCollectionDataBodyForNodejs } from "meta3d-backend-cloudbase";
import { empty, just } from "most";

const feature = loadFeature("./test/features/compatible.feature")

defineFeature(feature, test => {
    let sandbox = null
    let app = 1

    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('update all table data', ({ given, when, then, and }) => {
        let getCollectionCountFunc, getCollectionFunc, parseMarketCollectionDataBodyForNodejsFunc, updateDataFunc

        let _createFuncs = (sandbox) => {
            getCollectionCountFunc = sandbox.stub()
            getCollectionFunc = sandbox.stub()
            parseMarketCollectionDataBodyForNodejsFunc = parseMarketCollectionDataBodyForNodejs
            updateDataFunc = sandbox.stub()
        }

        let _updateAllDatabaseData = (mapFunc, collectionName) => {
            return updateAllDatabaseData(
                [
                    getCollectionCountFunc,
                    getCollectionFunc,
                    parseMarketCollectionDataBodyForNodejsFunc,
                    mapMarketImplementCollection,
                    getKey,
                    mapFunc,
                    updateDataFunc,
                ],
                app,
                collectionName
            )
        }

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getCollectionCountFunc.returns(resolve(2))
            getCollectionFunc.returns(resolve({
                data: [
                    {
                        key: "user1",
                    },
                    {
                        key: "user2",
                    }
                ]
            }))
            updateDataFunc.returns(resolve(1))
        });

        and('add user1', () => {
        });

        and('add user2', () => {
        });

        when('update all users\' old data to new data', () => {
            return _updateAllDatabaseData(
                (oldData) => {
                    return {
                        ...oldData,
                        Mbi: 0
                    }
                },
                "user"
            ).drain()
        });

        then('should update all users\' data', () => {
            expect(updateDataFunc.getCall(0)).toCalledWith([
                app,
                "user",
                "user1",
                {
                    key: "user1",
                    Mbi: 0
                }
            ])
            expect(updateDataFunc.getCall(1)).toCalledWith([
                app,
                "user",
                "user2",
                {
                    key: "user2",
                    Mbi: 0
                }
            ])
        });
    });

    test('update all storage data', ({ given, when, then, and }) => {
        let appName1 = "an1"
        let account1 = "ac1"
        let fileID1 = "id1"
        let file1 = {}
        let file2 = { a: 1 }
        let getCollectionCountFunc, getCollectionFunc, parseMarketCollectionDataBodyForNodejsFunc, downloadFileFunc, uploadFileFunc

        let _createFuncs = (sandbox) => {
            getCollectionCountFunc = sandbox.stub()
            getCollectionFunc = sandbox.stub()
            parseMarketCollectionDataBodyForNodejsFunc = parseMarketCollectionDataBodyForNodejs
            downloadFileFunc = sandbox.stub()
            uploadFileFunc = sandbox.stub()
        }

        let _updateAllStorageData = ([mapFunc, buildFilePathFunc], collectionName) => {
            return updateAllStorageData(
                [
                    getCollectionCountFunc,
                    getCollectionFunc,
                    parseMarketCollectionDataBodyForNodejsFunc,
                    mapMarketImplementCollection,
                    downloadFileFunc,
                    mapFunc,
                    uploadFileFunc,
                    buildFilePathFunc
                ],
                app,
                collectionName
            )
        }

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getCollectionCountFunc.returns(resolve(1))
            getCollectionFunc.returns(resolve({
                data: [
                    {
                        appName: appName1,
                        account: account1,
                        fileID: fileID1,
                    }
                ]
            }))
            downloadFileFunc.returns(just(file1))
            uploadFileFunc.returns(empty())
        });

        and('add app1', () => {
        });

        and('upload app1\'s file', () => {
        });

        when('update all app\' old file to new file', () => {
            return _updateAllStorageData(
                [
                    (oldFile) => {
                        return file2
                    },
                    (data) => {
                        return "apps/" + data.account + "_" + data.appName
                    },
                ],
                "publishedapps"
            ).drain()
        });

        then('should update all app storages\' file', () => {
            expect(downloadFileFunc).toCalledWith([
                app,
                match.any,
                fileID1, true
            ])
            expect(uploadFileFunc).toCalledWith([
                app,
                "apps/" + account1 + "_" + appName1,
                file2
            ])
        });
    });
})