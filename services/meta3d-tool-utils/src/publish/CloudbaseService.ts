import tcb from "@cloudbase/node-sdk"
import { fromPromise, just } from "most";
import * as BackendService from "meta3d-backend-cloudbase";

export let initLocal = () => {
	let app: any = tcb.init({
		secretId: "AKIDnQnwrXx6yZtwiDSQbVGkxtZ0C8nBI8i2",
		secretKey: "4rNcbJkvpSnrgFXYJn0wax3rPhiSu5zb",
		env: "meta3d-4g18u7z10c8427f9" // 此处填入您的环境ID
	})

	return just(app)
}

export let initProduction = () => {
	let app: any = tcb.init({
		secretId: "AKIDdL16e8c2KOWccglputqiU8cO5fMYlhcM",
		secretKey: "a1GJHNZntyxojls2Galt8FHSp5A1g8Ul",
		env: "meta3d-production-6eaj4630a6b9e7" // 此处填入您的环境ID
	})

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

export let getShopProtocolCollection = BackendService.getShopProtocolCollection

export let isContain = BackendService.isContain

// export let getShopImplementAccountData = (app: any, collectionName: string, data: any) => {
// 	return _getDatabase(app).collection(collectionName)
// 		.where(data)
// 		.get()
// }

// export let updateCollection = (app: any, collectionName: string, updateData: any) => {
// 	return _getDatabase(app).collection(collectionName)
// 		.update(updateData)
// }

export let addDataToShopProtocolCollection = BackendService.addDataToShopProtocolCollection

export let addShopProtocolDataToDataFromShopProtocolCollectionData = BackendService.addShopProtocolDataToDataFromShopProtocolCollectionData

export let getShopImplementAccountData = BackendService.getShopImplementAccountData

export let getDataFromShopProtocolCollection = BackendService.getDataFromShopProtocolCollection

export let getDataFromShopImplementAccountData = BackendService.getDataFromShopImplementAccountData

export let buildShopImplementAccountData = BackendService.buildShopImplementAccountData

export let addShopImplementDataToDataFromShopImplementCollectionData = BackendService.addShopImplementDataToDataFromShopImplementCollectionData

export let getFileID = BackendService.getFileID

export let updateShopImplementData = BackendService.updateShopImplementData

export let uploadFile = BackendService.uploadFile

export let parseShopCollectionDataBodyForNodejs = BackendService.parseShopCollectionDataBodyForNodejs