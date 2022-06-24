import { fromPromise } from "most";
import { getDatabase, notHasData } from "../cloudbase/CloundbaseService";
export let checkUserName = (username) => {
    return notHasData("user", { username: username });
};
export let register = (username, password) => {
    return fromPromise(getDatabase().collection("user")
        .add({
        username,
        password
    })).concat(fromPromise(getDatabase().collection("publishedExtensions")
        .add({
        username,
        fileIDs: []
    }))).concat(fromPromise(getDatabase().collection("publishedContributes")
        .add({
        username,
        fileIDs: []
    }))).concat(fromPromise(getDatabase().collection("publishedExtensionProtocols")
        .add({
        username,
        protocols: []
    }))).concat(fromPromise(getDatabase().collection("publishedContributeProtocols")
        .add({
        username,
        protocols: []
    })));
};
