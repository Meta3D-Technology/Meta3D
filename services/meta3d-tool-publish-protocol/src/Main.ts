import fs from "fs"
// import path from "path"
import { getData, hasData, init, updateData } from "meta3d-tool-utils/src/publish/CloundbaseService";
import { buildReadJsonFunc } from "meta3d-tool-utils/src/publish/PublishUtils"
import { publish } from "./Publish";

export function publishExtensionProtocol(packageFilePath: string, iconPath: string) {
	return publish([
		fs.readFileSync,
		console.log,
		console.error,
		buildReadJsonFunc(packageFilePath),
		init, hasData, getData, updateData], packageFilePath, iconPath, "extension")
}

export function publishContributeProtocol(packageFilePath: string, iconPath: string) {
	return publish([
		fs.readFileSync,
		console.log,
		console.error,
		buildReadJsonFunc(packageFilePath),
		init, hasData, getData, updateData], packageFilePath, iconPath, "contribute")
}

// publishExtensionProtocol(path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "package.json"), path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "icon.png"))
