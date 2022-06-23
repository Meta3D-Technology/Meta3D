import { fromPromise } from "most"
import { getDatabase, notHasData } from "../cloudbase/CloundbaseService"

export let checkUserName = (username: string) => {
	return notHasData("user", { username: username })
}

export let register = (username: string, password: string) => {
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
				})))
}