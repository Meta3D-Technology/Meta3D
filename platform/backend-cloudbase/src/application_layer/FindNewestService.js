"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNewestPublishExtension = exports.findNewestPublishPackage = void 0;
const most_1 = require("most");
const BackendService_1 = require("./BackendService");
const semver_1 = require("semver");
let findNewestPublishPackage = (collectionName, whereData, firstOrderByFieldName, [secondOrderByFieldName, gtFunc]) => {
    return (0, most_1.fromPromise)((0, BackendService_1.getDatabase)().collection(collectionName)
        .where(whereData)
        .orderBy(firstOrderByFieldName, "desc")
        // .orderBy(secondOrderByFieldName, "desc")
        .get()
        .then(res => {
        let firstOrderByFieldValue = res.data[0][firstOrderByFieldName];
        debugger;
        return res.data.filter(data => {
            return data[firstOrderByFieldName] == firstOrderByFieldValue;
        }).sort((a, b) => {
            if (gtFunc(a[secondOrderByFieldName], b[secondOrderByFieldName])) {
                return -1;
            }
            return 1;
        })[0];
    }));
};
exports.findNewestPublishPackage = findNewestPublishPackage;
let findNewestPublishExtension = (downloadFileFunc, extensionName, extensionProtocolName) => {
    return (0, most_1.fromPromise)((0, BackendService_1.getDatabase)().collection("publishedextensionprotocols")
        .where({
        name: extensionProtocolName
    })
        .orderBy("version", "desc")
        .get()
        .then(res => {
        return res.data[0];
    })).flatMap((protocol) => {
        let extensionProtocolVersion = protocol.version;
        let extensionProtocolIconBase64 = protocol.iconBase64;
        return (0, most_1.fromPromise)((0, BackendService_1.getDatabase)().collection("publishedextensionprotocolconfigs")
            .where({
            name: extensionProtocolName,
            version: extensionProtocolVersion
        })
            .get()
            .then(res => {
            if (res.data.length > 0) {
                let { name, version, account, configStr } = res.data[0];
                return { name, version, account, configStr };
            }
            return null;
        })).flatMap((protocolConfig) => {
            return (0, most_1.fromPromise)((0, BackendService_1.getDatabase)().collection("publishedextensions")
                // .where({
                //     fileData: getDatabase().command.in([
                //         getDatabase().command.eq({
                //             name: extensionName,
                //             protocolName: extensionProtocolName
                //         })
                //     ])
                // })
                .where({
                fileData: (0, BackendService_1.getDatabase)().command.neq([])
            })
                .skip(0)
                .limit(1000)
                .get()
                .then(res => {
                debugger;
                let extension = res.data.reduce((result, { fileData, key }) => {
                    return result.concat(fileData.map(data => {
                        return Object.assign(Object.assign({}, data), { account: key });
                    }));
                }, [])
                    .filter(({ name, protocolName, protocolVersion }) => {
                    return name == extensionName &&
                        protocolName == extensionProtocolName && (0, semver_1.satisfies)(extensionProtocolVersion, protocolVersion);
                })
                    .sort((a, b) => {
                    if ((0, semver_1.gt)(a.version, b.version)) {
                        return -1;
                    }
                    return 1;
                })[0];
                return [
                    extension,
                    [extensionProtocolVersion, extensionProtocolIconBase64],
                    protocolConfig
                ];
            }));
        });
    })
        .flatMap(([{ fileID, description, displayName, 
    // protocolVersion,
    repoLink, version, account }, protocolData, protocolConfig]) => {
        return downloadFileFunc(fileID).map(file => {
            return [
                [
                    description, displayName,
                    // protocolVersion,
                    repoLink,
                    version, file,
                    account
                ],
                protocolData,
                protocolConfig
            ];
        });
    });
};
exports.findNewestPublishExtension = findNewestPublishExtension;
