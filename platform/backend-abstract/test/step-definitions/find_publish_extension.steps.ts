import { loadFeature, defineFeature } from "jest-cucumber"
import { just } from "most";
import { createSandbox } from "sinon";
import { resolve } from "../../../../services/meta3d-tool-utils/src/publish/PromiseTool";
import { findPublishImplement } from "../../src/application_layer/shop/ShopService";

const feature = loadFeature("./test/features/find_publish_extension.feature")

defineFeature(feature, test => {
    let sandbox = null
    let getShopImplementFunc, downloadFileFunc

    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    function _createFuncs(sandbox) {
        getShopImplementFunc = sandbox.stub()
        downloadFileFunc = sandbox.stub()
    }


    test('if not find, return empty', ({ given, and, when, then }) => {
        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getShopImplementFunc.returns(
                resolve(null)
            )
        });

        when('find the published extension', () => {
        });

        then('should return empty', () => {
            return findPublishImplement(
                [getShopImplementFunc, downloadFileFunc],
                "", "", "", ""
            ).observe(result => {
                expect(result).toBeNull()
            })
        });
    });

    test('if find, return published extension file', ({ given, and, when, then }) => {
        let extensionBinaryFile = new ArrayBuffer(10)
        let collectionName = "c1"
        let account = "1"
        let name = "n1"
        let version = "0.0.1"
        let fileID = "id1"

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getShopImplementFunc.returns(
                resolve(
                    {
                        fileID: fileID
                    }
                )
            )
            downloadFileFunc.returns(just(extensionBinaryFile))
        });

        and('publish extension1', () => {
        });

        when('find the published extension', () => {
        });

        then('should return the extension file', () => {
            return findPublishImplement(
                [getShopImplementFunc, downloadFileFunc],
                collectionName,
                account,
                name,
                version
            ).observe(result => {
                expect(getShopImplementFunc).toCalledWith([
                    collectionName, account, name, version
                ])
                expect(downloadFileFunc).toCalledWith([
                    fileID
                ])
                expect(result).toEqual(extensionBinaryFile)
            })
        });
    });
})
