var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getDatabase, getFile, init as initCloundbase } from "../cloudbase/CloundbaseService";
import { empty, fromPromise, mergeArray } from "most";
import { satisfies } from "semver";
export let init = () => __awaiter(void 0, void 0, void 0, function* () {
    yield initCloundbase();
});
let _getAllPublishProtocolData = (collectionName) => {
    return fromPromise(getDatabase().collection(collectionName)
        .get()).map((res) => {
        return res.data.reduce((result, { protocols }) => {
            return result.concat(protocols.reduce((result, { name, version, iconBase64 }) => {
                result.push({ name, version, iconBase64 });
                return result;
            }, []));
        }, []);
    });
};
export let getAllPublishExtensionProtocols = () => {
    return _getAllPublishProtocolData("publishedExtensionProtocols");
};
export let getAllPublishContributeProtocols = () => {
    return _getAllPublishProtocolData("publishedContributeProtocols");
};
let _getAllPublishData = (collectionName, protocolName, protocolVersion) => {
    return fromPromise(getDatabase().collection(collectionName)
        .get()).flatMap((res) => {
        return fromPromise(mergeArray(res.data.map(({ fileData }) => {
            let result = fileData.filter(data => {
                return data.protocolName === protocolName &&
                    satisfies(protocolVersion, data.protocolVersion);
            });
            if (result.length === 0) {
                return empty();
            }
            else if (result.length > 1) {
                throw new Error("length should == 1");
            }
            let { fileID } = result[0];
            return getFile(fileID).map(arrayBuffer => {
                return { id: fileID, file: arrayBuffer };
            });
        })).reduce((result, data) => {
            result.push(data);
            return result;
        }, []));
    });
};
export let getAllPublishExtensions = (protocolName, protocolVersion) => {
    return _getAllPublishData("publishedExtensions", protocolName, protocolVersion);
};
export let getAllPublishContributes = (protocolName, protocolVersion) => {
    return _getAllPublishData("publishedContributes", protocolName, protocolVersion);
};
