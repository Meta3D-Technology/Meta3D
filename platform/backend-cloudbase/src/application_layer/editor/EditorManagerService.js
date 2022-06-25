import { loadApp } from "meta3d";
import { fromPromise, just, mergeArray } from "most";
import { getDatabase, getFile, uploadFile } from "../cloudbase/CloundbaseService";
let _buildFileName = (editorName, username) => username + "_" + editorName;
export let publishEditor = (editorBinaryFile, editorName, username) => {
    // TODO use message instead of log?
    return uploadFile(console.log, "editors/" + _buildFileName(editorName, username) + ".arrayBuffer", editorBinaryFile, _buildFileName(editorName, username)).concatMap((fileID) => {
        return fromPromise(getDatabase().collection("publishedEditors").where({ username, editorName }).get().then(res => {
            if (res.data.length == 0) {
                return getDatabase().collection("publishedEditors")
                    .add({
                    username,
                    editorName,
                    fileID
                });
            }
            // return getDatabase().collection("publishedEditors").where({ username, editorName }).update({ fileID })
        }));
    });
};
export let enterEditor = (editorBinaryFile) => {
    // TODO open new url with ?username, editorName
    // let _meta3DState = loadApp(_findEditorBinaryFile(username, editorName))
    let _meta3DState = loadApp(editorBinaryFile);
};
export let findPublishEditor = (username, editorName) => {
    return fromPromise(getDatabase().collection("publishedEditors").where({ username, editorName }).get()).flatMap((res) => {
        if (res.data.length === 0) {
            return just(null);
        }
        return getFile(res.data[0].fileID);
    });
};
export let findAllPublishEditors = (username) => {
    // let result = null
    return fromPromise(getDatabase().collection("publishedEditors").where({ username }).get()).flatMap((res) => {
        if (res.data.length === 0) {
            return just([]);
        }
        return fromPromise(mergeArray(res.data.map(({ username, editorName, fileID }) => {
            return getFile(fileID).map(editorBinaryFile => {
                return {
                    username,
                    editorName,
                    editorBinaryFile
                };
            });
        })).reduce((result, data) => {
            result.push(data);
            return result;
        }, []));
    });
    // .observe(allPublishEditors => {
    // 	result = allPublishEditors
    // }).then(() => result)
};
