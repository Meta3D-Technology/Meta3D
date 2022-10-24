import { Stream } from "most";
import * as ShopService from "./application_layer/shop/ShopService"

export let init = (init: () => Stream<unknown>) => init()

export let handleLogin = (handleLogin: (account: string) => Stream<unknown>, account: string) => handleLogin(account)

export let getAllPublishProtocolData = ShopService.getAllPublishProtocolData

export let getAllPublishProtocolConfigData = ShopService.getAllPublishProtocolConfigData

export let getAllPublishData = ShopService.getAllPublishData