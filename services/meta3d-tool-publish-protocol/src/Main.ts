import fs from "fs"
// import path from "path"
import { getData, hasData, init, updateData } from "meta3d-tool-utils/src/publish/CloundbaseService";
import { fromPromise } from "most";
import { buildReadJsonFunc, isPublisherRegistered } from "meta3d-tool-utils/src/publish/PublishUtils"

function _throwError(msg: string): never {
	throw new Error(msg)
}

function _getPublishedCollectionName(fileType: "extension" | "contribute") {
	switch (fileType) {
		case "extension":
			return "publishedExtensionProtocols"
		case "contribute":
			return "publishedContributeProtocols"
	}
}

function _isPNG(iconPath: string) {
	return iconPath.match(/\.png$/) !== null
}

export function _publish([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasDataFunc, getDataFunc, updateDataFunc]: [any, any, any, any, any, any, any, any], packageFilePath: string, iconPath: string, fileType: "extension" | "contribute") {
	return readJsonFunc(packageFilePath).flatMap(packageJson => {
		return initFunc().map(app => [app, packageJson])
	}).flatMap(([app, packageJson]) => {
		return isPublisherRegistered(hasDataFunc, app, packageJson.publisher).flatMap(isPublisherRegistered => {
			if (!isPublisherRegistered) {
				_throwError("publishser没有注册")
			}

			if (!_isPNG(iconPath)) {
				_throwError("icon's format should be png")
			}

			return fromPromise(
				getDataFunc(
					app,
					_getPublishedCollectionName(fileType),
					{ username: packageJson.publisher }
				).then(res => {
					let { protocols } = res.data[0]

					let index = protocols.findIndex(({ name, version }) => {
						return name === packageJson.name && version === packageJson.version
					})

					let newProtocols = []
					let protocol = {
						name: packageJson.name,
						version: packageJson.version, iconBase64:
							// TODO check file size should be small(< 10kb)

							// TODO icon can be any format include png

							"data:image/png;base64, " + readFileSyncFunc(iconPath, "base64")
					}

					if (index === -1) {
						newProtocols = protocols.concat([protocol])
					}
					else {
						newProtocols = protocols.slice()
						newProtocols[index] = protocol
					}

					return updateDataFunc(app,
						_getPublishedCollectionName(fileType),
						{ username: packageJson.publisher },
						{
							protocols: newProtocols
						}
					)
				}))
		})
	}).drain()
		.then(_ => {
			logFunc("publish success")
		})
		.catch(e => {
			errorFunc("error message: ", e)
		})
}

export function publishExtensionProtocol(packageFilePath: string, iconPath: string) {
	return _publish([
		fs.readFileSync,
		console.log,
		console.error,
		buildReadJsonFunc(packageFilePath),
		init, hasData, getData, updateData], packageFilePath, iconPath, "extension")
}

export function publishContributeProtocol(packageFilePath: string, iconPath: string) {
	return _publish([
		fs.readFileSync,
		console.log,
		console.error,
		buildReadJsonFunc(packageFilePath),
		init, hasData, getData, updateData], packageFilePath, iconPath, "contribute")
}

// publishExtensionProtocol(path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "package.json"), path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "icon.png"))
