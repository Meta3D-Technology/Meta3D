import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { updateAllDatabaseData } from "../../src/publish/compatible/CompatibleService"
import { mapMarketImplementCollection, getKey, parseMarketCollectionDataBodyForNodejs } from "meta3d-backend-cloudbase";

const feature = loadFeature("./test/features/compatible.feature")

defineFeature(feature, test => {
    let sandbox = null
    let app = 1
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

    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('update all data', ({ given, when, then, and }) => {
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
})