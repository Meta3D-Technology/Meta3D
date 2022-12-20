import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { getAllPublishPackageInfos } from "../../src/application_layer/shop/PackageShopService";

const feature = loadFeature("./test/features/get_all_publish_package_infos.feature")

defineFeature(feature, test => {
    let sandbox = null
    let getDataByKeyContainFunc

    function _createFuncs(sandbox) {
        getDataByKeyContainFunc = sandbox.stub()
    }

    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('get all publish pacakge infos', ({ given, when, then, and }) => {
        let fileID1,
            packageName1,
            packageVersion1,
            entryProtocolName1,
            entryProtocolVersion1,
            entryProtocolIconBase641,
            entryExtensionName1,
            account1
        let fileID2,
            packageName2,
            packageVersion2,
            entryProtocolName2,
            entryProtocolVersion2,
            entryProtocolIconBase642,
            entryExtensionName2,
            account2

        _prepare(given)

        given('publish pacakge1 with entry extension protocol1', () => {
            packageName1 = "p1"
            packageVersion1 = "0.0.1"
            fileID1 = "f1"
            entryProtocolName1 = "ep1"
            entryProtocolVersion1 = "0.0.1"
            entryProtocolIconBase641 = "epi1"
            entryExtensionName1 = "e1"
            account1 = "account1"
        });

        and('publish pacakge2 with entry extension protocol2', () => {
            packageName2 = "p2"
            packageVersion2 = "0.0.2"
            fileID2 = "f2"
            entryProtocolName2 = "ep2"
            entryProtocolVersion2 = "0.0.2"
            entryProtocolIconBase642 = "epi2"
            entryExtensionName2 = "e2"
            account2 = "account2"
        });

        and('prepare funcs', () => {
            _createFuncs(sandbox)

            getDataByKeyContainFunc.withArgs("publishedpackages",
                entryProtocolName1 + "_" + entryProtocolVersion1
            ).returns(
                resolve([
                    {
                        packageName: packageName1,
                        packageVersion: packageVersion1,
                        fileID: fileID1,
                        account: account1,
                        entryProtocolName: entryProtocolName1,
                        entryProtocolVersion: entryProtocolVersion1,
                        entryProtocolIconBase64: entryProtocolIconBase641,
                        entryExtensionName: entryExtensionName1
                    }
                ])
            )
            getDataByKeyContainFunc.withArgs("publishedpackages",
                entryProtocolName2 + "_" + entryProtocolVersion2
            ).returns(
                resolve([
                    {
                        packageName: packageName2,
                        packageVersion: packageVersion2,
                        fileID: fileID2,
                        account: account2,
                        entryProtocolName: entryProtocolName2,
                        entryProtocolVersion: entryProtocolVersion2,
                        entryProtocolIconBase64: entryProtocolIconBase642,
                        entryExtensionName: entryExtensionName2
                    }
                ])
            )
        });

        when('get all publish pacakge infos of entry extension protocol2', () => {
        });

        then('should return package2 info', () => {
            return getAllPublishPackageInfos(
                getDataByKeyContainFunc,
                entryProtocolName2,
                entryProtocolVersion2
            ).observe(result => {
                expect(result).toEqual([
                    {
                        account: account2,
                        name: packageName2,
                        version: packageVersion2,
                        entryProtocolName: entryProtocolName2,
                        entryProtocolVersion: entryProtocolVersion2,
                        entryProtocolIconBase64: entryProtocolIconBase642,
                        entryExtensionName: entryExtensionName2,
                        id: fileID2
                    }
                ])
            })
        });
    });
})