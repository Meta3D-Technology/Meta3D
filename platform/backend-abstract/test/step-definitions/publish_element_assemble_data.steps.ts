import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { just } from "most";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { publishElementAssembleData } from "../../src/application_layer/assemble_space/element_assemble/PublishElementContributeService";
import { addMarketImplementDataToDataFromMarketImplementCollectionData, buildMarketImplementAccountData, getDataFromMarketImplementAccountData, isContain } from "meta3d-backend-cloudbase";

const feature = loadFeature("./test/features/publish_element_assemble_data.feature")

defineFeature(feature, test => {
    let sandbox = null
    let logFunc, errorFunc, getMarketImplementAccountDataFunc, updateMarketImplementDataFunc, getDataFromMarketImplementAccountDataFunc, isContainFunc, buildMarketImplementAccountDataFunc, addMarketImplementDataToDataFromMarketImplementCollectionDataFunc

    function _createFuncs(sandbox) {
        logFunc = sandbox.stub()
        errorFunc = sandbox.stub()
        getMarketImplementAccountDataFunc = sandbox.stub()
        updateMarketImplementDataFunc = sandbox.stub()
        getDataFromMarketImplementAccountDataFunc = getDataFromMarketImplementAccountData
        isContainFunc = isContain
        buildMarketImplementAccountDataFunc = buildMarketImplementAccountData
        addMarketImplementDataToDataFromMarketImplementCollectionDataFunc = addMarketImplementDataToDataFromMarketImplementCollectionData
    }

    function _publish(
        account = "u1",
        elementName = "",
        elementVersion = "",
        inspectorData: any = {}
    ) {
        return publishElementAssembleData(
            [errorFunc, getMarketImplementAccountDataFunc, updateMarketImplementDataFunc, getDataFromMarketImplementAccountDataFunc, isContainFunc, buildMarketImplementAccountDataFunc, addMarketImplementDataToDataFromMarketImplementCollectionDataFunc,],
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
        let marketImplementCollectionData = []

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getMarketImplementAccountDataFunc.returns(
                resolve([{
                    fileData: []
                }, marketImplementCollectionData])
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
            expect(updateMarketImplementDataFunc).toCalledWith([
                "publishedelementassembledata",
                "meta3d",
                {
                    "key": "meta3d",
                    "fileData": [{
                        "elementName": elementName, "elementVersion": elementVersion,
                        "inspectorData": inspectorData
                    }]
                },
                marketImplementCollectionData
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

            getMarketImplementAccountDataFunc.onCall(0).returns(
                resolve([
                    {
                        fileData: []
                    }
                ])
            )
            getMarketImplementAccountDataFunc.onCall(1).returns(
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