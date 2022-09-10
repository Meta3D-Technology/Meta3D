import tcb from "@cloudbase/node-sdk"
import { fromPromise, just } from "most";

export let init = () => {
	let app: any = tcb.init({
		secretId: "AKIDnQnwrXx6yZtwiDSQbVGkxtZ0C8nBI8i2",
		secretKey: "4rNcbJkvpSnrgFXYJn0wax3rPhiSu5zb",
		env: "meta3d-4g18u7z10c8427f9" // 此处填入您的环境ID
	})

	return just(app)
}

let _getDatabase = (app: any) => {
	return app.database()
}

export let hasData = (app: any, collectionName: string, data: object) => {
	return fromPromise(_getDatabase(app).collection(collectionName)
		.where(data)
		.get()
		.then(res => res.data.length > 0))
}

export let notHasData = (app: any, collectionName: string, data: object) => {
	return fromPromise(_getDatabase(app).collection(collectionName)
		.where(data)
		.get()
		.then(res => res.data.length === 0))
}

export let uploadFile = (app: any, cloudPath: string, fileContent: Buffer) => {
	return fromPromise(app.uploadFile({
		cloudPath,
		fileContent
	}))
}

export let getCollection = (app: any, collectionName: string) => {
	return _getDatabase(app).collection(collectionName).get()
}

export let getData = (app: any, collectionName: string, data: any) => {
	return _getDatabase(app).collection(collectionName)
		.where(data)
		.get()
}

// export let updateCollection = (app: any, collectionName: string, updateData: any) => {
// 	return _getDatabase(app).collection(collectionName)
// 		.update(updateData)
// }

export let addData = (app: any, collectionName: string, addData: any) => {
	return _getDatabase(app).collection(collectionName)
		.add(addData)
}

export let updateData = (app: any, collectionName: string, whereData: any, updateData: any) => {
	return _getDatabase(app).collection(collectionName)
		.where(whereData)
		.update(updateData)
}