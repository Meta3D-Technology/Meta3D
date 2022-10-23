import { fromPromise } from "most";
import readJson from "read-package-json"

export function buildReadJsonFunc(packageFilePath: string) {
    return (packageFilePath) => {
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
}

export function isPublisherRegistered(hasAccountFunc, backendInstance:any, publisher: string) {
    return hasAccountFunc(backendInstance, "user", publisher)
}