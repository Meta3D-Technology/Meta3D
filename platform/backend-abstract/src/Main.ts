import { Stream } from "most";
import * as MarketService from "./application_layer/market/MarketService"
import * as LoginService from "./application_layer/user/LoginService"
import * as PublishAppService from "./application_layer/publish/PublishAppService"
import * as GetElementDataService from "./application_layer/assemble_space/element_assemble/GetElementDataService"
import * as PublishElementContributeService from "./application_layer/assemble_space/element_assemble/PublishElementContributeService"
import * as PublishPackageService from "./application_layer/publish/PublishPackageService"
import * as PackageMarketService from "./application_layer/market/PackageMarketService"
import * as DependencyService from "./application_layer/assemble_space/DependencyService"

export let init = (init: (string) => Stream<unknown>, env) => init(env)

export let handleLoginForWeb3 = (handleLoginForWeb3: (account: string) => Stream<unknown>, account: string) => handleLoginForWeb3(account)

export let checkUserName = (checkUserName: (account: string) => Stream<unknown>, account: string) => checkUserName(account)

export let registerUser = (registerUser: (account: string) => Stream<unknown>, account: string) => registerUser(account)

export let isLoginSuccess = LoginService.isLoginSuccess

export let getAllPublishProtocolData = MarketService.getAllPublishProtocolData

export let batchFindPublishProtocolData = MarketService.batchFindPublishProtocolData

export let getAllPublishProtocolDataCount = MarketService.getAllPublishProtocolDataCount

export let getAllPublishProtocolConfigData = MarketService.getAllPublishProtocolConfigData

export let batchFindPublishProtocolConfigData = MarketService.batchFindPublishProtocolConfigData

export let getAllPublishImplementInfo = MarketService.getAllPublishImplementInfo

export let findPublishImplement = MarketService.findPublishImplement

export let publishApp = PublishAppService.publish

export let findPublishApp = PublishAppService.findPublishApp

// export let findAllPublishAppsByAccount = PublishAppService.findAllPublishAppsByAccount

export let findAllPublishApps = PublishAppService.findAllPublishApps

export let getAllPublishNewestData = GetElementDataService.getAllPublishNewestData

export let getElementAssembleData = GetElementDataService.getElementAssembleData

export let findAllElementAssembleData = GetElementDataService.findAllElementAssembleData

export let publishElementAssembleData = PublishElementContributeService.publishElementAssembleData

export let publishElementContribute = PublishElementContributeService.publishElementContribute

export let publishPackage = PublishPackageService.publish

export let getAllPublishPackageEntryExtensionProtocols = PackageMarketService.getAllPublishPackageEntryExtensionProtocols

export let getAllPublishPackageInfos = PackageMarketService.getAllPublishPackageInfos

export let findPublishPackage = PackageMarketService.findPublishPackage

export let findNewestPublishPackage = DependencyService.findNewestPublishPackage