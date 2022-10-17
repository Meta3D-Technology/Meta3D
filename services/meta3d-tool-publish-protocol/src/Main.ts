import fs from "fs"
// import path from "path"
import { getCollection, hasData, init, addData } from "meta3d-tool-utils/src/publish/CloudbaseService";
import { buildReadJsonFunc } from "meta3d-tool-utils/src/publish/PublishUtils"
import { publish, publishConfig } from "./Publish";

export function publishExtensionProtocol(packageFilePath: string, iconPath: string) {
	return publish([
		fs.readFileSync,
		console.log,
		console.error,
		buildReadJsonFunc(packageFilePath),
		init, hasData, getCollection, addData], packageFilePath, iconPath, "extension")
}

export function publishContributeProtocol(packageFilePath: string, iconPath: string) {
	return publish([
		fs.readFileSync,
		console.log,
		console.error,
		buildReadJsonFunc(packageFilePath),
		init, hasData, getCollection, addData], packageFilePath, iconPath, "contribute")
}

export function publishContributeProtocolConfig(packageFilePath: string, distFilePath: string) {
	return publishConfig([
		fs.readFileSync,
		console.log,
		console.error,
		buildReadJsonFunc(packageFilePath),
		init, hasData, getCollection, addData], packageFilePath, distFilePath, "contribute")
}

export function publishExtensionProtocolConfig(packageFilePath: string, distFilePath: string) {
	return publishConfig([
		fs.readFileSync,
		console.log,
		console.error,
		buildReadJsonFunc(packageFilePath),
		init, hasData, getCollection, addData], packageFilePath, distFilePath, "extension")
}


// publishExtensionProtocol(path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "package.json"), path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "icon.png"))
