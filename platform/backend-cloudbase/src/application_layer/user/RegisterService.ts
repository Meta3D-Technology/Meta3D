import { fromPromise } from "most"

export let checkUserName = (notHasDataFunc: any, username: string) => {
	return notHasDataFunc("user", { username: username })
}

export let register = (addDataFunc: any, username: string, password: string) => {
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
	))
	// .concat(fromPromise(
	// 	addDataFunc("publishedExtensionProtocols", {
	// 		username,
	// 		protocols: []
	// 	})
	// )).concat(fromPromise(
	// 	addDataFunc("publishedContributeProtocols", {
	// 		username,
	// 		protocols: []
	// 	})
	// ))
}