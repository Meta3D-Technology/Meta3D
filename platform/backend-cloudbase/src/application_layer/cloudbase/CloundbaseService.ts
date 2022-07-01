import tcb from "@cloudbase/js-sdk"
import { fromPromise, Stream } from "most";
import { getEditor, setEditor } from "../../domain_layer/repo/CloundbaseRepo";

// TODO invoke domain service instead of repo

export let init = () => {
	let app: any = tcb.init({
		env: "meta3d-4g18u7z10c8427f9" // 此处填入您的环境ID
	})

	setEditor(app)

	return fromPromise(app.auth()
		.anonymousAuthProvider()
		.signIn())
}

export let getDatabase = () => {
	return getEditor().database()
}

export let hasData = (collectionName: string, data: object) => {
	return fromPromise(getDatabase().collection(collectionName)
		.where(data)
		.get()
		.then(res => res.data.length > 0))
}

export let notHasData = (collectionName: string, data: object) => {
	return fromPromise(getDatabase().collection(collectionName)
		.where(data)
		.get()
		.then(res => res.data.length === 0))
}

let _blobToFile = (theBlob, fileName) => {
	theBlob.lastModifiedDate = new Date();
	theBlob.name = fileName;
	return theBlob;
}

let _arrayBufferToBlob = (arrayBuffer) => {
	return new Blob([arrayBuffer]);
}

export let uploadFile = (onUploadProgressFunc, cloudPath: string, arrayBuffer: ArrayBuffer, fileName: string): Stream<string> => {
	return fromPromise(getEditor().uploadFile({
		cloudPath,
		filePath: _blobToFile(_arrayBufferToBlob(arrayBuffer), fileName),
		onUploadProgress: function (progressEvent) {
			var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

			onUploadProgressFunc(percentCompleted)
		}
	}).then(({ fileID }) => fileID))
}

export let getFile = (fileID: string) => {
	return fromPromise(getEditor().getTempFileURL({
		fileList: [fileID]
	})).flatMap(({ fileList }) => {
		return fromPromise(fetch(fileList[0].tempFileURL).then(response => response.arrayBuffer()))
	})
}

export let getData = (collectionName: string, data: any) => {
	return getDatabase().collection(collectionName)
		.where(data)
		.get()
}

export let addData = (collectionName: string, data: any) => {
	return getDatabase().collection(collectionName)
		.add(data)
}

