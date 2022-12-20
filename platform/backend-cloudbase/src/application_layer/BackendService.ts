import tcb from "@cloudbase/js-sdk"
import { concat, empty, fromPromise, just, Stream } from "most";
import { getBackend, setBackend } from "../domain_layer/repo/Repo";
import * as BackendService from "meta3d-backend-cloudbase";
import { curry2, curry3_1, curry4, curry4_1 } from "meta3d-fp/src/Curry";

export let init = (env) => {
	let app: any = tcb.init({
		env: env// 此处填入您的环境ID
	})

	setBackend(app)

	return fromPromise(app.auth()
		.anonymousAuthProvider()
		.signIn())
}

export let getDatabase = () => {
	return getBackend().database()
}


export let handleLogin = (account) => BackendService.handleLogin(getBackend(), account)

export let hasAccount = (collectionName, account) => BackendService.hasAccount(getBackend(), collectionName, account)

export let getShopProtocolCollection = (collectionName) => BackendService.getShopProtocolCollection(getBackend(), null, collectionName)

export let getShopImplementCollection = (collectionName) => BackendService.getShopImplementCollection(getBackend(), null, collectionName)

export let getShopImplement = (
	collectionName: string,
	account: string,
	name: string,
	version: string
) => {
	return getDatabase()
		.collection(collectionName)
		.where({ key: BackendService.handleKeyToLowercase(account) })
		.get()
		.then(res => {
			if (res.data.length === 0) {
				return null
			}

			let { fileData } = res.data[0]

			let result = fileData.find((data) => data.name === name && data.version === version)

			if (result === undefined) {
				return null
			}

			return result
		})
}


export let getDataFromShopProtocolCollection = BackendService.getDataFromShopProtocolCollection

export let mapShopImplementCollection = BackendService.mapShopImplementCollection

export let getAccountFromShopImplementCollectionData = BackendService.getAccountFromShopImplementCollectionData

export let getFileDataFromShopImplementCollectionData = BackendService.getFileDataFromShopImplementCollectionData

export let downloadFile = (onDownloadProgressFunc, fileID) => {
	// TODO support onDownloadProgressFunc
	onDownloadProgressFunc(0)

	return BackendService.downloadFile(getBackend(), null, fileID)
}






let _blobToFile = (theBlob, fileName) => {
	theBlob.lastModifiedDate = new Date();
	theBlob.name = fileName;
	return theBlob;
}

let _arrayBufferToBlob = (arrayBuffer) => {
	return new Blob([arrayBuffer]);
}

export let uploadFile = (onUploadProgressFunc, filePath: string, fileContent: ArrayBuffer, fileName: string) => {
	return fromPromise(getBackend().uploadFile({
		cloudPath: filePath,
		filePath: _blobToFile(_arrayBufferToBlob(fileContent), fileName),
		onUploadProgress: function (progressEvent) {
			var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

			onUploadProgressFunc(percentCompleted)
		}
	})
	)
	// .then(({ fileID }) => fileID))
}

export let updateData = (collectionName: string, key: string, updateData: any) => BackendService.updateShopImplementData(getBackend(), collectionName, key, updateData, null)

export let addData = (collectionName: string, key: string, data: any) => BackendService.addDataToShopProtocolCollection(getBackend(), null, collectionName, key, null, data)

export let getDataByKey = (collectionName: string, key: string) => {
	return getDatabase().collection(collectionName)
		.where({ key: BackendService.handleKeyToLowercase(key) })
		.get()
		.then(res => res.data)
}

export let hasData = (collectionName: string, key: string) => BackendService.hasData(getBackend(), collectionName, key)

export let getFileID = BackendService.getFileID

export let getShopImplementAccountData = (collectionName, account) => BackendService.getShopImplementAccountData(getBackend(), null, collectionName, account)

export let updateShopImplementData = (collectionName, account, updateData, oldShopImplementCollectionData) =>
	BackendService.updateShopImplementData(getBackend(), collectionName, account, updateData, oldShopImplementCollectionData)

export let getDataFromShopImplementAccountData = BackendService.getDataFromShopImplementAccountData

export let isContain = BackendService.isContain

export let buildShopImplementAccountData = BackendService.buildShopImplementAccountData

export let addShopImplementDataToDataFromShopImplementCollectionData = BackendService.addShopImplementDataToDataFromShopImplementCollectionData

export let getDataByKeyContain = (collectionName: string, value: string) => {
	return fromPromise(getDatabase().collection(collectionName)
		.get()
		.then(res => res.data.filter(({ key }: { key: string }) => key.includes(value))))
}



export let getData = (collectionName: string) => {
	return getDatabase().collection(collectionName)
		.get()
		.then(res => res.data)
}

// export let getPackageShopEntryExtensionProtocolCollection = () => getShopProtocolCollection("publishedpackages")
// export let getPackageShopEntryExtensionProtocolCollection = () => getData("publishedpackages")

// export let getDataFromPackageShopEntryExtensionProtocolCollection = getDataFromShopProtocolCollection