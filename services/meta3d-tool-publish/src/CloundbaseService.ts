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

export let getDatabase = (app: any) => {
	return app.database()
}

export let hasData = (app: any, collectionName: string, data: object) => {
	return fromPromise(getDatabase(app).collection(collectionName)
		.where(data)
		.get()
		.then(res => res.data.length > 0))
}

export let notHasData = (app: any, collectionName: string, data: object) => {
	return fromPromise(getDatabase(app).collection(collectionName)
		.where(data)
		.get()
		.then(res => res.data.length === 0))
}

export let arrayBufferToBuffer = (arrayBuffer: ArrayBuffer): Buffer => {
	return Buffer.from(arrayBuffer)
}