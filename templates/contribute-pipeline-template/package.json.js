{
    "name": "TODO",
    "version": "TODO",
    //注册的用户名，或者MetaMask钱包地址
    "publisher": "TODO",
    //在平台中显示的协议名
    "displayName": "TODO",
    //该repo的链接地址
    //e.g. https://github.com/Meta3D-Technology/Meta3D/tree/master/protocols/extension_protocols/meta3d-editor-run-engine-protocol
    //也可以为空字符串：""
    "repoLink": "TODO",
    "description": "TODO",
    //实现的协议的name
    "protocol": {
        "name": "TODO"
    },
    //该Map定义了该扩展依赖的所有扩展的协议的name
    //该Map中的key能在Main->getExtensionService->dependentExtensionNameMap中拿到
    //key对应DependentMapType->dependentExtensionProtocolNameMap中的key
    "dependentExtensionNameMap": {
        "meta3dBsMostExtensionProtocolName": {
            "protocolName": "meta3d-bs-most-protocol"
        },
        "TODO": {
            "protocolName": "TODO"
        }
    },
    //该Map定义了该扩展依赖的所有贡献的协议的name
    //该Map中的key能在Main->getExtensionService->dependentContributeNameMap中拿到
    //key对应DependentMapType->dependentContributeProtocolNameMap中的key
    "dependentContributeNameMap": {
        "TODO": {
            "protocolName": "TODO"
        }
    },
    "scripts": {
        "watch": "tsc -w -noEmit",
        "webpack": "webpack --config webpack.config.js",
        "meta3d:publish": "NODE_ENV=production npm run webpack && gulp publish_production_env"
    },
    "dependencies": {
        TODO 给出实现的协议、依赖的所有扩展和贡献的协议的版本号（版本号最好都用>=，如>=0.12.0）

        "meta3d-bs-most-protocol": ">=0.12.0",

        "meta3d-type": ">=0.12.0"
    },
    "devDependencies": {
        "clean-webpack-plugin": "^4.0.0",
        "cz-customizable": "^6.3.0",
        "gulp": "^4.0.2",
        "meta3d-tool-publish": "^0.11.0",
        "source-map-loader": "^3.0.0",
        "ts-loader": "^9.2.6",
        "typescript": "^4.2.3",
        "webpack": "^5.62.1",
        "webpack-cli": "^4.9.1"
    }
}