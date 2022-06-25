// TODO refactor: duplicate with tool-publish

import fs from "fs"
import path from "path"
import readJson from "read-package-json"
import { getDatabase, hasData, init } from "./CloundbaseService";
import { fromPromise } from "most";

function _throwError(msg: string): never {
	throw new Error(msg)
}

function _isPublisherRegistered(app, publisher: string) {
	return hasData(app, "user", { username: publisher })
}

function _getPublishedCollectionName(fileType: "extension" | "contribute") {
	switch (fileType) {
		case "extension":
			return "publishedExtensionProtocols"
		case "contribute":
			return "publishedContributeProtocols"
	}
}

function _publish(packageFilePath: string, iconPath: string, fileType: "extension" | "contribute") {
	return fromPromise(
		new Promise((resolve, reject) => {
			readJson(packageFilePath, null, false, (err: any, packageJson: any) => {
				if (err) {
					reject(err)
					return
				}

				resolve(packageJson)
			})
		})
	).flatMap(packageJson => {
		return init().map(app => [app, packageJson])
	}).flatMap(([app, packageJson]) => {
		return _isPublisherRegistered(app, packageJson.publisher).flatMap(isPublisherRegistered => {
			if (!isPublisherRegistered) {
				_throwError("publishser没有注册")
			}

			return fromPromise(getDatabase(app).collection(_getPublishedCollectionName(fileType))
				.where({ username: packageJson.publisher })
				.get()
				.then(res => {
					let { protocols } = res.data[0]

					return getDatabase(app).collection(_getPublishedCollectionName(fileType))
						.where({ username: packageJson.publisher })
						.update(
							{
								protocols: protocols.find(({ name, version }) => {
									name === packageJson.name && version === packageJson.version
								}) ? protocols : protocols.concat([{
									name: packageJson.name,
									version: packageJson.version, iconBase64:
										// TODO check file size should be small(< 10kb)

TODO fix: base64 is error????

										fs.readFileSync(iconPath, "base64")
								}])
							}
						)
				}))
		})
	}).drain()
		.then(_ => {
			console.log("publish success")
		})
		.catch(e => {
			console.error("error message: ", e)
		})
}

export function publishExtensionProtocol(packageFilePath: string, iconPath: string) {
	return _publish(packageFilePath, iconPath, "extension")
}

export function publishedContributeProtocols(packageFilePath: string, iconPath: string) {
	return _publish(packageFilePath, iconPath, "contribute")
}

publishExtensionProtocol(path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "package.json"), path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "icon.jpeg"))
