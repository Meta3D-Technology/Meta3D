import { just } from "most"

export let isLoginSuccess = (hasDataFunc: any, account: string) => {
    return hasDataFunc("user", account).flatMap(has => {
        if (!has) {
            return just([false, "用户名未注册"])
        }

        return just([true, null])
    })
}