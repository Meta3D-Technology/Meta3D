import { loadApp } from "meta3d"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { fromPromise, just, mergeArray, Stream } from "most"
import { getDatabase, getFile, uploadFile } from "../cloudbase/CloundbaseService"
import { publishEditor as publishEditorType } from "./EditorManagerType"

let _buildFileName = (editorName: string, username: string) => username + "_" + editorName

export let publishEditor = (editorBinaryFile: ArrayBuffer, editorName: string, username: string) => {
	// TODO use message instead of log?
	return uploadFile(console.log, "editors/" + _buildFileName(editorName, username) + ".arrayBuffer", editorBinaryFile, _buildFileName(editorName, username)).concatMap((fileID) => {
		return fromPromise(getDatabase().collection("publishedEditors").where({ username, editorName }).get().then(res => {
			if (res.data.length == 0) {
				return getDatabase().collection("publishedEditors")
					.add({
						username,
						editorName,
						fileID
					})
			}

			// return getDatabase().collection("publishedEditors").where({ username, editorName }).update({ fileID })
		}))
	})
}

export let enterEditor = (editorBinaryFile: ArrayBuffer) => {
	// TODO open new url with ?username, editorName

	// let _meta3DState = loadApp(_findEditorBinaryFile(username, editorName))
	let _meta3DState = loadApp(editorBinaryFile)
}


export let findPublishEditor = (username: string, editorName: string): Stream<nullable<ArrayBuffer>> => {
	return fromPromise(getDatabase().collection("publishedEditors").where({ username, editorName }).get()).flatMap((res: any) => {
		if (res.data.length === 0) {
			return just(null)
		}

		return getFile(res.data[0].fileID)
	})
}

export let findAllPublishEditors = (username: string): Stream<Array<publishEditorType>> => {
	// let result = null

	return fromPromise(getDatabase().collection("publishedEditors").where({ username }).get()).flatMap((res: any) => {
		if (res.data.length === 0) {
			return just([])
		}

		return fromPromise(mergeArray(
			res.data.map(({ username, editorName, fileID }) => {
				return getFile(fileID).map(editorBinaryFile => {
					return {
						username,
						editorName,
						editorBinaryFile
					}
				})
			})
		).reduce(
			(result, data) => {
				result.push(data)

				return result
			}, []
		))
	})
	// .observe(allPublishEditors => {
	// 	result = allPublishEditors
	// }).then(() => result)
}