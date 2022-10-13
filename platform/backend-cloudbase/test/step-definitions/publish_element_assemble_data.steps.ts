import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { just } from "most";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { publishElementAssembleData } from "../../src/application_layer/assemble_space/element_assemble/PublishElementContributeService";

const feature = loadFeature("./test/features/publish_element_assemble_data.feature")

defineFeature(feature, test => {
    let sandbox = null
    let errorFunc, getDataFunc, updateDataFunc

    function _createFuncs(sandbox) {
        errorFunc = sandbox.stub()
        getDataFunc = sandbox.stub()
        updateDataFunc = sandbox.stub()
    }

    function _publish(
        username = "u1",
        elementName = "",
        elementVersion = "",
        inspectorData: any = {}
    ) {
        return publishElementAssembleData(
            [errorFunc, getDataFunc, updateDataFunc],
            username,
            elementName, elementVersion, inspectorData
        )
    }

    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('add to collection', ({ given, when, then, and }) => {
        let username = "meta3d"
        let elementName = "test1"
        let elementVersion = "0.0.2"
        let inspectorData: any = {
            element: 1,
            uiControls: []
        }

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getDataFunc.returns(
                resolve({
                    data: [
                        {
                            fileData: []
                        }
                    ]
                })
            )
        });

        when('publish', () => {
            return _publish(
                username,
                elementName,
                elementVersion,
                inspectorData
            ).drain()
        });

        and('should add to collection', () => {
            expect(updateDataFunc).toCalledWith([
                "publishedElementAssembleData",
                { "username": "meta3d" },
                {
                    "fileData": [{
                        "elementName": elementName, "elementVersion": elementVersion,
                        "inspectorData": inspectorData
                    }]
                }
            ])
        });
    });

    test('if element assemble data with the same publisher, element name, element version exist, throw error', ({ given, when, then, and }) => {
        let app = { "app": true }
        let username = "meta3d"
        let elementName = "test1"
        let elementVersion = "0.0.2"
        let inspectorData: any = {
            element: 1,
            uiControls: []
        }

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getDataFunc.onCall(0).returns(
                resolve({
                    data: [
                        {
                            fileData: []
                        }
                    ]
                })
            )
            getDataFunc.onCall(1).returns(
                resolve({
                    data: [
                        {
                            fileData: [
                                {
                                    elementName: elementName,
                                    elementVersion: elementVersion
                                }
                            ]
                        }
                    ]
                })
            )
        });

        and('publish', () => {
            return _publish(
                username,
                elementName,
                elementVersion,
                inspectorData
            ).drain()
        });

        when('publish with the same publisher, element name, element version', () => {
            return _publish(
                username,
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