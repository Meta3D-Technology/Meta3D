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

export let checkUserName = (account) => BackendService.checkUserName(getBackend(), account)

export let handleLoginForWeb3 = (account) => BackendService.handleLoginForWeb3(getBackend(), account)

export let registerUser = (account) => BackendService.registerUser(getBackend(), account)

export let hasAccount = (collectionName, account) => BackendService.hasAccount(getBackend(), collectionName, account)

export let getMarketProtocolCollection = (collectionName, limitCount, skipCount) => BackendService.getMarketProtocolCollection(getBackend(), null, collectionName, limitCount, skipCount)

export let batchFindMarketProtocolCollection = (collectionName, protocolNames) => BackendService.batchFindMarketProtocolCollection(getBackend(), null, collectionName, protocolNames)

export let getMarketProtocolCollectionCount = (collectionName) => BackendService.getMarketProtocolCollectionCount(getBackend(), collectionName)

export let getMarketImplementCollection = (collectionName, limitCount, skipCount, whereData = {}) => BackendService.getMarketImplementCollection(getBackend(), null, collectionName, limitCount, skipCount, whereData)

export let getMarketImplement = (
	collectionName: string,
	limitCount: number,
	skipCount: number,
	account: string,
	name: string,
	version: string
) => {
	return getDatabase()
		.collection(collectionName)
		.where({
			key: BackendService.handleKeyToLowercase(account),
			name: name,
			version: version
		})
		.skip(skipCount)
		.limit(limitCount)
		.get()
		.then(res => {
			if (res.data.length === 0) {
				return null
			}

			return res.data[0]
		})
}


export let getDataFromMarketProtocolCollection = BackendService.getDataFromMarketProtocolCollection

export let mapMarketImplementCollection = BackendService.mapMarketImplementCollection

export let filterMarketImplementCollection = BackendService.filterMarketImplementCollection

export let getAccountFromMarketImplementCollectionData = BackendService.getAccountFromMarketImplementCollectionData

// export let getFileDataFromMarketImplementCollectionData = BackendService.getFileDataFromMarketImplementCollectionData

export let downloadFile = (onDownloadProgressFunc, fileID, notUseCache = false) => {
	// TODO support onDownloadProgressFunc
	onDownloadProgressFunc(0)

	return BackendService.downloadFile(getBackend(), null, fileID, notUseCache)
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

export let getDataWithWhereData = (collectionName: string, whereData: any) => {
	return getDatabase().collection(collectionName)
		.where(whereData)
		.skip(0)
		.limit(1000)
		.get()
		.then(res => res.data)
}

export let getDataByKey = (collectionName: string, key: string) => {
	return getDataWithWhereData(collectionName, { key: BackendService.handleKeyToLowercase(key) })
}

export let deleteFile = (fileID: string) => {
	return BackendService.deleteFile(getBackend(), fileID)
}

export let hasData = (collectionName: string, key: string) => BackendService.hasData(getBackend(), collectionName, key)

export let getFileID = BackendService.getFileID

export let getMarketImplementAccountData = (collectionName, account, name, version) => BackendService.getMarketImplementAccountData(getBackend(), null, collectionName, account, name, version)

export let getMarketImplementAccountDataWithWhereData = (collectionName, whereData) => BackendService.getMarketImplementAccountDataWithWhereData(getBackend(), null, collectionName, whereData)

export let addMarketImplementData = (collectionName: string, data: any) => {
	return BackendService.addMarketImplementData(getBackend(), collectionName, data)
}

// export let updateMarketImplementData = (collectionName, account, updateData, oldMarketImplementCollectionData) =>
// 	BackendService.updateMarketImplementData(getBackend(), collectionName, account, updateData, oldMarketImplementCollectionData)

// export let getDataFromMarketImplementAccountData = BackendService.getDataFromMarketImplementAccountData

// export let isContain = BackendService.isContain

// export let buildMarketImplementAccountData = BackendService.buildMarketImplementAccountData

// export let addMarketImplementDataToDataFromMarketImplementCollectionData = BackendService.addMarketImplementDataToDataFromMarketImplementCollectionData

export let getDataByKeyContain = (collectionName: string,
	limitCount: number, skipCount: number,
	values: Array<string>) => {
	return fromPromise(getDatabase().collection(collectionName)
		.skip(skipCount)
		.limit(limitCount)
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

export let getData = (collectionName: string, limitCount: number, skipCount: number) => {
	return getDatabase().collection(collectionName)
		.skip(skipCount)
		.limit(limitCount)
		.get()
		.then(res => res.data)
}



// export let getPackageMarketEntryExtensionProtocolCollection = () => getMarketProtocolCollection("publishedpackages")
// export let getPackageMarketEntryExtensionProtocolCollection = () => getData("publishedpackages")

// export let getDataFromPackageMarketEntryExtensionProtocolCollection = getDataFromMarketProtocolCollection