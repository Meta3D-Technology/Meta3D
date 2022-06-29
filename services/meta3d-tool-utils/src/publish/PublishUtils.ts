import { fromPromise } from "most";
import readJson from "read-package-json"

export function buildReadJsonFunc(packageFilePath: string) {
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
    )
}

export function isPublisherRegistered(hasDataFunc, app, publisher: string) {
    return hasDataFunc(app, "user", { username: publisher })
}