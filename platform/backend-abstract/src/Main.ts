import { Stream } from "most";
import * as ShopService from "./application_layer/shop/ShopService"
import * as PublishAppService from "./application_layer/publish/PublishAppService"

export let init = (init: () => Stream<unknown>) => init()

export let handleLogin = (handleLogin: (account: string) => Stream<unknown>, account: string) => handleLogin(account)

export let getAllPublishProtocolData = ShopService.getAllPublishProtocolData

export let getAllPublishProtocolConfigData = ShopService.getAllPublishProtocolConfigData

export let getAllPublishData = ShopService.getAllPublishData

export let publishApp = PublishAppService.publish

export let findPublishApp = PublishAppService.findPublishApp

export let findAllPublishApps = PublishAppService.findAllPublishApps