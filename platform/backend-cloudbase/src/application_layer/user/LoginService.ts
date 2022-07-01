import { just } from "most"

// TODO use domain service

export let isLoginSuccess = (notHasDataFunc: any, username: string, password: string) => {
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
