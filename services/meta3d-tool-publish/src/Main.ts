import fs from "fs"
import { generateContribute, generateExtension } from "meta3d";
import { getData, hasData, init, updateData, uploadFile } from "meta3d-tool-utils/src/publish/CloudbaseService";
import { buildReadJsonFunc } from "meta3d-tool-utils/src/publish/PublishUtils"
import { publish } from "./Publish";

export function publishExtension(packageFilePath: string, distFilePath: string) {
	return publish([
		fs.readFileSync,
		console.log,
		console.error,
		buildReadJsonFunc(packageFilePath),
		generateExtension, init, hasData, uploadFile, getData, updateData], packageFilePath, distFilePath, "extension")
}

export function publishContribute(packageFilePath: string, distFilePath: string) {
	return publish([
		fs.readFileSync,
		console.log,
		console.error,
		buildReadJsonFunc(packageFilePath),
		generateContribute, init, hasData, uploadFile, getData, updateData], packageFilePath, distFilePath, "contribute")
}

// publishExtension(path.join(__dirname, "../mine/test_data/", "package.json"), path.join(__dirname, "../mine/test_data/", "main.js"))
// publishExtension(path.join(__dirname, "../mine/t/", "package.json"), path.join(__dirname, "../mine/t/", "main.js"))