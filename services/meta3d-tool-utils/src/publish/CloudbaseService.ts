import tcb from "@cloudbase/node-sdk"
import { just } from "most";
import * as BackendService from "meta3d-backend-cloudbase";
import * as CompatibleService from "./compatible/CompatibleService";

export let getLocalEnvData = () => {
	return {
		secretId: "AKIDdL16e8c2KOWccglputqiU8cO5fMYlhcM",
		secretKey: "a1GJHNZntyxojls2Galt8FHSp5A1g8Ul",
		env: "meta3d-local-9gacdhjl439cff76" // 此处填入您的环境ID 
	}
}

export let getProductionEnvData = () => {
	return {
		secretId: "AKIDnQnwrXx6yZtwiDSQbVGkxtZ0C8nBI8i2",
		secretKey: "4rNcbJkvpSnrgFXYJn0wax3rPhiSu5zb",
		env: "meta3d-production-5eol5gce9a6b9c" // 此处填入您的环境ID
	}
}

export let initLocal = () => {
	let app: any = tcb.init(getLocalEnvData())

	return just(app)
}

export let initProduction = () => {
	let app: any = tcb.init(getProductionEnvData())

	return just(app)
}

// let _getDatabase = (app: any) => {
// 	return app.database()
// }

export let hasAccount = BackendService.hasAccount

// export let notHasData = (app: any, collectionName: string, data: object) => {
// 	return fromPromise(_getDatabase(app).collection(collectionName)
// 		.where(data)
// 		.get()
// 		.then(res => res.data.length === 0))
// }

// export let uploadFile = (app: any, cloudPath: string, fileContent: Buffer) => {
// 	return fromPromise(app.uploadFile({
// 		cloudPath,
// 		fileContent
// 	}))
// }

export let getMarketProtocolCollection = BackendService.getMarketProtocolCollection

// export let isContain = BackendService.isContain

// export let getMarketImplementAccountData = (app: any, collectionName: string, data: any) => {
// 	return _getDatabase(app).collection(collectionName)
// 		.where(data)
// 		.get()
// }

// export let updateCollection = (app: any, collectionName: string, updateData: any) => {
// 	return _getDatabase(app).collection(collectionName)
// 		.update(updateData)
// }

export let addDataToMarketProtocolCollection = BackendService.addDataToMarketProtocolCollection

export let addMarketProtocolDataToDataFromMarketProtocolCollectionData = BackendService.addMarketProtocolDataToDataFromMarketProtocolCollectionData

export let getMarketImplementAccountData = BackendService.getMarketImplementAccountData

export let getDataFromMarketProtocolCollection = BackendService.getDataFromMarketProtocolCollection

// export let getDataFromMarketImplementAccountData = BackendService.getDataFromMarketImplementAccountData

// export let buildMarketImplementAccountData = BackendService.buildMarketImplementAccountData

// export let addMarketImplementDataToDataFromMarketImplementCollectionData = BackendService.addMarketImplementDataToDataFromMarketImplementCollectionData

export let getFileID = BackendService.getFileID

export let addMarketImplementData = BackendService.addMarketImplementData

export let uploadFile = BackendService.uploadFile

export let parseMarketCollectionDataBodyForNodejs = BackendService.parseMarketCollectionDataBodyForNodejs

export let updateAllDatabaseData = (
	mapFunc: any,
	app: any,
	collectionName: string,
) => CompatibleService.updateAllDatabaseData(
	[
		BackendService.getMarketProtocolCollectionCount,
		BackendService.getMarketProtocolCollection,
		parseMarketCollectionDataBodyForNodejs,
		BackendService.mapMarketImplementCollection,
		BackendService.getKey,
		mapFunc,
		BackendService.updateMarketImplementData
	],
	app,
	collectionName
)

export let updateAllStorageData = (
	[mapFunc, buildFilePathFunc]: [any, any, any],
	app: any,
	collectionName: string,
) => CompatibleService.updateAllStorageData(
	[
		BackendService.getMarketProtocolCollectionCount,
		BackendService.getMarketProtocolCollection,
		parseMarketCollectionDataBodyForNodejs,
		BackendService.mapMarketImplementCollection,
		BackendService.downloadFile,
		mapFunc,
		BackendService.uploadFile,
		buildFilePathFunc
	],
	app,
	collectionName
)