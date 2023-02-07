import { Stream } from "most";
import * as MarketService from "./application_layer/market/MarketService"
import * as PublishAppService from "./application_layer/publish/PublishAppService"
import * as GetElementDataService from "./application_layer/assemble_space/element_assemble/GetElementDataService"
import * as PublishElementContributeService from "./application_layer/assemble_space/element_assemble/PublishElementContributeService"
import * as PublishPackageService from "./application_layer/publish/PublishPackageService"
import * as PackageMarketService from "./application_layer/market/PackageMarketService"

export let init = (init: (string) => Stream<unknown>, env) => init(env)

export let handleLogin = (handleLogin: (account: string) => Stream<unknown>, account: string) => handleLogin(account)

export let getAllPublishProtocolData = MarketService.getAllPublishProtocolData

export let getAllPublishProtocolConfigData = MarketService.getAllPublishProtocolConfigData

export let getAllPublishImplementInfo = MarketService.getAllPublishImplementInfo

export let findPublishImplement = MarketService.findPublishImplement

export let publishApp = PublishAppService.publish

export let findPublishApp = PublishAppService.findPublishApp

export let findAllPublishAppsByAccount = PublishAppService.findAllPublishAppsByAccount

export let getAllPublishNewestData = GetElementDataService.getAllPublishNewestData

export let getElementAssembleData = GetElementDataService.getElementAssembleData

export let publishElementAssembleData = PublishElementContributeService.publishElementAssembleData

export let publishElementContribute = PublishElementContributeService.publishElementContribute

export let publishPackage = PublishPackageService.publish

export let getAllPublishPackageEntryExtensionProtocols = PackageMarketService.getAllPublishPackageEntryExtensionProtocols

export let getAllPublishPackageInfos = PackageMarketService.getAllPublishPackageInfos

export let findPublishPackage = PackageMarketService.findPublishPackage