import { loadFeature, defineFeature } from "jest-cucumber"
import { just } from "most";
import { createSandbox } from "sinon";
import { resolve } from "../../../../services/meta3d-tool-utils/src/publish/PromiseTool";
import { buildPartialKeyByPackageData } from "../../src/application_layer/publish/PublishPackageService";
// import { getFileID } from "meta3d-backend-cloudbase";
import { findPublishPackage } from "../../src/application_layer/market/PackageMarketService";
// import { buildKey } from "../tool/PublishPackageTool"

const feature = loadFeature("./test/features/find_publish_package.feature")

defineFeature(feature, test => {
    let sandbox = null
    // let onUploadProgressFunc, updateDataFunc, uploadFileFunc, hasDataFunc, addDataFunc, getFileIDFunc
    let getDataByKeyContainFunc, downloadFileFunc

    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }


    function _createFuncsForFindPublishPackage(sandbox) {
        getDataByKeyContainFunc = sandbox.stub()
        downloadFileFunc = sandbox.stub()
    }

    test('if not find, findPublishPackage return empty', ({ given, and, when, then }) => {
        _prepare(given)

        given('prepare funcs', () => {
            _createFuncsForFindPublishPackage(sandbox)

            getDataByKeyContainFunc.returns(
                just([])
            )
        });

        when('find the published package', () => {
        });

        then('should return empty', () => {
            return findPublishPackage(
                [getDataByKeyContainFunc, downloadFileFunc],
                "", "", ""
            ).observe(result => {
                expect(result).toBeNull()
            })
        });
    });

    test('if find, findPublishPackage return published package file', ({ given, and, when, then }) => {
        let packageBinaryFile, packageName,
            packageVersion,
            account
        let fileID = "id1"

        _prepare(given)


        given('generate a package', () => {
            packageBinaryFile = new ArrayBuffer(10)
            packageName = "package1"
            packageVersion = "0.0.1"
            account = "account1"
        });

        and('prepare funcs', () => {
            _createFuncsForFindPublishPackage(sandbox)

            getDataByKeyContainFunc.returns(
                just([
                    {
                        fileID: fileID
                    }
                ])
            )

            downloadFileFunc.returns(just(packageBinaryFile))
        });

        and('publish the package', () => {
        });

        when('find the published package', () => {
        });

        then('should return the package file', () => {
            return findPublishPackage(
                [getDataByKeyContainFunc, downloadFileFunc],
                account, packageName, packageVersion
            ).observe(result => {
                expect(getDataByKeyContainFunc).toCalledWith([
                    "publishedpackages",
                    [packageName,
                        packageVersion,
                        account]
                ])

                expect(downloadFileFunc).toCalledWith([
                    fileID
                ])
                expect(result).toEqual(packageBinaryFile)
            })
        });
    });
})