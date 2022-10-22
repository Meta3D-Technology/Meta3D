import { Stream } from "most";

export let init = (init: () => Stream<unknown>) => init()

export let handleLogin = (handleLogin: (account: string) => Stream<unknown>, account: string) => handleLogin(account)