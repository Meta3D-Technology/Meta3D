import { just } from "most"
import { notHasData } from "../cloudbase/CloundbaseService"

// TODO use domain service

export let _isLoginSuccess = (notHasDataFunc: any, username: string, password: string) => {
    return notHasDataFunc("user", { username }).flatMap(not => {
        if (not) {
            return just([false, "用户名未注册"])
        }

        return notHasDataFunc("user", { username, password }).map(not => {
            if (not) {
                return [false, "密码不正确"]
            }

            return [true, null]
        })
    })
}

export let isLoginSuccess = (username: string, password: string) => {
    return _isLoginSuccess(notHasData, username, password)
}