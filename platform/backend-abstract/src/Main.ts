import { Stream } from "most";
import * as RegisterService from "./application_layer/user/RegisterService";

export let init = (init: () => Stream<unknown>) => init()

export let registerUser = (addData: (collectionName: string, key:string, data: any) => Promise<unknown>, username: string, password: string) => {
    return RegisterService.register(addData, username, password)
}