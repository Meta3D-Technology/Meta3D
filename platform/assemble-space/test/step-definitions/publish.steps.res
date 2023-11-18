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
    // let selectedElements = ref(Obj.magic(1))
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
        // selectedElements := ElementTool.buildFakeSelectedElements()
        // selectedUIControls := list{}
        // selectedUIControlInspectorData := list{}

        selectedUIControls :=
          list{
            SelectedUIControlsTool.buildSelectedUIControl(
              ~id="b1",
              ~protocolConfigStr=UIControlProtocolConfigTool.buildButtonContributeProtocolConfigStr(),
              ~data=ContributeTool.buildContributeData(
                ~contributePackageData=ContributeTool.buildContributePackageData(),
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
          // ~selectedElements=selectedElements.contents,
          ~selectedUIControls=selectedUIControls.contents,
          ~selectedUIControlInspectorData=selectedUIControlInspectorData.contents,
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
      "should generate app with correct contribute data which add generated element contribute and builded selected elements and start config data",
      () => {
        let {isDebug, clearColor, skinName} = apInspectorData.contents

        (
          generateAppStub.contents
          ->Obj.magic
          ->SinonTool.calledWithArg5(
            matchAny,
            [selectedPackageBinaryFile1],
            [(p2PackageData, selectedPackageBinaryFile2)],
            // selectedElements.contents->Meta3dCommonlib.ListSt.toArray,
            matchAny,
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
          generateAppStub.contents
          ->Obj.magic
          ->SinonTool.getArg(~argIndex=3, ~stub=_, ())
          ->Js.Json.stringify
          ->NewlineTool.removeBlankChar,
          SinonTool.getAllArgsJson(convertAllFileDataStub.contents, 0),
        )->expect ==
          (
            true,
            "[{\"elementName\":\"meta3d-element-assemble-element\",\"elementVersion\":\"0.20.0\",\"inspectorData\":{\"uiControls\":[{\"displayName\":\"e1\",\"rect\":{\"x\":{\"_0\":1},\"y\":{\"_0\":0},\"width\":{\"_0\":0},\"height\":{\"_0\":0}},\"isDraw\":{\"_0\":true},\"event\":[],\"specific\":[],\"children\":[]}]}}]",
            "[[{\"contributePackageData\":{\"name\":\"c1\",\"version\":\"0.0.1\",\"account\":\"meta3d\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"displayName\":\"d1\",\"repoLink\":\"\",\"description\":\"dp1\",\"dependentPackageStoredInAppProtocolNameMap\":{},\"dependentBlockProtocolNameMap\":{}},\"contributeFuncData\":{}},{\"contributePackageData\":{\"name\":\"c2\",\"version\":\"0.0.1\",\"account\":\"meta3d\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"displayName\":\"d1\",\"repoLink\":\"\",\"description\":\"dp1\",\"dependentPackageStoredInAppProtocolNameMap\":{},\"dependentBlockProtocolNameMap\":{}},\"contributeFuncData\":{}},{\"contributePackageData\":{\"name\":\"meta3d-element-assemble-element\",\"version\":\"0.20.0\",\"account\":\"u1\",\"protocol\":{\"name\":\"meta3d-element-assemble-element-protocol\",\"version\":\"^0.20.0\"},\"displayName\":\"meta3d-element-assemble-element\",\"repoLink\":\"\",\"description\":\"element contribute\",\"dependentPackageStoredInAppProtocolNameMap\":{},\"dependentBlockProtocolNameMap\":{}},\"contributeFuncData\":{\"0\":10,\"1\":119,\"2\":105,\"3\":110,\"4\":100,\"5\":111,\"6\":119,\"7\":46,\"8\":67,\"9\":111,\"10\":110,\"11\":116,\"12\":114,\"13\":105,\"14\":98,\"15\":117,\"16\":116,\"17\":101,\"18\":32,\"19\":61,\"20\":32,\"21\":123,\"22\":10,\"23\":32,\"24\":32,\"25\":32,\"26\":32,\"27\":103,\"28\":101,\"29\":116,\"30\":67,\"31\":111,\"32\":110,\"33\":116,\"34\":114,\"35\":105,\"36\":98,\"37\":117,\"38\":116,\"39\":101,\"40\":58,\"41\":32,\"42\":40,\"43\":97,\"44\":112,\"45\":105,\"46\":41,\"47\":32,\"48\":61,\"49\":62,\"50\":32,\"51\":123,\"52\":10,\"53\":32,\"54\":32,\"55\":32,\"56\":32,\"57\":32,\"58\":32,\"59\":32,\"60\":32,\"61\":114,\"62\":101,\"63\":116,\"64\":117,\"65\":114,\"66\":110,\"67\":32,\"68\":123,\"69\":10,\"70\":32,\"71\":32,\"72\":32,\"73\":32,\"74\":32,\"75\":32,\"76\":32,\"77\":32,\"78\":32,\"79\":32,\"80\":32,\"81\":32,\"82\":101,\"83\":108,\"84\":101,\"85\":109,\"86\":101,\"87\":110,\"88\":116,\"89\":78,\"90\":97,\"91\":109,\"92\":101,\"93\":58,\"94\":34,\"95\":109,\"96\":101,\"97\":116,\"98\":97,\"99\":51,\"100\":100,\"101\":45,\"102\":101,\"103\":108,\"104\":101,\"105\":109,\"106\":101,\"107\":110,\"108\":116,\"109\":45,\"110\":97,\"111\":115,\"112\":115,\"113\":101,\"114\":109,\"115\":98,\"116\":108,\"117\":101,\"118\":45,\"119\":101,\"120\":108,\"121\":101,\"122\":109,\"123\":101,\"124\":110,\"125\":116,\"126\":34,\"127\":44,\"128\":10,\"129\":32,\"130\":32,\"131\":32,\"132\":32,\"133\":32,\"134\":32,\"135\":32,\"136\":32,\"137\":32,\"138\":32,\"139\":32,\"140\":32,\"141\":101,\"142\":120,\"143\":101,\"144\":99,\"145\":79,\"146\":114,\"147\":100,\"148\":101,\"149\":114,\"150\":58,\"151\":32,\"152\":48,\"153\":44,\"154\":10,\"155\":32,\"156\":32,\"157\":32,\"158\":32,\"159\":32,\"160\":32,\"161\":32,\"162\":32,\"163\":32,\"164\":32,\"165\":32,\"166\":32,\"167\":101,\"168\":108,\"169\":101,\"170\":109,\"171\":101,\"172\":110,\"173\":116,\"174\":83,\"175\":116,\"176\":97,\"177\":116,\"178\":101,\"179\":58,\"180\":32,\"181\":123,\"182\":125,\"183\":44,\"184\":10,\"185\":32,\"186\":32,\"187\":32,\"188\":32,\"189\":32,\"190\":32,\"191\":32,\"192\":32,\"193\":32,\"194\":32,\"195\":32,\"196\":32,\"197\":101,\"198\":108,\"199\":101,\"200\":109,\"201\":101,\"202\":110,\"203\":116,\"204\":70,\"205\":117,\"206\":110,\"207\":99,\"208\":58,\"209\":32,\"210\":40,\"211\":109,\"212\":101,\"213\":116,\"214\":97,\"215\":51,\"216\":100,\"217\":83,\"218\":116,\"219\":97,\"220\":116,\"221\":101,\"222\":44,\"223\":32,\"224\":101,\"225\":108,\"226\":101,\"227\":109,\"228\":101,\"229\":110,\"230\":116,\"231\":83,\"232\":116,\"233\":97,\"234\":116,\"235\":101,\"236\":41,\"237\":32,\"238\":61,\"239\":62,\"240\":32,\"241\":123,\"242\":10,\"243\":32,\"244\":32,\"245\":32,\"246\":32,\"247\":32,\"248\":32,\"249\":32,\"250\":32,\"251\":32,\"252\":32,\"253\":32,\"254\":32,\"255\":32,\"256\":32,\"257\":32,\"258\":32,\"259\":108,\"260\":101,\"261\":116,\"262\":32,\"263\":117,\"264\":105,\"265\":32,\"266\":61,\"267\":32,\"268\":97,\"269\":112,\"270\":105,\"271\":46,\"272\":103,\"273\":101,\"274\":116,\"275\":80,\"276\":97,\"277\":99,\"278\":107,\"279\":97,\"280\":103,\"281\":101,\"282\":83,\"283\":101,\"284\":114,\"285\":118,\"286\":105,\"287\":99,\"288\":101,\"289\":40,\"290\":109,\"291\":101,\"292\":116,\"293\":97,\"294\":51,\"295\":100,\"296\":83,\"297\":116,\"298\":97,\"299\":116,\"300\":101,\"301\":44,\"302\":32,\"303\":34,\"304\":109,\"305\":101,\"306\":116,\"307\":97,\"308\":51,\"309\":100,\"310\":45,\"311\":101,\"312\":100,\"313\":105,\"314\":116,\"315\":111,\"316\":114,\"317\":45,\"318\":119,\"319\":104,\"320\":111,\"321\":108,\"322\":101,\"323\":45,\"324\":112,\"325\":114,\"326\":111,\"327\":116,\"328\":111,\"329\":99,\"330\":111,\"331\":108,\"332\":34,\"333\":41,\"334\":46,\"335\":117,\"336\":105,\"337\":40,\"338\":109,\"339\":101,\"340\":116,\"341\":97,\"342\":51,\"343\":100,\"344\":83,\"345\":116,\"346\":97,\"347\":116,\"348\":101,\"349\":41,\"350\":10,\"351\":10,\"352\":32,\"353\":32,\"354\":32,\"355\":32,\"356\":32,\"357\":32,\"358\":32,\"359\":32,\"360\":32,\"361\":32,\"362\":32,\"363\":32,\"364\":32,\"365\":32,\"366\":32,\"367\":32,\"368\":108,\"369\":101,\"370\":116,\"371\":32,\"372\":123,\"373\":32,\"374\":103,\"375\":101,\"376\":116,\"377\":85,\"378\":73,\"379\":67,\"380\":111,\"381\":110,\"382\":116,\"383\":114,\"384\":111,\"385\":108,\"386\":70,\"387\":117,\"388\":110,\"389\":99,\"390\":44,\"391\":32,\"392\":103,\"393\":101,\"394\":116,\"395\":73,\"396\":110,\"397\":112,\"398\":117,\"399\":116,\"400\":70,\"401\":117,\"402\":110,\"403\":99,\"404\":32,\"405\":125,\"406\":32,\"407\":61,\"408\":32,\"409\":117,\"410\":105,\"411\":10,\"412\":10,\"413\":32,\"414\":32,\"415\":32,\"416\":32,\"417\":108,\"418\":101,\"419\":116,\"420\":32,\"421\":32,\"422\":61,\"423\":32,\"424\":103,\"425\":101,\"426\":116,\"427\":85,\"428\":73,\"429\":67,\"430\":111,\"431\":110,\"432\":116,\"433\":114,\"434\":111,\"435\":108,\"436\":70,\"437\":117,\"438\":110,\"439\":99,\"440\":40,\"441\":109,\"442\":101,\"443\":116,\"444\":97,\"445\":51,\"446\":100,\"447\":83,\"448\":116,\"449\":97,\"450\":116,\"451\":101,\"452\":44,\"453\":34,\"454\":34,\"455\":41,\"456\":10,\"457\":32,\"458\":32,\"459\":32,\"460\":32,\"461\":10,\"462\":32,\"463\":32,\"464\":32,\"465\":32,\"466\":32,\"467\":32,\"468\":32,\"469\":32,\"470\":32,\"471\":32,\"472\":32,\"473\":32,\"474\":32,\"475\":32,\"476\":32,\"477\":32,\"478\":108,\"479\":101,\"480\":116,\"481\":32,\"482\":100,\"483\":97,\"484\":116,\"485\":97,\"486\":32,\"487\":61,\"488\":32,\"489\":110,\"490\":117,\"491\":108,\"492\":108,\"493\":10,\"494\":32,\"495\":32,\"496\":105,\"497\":102,\"498\":40,\"499\":116,\"500\":114,\"501\":117,\"502\":101,\"503\":41,\"504\":123,\"505\":10,\"506\":32,\"507\":32,\"508\":32,\"509\":32,\"510\":32,\"511\":32,\"512\":32,\"513\":32,\"514\":32,\"515\":32,\"516\":32,\"517\":32,\"518\":32,\"519\":32,\"520\":32,\"521\":32,\"522\":32,\"523\":114,\"524\":101,\"525\":116,\"526\":117,\"527\":114,\"528\":110,\"529\":32,\"530\":40,\"531\":109,\"532\":101,\"533\":116,\"534\":97,\"535\":51,\"536\":100,\"537\":83,\"538\":116,\"539\":97,\"540\":116,\"541\":101,\"542\":44,\"543\":10,\"544\":32,\"545\":32,\"546\":32,\"547\":32,\"548\":32,\"549\":32,\"550\":32,\"551\":32,\"552\":110,\"553\":117,\"554\":108,\"555\":108,\"556\":44,\"557\":10,\"558\":32,\"559\":32,\"560\":32,\"561\":32,\"562\":32,\"563\":32,\"564\":32,\"565\":32,\"566\":32,\"567\":32,\"568\":32,\"569\":32,\"570\":32,\"571\":32,\"572\":32,\"573\":32,\"574\":123,\"575\":10,\"576\":32,\"577\":32,\"578\":32,\"579\":32,\"580\":32,\"581\":32,\"582\":32,\"583\":32,\"584\":32,\"585\":32,\"586\":32,\"587\":32,\"588\":32,\"589\":32,\"590\":32,\"591\":32,\"592\":32,\"593\":32,\"594\":46,\"595\":46,\"596\":46,\"597\":117,\"598\":110,\"599\":100,\"600\":101,\"601\":102,\"602\":105,\"603\":110,\"604\":101,\"605\":100,\"606\":44,\"607\":10,\"608\":32,\"609\":32,\"610\":32,\"611\":32,\"612\":32,\"613\":32,\"614\":32,\"615\":32,\"616\":46,\"617\":46,\"618\":46,\"619\":123,\"620\":125,\"621\":44,\"622\":10,\"623\":32,\"624\":32,\"625\":32,\"626\":32,\"627\":32,\"628\":32,\"629\":99,\"630\":104,\"631\":105,\"632\":108,\"633\":100,\"634\":114,\"635\":101,\"636\":110,\"637\":70,\"638\":117,\"639\":110,\"640\":99,\"641\":58,\"642\":40,\"643\":109,\"644\":101,\"645\":116,\"646\":97,\"647\":51,\"648\":100,\"649\":83,\"650\":116,\"651\":97,\"652\":116,\"653\":101,\"654\":41,\"655\":32,\"656\":61,\"657\":62,\"658\":32,\"659\":110,\"660\":101,\"661\":119,\"662\":32,\"663\":80,\"664\":114,\"665\":111,\"666\":109,\"667\":105,\"668\":115,\"669\":101,\"670\":40,\"671\":40,\"672\":114,\"673\":101,\"674\":115,\"675\":111,\"676\":108,\"677\":118,\"678\":101,\"679\":44,\"680\":32,\"681\":114,\"682\":101,\"683\":106,\"684\":101,\"685\":99,\"686\":116,\"687\":41,\"688\":32,\"689\":61,\"690\":62,\"691\":32,\"692\":114,\"693\":101,\"694\":115,\"695\":111,\"696\":108,\"697\":118,\"698\":101,\"699\":40,\"700\":109,\"701\":101,\"702\":116,\"703\":97,\"704\":51,\"705\":100,\"706\":83,\"707\":116,\"708\":97,\"709\":116,\"710\":101,\"711\":41,\"712\":41,\"713\":10,\"714\":32,\"715\":32,\"716\":32,\"717\":32,\"718\":32,\"719\":32,\"720\":32,\"721\":32,\"722\":32,\"723\":32,\"724\":32,\"725\":32,\"726\":32,\"727\":32,\"728\":32,\"729\":32,\"730\":125,\"731\":10,\"732\":32,\"733\":32,\"734\":32,\"735\":32,\"736\":32,\"737\":32,\"738\":32,\"739\":32,\"740\":32,\"741\":32,\"742\":32,\"743\":32,\"744\":32,\"745\":32,\"746\":32,\"747\":32,\"748\":32,\"749\":32,\"750\":32,\"751\":32,\"752\":41,\"753\":46,\"754\":116,\"755\":104,\"756\":101,\"757\":110,\"758\":40,\"759\":100,\"760\":97,\"761\":116,\"762\":97,\"763\":32,\"764\":61,\"765\":62,\"766\":123,\"767\":10,\"768\":32,\"769\":32,\"770\":32,\"771\":32,\"772\":32,\"773\":32,\"774\":32,\"775\":32,\"776\":32,\"777\":32,\"778\":32,\"779\":32,\"780\":32,\"781\":32,\"782\":32,\"783\":32,\"784\":109,\"785\":101,\"786\":116,\"787\":97,\"788\":51,\"789\":100,\"790\":83,\"791\":116,\"792\":97,\"793\":116,\"794\":101,\"795\":32,\"796\":61,\"797\":32,\"798\":100,\"799\":97,\"800\":116,\"801\":97,\"802\":91,\"803\":48,\"804\":93,\"805\":10,\"806\":117,\"807\":110,\"808\":100,\"809\":101,\"810\":102,\"811\":105,\"812\":110,\"813\":101,\"814\":100,\"815\":10,\"816\":32,\"817\":32,\"818\":114,\"819\":101,\"820\":116,\"821\":117,\"822\":114,\"823\":110,\"824\":32,\"825\":110,\"826\":101,\"827\":119,\"828\":32,\"829\":80,\"830\":114,\"831\":111,\"832\":109,\"833\":105,\"834\":115,\"835\":101,\"836\":40,\"837\":40,\"838\":114,\"839\":101,\"840\":115,\"841\":111,\"842\":108,\"843\":118,\"844\":101,\"845\":41,\"846\":32,\"847\":61,\"848\":62,\"849\":32,\"850\":123,\"851\":10,\"852\":32,\"853\":32,\"854\":32,\"855\":32,\"856\":32,\"857\":32,\"858\":32,\"859\":32,\"860\":32,\"861\":32,\"862\":32,\"863\":32,\"864\":32,\"865\":32,\"866\":32,\"867\":32,\"868\":32,\"869\":32,\"870\":32,\"871\":32,\"872\":114,\"873\":101,\"874\":115,\"875\":111,\"876\":108,\"877\":118,\"878\":101,\"879\":40,\"880\":109,\"881\":101,\"882\":116,\"883\":97,\"884\":51,\"885\":100,\"886\":83,\"887\":116,\"888\":97,\"889\":116,\"890\":101,\"891\":41,\"892\":10,\"893\":32,\"894\":32,\"895\":32,\"896\":32,\"897\":32,\"898\":32,\"899\":32,\"900\":32,\"901\":32,\"902\":32,\"903\":32,\"904\":32,\"905\":32,\"906\":32,\"907\":32,\"908\":32,\"909\":125,\"910\":41,\"911\":10,\"912\":32,\"913\":32,\"914\":32,\"915\":32,\"916\":32,\"917\":32,\"918\":32,\"919\":32,\"920\":32,\"921\":32,\"922\":32,\"923\":32,\"924\":32,\"925\":32,\"926\":32,\"927\":32,\"928\":125,\"929\":41,\"930\":125,\"931\":10,\"932\":32,\"933\":32,\"934\":114,\"935\":101,\"936\":116,\"937\":117,\"938\":114,\"939\":110,\"940\":32,\"941\":110,\"942\":101,\"943\":119,\"944\":32,\"945\":80,\"946\":114,\"947\":111,\"948\":109,\"949\":105,\"950\":115,\"951\":101,\"952\":40,\"953\":40,\"954\":114,\"955\":101,\"956\":115,\"957\":111,\"958\":108,\"959\":118,\"960\":101,\"961\":41,\"962\":32,\"963\":61,\"964\":62,\"965\":32,\"966\":123,\"967\":10,\"968\":32,\"969\":32,\"970\":32,\"971\":32,\"972\":32,\"973\":32,\"974\":32,\"975\":32,\"976\":32,\"977\":32,\"978\":32,\"979\":32,\"980\":32,\"981\":32,\"982\":32,\"983\":32,\"984\":32,\"985\":32,\"986\":32,\"987\":32,\"988\":114,\"989\":101,\"990\":115,\"991\":111,\"992\":108,\"993\":118,\"994\":101,\"995\":40,\"996\":109,\"997\":101,\"998\":116,\"999\":97,\"1000\":51,\"1001\":100,\"1002\":83,\"1003\":116,\"1004\":97,\"1005\":116,\"1006\":101,\"1007\":41,\"1008\":10,\"1009\":32,\"1010\":32,\"1011\":32,\"1012\":32,\"1013\":32,\"1014\":32,\"1015\":32,\"1016\":32,\"1017\":32,\"1018\":32,\"1019\":32,\"1020\":32,\"1021\":32,\"1022\":32,\"1023\":32,\"1024\":32,\"1025\":125,\"1026\":41,\"1027\":10,\"1028\":32,\"1029\":32,\"1030\":10,\"1031\":32,\"1032\":32,\"1033\":32,\"1034\":32,\"1035\":32,\"1036\":32,\"1037\":32,\"1038\":32,\"1039\":32,\"1040\":32,\"1041\":32,\"1042\":32,\"1043\":125,\"1044\":10,\"1045\":32,\"1046\":32,\"1047\":32,\"1048\":32,\"1049\":32,\"1050\":32,\"1051\":32,\"1052\":32,\"1053\":125,\"1054\":10,\"1055\":32,\"1056\":32,\"1057\":32,\"1058\":32,\"1059\":125,\"1060\":10,\"1061\":125,\"1062\":10,\"1063\":32,\"1064\":32}}]]",
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
