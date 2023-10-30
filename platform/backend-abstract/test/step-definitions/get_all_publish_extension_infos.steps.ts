import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { getAllPublishImplementInfo } from "../../src/application_layer/market/MarketService"
import { mapMarketImplementCollection, filterMarketImplementCollection, getAccountFromMarketImplementCollectionData } from "backend-cloudbase/src/application_layer/BackendService";

const feature = loadFeature("./test/features/get_all_publish_extension_infos.feature")

defineFeature(feature, test => {
    let sandbox = null
    let getMarketImplementCollectionFunc, mapMarketImplementCollectionFunc,
        filterMarketImplementCollectionFunc,
        getAccountFromMarketImplementCollectionDataFunc

    let _createFuncs = (sandbox) => {
        mapMarketImplementCollectionFunc = mapMarketImplementCollection
        filterMarketImplementCollectionFunc = filterMarketImplementCollection
        getAccountFromMarketImplementCollectionDataFunc = getAccountFromMarketImplementCollectionData
    }

    let _getAllPublishExtensions = (limitCount, skipCount, protocolName, protocolVersion) => {
        return getAllPublishImplementInfo(
            [
                getMarketImplementCollectionFunc,
                mapMarketImplementCollectionFunc,
                filterMarketImplementCollectionFunc,
                getAccountFromMarketImplementCollectionDataFunc,
            ],
            "publishedextensions",
            limitCount, skipCount,
            protocolName, protocolVersion
        )
    }

    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('one extension implement one protocol', ({ given, when, then, and }) => {
        let account = "meta3d"
        let fileVersion1 = "0.1.1"
        let fileVersion2 = "0.1.2"
        let fileVersion3 = "0.1.3"
        let fileVersion4 = "0.1.4"
        let fileName1 = "f1"
        let fileId1 = "i1"
        let fileId2 = "i2"
        let fileId3 = "i3"
        let fileId4 = "i4"
        let displayName1 = "d1"
        let displayName2 = "d2"
        let displayName3 = "d3"
        let displayName4 = "d4"
        let repoLink1 = "l1"
        let repoLink2 = "l2"
        let repoLink3 = "l3"
        let repoLink4 = "l4"
        let description1 = "dp1"
        let description2 = "dp2"
        let description3 = "dp3"
        let description4 = "dp4"
        // let fileName2 = "f2"
        // let fileName3 = "f3"
        let allPublishExtensions = null

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)


            getMarketImplementCollectionFunc = (_, limitCount, skipCount, {
                protocolName
            }) => {
                return resolve({
                    data: [
                        {
                            key: account,
                            fileID: fileId1,
                            protocolName: "test1-protocol",
                            protocolVersion: "^0.2.0",
                            name: fileName1,
                            version: fileVersion1,
                            displayName: displayName1,
                            repoLink: repoLink1,
                            description: description1
                        },
                        {
                            key: account,
                            fileID: fileId2,
                            protocolName: "test1-protocol",
                            protocolVersion: "^0.1.0",
                            name: fileName1,
                            version: fileVersion2,
                            displayName: displayName2,
                            repoLink: repoLink2,
                            description: description2
                        },
                        {
                            key: account,
                            fileID: fileId3,
                            protocolName: "test2-protocol",
                            protocolVersion: "^0.1.0",
                            name: fileName1,
                            version: fileVersion3,
                            displayName: displayName3,
                            repoLink: repoLink3,
                            description: description3
                        },
                        {
                            key: account,
                            fileID: fileId4,
                            protocolName: "test1-protocol",
                            protocolVersion: "^0.1.0",
                            name: fileName1,
                            version: fileVersion4,
                            displayName: displayName4,
                            repoLink: repoLink4,
                            description: description4
                        },
                    ].filter(data => data.protocolName == protocolName).slice(skipCount, limitCount )
                })
            }

            // getMarketImplementCollectionFunc.returns(
            //     resolve({
            //         data: [
            //             {
            //                 key: account,
            //                 fileData: [
            //                     {
            //                         fileID: fileId1,
            //                         protocolName: "test1-protocol",
            //                         protocolVersion: "^0.2.0",
            //                         name: fileName1,
            //                         version: fileVersion1,
            //                         displayName: displayName1,
            //                         repoLink: repoLink1,
            //                         description: description1
            //                     },
            //                     {
            //                         fileID: fileId2,
            //                         protocolName: "test1-protocol",
            //                         protocolVersion: "^0.1.0",
            //                         name: fileName1,
            //                         version: fileVersion2,
            //                         displayName: displayName2,
            //                         repoLink: repoLink2,
            //                         description: description2
            //                     },
            //                     {
            //                         fileID: fileId3,
            //                         protocolName: "test2-protocol",
            //                         protocolVersion: "^0.1.0",
            //                         name: fileName1,
            //                         version: fileVersion3,
            //                         displayName: displayName3,
            //                         repoLink: repoLink3,
            //                         description: description3
            //                     }
            //                 ]
            //             }
            //         ]
            //     })
            // )
        });

        and('publish extension1', () => {
        });

        and('publish extension2', () => {
        });

        when('get all publish extension infos', () => {
            return _getAllPublishExtensions(
                2, 0,
                "test1-protocol", "0.1.0"
            ).observe(result => {
                allPublishExtensions = result
            })
        });

        then('should return correct data', () => {
            expect(
                allPublishExtensions
            ).toEqual([
                {
                    name: fileName1,
                    id: fileId2,
                    version: fileVersion2,
                    account,
                    displayName: displayName2,
                    repoLink: repoLink2,
                    description: description2
                },
                // {
                //     name: fileName1,
                //     id: fileId4,
                //     version: fileVersion4,
                //     account,
                //     displayName: displayName4,
                //     repoLink: repoLink4,
                //     description: description4
                // }
            ])
        });
    });

    // test('two extensions implement one protocol', ({ given, when, then, and }) => {
    //     let account = "u1"
    //     let fileVersion1 = "0.1.1"
    //     let fileVersion2 = "0.1.2"
    //     let fileName1 = "f1"
    //     let fileName2 = "f2"
    //     let fileId1 = "i1"
    //     let fileId2 = "i2"
    //     let displayName1 = "d1"
    //     let displayName2 = "d2"
    //     let repoLink1 = "l1"
    //     let repoLink2 = "l2"
    //     let description1 = "dp1"
    //     let description2 = "dp2"
    //     // let fileName2 = "f2"
    //     // let fileName3 = "f3"
    //     let allPublishExtensions = null

    //     _prepare(given)

    //     given('prepare funcs', () => {
    //         _createFuncs(sandbox)

    //         getMarketImplementCollectionFunc.returns(
    //             resolve({
    //                 data: [
    //                     {
    //                         key: account,
    //                         fileData: [
    //                             {
    //                                 fileID: fileId1,
    //                                 protocolName: "test1-protocol",
    //                                 protocolVersion: "^0.1.0",
    //                                 name: fileName1,
    //                                 version: fileVersion1,
    //                                 displayName: displayName1,
    //                                 repoLink: repoLink1,
    //                                 description: description1
    //                             },
    //                             {
    //                                 fileID: fileId2,
    //                                 protocolName: "test1-protocol",
    //                                 protocolVersion: "^0.1.0",
    //                                 name: fileName2,
    //                                 version: fileVersion2,
    //                                 displayName: displayName2,
    //                                 repoLink: repoLink2,
    //                                 description: description2
    //                             },
    //                         ]
    //                     }
    //                 ]
    //             })
    //         )
    //     });

    //     and('publish extension1 for protocol1', () => {
    //     });

    //     and('publish extension2 for protocol1', () => {
    //     });

    //     when('get all publish extension infos', () => {
    //         return _getAllPublishExtensions(
    //             "test1-protocol", "0.1.0"
    //         ).observe(result => {
    //             allPublishExtensions = result
    //         })
    //     });

    //     then('should return correct data', () => {
    //         expect(
    //             allPublishExtensions
    //         ).toEqual([
    //             {
    //                 id: fileId1,
    //                 name: fileName1,
    //                 version: fileVersion1,
    //                 account,
    //                 displayName: displayName1,
    //                 repoLink: repoLink1,
    //                 description: description1
    //             },
    //             {
    //                 id: fileId2,
    //                 name: fileName2,
    //                 version: fileVersion2,
    //                 account,
    //                 displayName: displayName2,
    //                 repoLink: repoLink2,
    //                 description: description2
    //             }
    //         ])
    //     });
    // });

    // test('get empty', ({ given, when, then, and }) => {
    //     let allPublishExtensions = null

    //     _prepare(given)

    //     given('prepare funcs', () => {
    //         _createFuncs(sandbox)

    //         getMarketImplementCollectionFunc.returns(
    //             resolve({
    //                 data: [
    //                     {
    //                         fileData: [
    //                             {
    //                                 protocolName: "test1-protocol",
    //                                 protocolVersion: "^0.2.0",
    //                             },
    //                             {
    //                                 protocolName: "test2-protocol",
    //                                 protocolVersion: "^0.1.0",
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             })
    //         )
    //     });

    //     when('get all publish extension infos', () => {
    //         return _getAllPublishExtensions(
    //             "test1-protocol", "0.1.0"
    //         ).observe(result => {
    //             allPublishExtensions = result
    //         })
    //     });

    //     then('should return empty data', () => {
    //         expect(
    //             allPublishExtensions
    //         ).toEqual([])
    //     });
    // })
})