import fs from "fs"
import path from "path"
import readJson from "read-package-json"
import { generateContribute, generateExtension } from "meta3d";
import { arrayBufferToBuffer, getDatabase, hasData, init } from "./CloundbaseService";
import { fromPromise } from "most";

function _throwError(msg: string): never {
	throw new Error(msg)
}

function _checkNotEmpty(value: any) {
	return value === undefined || value === null ?
		_throwError("empty") : value
}

function _searchProtocolVersion(name: string, dependencies: any) {
	return _checkNotEmpty(dependencies[name])
}

function _convertToExtensionOrContributePackageData({ name, protocol, publisher, dependentExtensionNameMap, dependentContributeNameMap, dependencies }: any): any {
	return {
		name,
		publisher,
		protocol: {
			name: protocol.name,
			version: _searchProtocolVersion(protocol.name, dependencies)
		},
		dependentExtensionNameMap: Object.fromEntries(Object
			.entries(dependentExtensionNameMap)
			.map(([key, { protocolName }]: [string, any]) => [key, { protocolName, protocolVersion: _searchProtocolVersion(protocolName, dependencies) }])
		),
		dependentContributeNameMap: Object.fromEntries(Object
			.entries(dependentContributeNameMap)
			.map(([key, { protocolName }]: [string, any]) => [key, { protocolName, protocolVersion: _searchProtocolVersion(protocolName, dependencies) }])
		)
	}
}

function _defineWindow() {
	(global as any).window = {}
}

function _isPublisherRegistered(app, publisher: string) {
	return hasData(app, "user", { username: publisher })
}

function _getFileDirname(fileType: "extension" | "contribute") {
	switch (fileType) {
		case "extension":
			return "extensions"
		case "contribute":
			return "contributes"
	}
}

function _getPublishedCollectionName(fileType: "extension" | "contribute") {
	switch (fileType) {
		case "extension":
			return "publishedExtensions"
		case "contribute":
			return "publishedContributes"
	}
}

function _publish(generateFunc: any, packageFilePath: string, distFilePath: string, fileType: "extension" | "contribute") {
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

			_defineWindow()

			let packageData = _convertToExtensionOrContributePackageData(packageJson)

			return fromPromise(app.uploadFile({
				cloudPath: _getFileDirname(fileType) + "/" + packageJson.name + "_" + packageData.protocol.version + ".arrayBuffer",
				fileContent: arrayBufferToBuffer(generateFunc(
					packageData,
					fs.readFileSync(distFilePath, "utf-8")
				))
			})).flatMap(({ fileID }) => {
				return fromPromise(getDatabase(app).collection(_getPublishedCollectionName(fileType))
					.where({ username: packageJson.publisher })
					.get()
					.then(res => {
						let { fileData } = res.data[0]

						let index = fileData.findIndex(({ protocolName, protocolVersion, version }) => {
							return protocolName === packageJson.protocol.name
								// && protocolVersion === packageJson.protocol.version
								&& version === packageJson.version
						})

						let newFileData = []
						let data = {
							protocolName: packageData.protocol.name,
							protocolVersion: packageData.protocol.version,
							version: packageJson.version,
							fileID
						}

						if (index === -1) {
							newFileData = fileData.concat([data])
						}
						else {
							newFileData = fileData.slice()
							newFileData[index] = data
						}

						return getDatabase(app).collection(_getPublishedCollectionName(fileType))
							.where({ username: packageJson.publisher })
							.update(
								{
									fileData: newFileData
								}
							)
					}))
			})
		})
	}).drain()
		.then(_ => {
			console.log("publish success")
		})
		.catch(e => {
			console.error("error message: ", e)
		})
}

export function publishExtension(packageFilePath: string, distFilePath: string) {
	return _publish(generateExtension, packageFilePath, distFilePath, "extension")
}

export function publishContribute(packageFilePath: string, distFilePath: string) {
	return _publish(generateContribute, packageFilePath, distFilePath, "contribute")
}

// publishExtension(path.join(__dirname, "../mine/test_data/", "package.json"), path.join(__dirname, "../mine/test_data/", "main.js"))
// publishExtension(path.join(__dirname, "../mine/t/", "package.json"), path.join(__dirname, "../mine/t/", "main.js"))