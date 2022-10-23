import fs from "fs"
// import path from "path"
import * as CloudbaseService from "meta3d-tool-utils/src/publish/CloudbaseService";
import * as _4everlandService from "meta3d-tool-utils/src/publish/4everlandService";
import { buildReadJsonFunc } from "meta3d-tool-utils/src/publish/PublishUtils"
import { env } from "meta3d-tool-utils/src/publish/PublishType"
// import { publish, publishConfig } from "./Publish";
import { publish } from "./Publish";

export function publishExtensionProtocol(
	env: env,
	packageFilePath: string, iconPath: string) {
	let funcArr = null

	switch (env) {
		case "local":
			funcArr = [
				fs.readFileSync,
				console.log,
				console.error,
				buildReadJsonFunc(packageFilePath),
				CloudbaseService.init, CloudbaseService.hasAccount, CloudbaseService.getCollection, CloudbaseService.isContain, CloudbaseService.addData,
				CloudbaseService.addDataToBody
			]
			break;
		case "production":
			funcArr = [
				fs.readFileSync,
				console.log,
				console.error,
				buildReadJsonFunc(packageFilePath),
				_4everlandService.init, _4everlandService.hasAccount, _4everlandService.getCollection, _4everlandService.isContain, _4everlandService.addData,
				_4everlandService.addDataToBody
			]
			break;
		default:
			throw new Error("unknown env")
	}

	return publish(funcArr, packageFilePath, iconPath, "extension")
}

// export function publishContributeProtocol(packageFilePath: string, iconPath: string) {
// 	return publish([
// 		fs.readFileSync,
// 		console.log,
// 		console.error,
// 		buildReadJsonFunc(packageFilePath),
// 		init, hasAccount, getCollection, addData], packageFilePath, iconPath, "contribute")
// }

// export function publishContributeProtocolConfig(packageFilePath: string, distFilePath: string) {
// 	return publishConfig([
// 		fs.readFileSync,
// 		console.log,
// 		console.error,
// 		buildReadJsonFunc(packageFilePath),
// 		init, hasAccount, getCollection, addData], packageFilePath, distFilePath, "contribute")
// }

// export function publishExtensionProtocolConfig(packageFilePath: string, distFilePath: string) {
// 	return publishConfig([
// 		fs.readFileSync,
// 		console.log,
// 		console.error,
// 		buildReadJsonFunc(packageFilePath),
// 		init, hasAccount, getCollection, addData], packageFilePath, distFilePath, "extension")
// }


// // publishExtensionProtocol(path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "package.json"), path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "icon.png"))
