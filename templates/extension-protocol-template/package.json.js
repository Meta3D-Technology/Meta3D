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
    "scripts": {
        "watch": "tsc -w -noEmit",
        "meta3d:publish": "gulp publish_production_env"
    },
    "dependencies": {
        "meta3d-type": ">=0.12.0"
    },
    "devDependencies": {
        "gulp": "^4.0.2",
        "typescript": "^4.2.3",
        "meta3d-tool-publish-protocol": "^0.11.0"
    }
}