import { just } from "most"
import { getDatabase, hasData, notHasData } from "../cloudbase/CloundbaseService"

// TODO use domain service

export let isLoginSuccess = (username: string, password: string) => {
    return notHasData("user", { username }).flatMap(not => {
        if (not) {
            return just([false, "用户名未注册"])
        }

        return notHasData("user", { username, password }).map(not => {
            if (not) {
                return [false, "密码不正确"]
            }

            return [true, null]
        })
    })
}