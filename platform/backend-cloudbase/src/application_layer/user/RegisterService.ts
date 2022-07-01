import { fromPromise } from "most"
import { addData, notHasData } from "../cloudbase/CloundbaseService"

export let _checkUserName = (notHasDataFunc: any, username: string) => {
	return notHasDataFunc("user", { username: username })
}

export let checkUserName = (username: string) => {
	return _checkUserName(notHasData, username)
}

export let _register = (addDataFunc: any, username: string, password: string) => {
	return fromPromise(
		addDataFunc("user", {
			username,
			password
		})
	).concat(fromPromise(
		addDataFunc("publishedExtensions", {
			username,
			fileData: []
		})
	)).concat(fromPromise(
		addDataFunc("publishedContributes", {
			username,
			fileData: []
		})
	)).concat(fromPromise(
		addDataFunc("publishedExtensionProtocols", {
			username,
			protocols: []
		})
	)).concat(fromPromise(
		addDataFunc("publishedContributeProtocols", {
			username,
			protocols: []
		})
	))
}

export let register = (username: string, password: string) => {
	return _register(addData, username, password)
}