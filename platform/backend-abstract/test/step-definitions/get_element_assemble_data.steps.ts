import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { getElementAssembleData } from "../../src/application_layer/assemble_space/element_assemble/GetElementDataService";
import { getDataFromMarketImplementAccountData } from "meta3d-backend-cloudbase";

const feature = loadFeature("./test/features/get_element_assemble_data.feature")

defineFeature(feature, test => {
    let sandbox = null
    let getMarketImplementAccountDataFunc, getDataFromMarketImplementAccountDataFunc

    function _createFuncs(sandbox) {
        getMarketImplementAccountDataFunc = sandbox.stub()
        getDataFromMarketImplementAccountDataFunc = getDataFromMarketImplementAccountData
    }

    function _getElementAssembleData(account, elementName, elementVersion) {
        return getElementAssembleData(
            [getMarketImplementAccountDataFunc, getDataFromMarketImplementAccountDataFunc],
            account, elementName, elementVersion
        )
    }

    function _prepare(given) {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('get element assemble data', ({ given, when, then, and }) => {
        let account = "u1"
        let elementName1 = "e1"
        let elementName2 = "e2"
        let elementVersion1 = "0.0.1"
        let elementVersion2 = "0.1.0"
        let inspectorData1 = { i: 1 }
        let inspectorData2 = { i: 2 }
        let fileData1 = {
            "elementName": elementName1, "elementVersion": elementVersion1,
            "inspectorData": inspectorData1
        }
        let fileData2 = {
            "elementName": elementName2, "elementVersion": elementVersion2,
            "inspectorData": inspectorData2
        }
        let data

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getMarketImplementAccountDataFunc.returns(
                resolve([
                    {
                        fileData: [
                            fileData1,
                            fileData2
                        ]
                    },
                    []
                ])
            )
        });

        and('user u1 publish element assemble data e1', () => {
        });

        and('user u1 publish element assemble data e2', () => {
        });

        when('get element assemble data e2', () => {
            return _getElementAssembleData(
                account, elementName2, elementVersion2
            ).observe(result => {
                data = result
            })
        });

        then('should return e2', () => {
            expect(getMarketImplementAccountDataFunc).toCalledWith([
                "publishedelementassembledata",
                account
            ])
            expect(data).toEqual(fileData2)
        });
    });
})