import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { just } from "most";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { publishElementAssembleData } from "../../src/application_layer/assemble_space/element_assemble/PublishElementContributeService";
import { addShopImplementDataToDataFromShopImplementCollectionData, buildShopImplementAccountData, getDataFromShopImplementAccountData, isContain } from "meta3d-backend-cloudbase";

const feature = loadFeature("./test/features/publish_element_assemble_data.feature")

defineFeature(feature, test => {
    let sandbox = null
    let logFunc, errorFunc, getShopImplementAccountDataFunc, updateShopImplementDataFunc, getDataFromShopImplementAccountDataFunc, isContainFunc, buildShopImplementAccountDataFunc, addShopImplementDataToDataFromShopImplementCollectionDataFunc

    function _createFuncs(sandbox) {
        logFunc = sandbox.stub()
        errorFunc = sandbox.stub()
        getShopImplementAccountDataFunc = sandbox.stub()
        updateShopImplementDataFunc = sandbox.stub()
        getDataFromShopImplementAccountDataFunc = getDataFromShopImplementAccountData
        isContainFunc = isContain
        buildShopImplementAccountDataFunc = buildShopImplementAccountData
        addShopImplementDataToDataFromShopImplementCollectionDataFunc = addShopImplementDataToDataFromShopImplementCollectionData
    }

    function _publish(
        account = "u1",
        elementName = "",
        elementVersion = "",
        inspectorData: any = {}
    ) {
        return publishElementAssembleData(
            [errorFunc, getShopImplementAccountDataFunc, updateShopImplementDataFunc, getDataFromShopImplementAccountDataFunc, isContainFunc, buildShopImplementAccountDataFunc, addShopImplementDataToDataFromShopImplementCollectionDataFunc,],
            account,
            elementName, elementVersion, inspectorData
        )
    }

    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('add to collection', ({ given, when, then, and }) => {
        let account = "meta3d"
        let elementName = "test1"
        let elementVersion = "0.0.2"
        let inspectorData: any = {
            element: 1,
            uiControls: []
        }
        let shopImplementCollectionData = []

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getShopImplementAccountDataFunc.returns(
                resolve([{
                    fileData: []
                }, shopImplementCollectionData])
            )
        });

        when('publish', () => {
            return _publish(
                account,
                elementName,
                elementVersion,
                inspectorData
            ).drain()
        });

        and('should add to collection', () => {
            expect(updateShopImplementDataFunc).toCalledWith([
                "publishedelementassembledata",
                "meta3d",
                {
                    "key": "meta3d",
                    "fileData": [{
                        "elementName": elementName, "elementVersion": elementVersion,
                        "inspectorData": inspectorData
                    }]
                },
                shopImplementCollectionData
            ])
        });
    });

    test('if element assemble data with the same publisher, element name, element version exist, throw error', ({ given, when, then, and }) => {
        let app = { "app": true }
        let account = "meta3d"
        let elementName = "test1"
        let elementVersion = "0.0.2"
        let inspectorData: any = {
            element: 1,
            uiControls: []
        }

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getShopImplementAccountDataFunc.onCall(0).returns(
                resolve([
                    {
                        fileData: []
                    }
                ])
            )
            getShopImplementAccountDataFunc.onCall(1).returns(
                resolve([
                    {
                        fileData: [
                            {
                                elementName: elementName,
                                elementVersion: elementVersion
                            }
                        ]
                    }
                ])
            )
        });

        and('publish', () => {
            return _publish(
                account,
                elementName,
                elementVersion,
                inspectorData
            ).drain()
        });

        when('publish with the same publisher, element name, element version', () => {
            return _publish(
                account,
                elementName,
                elementVersion,
                inspectorData
            ).drain()
        });

        then('should error', () => {
            expect(
                errorFunc.getCall(0).args[0]
            ).toEqual(
                "version: 0.0.2 already exist, please update version"
            )
        });
    });
})