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

export let getMarketProtocolCollection = (collectionName) => BackendService.getMarketProtocolCollection(getBackend(), null, collectionName)

export let getMarketImplementCollection = (collectionName) => BackendService.getMarketImplementCollection(getBackend(), null, collectionName)

export let getMarketImplement = (
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


export let getDataFromMarketProtocolCollection = BackendService.getDataFromMarketProtocolCollection

export let mapMarketImplementCollection = BackendService.mapMarketImplementCollection

export let getAccountFromMarketImplementCollectionData = BackendService.getAccountFromMarketImplementCollectionData

export let getFileDataFromMarketImplementCollectionData = BackendService.getFileDataFromMarketImplementCollectionData

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

export let updateData = (collectionName: string, key: string, updateData: any) => BackendService.updateMarketImplementData(getBackend(), collectionName, key, updateData, null)

export let addData = (collectionName: string, key: string, data: any) => BackendService.addDataToMarketProtocolCollection(getBackend(), null, collectionName, key, null, data)

export let getDataByKey = (collectionName: string, key: string) => {
	return getDatabase().collection(collectionName)
		.where({ key: BackendService.handleKeyToLowercase(key) })
		.get()
		.then(res => res.data)
}

export let hasData = (collectionName: string, key: string) => BackendService.hasData(getBackend(), collectionName, key)

export let getFileID = BackendService.getFileID

export let getMarketImplementAccountData = (collectionName, account) => BackendService.getMarketImplementAccountData(getBackend(), null, collectionName, account)

export let updateMarketImplementData = (collectionName, account, updateData, oldMarketImplementCollectionData) =>
	BackendService.updateMarketImplementData(getBackend(), collectionName, account, updateData, oldMarketImplementCollectionData)

export let getDataFromMarketImplementAccountData = BackendService.getDataFromMarketImplementAccountData

export let isContain = BackendService.isContain

export let buildMarketImplementAccountData = BackendService.buildMarketImplementAccountData

export let addMarketImplementDataToDataFromMarketImplementCollectionData = BackendService.addMarketImplementDataToDataFromMarketImplementCollectionData

export let getDataByKeyContain = (collectionName: string, values: Array<string>) => {
	return fromPromise(getDatabase().collection(collectionName)
		.get()
		.then(res => res.data.filter(({ key }: { key: string }) => {
			return values.reduce((result, value) => {
				if (!result) {
					return result
				}

				return key.includes(value)
			}, true)
		})))
}

export let getData = (collectionName: string) => {
	return getDatabase().collection(collectionName)
		.get()
		.then(res => res.data)
}

// export let getPackageMarketEntryExtensionProtocolCollection = () => getMarketProtocolCollection("publishedpackages")
// export let getPackageMarketEntryExtensionProtocolCollection = () => getData("publishedpackages")

// export let getDataFromPackageMarketEntryExtensionProtocolCollection = getDataFromMarketProtocolCollection