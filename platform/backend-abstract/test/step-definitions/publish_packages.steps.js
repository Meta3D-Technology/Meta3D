"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const most_1 = require("most");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("../../../../services/meta3d-tool-utils/src/publish/PromiseTool");
const meta3d_backend_cloudbase_1 = require("meta3d-backend-cloudbase");
const PublishPackageService_1 = require("../../src/application_layer/publish/PublishPackageService");
const PublishPackageTool_1 = require("../tool/PublishPackageTool");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/publish_package.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let onUploadProgressFunc, updateDataFunc, uploadFileFunc, hasDataFunc, addDataFunc, getFileIDFunc;
    // let getDataByKeyFunc, downloadFileFunc
    // let getDataByKeyContainFunc
    let _createFuncsForPublish = (sandbox) => {
        onUploadProgressFunc = "onUploadProgressFunc";
        uploadFileFunc = sandbox.stub();
        hasDataFunc = sandbox.stub();
        addDataFunc = sandbox.stub().returns((0, PromiseTool_1.resolve)(null));
        updateDataFunc = sandbox.stub().returns((0, PromiseTool_1.resolve)(null));
        getFileIDFunc = meta3d_backend_cloudbase_1.getFileID;
    };
    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    };
    test('if not exist, publish should add package', ({ given, and, when, then }) => {
        let packageBinaryFile, packageName, packageVersion, entryExtensionProtocolName, entryExtensionProtocolVersion, entryExtensionProtocolVersionRange, entryExtensionProtocolDisplayName, entryExtensionProtocolRepoLink, entryExtensionProtocolDescription, entryExtensionProtocolIconBase64, entryExtensionName, account, description;
        let fileID = "1";
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncsForPublish(sandbox);
            uploadFileFunc.returns((0, most_1.just)({ fileID }));
            hasDataFunc.returns((0, most_1.just)(false));
        });
        and('generate a package', () => {
            packageBinaryFile = new ArrayBuffer(10);
            packageName = "package1";
            packageVersion = "0.0.1";
            entryExtensionProtocolName = "ep1";
            entryExtensionProtocolVersion = "0.0.2";
            entryExtensionProtocolVersionRange = "^0.0.2";
            entryExtensionProtocolIconBase64 = "epi1";
            entryExtensionProtocolDisplayName = "epd1";
            entryExtensionProtocolRepoLink = "epl1";
            entryExtensionProtocolDescription = "epdp1";
            entryExtensionName = "e1";
            account = "account1";
            description = "d1";
        });
        when('publish the package', () => {
            return (0, PublishPackageService_1.publish)([onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc, getFileIDFunc], packageBinaryFile, [
                entryExtensionProtocolName,
                entryExtensionProtocolVersion,
                entryExtensionProtocolVersionRange,
                entryExtensionProtocolIconBase64,
                entryExtensionProtocolDisplayName,
                entryExtensionProtocolRepoLink,
                entryExtensionProtocolDescription,
                entryExtensionName,
            ], [
                packageName,
                packageVersion,
                description
            ], account).drain();
        });
        then('should upload package', () => {
            expect(uploadFileFunc).toCalledWith([
                onUploadProgressFunc,
                "packages/account1_package1_0.0.1.arrayBuffer",
                packageBinaryFile,
                "account1_package1_0.0.1"
            ]);
        });
        and('add to collection', () => {
            expect(addDataFunc).toCalledWith([
                "publishedpackages",
                (0, PublishPackageTool_1.buildKey)(entryExtensionProtocolName, entryExtensionProtocolVersion, packageName, packageVersion, account),
                {
                    account,
                    entryExtensionProtocolName,
                    entryExtensionProtocolVersion,
                    entryExtensionProtocolVersionRange,
                    entryExtensionProtocolIconBase64,
                    entryExtensionProtocolDisplayName,
                    entryExtensionProtocolRepoLink,
                    entryExtensionProtocolDescription,
                    entryExtensionName,
                    packageName,
                    packageVersion,
                    description,
                    fileID
                }
            ]);
        });
    });
    test('if exist, publish should overwrite package', ({ given, and, when, then }) => {
        let fileID1 = "1";
        let fileID2 = "2";
        let packageBinaryFile1, packageName1, packageVersion1, entryExtensionProtocolName1, entryExtensionProtocolVersion1, entryExtensionProtocolVersionRange1, entryExtensionProtocolIconBase641, entryExtensionProtocolDisplayName1, entryExtensionProtocolRepoLink1, entryExtensionProtocolDescription1, entryExtensionName1, account1, description1;
        let packageBinaryFile2, packageName2, packageVersion2, entryExtensionProtocolName2, entryExtensionProtocolVersion2, entryExtensionProtocolVersionRange2, entryExtensionProtocolIconBase642, entryExtensionProtocolDisplayName2, entryExtensionProtocolRepoLink2, entryExtensionProtocolDescription2, entryExtensionName2, account2, description2;
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncsForPublish(sandbox);
            uploadFileFunc.onCall(0).returns((0, most_1.just)({ fileID: fileID1 }));
            uploadFileFunc.onCall(1).returns((0, most_1.just)({ fileID: fileID2 }));
            hasDataFunc.onCall(0).returns((0, most_1.just)(false));
            hasDataFunc.onCall(1).returns((0, most_1.just)(true));
        });
        and('generate two packages with the same key', () => {
            packageBinaryFile1 = new ArrayBuffer(10);
            packageName1 = "package1";
            packageVersion1 = "0.0.1";
            entryExtensionProtocolName1 = "ep1";
            entryExtensionProtocolVersion1 = "0.0.2";
            entryExtensionProtocolVersionRange1 = "^0.0.2";
            entryExtensionProtocolIconBase641 = "epi1";
            entryExtensionProtocolDisplayName1 = "epd1";
            entryExtensionProtocolRepoLink1 = "epl1";
            entryExtensionProtocolDescription1 = "epdp1";
            entryExtensionName1 = "e1";
            account1 = "account1";
            description1 = "d1";
            packageBinaryFile2 = new ArrayBuffer(11);
            packageName2 = packageName1;
            packageVersion2 = packageVersion1;
            entryExtensionProtocolName2 = entryExtensionProtocolName1;
            entryExtensionProtocolVersion2 = entryExtensionProtocolVersion1;
            entryExtensionProtocolVersionRange2 = entryExtensionProtocolVersionRange1;
            entryExtensionProtocolIconBase642 = entryExtensionProtocolIconBase641;
            entryExtensionProtocolDisplayName2 = "epd2";
            entryExtensionProtocolRepoLink2 = "epl2";
            entryExtensionProtocolDescription2 = "epdp2";
            entryExtensionName2 = entryExtensionName1;
            account2 = account1;
            description2 = "d2";
        });
        and('publish the first package', () => {
            return (0, PublishPackageService_1.publish)([onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc, getFileIDFunc], packageBinaryFile1, [
                entryExtensionProtocolName1,
                entryExtensionProtocolVersion1,
                entryExtensionProtocolVersionRange1,
                entryExtensionProtocolIconBase641,
                entryExtensionProtocolDisplayName1,
                entryExtensionProtocolRepoLink1,
                entryExtensionProtocolDescription1,
                entryExtensionName1,
            ], [
                packageName1,
                packageVersion1,
                description1
            ], account1).drain();
        });
        when('publish the second package', () => {
            return (0, PublishPackageService_1.publish)([onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc, getFileIDFunc], packageBinaryFile2, [
                entryExtensionProtocolName2,
                entryExtensionProtocolVersion2,
                entryExtensionProtocolVersionRange2,
                entryExtensionProtocolIconBase642,
                entryExtensionProtocolDisplayName2,
                entryExtensionProtocolRepoLink2,
                entryExtensionProtocolDescription2,
                entryExtensionName2,
            ], [
                packageName2,
                packageVersion2,
                description2
            ], account2).drain();
        });
        then(/^should upload package(\d+)'s binary file$/, () => {
            expect(uploadFileFunc.getCall(1)).toCalledWith([
                onUploadProgressFunc,
                "packages/account1_package1_0.0.1.arrayBuffer",
                packageBinaryFile2,
                "account1_package1_0.0.1"
            ]);
        });
        and('update collection', () => {
            expect(addDataFunc).toCalledOnce();
            expect(updateDataFunc).toCalledOnce();
            expect(updateDataFunc).toCalledWith([
                "publishedpackages",
                (0, PublishPackageTool_1.buildKey)(entryExtensionProtocolName1, entryExtensionProtocolVersion1, packageName1, packageVersion1, account1),
                {
                    account: account1,
                    entryExtensionProtocolName: entryExtensionProtocolName2,
                    entryExtensionProtocolVersion: entryExtensionProtocolVersion2,
                    entryExtensionProtocolVersionRange: entryExtensionProtocolVersionRange2,
                    entryExtensionProtocolIconBase64: entryExtensionProtocolIconBase642,
                    entryExtensionProtocolDisplayName: entryExtensionProtocolDisplayName2,
                    entryExtensionProtocolRepoLink: entryExtensionProtocolRepoLink2,
                    entryExtensionProtocolDescription: entryExtensionProtocolDescription2,
                    entryExtensionName: entryExtensionName1,
                    packageName: packageName2,
                    packageVersion: packageVersion2,
                    description: description2,
                    fileID: fileID2
                }
            ]);
        });
    });
});
