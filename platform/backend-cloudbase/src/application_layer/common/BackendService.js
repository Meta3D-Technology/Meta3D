var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getDatabase, init as initCloundbase } from "../cloudbase/CloundbaseService";
import { fromPromise } from "most";
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
// let _getAllPublishData = (collectionName: string) => {
//     let app = getEditor()
//     return fromPromise(getDatabase().collection(collectionName)
//         .get()).flatMap((res: any) => {
//             return fromPromise(mergeArray(
//                 res.data.map(({ fileIDs }) => {
//                     return mergeArray(
//                         fileIDs.map(fileID => {
//                             return getFile(fileID).map(arrayBuffer => {
//                                 return { id: fileID, file: arrayBuffer }
//                             })
//                         })
//                     )
//                 })
//             ).reduce(
//                 (result, data) => {
//                     result.push(data)
//                     return result
//                 }, []
//             )
//             )
//         })
// }
// export let getAllPublishExtensions = () => {
//     return _getAllPublishData("publishedExtensions")
// }
// export let getAllPublishContributes = () => {
//     return _getAllPublishData("publishedContributes")
// }
