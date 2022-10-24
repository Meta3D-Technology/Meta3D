import fs from "fs"
import { generateContribute, generateExtension } from "meta3d";
import * as CloudbaseService from "meta3d-tool-utils/src/publish/CloudbaseService";
import * as _4everlandService from "meta3d-tool-utils/src/publish/4everlandService";
import { buildReadJsonFunc } from "meta3d-tool-utils/src/publish/PublishUtils"
import { env } from "meta3d-tool-utils/src/publish/PublishType"
import { publish } from "./Publish";

// let _getFuncArrForExtension = (env: env, packageFilePath: string): [any, any, any, any, any, any, any, any, any, any, any] => {
// 	switch (env) {
// 		case "local":
// 			return [
// 				fs.readFileSync,
// 				console.log,
// 				console.error,
// 				buildReadJsonFunc(packageFilePath),
// 				CloudbaseService.init,
// 				CloudbaseService.hasAccount,
// 				CloudbaseService.getShopProtocolCollection,
// 				CloudbaseService.isContain,
// 				CloudbaseService.addDataToShopProtocolCollection,
// 				CloudbaseService.addShopProtocolDataToDataFromShopProtocolCollectionData,
// 				CloudbaseService.getDataFromShopProtocolCollection
// 			]
// 		case "production":
// 			return [
// 				fs.readFileSync,
// 				console.log,
// 				console.error,
// 				buildReadJsonFunc(packageFilePath),
// 				_4everlandService.init, _4everlandService.hasAccount, _4everlandService.getShopProtocolCollection, _4everlandService.isContain, _4everlandService.addDataToShopProtocolCollection,
// 				_4everlandService.addShopProtocolDataToDataFromShopProtocolCollectionData,
// 				_4everlandService.getDataFromShopProtocolCollection
// 			]
// 		default:
// 			throw new Error("unknown env")
// 	}
// }

export function publishExtension(env: env, packageFilePath: string, distFilePath: string) {
	let funcArr = null

	switch (env) {
		case "local":
			funcArr = [
				fs.readFileSync,
				console.log,
				console.error,
				buildReadJsonFunc(packageFilePath),
				generateExtension,
				CloudbaseService.init,
				CloudbaseService.hasAccount,
				CloudbaseService.uploadFile,
				CloudbaseService.getShopImplementAccountData,
				CloudbaseService.updateShopImplementData,
				CloudbaseService.getDataFromShopImplementAccountData,
				CloudbaseService.isContain,
				CloudbaseService.buildShopImplementAccountData,
				CloudbaseService.addShopImplementDataToDataFromShopImplementCollectionData,
				CloudbaseService.getFileID,
			]
			break;
		case "production":
			funcArr = [
				fs.readFileSync,
				console.log,
				console.error,
				buildReadJsonFunc(packageFilePath),
				generateExtension,
				_4everlandService.init,
				_4everlandService.hasAccount,
				_4everlandService.uploadFile,
				_4everlandService.getShopImplementAccountData,
				_4everlandService.updateShopImplementData,
				_4everlandService.getDataFromShopImplementAccountData,
				_4everlandService.isContain,
				_4everlandService.buildShopImplementAccountData,
				_4everlandService.addShopImplementDataToDataFromShopImplementCollectionData,
				_4everlandService.getFileID,
			]
			break;
		default:
			throw new Error("unknown env")
	}

	return publish(funcArr, packageFilePath, distFilePath, "extension")
}

export function publishContribute(env: env, packageFilePath: string, distFilePath: string) {
	let funcArr = null

	switch (env) {
		case "local":
			funcArr = [
				fs.readFileSync,
				console.log,
				console.error,
				buildReadJsonFunc(packageFilePath),
				generateContribute,
				CloudbaseService.init,
				CloudbaseService.hasAccount,
				CloudbaseService.uploadFile,
				CloudbaseService.getShopImplementAccountData,
				CloudbaseService.updateShopImplementData,
				CloudbaseService.getDataFromShopImplementAccountData,
				CloudbaseService.isContain,
				CloudbaseService.buildShopImplementAccountData,
				CloudbaseService.addShopImplementDataToDataFromShopImplementCollectionData,
				CloudbaseService.getFileID,
			]
			break;
		case "production":
			funcArr = [
				fs.readFileSync,
				console.log,
				console.error,
				buildReadJsonFunc(packageFilePath),
				generateContribute,
				_4everlandService.init,
				_4everlandService.hasAccount,
				_4everlandService.uploadFile,
				_4everlandService.getShopImplementAccountData,
				_4everlandService.updateShopImplementData,
				_4everlandService.getDataFromShopImplementAccountData,
				_4everlandService.isContain,
				_4everlandService.buildShopImplementAccountData,
				_4everlandService.addShopImplementDataToDataFromShopImplementCollectionData,
				_4everlandService.getFileID,
			]
			break;
		default:
			throw new Error("unknown env")
	}

	return publish(funcArr, packageFilePath, distFilePath, "contribute")
}


// publishExtension(path.join(__dirname, "../mine/test_data/", "package.json"), path.join(__dirname, "../mine/test_data/", "main.js"))
// publishExtension(path.join(__dirname, "../mine/t/", "package.json"), path.join(__dirname, "../mine/t/", "main.js"))