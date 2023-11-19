import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { just } from "most";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { publishElementAssembleData } from "../../src/application_layer/assemble_space/element_assemble/PublishElementContributeService";
// import { addMarketImplementDataToDataFromMarketImplementCollectionData, buildMarketImplementAccountData, getDataFromMarketImplementAccountData, isContain } from "meta3d-backend-cloudbase";

const feature = loadFeature("./test/features/publish_element_assemble_data.feature")

defineFeature(feature, test => {
    let sandbox = null
    let logFunc, errorFunc, getMarketImplementAccountDataFunc, addMarketImplementDataFunc

    let _createFuncs = (sandbox) => {
        logFunc = sandbox.stub()
        errorFunc = sandbox.stub()
        getMarketImplementAccountDataFunc = sandbox.stub()
        addMarketImplementDataFunc = sandbox.stub()
    }

    function _publish(
        account = "u1",
        elementName = "",
        elementVersion = "",
        inspectorData: any = {}
    ) {
        return publishElementAssembleData(
            [errorFunc, getMarketImplementAccountDataFunc, addMarketImplementDataFunc],
            account,
            elementName, elementVersion, inspectorData
        )
    }

    let _prepare = (given) => {
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
                resolve([])
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
            expect(addMarketImplementDataFunc).toCalledWith([
                "publishedelementassembledata",
                {
                    "account": account,
                    "elementName": elementName, "elementVersion": elementVersion,
                    "inspectorData": inspectorData,
                    "key": "meta3d"
                },
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
                ])
            )
            getMarketImplementAccountDataFunc.onCall(1).returns(
                resolve([
                    {
                        elementName: elementName,
                        elementVersion: elementVersion
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