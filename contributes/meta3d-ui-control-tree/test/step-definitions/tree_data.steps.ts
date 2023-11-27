import { loadFeature, defineFeature } from "jest-cucumber"
import { empty, just, map } from "most";
import { createSandbox } from "sinon";
import { buildAPI } from "../tool/APITool";
import { data, nodeType } from "meta3d-input-tree-protocol";
import { _convertTreeData } from "../../src/Main";
import { imguiImplTexture, treeData } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable";

const feature = loadFeature("./test/features/tree_data.feature")

defineFeature(feature, test => {
    let sandbox = null

    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('convert tree data with all texture data', ({ given, and, when, then }) => {
        let api
        let treeData: data
        let nodeType1Texture: nullable<imguiImplTexture>
        let nodeType2Texture: nullable<imguiImplTexture>
        let nodeType3Texture: nullable<imguiImplTexture>
        let result: nullable<treeData>

        _prepare(given)

        given('prepare api', () => {
            api = buildAPI()
        });

        and('prepare tree data', () => {
            treeData = [
                [
                    "camera",
                    nodeType.Type1,
                    [
                        [
                            "cube1",
                            nodeType.Type3,
                            []
                        ],
                        [
                            "cube2",
                            nodeType.Type3,
                            [
                                [
                                    "cube3",
                                    nodeType.Type3,
                                    []
                                ]
                            ]
                        ]
                    ]
                ],
                [
                    "light",
                    nodeType.Type2,
                    [
                        [
                            "cube4",
                            nodeType.Type3,
                            []
                        ],
                    ]
                ]
            ]

            nodeType1Texture = api.nullable.return(1)
            nodeType2Texture = api.nullable.return(2)
            nodeType3Texture = api.nullable.return(3)
        });

        when('convert tree data with all texture data', () => {
            result = _convertTreeData(api, treeData, nodeType1Texture, nodeType2Texture, nodeType3Texture)
        });

        then('should get the same structure but replace nodeType to texture', () => {
            // console.log(JSON.stringify(result))
            expect(result).toEqual([
                [
                    "camera",
                    nodeType1Texture,
                    [
                        [
                            "cube1",
                            nodeType3Texture,
                            []
                        ],
                        [
                            "cube2",
                            nodeType3Texture,
                            [
                                [
                                    "cube3",
                                    nodeType3Texture,
                                    []
                                ]
                            ]
                        ]
                    ]
                ],
                [
                    "light",
                    nodeType2Texture,
                    [
                        [
                            "cube4",
                            nodeType3Texture,
                            []
                        ],
                    ]
                ]
            ])
        });
    });

    test('convert tree data with some texture data', ({ given, and, when, then }) => {
        let api
        let treeData: data
        let nodeType1Texture: nullable<imguiImplTexture>
        let nodeType2Texture: nullable<imguiImplTexture>
        let nodeType3Texture: nullable<imguiImplTexture>

        let result: nullable<treeData>

        _prepare(given)

        given('prepare api', () => {
            api = buildAPI()
        });

        and('prepare tree data', () => {
            treeData = [
                [
                    "camera",
                    nodeType.Type1,
                    [
                        [
                            "cube1",
                            nodeType.Type3,
                            []
                        ]
                    ]
                ],
                [
                    "light",
                    nodeType.Type2,
                    []
                ]
            ]

            nodeType1Texture = api.nullable.return(1)
            nodeType2Texture = api.nullable.getEmpty()
            nodeType3Texture = api.nullable.getEmpty()
        });

        when('convert tree data with some texture data', () => {
            result = _convertTreeData(api, treeData, nodeType1Texture, nodeType2Texture, nodeType3Texture)
        });

        then('should get empty', () => {
            expect(result).toEqual(api.nullable.getEmpty())
        });
    });
})