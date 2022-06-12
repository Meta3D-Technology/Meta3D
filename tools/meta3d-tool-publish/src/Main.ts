import fs from "fs"
import path from "path"
import readJson from "read-package-json"
import { generateContribute, generateExtension, loadContribute, loadExtension } from "meta3d";

function _error(msg: string): never {
	throw new Error(msg)
}

function _checkNotEmpty(value: any) {
	return value === undefined || value === null ?
		_error("empty") : value
}

function _searchProtocolVersion(name: string, dependencies: any) {
	return _checkNotEmpty(dependencies[name])
}

function _convertToExtensionPackageData({ name, protocol, dependentExtensionNameMap, dependentContributeNameMap, dependencies }: any): any {
	return {
		name: name,
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

function _arrayBufferToBuffer(ab: ArrayBuffer) {
	return Buffer.from(ab);
}

// TODO remove loadFunc
// TODO send to server
function _publish([loadFunc, generateFunc]: [any, any], packageFilePath: string, distFilePath: string): void {
	// readJson(packageFilePath, console.error, false, (er: any, packageJson: any) => {
	readJson(packageFilePath, null, false, (er: any, packageJson: any) => {
		if (er) {
			console.error("There was an error reading the file")
			return
		}

		_defineWindow()

		// console.log(_convertToExtensionPackageData(packageJson))

		let fileData =
			loadFunc(
				generateFunc(
					_convertToExtensionPackageData(packageJson),
					fs.readFileSync(distFilePath, "utf-8")
				)
			)

		console.log(JSON.stringify(fileData.extensionPackageData), fileData.extensionFuncData)

		// fs.writeFileSync(
		// 	path.join("/Users/yang/Github/Meta3D/tools/meta3d-tool-publish/", "mine/temp_data", fileData.extensionPackageData.name + ".buffer"),
		// 	_arrayBufferToBuffer(generateExtension(
		// 		_convertToExtensionPackageData(packageJson),
		// 		fs.readFileSync(distFilePath, "utf-8")
		// 	))
		// )

		// console.log(loadExtension(
		// 	fs.readFileSync(path.join("/Users/yang/Github/Meta3D/tools/meta3d-tool-publish/", "mine/temp_data", fileData.extensionPackageData.name + ".buffer")).buffer
		// ))

	})
}

export function publishExtension(packageFilePath: string, distFilePath: string): void {
	return _publish([loadExtension, generateExtension], packageFilePath, distFilePath)
}

export function publishContribute(packageFilePath: string, distFilePath: string): void {
	return _publish([loadContribute, generateContribute], packageFilePath, distFilePath)
}

publishExtension(path.join(__dirname, "../mine/test_data/", "package.json"), path.join(__dirname, "../mine/test_data/js/", "main.js"))
