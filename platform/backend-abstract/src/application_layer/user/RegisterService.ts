import { fromPromise } from "most"

// export let checkUserName = (notHasData: any, username: string) => {
// 	return notHasData("user", { username: username })
// }

export let register = (addData: any, username: string, password: string) => {
	return fromPromise(
		addData("user", username, {
			password
		})
	).concat(fromPromise(
		addData("publishedextensions", username, {
			fileData: []
		})
	)).concat(fromPromise(
		addData("publishedcontributes", username, {
			fileData: []
		})
	)).concat(fromPromise(
		addData("publishedelementassembledata", username, {
			fileData: []
		})
	)).concat(fromPromise(
		addData("publishedskinassembledata", username, {
			fileData: []
		})
	))
}