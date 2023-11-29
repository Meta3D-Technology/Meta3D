open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/publish.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()

      FileTool.buildFakeTextDecoder(FileTool.convertUint8ArrayToBuffer)
      FileTool.buildFakeTextEncoder(.)
    })
  }

  test(."show publish button", ({given, \"when", \"and", then}) => {
    _prepare(given, \"and")

    \"when"(
      "render Publish",
      () => {
        ()
      },
    )

    then(
      "should show publish button",
      () => {
        PublishTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(
            ~sandbox,
            ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
              (list{}, list{}, CanvasControllerTool.buildCanvasData()),
              _,
            ),
            (),
          ),
          (),
        )
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })

  // test(."show modal after click publish button", ({given, \"when", \"and", then}) => {
  //   _prepare(given, \"and")

  //   \"when"("render Publish", () => {
  //     ()
  //   })

  //   \"and"("click publish button", () => {
  //     ()
  //   })

  //   then("should show modal", () => {
  //     let component =
  //       PublishTool.buildUI(
  //         ~sandbox,
  //         ~service=ServiceTool.build(
  //           ~sandbox,
  //           ~useState=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //             (true, _ => true),
  //             _,
  //           ),
  //           ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //             (list{}, list{}),
  //             _,
  //           ),
  //           (),
  //         ),
  //         (),
  //       )
  //       ->ReactTestRenderer.create
  //       ->ReactTestTool.createSnapshotAndMatch
  //   })
  // })

  test(."publish when select nothing", ({given, \"when", \"and", then}) => {
    let errorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    CucumberAsync.execStep(
      \"when",
      "publish app",
      () => {
        errorStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        PublishTool.publish(
          ~sandbox,
          ~service=ServiceTool.build(~sandbox, ~error=errorStub.contents, ()),
          ~selectedPackages=list{},
          ~selectedContributes=list{},
          (),
        )
      },
    )

    then(
      "should error",
      () => {
        errorStub.contents
        ->Obj.magic
        ->SinonTool.calledWithArg2({j`请至少选择一个`}, None)
        ->expect == true
      },
    )
  })

  let _prepareSelectedPackagesSelectedExtensionsAndContributes = (
    given,
    \"and",
    (selectedPackages, selectedPackageBinaryFile1),
    (
      storedPackageIdsInApp,
      selectedPackageBinaryFile2,
      (
        p2Protocol,
        p2EntryExtensionName,
        p2Version,
        p2Name,
        _,
      ): Meta3d.AppAndPackageFileType.packageData,
    ),
    // selectedExtensions,
    selectedContributes,
  ) => {
    // given("select extension e1, e2", () => {
    //   selectedExtensions :=
    //     list{
    //       SelectedExtensionsTool.buildSelectedExtension(
    //         ~name="e1",
    //         // ~newName=None,
    //         ~protocolIconBase64="i1",
    //         (),
    //       ),
    //       SelectedExtensionsTool.buildSelectedExtension(
    //         ~name="e2",
    //         // ~newName=None,
    //         ~protocolIconBase64="i2",
    //         (),
    //       ),
    //     }
    // })

    given("select contribute c1, c2", () => {
      selectedContributes :=
        list{
          SelectedContributesTool.buildSelectedContribute(
            ~name="c1",
            // ~newName="c1"->Some,
            ~protocolIconBase64="i3",
            (),
          ),
          SelectedContributesTool.buildSelectedContribute(
            ~name="c2",
            // ~newName="c2"->Some,
            ~protocolIconBase64="i4",
            (),
          ),
        }
    })

    \"and"(
      "select package p1 which isn't stored in app and is start, p2 which is stored in app",
      () => {
        let p2Id = "p2"

        selectedPackages :=
          list{
            SelectedPackagesTool.buildSelectedPackage(
              ~name="p1",
              ~binaryFile=selectedPackageBinaryFile1,
              ~isStart=true,
              ~protocolConfigStr=StartPackageProtocolConfigTool.buildProtocolConfigStr()->Some,
              (),
            ),
            SelectedPackagesTool.buildSelectedPackage(
              ~id=p2Id,
              ~name=p2Name,
              ~version=p2Version,
              ~protocolName=p2Protocol.name,
              ~protocolVersion=p2Protocol.version,
              ~protocolIconBase64=p2Protocol.iconBase64,
              ~entryExtensionName=p2EntryExtensionName,
              ~binaryFile=selectedPackageBinaryFile2,
              ~isStart=false,
              (),
            ),
          }

        storedPackageIdsInApp := list{p2Id}
      },
    )
  }

  // test(."generate correct app without config data", ({given, \"when", \"and", then}) => {
  //   let errorStub = ref(Obj.magic(1))
  //   let selectedPackageBinaryFile1 = Js.Typed_array.ArrayBuffer.make(10)
  //   let selectedPackages = ref(Obj.magic(1))
  //   let selectedExtensions = ref(Obj.magic(1))
  //   let selectedContributes = ref(Obj.magic(1))
  //   let storedPackageIdsInApp = ref(Obj.magic(1))

  //   _prepare(given, \"and")

  //   _prepareSelectedPackagesSelectedExtensionsAndContributes(
  //     given,
  //     \"and",
  //     (selectedPackages, selectedPackageBinaryFile1),
  //     (storedPackageIdsInApp, Obj.magic(1), PackageStoredInAppTool.buildPackageData()),
  //     selectedExtensions,
  //     selectedContributes,
  //   )

  //   CucumberAsync.execStep(
  //     \"when",
  //     "publish app",
  //     () => {
  //       errorStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

  //       PublishTool.publish(
  //         ~sandbox,
  //         ~account="u1"->Some,
  //         ~service=ServiceTool.build(
  //           ~sandbox,
  //           ~error=errorStub.contents->Obj.magic,
  //           ~publishApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  //           ->returns(Meta3dBsMostDefault.Most.empty(), _)
  //           ->Obj.magic,
  //           (),
  //         ),
  //         ~selectedPackages=selectedPackages.contents,
  //         ~selectedExtensions=selectedExtensions.contents,
  //         ~selectedContributes=selectedContributes.contents,
  //         (),
  //       )
  //     },
  //   )

  //   then(
  //     "error for get config data",
  //     () => {
  //       errorStub.contents->SinonTool.calledWith({j`找不到启动包`})->expect == true
  //     },
  //   )
  // })

  test(."generate correct app with config data", ({given, \"when", \"and", then}) => {
    let selectedPackageBinaryFile1 = Js.Typed_array.ArrayBuffer.make(10)
    let selectedPackages = ref(Obj.magic(1))
    // let selectedExtensions = ref(Obj.magic(1))
    let selectedContributes = ref(Obj.magic(1))
    let selectedElementsFromMarket = ref(Obj.magic(1))
    let customInputs = ref(Obj.magic(1))
    let customActions = ref(Obj.magic(1))
    let selectedUIControls = ref(Obj.magic(1))
    let selectedUIControlInspectorData = ref(Obj.magic(1))
    let canvasData = ref(Obj.magic(1))
    let apInspectorData = ref(Obj.magic(1))
    let values = ref(Obj.magic(1))
    let c1 = false
    let account = "u1"
    let appName = "n1"
    let appDescription = "dp1"
    let appBinaryFile = Js.Typed_array.ArrayBuffer.make(1)
    let generateAppStub = ref(Obj.magic(1))
    let convertAllFileDataStub = ref(Obj.magic(1))
    let publishAppStub = ref(Obj.magic(1))
    let setUploadProgressStub = ref(Obj.magic(1))
    let setIsUploadBeginStub = ref(Obj.magic(1))
    let setVisibleStub = ref(Obj.magic(1))
    let storedPackageIdsInApp = ref(Obj.magic(1))
    let selectedPackageBinaryFile2 = Js.Typed_array.ArrayBuffer.make(11)
    let p2PackageData = PackageStoredInAppTool.buildPackageData(
      ~packageProtocolName="p2-protocol",
      ~packageProtocolVersion="^0.0.2",
      ~packageProtocolIconBase64="ibase64",
      ~entryExtensionName="en2",
      ~packageVersion="0.0.2",
      ~packageName="p2",
      (),
    )

    _prepare(given, \"and")

    _prepareSelectedPackagesSelectedExtensionsAndContributes(
      given,
      \"and",
      (selectedPackages, selectedPackageBinaryFile1),
      (storedPackageIdsInApp, selectedPackageBinaryFile2, p2PackageData),
      // selectedExtensions,
      selectedContributes,
    )

    given(
      "prepare canvas data",
      () => {
        canvasData := CanvasControllerTool.buildCanvasData(~width=1, ~height=2, ())
      },
    )

    // \"and"(
    //   "select extension e3",
    //   () => {
    //     selectedExtensions :=
    //       selectedExtensions.contents->Meta3dCommonlib.ListSt.push(
    //         SelectedExtensionsTool.buildSelectedExtension(
    //           ~name="e3",
    //           // ~newName=None,
    //           ~id="e3",
    //           // ~isStart=true,
    //           ~protocolConfigStr=StartPackageProtocolConfigTool.buildProtocolConfigStr()->Some,
    //           (),
    //         ),
    //       )
    //   },
    // )

    \"and"(
      "prepare config data",
      () => {
        values :=
          {
            "configData_c1": c1,
          }
      },
    )

    \"and"(
      "prepare ap inspector data",
      () => {
        apInspectorData :=
          ApInspectorTool.buildApInspectorData(
            ~isDebug=true,
            ~clearColor=(0.1, 1., 1., 1.),
            ~skinName="s1"->Some,
            (),
          )
      },
    )

    \"and"(
      "prepare element data",
      () => {
        selectedElementsFromMarket := ElementTool.buildFakeSelectedElements()
        selectedUIControls :=
          list{
            SelectedUIControlsTool.buildSelectedUIControl(
              ~id="b1",
              ~protocolConfigStr=UIControlProtocolConfigTool.buildButtonContributeProtocolConfigStr(),
              ~data=ContributeTool.buildContributeData(
                ~contributePackageData=ContributeTool.buildContributePackageData(
                  ~protocol={
                    name: "p1",
                    version: "^0.0.1",
                  },
                  (),
                ),
                (),
              ),
              (),
            ),
          }
        selectedUIControlInspectorData :=
          list{
            UIControlInspectorTool.buildUIControlInspectorData(
              ~id="b1",
              ~x=1->FrontendUtils.CommonType.IntForRectField,
              ~isDraw=true->FrontendUtils.CommonType.BoolForIsDraw,
              (),
            ),
          }
      },
    )

    \"and"(
      "prepare custom data",
      () => {
        customInputs := list{CustomTool.buildCustomInput()}
        customActions := list{CustomTool.buildCustomAction()}
      },
    )

    CucumberAsync.execStep(
      \"when",
      "publish app",
      () => {
        (values.contents->Obj.magic)["appName"] = appName
        (values.contents->Obj.magic)["appDescription"] = appDescription

        generateAppStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(appBinaryFile, _)

        convertAllFileDataStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        publishAppStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            Meta3dBsMostDefault.Most.empty(),
            _,
          )

        setUploadProgressStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
        setIsUploadBeginStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
        setVisibleStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        PublishTool.publish(
          ~sandbox,
          ~setUploadProgress=setUploadProgressStub.contents->Obj.magic,
          ~setIsUploadBegin=setIsUploadBeginStub.contents->Obj.magic,
          ~setVisible=setVisibleStub.contents->Obj.magic,
          ~canvasData=canvasData.contents,
          ~apInspectorData=apInspectorData.contents,
          ~account="u1"->Some,
          ~values=values.contents->Obj.magic,
          ~service=ServiceTool.build(
            ~sandbox,
            ~serializeStartPackageProtocolConfigLib=Meta3d.Main.serializeStartPackageProtocolConfigLib->Obj.magic,
            ~getNeedConfigData=Meta3d.Main.getNeedConfigData->Obj.magic,
            ~publishApp=publishAppStub.contents->Obj.magic,
            ~generateApp=generateAppStub.contents->Obj.magic,
            ~convertAllFileDataForApp=convertAllFileDataStub.contents->Obj.magic,
            ~generateContribute=Meta3d.Main.generateContribute->Obj.magic,
            ~loadContribute=Meta3d.Main.loadContribute->Obj.magic,
            (),
          ),
          ~selectedPackages=selectedPackages.contents,
          // ~selectedExtensions=selectedExtensions.contents,
          ~selectedContributes=selectedContributes.contents,
          ~storedPackageIdsInApp=storedPackageIdsInApp.contents,
          ~selectedElementsFromMarket=selectedElementsFromMarket.contents,
          ~selectedUIControls=selectedUIControls.contents,
          ~selectedUIControlInspectorData=selectedUIControlInspectorData.contents,
          ~customInputs=customInputs.contents,
          ~customActions=customActions.contents,
          (),
        )
      },
    )

    then(
      "should mark begin upload",
      () => {
        let func = SinonTool.getFirstArg(~callIndex=0, ~stub=setIsUploadBeginStub.contents, ())

        (
          setIsUploadBeginStub.contents
          ->getCall(0, _)
          ->calledBefore(publishAppStub.contents->getCall(0, _)),
          func(),
        )->expect == (true, true)
      },
    )

    \"and"(
      "should generate app with correct contribute data which add generated element contribute and selected elements and custom data and start config data",
      () => {
        let {isDebug, clearColor, skinName} = apInspectorData.contents

        (
          generateAppStub.contents
          ->Obj.magic
          ->SinonTool.calledWithArg6(
            matchAny,
            [selectedPackageBinaryFile1],
            [(p2PackageData, selectedPackageBinaryFile2)],
            selectedElementsFromMarket.contents->Meta3dCommonlib.ListSt.toArray,
            (
              customInputs.contents->Meta3dCommonlib.ListSt.toArray,
              customActions.contents->Meta3dCommonlib.ListSt.toArray,
            ),
            (
              canvasData.contents,
              {
                "c1": c1,
                "isDebug": isDebug,
                "clearColor": clearColor,
                "skinName": skinName->Meta3dCommonlib.OptionSt.getExn,
              },
            ),
          ),
          // generateAppStub.contents
          // ->Obj.magic
          // ->SinonTool.getArg(~argIndex=3, ~stub=_, ())
          // ->Js.Json.stringify
          // ->NewlineTool.removeBlankChar,
          SinonTool.getAllArgsJson(convertAllFileDataStub.contents, 0),
        )->expect ==
          (
            true,
            "[[{\"contributePackageData\":{\"name\":\"c1\",\"version\":\"0.0.1\",\"account\":\"meta3d\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"displayName\":\"d1\",\"repoLink\":\"\",\"description\":\"dp1\",\"dependentPackageStoredInAppProtocolNameMap\":{},\"dependentBlockProtocolNameMap\":{}},\"contributeFuncData\":{}},{\"contributePackageData\":{\"name\":\"c2\",\"version\":\"0.0.1\",\"account\":\"meta3d\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"displayName\":\"d1\",\"repoLink\":\"\",\"description\":\"dp1\",\"dependentPackageStoredInAppProtocolNameMap\":{},\"dependentBlockProtocolNameMap\":{}},\"contributeFuncData\":{}},{\"contributePackageData\":{\"name\":\"meta3d-element-assemble-element\",\"version\":\"0.21.0\",\"account\":\"u1\",\"protocol\":{\"name\":\"meta3d-element-assemble-element-protocol\",\"version\":\"^0.21.0\"},\"displayName\":\"meta3d-element-assemble-element\",\"repoLink\":\"\",\"description\":\"element contribute\",\"dependentPackageStoredInAppProtocolNameMap\":{},\"dependentBlockProtocolNameMap\":{}},\"contributeFuncData\":{\"0\":10,\"1\":119,\"2\":105,\"3\":110,\"4\":100,\"5\":111,\"6\":119,\"7\":46,\"8\":67,\"9\":111,\"10\":110,\"11\":116,\"12\":114,\"13\":105,\"14\":98,\"15\":117,\"16\":116,\"17\":101,\"18\":32,\"19\":61,\"20\":32,\"21\":123,\"22\":10,\"23\":32,\"24\":32,\"25\":32,\"26\":32,\"27\":103,\"28\":101,\"29\":116,\"30\":67,\"31\":111,\"32\":110,\"33\":116,\"34\":114,\"35\":105,\"36\":98,\"37\":117,\"38\":116,\"39\":101,\"40\":58,\"41\":32,\"42\":40,\"43\":97,\"44\":112,\"45\":105,\"46\":41,\"47\":32,\"48\":61,\"49\":62,\"50\":32,\"51\":123,\"52\":10,\"53\":32,\"54\":32,\"55\":32,\"56\":32,\"57\":32,\"58\":32,\"59\":32,\"60\":32,\"61\":114,\"62\":101,\"63\":116,\"64\":117,\"65\":114,\"66\":110,\"67\":32,\"68\":123,\"69\":10,\"70\":32,\"71\":32,\"72\":32,\"73\":32,\"74\":32,\"75\":32,\"76\":32,\"77\":32,\"78\":32,\"79\":32,\"80\":32,\"81\":32,\"82\":101,\"83\":108,\"84\":101,\"85\":109,\"86\":101,\"87\":110,\"88\":116,\"89\":78,\"90\":97,\"91\":109,\"92\":101,\"93\":58,\"94\":34,\"95\":109,\"96\":101,\"97\":116,\"98\":97,\"99\":51,\"100\":100,\"101\":45,\"102\":101,\"103\":108,\"104\":101,\"105\":109,\"106\":101,\"107\":110,\"108\":116,\"109\":45,\"110\":97,\"111\":115,\"112\":115,\"113\":101,\"114\":109,\"115\":98,\"116\":108,\"117\":101,\"118\":45,\"119\":101,\"120\":108,\"121\":101,\"122\":109,\"123\":101,\"124\":110,\"125\":116,\"126\":34,\"127\":44,\"128\":10,\"129\":32,\"130\":32,\"131\":32,\"132\":32,\"133\":32,\"134\":32,\"135\":32,\"136\":32,\"137\":32,\"138\":32,\"139\":32,\"140\":32,\"141\":101,\"142\":120,\"143\":101,\"144\":99,\"145\":79,\"146\":114,\"147\":100,\"148\":101,\"149\":114,\"150\":58,\"151\":32,\"152\":48,\"153\":44,\"154\":10,\"155\":32,\"156\":32,\"157\":32,\"158\":32,\"159\":32,\"160\":32,\"161\":32,\"162\":32,\"163\":32,\"164\":32,\"165\":32,\"166\":32,\"167\":101,\"168\":108,\"169\":101,\"170\":109,\"171\":101,\"172\":110,\"173\":116,\"174\":83,\"175\":116,\"176\":97,\"177\":116,\"178\":101,\"179\":58,\"180\":32,\"181\":123,\"182\":125,\"183\":44,\"184\":10,\"185\":32,\"186\":32,\"187\":32,\"188\":32,\"189\":32,\"190\":32,\"191\":32,\"192\":32,\"193\":32,\"194\":32,\"195\":32,\"196\":32,\"197\":101,\"198\":108,\"199\":101,\"200\":109,\"201\":101,\"202\":110,\"203\":116,\"204\":70,\"205\":117,\"206\":110,\"207\":99,\"208\":58,\"209\":32,\"210\":40,\"211\":109,\"212\":101,\"213\":116,\"214\":97,\"215\":51,\"216\":100,\"217\":83,\"218\":116,\"219\":97,\"220\":116,\"221\":101,\"222\":44,\"223\":32,\"224\":101,\"225\":108,\"226\":101,\"227\":109,\"228\":101,\"229\":110,\"230\":116,\"231\":83,\"232\":116,\"233\":97,\"234\":116,\"235\":101,\"236\":41,\"237\":32,\"238\":61,\"239\":62,\"240\":32,\"241\":123,\"242\":10,\"243\":32,\"244\":32,\"245\":32,\"246\":32,\"247\":32,\"248\":32,\"249\":32,\"250\":32,\"251\":32,\"252\":32,\"253\":32,\"254\":32,\"255\":32,\"256\":32,\"257\":32,\"258\":32,\"259\":108,\"260\":101,\"261\":116,\"262\":32,\"263\":117,\"264\":105,\"265\":32,\"266\":61,\"267\":32,\"268\":97,\"269\":112,\"270\":105,\"271\":46,\"272\":103,\"273\":101,\"274\":116,\"275\":80,\"276\":97,\"277\":99,\"278\":107,\"279\":97,\"280\":103,\"281\":101,\"282\":83,\"283\":101,\"284\":114,\"285\":118,\"286\":105,\"287\":99,\"288\":101,\"289\":40,\"290\":109,\"291\":101,\"292\":116,\"293\":97,\"294\":51,\"295\":100,\"296\":83,\"297\":116,\"298\":97,\"299\":116,\"300\":101,\"301\":44,\"302\":32,\"303\":34,\"304\":109,\"305\":101,\"306\":116,\"307\":97,\"308\":51,\"309\":100,\"310\":45,\"311\":101,\"312\":100,\"313\":105,\"314\":116,\"315\":111,\"316\":114,\"317\":45,\"318\":119,\"319\":104,\"320\":111,\"321\":108,\"322\":101,\"323\":45,\"324\":112,\"325\":114,\"326\":111,\"327\":116,\"328\":111,\"329\":99,\"330\":111,\"331\":108,\"332\":34,\"333\":41,\"334\":46,\"335\":117,\"336\":105,\"337\":40,\"338\":109,\"339\":101,\"340\":116,\"341\":97,\"342\":51,\"343\":100,\"344\":83,\"345\":116,\"346\":97,\"347\":116,\"348\":101,\"349\":41,\"350\":10,\"351\":10,\"352\":32,\"353\":32,\"354\":32,\"355\":32,\"356\":32,\"357\":32,\"358\":32,\"359\":32,\"360\":32,\"361\":32,\"362\":32,\"363\":32,\"364\":32,\"365\":32,\"366\":32,\"367\":32,\"368\":108,\"369\":101,\"370\":116,\"371\":32,\"372\":123,\"373\":32,\"374\":103,\"375\":101,\"376\":116,\"377\":85,\"378\":73,\"379\":67,\"380\":111,\"381\":110,\"382\":116,\"383\":114,\"384\":111,\"385\":108,\"386\":70,\"387\":117,\"388\":110,\"389\":99,\"390\":44,\"391\":32,\"392\":103,\"393\":101,\"394\":116,\"395\":73,\"396\":110,\"397\":112,\"398\":117,\"399\":116,\"400\":70,\"401\":117,\"402\":110,\"403\":99,\"404\":32,\"405\":125,\"406\":32,\"407\":61,\"408\":32,\"409\":117,\"410\":105,\"411\":10,\"412\":10,\"413\":32,\"414\":32,\"415\":32,\"416\":32,\"417\":108,\"418\":101,\"419\":116,\"420\":32,\"421\":32,\"422\":61,\"423\":32,\"424\":103,\"425\":101,\"426\":116,\"427\":85,\"428\":73,\"429\":67,\"430\":111,\"431\":110,\"432\":116,\"433\":114,\"434\":111,\"435\":108,\"436\":70,\"437\":117,\"438\":110,\"439\":99,\"440\":40,\"441\":109,\"442\":101,\"443\":116,\"444\":97,\"445\":51,\"446\":100,\"447\":83,\"448\":116,\"449\":97,\"450\":116,\"451\":101,\"452\":44,\"453\":34,\"454\":34,\"455\":41,\"456\":10,\"457\":32,\"458\":32,\"459\":32,\"460\":32,\"461\":10,\"462\":32,\"463\":32,\"464\":32,\"465\":32,\"466\":32,\"467\":32,\"468\":32,\"469\":32,\"470\":32,\"471\":32,\"472\":32,\"473\":32,\"474\":32,\"475\":32,\"476\":32,\"477\":32,\"478\":108,\"479\":101,\"480\":116,\"481\":32,\"482\":100,\"483\":97,\"484\":116,\"485\":97,\"486\":32,\"487\":61,\"488\":32,\"489\":110,\"490\":117,\"491\":108,\"492\":108,\"493\":10,\"494\":32,\"495\":32,\"496\":105,\"497\":102,\"498\":40,\"499\":116,\"500\":114,\"501\":117,\"502\":101,\"503\":41,\"504\":123,\"505\":10,\"506\":32,\"507\":32,\"508\":32,\"509\":32,\"510\":32,\"511\":32,\"512\":32,\"513\":32,\"514\":32,\"515\":32,\"516\":32,\"517\":32,\"518\":32,\"519\":32,\"520\":32,\"521\":32,\"522\":32,\"523\":114,\"524\":101,\"525\":116,\"526\":117,\"527\":114,\"528\":110,\"529\":32,\"530\":40,\"531\":109,\"532\":101,\"533\":116,\"534\":97,\"535\":51,\"536\":100,\"537\":83,\"538\":116,\"539\":97,\"540\":116,\"541\":101,\"542\":44,\"543\":10,\"544\":32,\"545\":32,\"546\":32,\"547\":32,\"548\":32,\"549\":32,\"550\":32,\"551\":32,\"552\":110,\"553\":117,\"554\":108,\"555\":108,\"556\":44,\"557\":10,\"558\":32,\"559\":32,\"560\":32,\"561\":32,\"562\":32,\"563\":32,\"564\":32,\"565\":32,\"566\":123,\"567\":10,\"568\":32,\"569\":32,\"570\":32,\"571\":32,\"572\":120,\"573\":58,\"574\":32,\"575\":49,\"576\":44,\"577\":10,\"578\":32,\"579\":32,\"580\":32,\"581\":32,\"582\":121,\"583\":58,\"584\":32,\"585\":48,\"586\":44,\"587\":10,\"588\":32,\"589\":32,\"590\":32,\"591\":32,\"592\":119,\"593\":105,\"594\":100,\"595\":116,\"596\":104,\"597\":58,\"598\":32,\"599\":48,\"600\":44,\"601\":10,\"602\":32,\"603\":32,\"604\":32,\"605\":32,\"606\":104,\"607\":101,\"608\":105,\"609\":103,\"610\":104,\"611\":116,\"612\":58,\"613\":32,\"614\":48,\"615\":10,\"616\":32,\"617\":32,\"618\":32,\"619\":32,\"620\":125,\"621\":44,\"622\":10,\"623\":32,\"624\":32,\"625\":32,\"626\":32,\"627\":32,\"628\":32,\"629\":32,\"630\":32,\"631\":10,\"632\":32,\"633\":32,\"634\":32,\"635\":32,\"636\":32,\"637\":32,\"638\":32,\"639\":32,\"640\":32,\"641\":32,\"642\":32,\"643\":32,\"644\":32,\"645\":32,\"646\":32,\"647\":32,\"648\":123,\"649\":10,\"650\":32,\"651\":32,\"652\":32,\"653\":32,\"654\":32,\"655\":32,\"656\":32,\"657\":32,\"658\":46,\"659\":46,\"660\":46,\"661\":123,\"662\":125,\"663\":44,\"664\":10,\"665\":32,\"666\":32,\"667\":32,\"668\":32,\"669\":32,\"670\":32,\"671\":99,\"672\":104,\"673\":105,\"674\":108,\"675\":100,\"676\":114,\"677\":101,\"678\":110,\"679\":70,\"680\":117,\"681\":110,\"682\":99,\"683\":58,\"684\":40,\"685\":109,\"686\":101,\"687\":116,\"688\":97,\"689\":51,\"690\":100,\"691\":83,\"692\":116,\"693\":97,\"694\":116,\"695\":101,\"696\":41,\"697\":32,\"698\":61,\"699\":62,\"700\":32,\"701\":110,\"702\":101,\"703\":119,\"704\":32,\"705\":80,\"706\":114,\"707\":111,\"708\":109,\"709\":105,\"710\":115,\"711\":101,\"712\":40,\"713\":40,\"714\":114,\"715\":101,\"716\":115,\"717\":111,\"718\":108,\"719\":118,\"720\":101,\"721\":44,\"722\":32,\"723\":114,\"724\":101,\"725\":106,\"726\":101,\"727\":99,\"728\":116,\"729\":41,\"730\":32,\"731\":61,\"732\":62,\"733\":32,\"734\":114,\"735\":101,\"736\":115,\"737\":111,\"738\":108,\"739\":118,\"740\":101,\"741\":40,\"742\":109,\"743\":101,\"744\":116,\"745\":97,\"746\":51,\"747\":100,\"748\":83,\"749\":116,\"750\":97,\"751\":116,\"752\":101,\"753\":41,\"754\":41,\"755\":10,\"756\":32,\"757\":32,\"758\":32,\"759\":32,\"760\":32,\"761\":32,\"762\":32,\"763\":32,\"764\":32,\"765\":32,\"766\":32,\"767\":32,\"768\":32,\"769\":32,\"770\":32,\"771\":32,\"772\":125,\"773\":10,\"774\":32,\"775\":32,\"776\":32,\"777\":32,\"778\":32,\"779\":32,\"780\":32,\"781\":32,\"782\":32,\"783\":32,\"784\":32,\"785\":32,\"786\":32,\"787\":32,\"788\":32,\"789\":32,\"790\":32,\"791\":32,\"792\":32,\"793\":32,\"794\":41,\"795\":46,\"796\":116,\"797\":104,\"798\":101,\"799\":110,\"800\":40,\"801\":100,\"802\":97,\"803\":116,\"804\":97,\"805\":32,\"806\":61,\"807\":62,\"808\":123,\"809\":10,\"810\":32,\"811\":32,\"812\":32,\"813\":32,\"814\":32,\"815\":32,\"816\":32,\"817\":32,\"818\":32,\"819\":32,\"820\":32,\"821\":32,\"822\":32,\"823\":32,\"824\":32,\"825\":32,\"826\":109,\"827\":101,\"828\":116,\"829\":97,\"830\":51,\"831\":100,\"832\":83,\"833\":116,\"834\":97,\"835\":116,\"836\":101,\"837\":32,\"838\":61,\"839\":32,\"840\":100,\"841\":97,\"842\":116,\"843\":97,\"844\":91,\"845\":48,\"846\":93,\"847\":10,\"848\":117,\"849\":110,\"850\":100,\"851\":101,\"852\":102,\"853\":105,\"854\":110,\"855\":101,\"856\":100,\"857\":10,\"858\":32,\"859\":32,\"860\":114,\"861\":101,\"862\":116,\"863\":117,\"864\":114,\"865\":110,\"866\":32,\"867\":110,\"868\":101,\"869\":119,\"870\":32,\"871\":80,\"872\":114,\"873\":111,\"874\":109,\"875\":105,\"876\":115,\"877\":101,\"878\":40,\"879\":40,\"880\":114,\"881\":101,\"882\":115,\"883\":111,\"884\":108,\"885\":118,\"886\":101,\"887\":41,\"888\":32,\"889\":61,\"890\":62,\"891\":32,\"892\":123,\"893\":10,\"894\":32,\"895\":32,\"896\":32,\"897\":32,\"898\":32,\"899\":32,\"900\":32,\"901\":32,\"902\":32,\"903\":32,\"904\":32,\"905\":32,\"906\":32,\"907\":32,\"908\":32,\"909\":32,\"910\":32,\"911\":32,\"912\":32,\"913\":32,\"914\":114,\"915\":101,\"916\":115,\"917\":111,\"918\":108,\"919\":118,\"920\":101,\"921\":40,\"922\":109,\"923\":101,\"924\":116,\"925\":97,\"926\":51,\"927\":100,\"928\":83,\"929\":116,\"930\":97,\"931\":116,\"932\":101,\"933\":41,\"934\":10,\"935\":32,\"936\":32,\"937\":32,\"938\":32,\"939\":32,\"940\":32,\"941\":32,\"942\":32,\"943\":32,\"944\":32,\"945\":32,\"946\":32,\"947\":32,\"948\":32,\"949\":32,\"950\":32,\"951\":125,\"952\":41,\"953\":10,\"954\":32,\"955\":32,\"956\":32,\"957\":32,\"958\":32,\"959\":32,\"960\":32,\"961\":32,\"962\":32,\"963\":32,\"964\":32,\"965\":32,\"966\":32,\"967\":32,\"968\":32,\"969\":32,\"970\":125,\"971\":41,\"972\":125,\"973\":10,\"974\":32,\"975\":32,\"976\":114,\"977\":101,\"978\":116,\"979\":117,\"980\":114,\"981\":110,\"982\":32,\"983\":110,\"984\":101,\"985\":119,\"986\":32,\"987\":80,\"988\":114,\"989\":111,\"990\":109,\"991\":105,\"992\":115,\"993\":101,\"994\":40,\"995\":40,\"996\":114,\"997\":101,\"998\":115,\"999\":111,\"1000\":108,\"1001\":118,\"1002\":101,\"1003\":41,\"1004\":32,\"1005\":61,\"1006\":62,\"1007\":32,\"1008\":123,\"1009\":10,\"1010\":32,\"1011\":32,\"1012\":32,\"1013\":32,\"1014\":32,\"1015\":32,\"1016\":32,\"1017\":32,\"1018\":32,\"1019\":32,\"1020\":32,\"1021\":32,\"1022\":32,\"1023\":32,\"1024\":32,\"1025\":32,\"1026\":32,\"1027\":32,\"1028\":32,\"1029\":32,\"1030\":114,\"1031\":101,\"1032\":115,\"1033\":111,\"1034\":108,\"1035\":118,\"1036\":101,\"1037\":40,\"1038\":109,\"1039\":101,\"1040\":116,\"1041\":97,\"1042\":51,\"1043\":100,\"1044\":83,\"1045\":116,\"1046\":97,\"1047\":116,\"1048\":101,\"1049\":41,\"1050\":10,\"1051\":32,\"1052\":32,\"1053\":32,\"1054\":32,\"1055\":32,\"1056\":32,\"1057\":32,\"1058\":32,\"1059\":32,\"1060\":32,\"1061\":32,\"1062\":32,\"1063\":32,\"1064\":32,\"1065\":32,\"1066\":32,\"1067\":125,\"1068\":41,\"1069\":10,\"1070\":32,\"1071\":32,\"1072\":10,\"1073\":32,\"1074\":32,\"1075\":32,\"1076\":32,\"1077\":32,\"1078\":32,\"1079\":32,\"1080\":32,\"1081\":32,\"1082\":32,\"1083\":32,\"1084\":32,\"1085\":125,\"1086\":10,\"1087\":32,\"1088\":32,\"1089\":32,\"1090\":32,\"1091\":32,\"1092\":32,\"1093\":32,\"1094\":32,\"1095\":125,\"1096\":10,\"1097\":32,\"1098\":32,\"1099\":32,\"1100\":32,\"1101\":125,\"1102\":10,\"1103\":125,\"1104\":10,\"1105\":32,\"1106\":32}}]]"
          )
      },
    )

    \"and"(
      "should publish the generated app",
      () => {
        publishAppStub.contents
        ->Obj.magic
        ->SinonTool.calledWithArg5(matchAny, appBinaryFile, appName, account, appDescription)
        ->expect == true
      },
    )

    then(
      "should mark finish upload",
      () => {
        let func = SinonTool.getFirstArg(~callIndex=1, ~stub=setIsUploadBeginStub.contents, ())

        (
          setIsUploadBeginStub.contents
          ->getCall(1, _)
          ->calledAfter(publishAppStub.contents->getCall(0, _)),
          func(),
        )->expect == (true, false)
      },
    )

    \"and"(
      "should close modal",
      () => {
        let func = SinonTool.getFirstArg(~stub=setVisibleStub.contents, ())

        func()->expect == false
      },
    )
  })
})
