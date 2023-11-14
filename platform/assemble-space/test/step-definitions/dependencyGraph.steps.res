open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/dependencyGraph.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let setDataStub = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()

      setDataStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
    })
  }

  test(."if no start extension, build empty graph data", ({given, \"when", \"and", then}) => {
    let e1 = ref(Obj.magic(1))

    _prepare(given, \"and")

    given(
      "select extension e1",
      () => {
        e1 :=
          SelectedExtensionsTool.buildSelectedExtension(
            // ~id="e1",
            ~isStart=false,
            // ~data=ExtensionTool.buildExtensionData(
            //   ~extensionFuncData=f1,
            //   ~extensionPackageData=ExtensionTool.buildExtensionPackageData(~name=id, ()),
            //   (),
            // ),
            (),
          )
      },
    )

    \"when"(
      "build graph data",
      () => {
        DependencyGraphUtilsTool.useEffectOnce(
          ~setData=setDataStub.contents->Obj.magic,
          ~service=ServiceTool.build(~sandbox, ()),
          ~selectedExtensions=list{e1.contents},
          (),
        )
      },
    )

    then(
      "should build empty data",
      () => {
        ReactHookTool.getValue(~setLocalValueStub=setDataStub.contents, ())->expect ==
          Meta3dCommonlib.ImmutableHashMap.createEmpty()
      },
    )
  })

  let _prepareFile = given => {
    given("prepare file", () => {
      FileTool.buildFakeTextDecoder(FileTool.convertUint8ArrayToBuffer)
      FileTool.buildFakeTextEncoder()
    })
  }

  test(."if has start extension, build graph data", ({given, \"when", \"and", then}) => {
    let e1 = ref(Obj.magic(1))
    let p1 = ref(Obj.magic(1))
    let c1 = ref(Obj.magic(1))
    let e1Name = "e1"
    let e1Version = "0.0.1"
    let c1Name = "c1"
    let c1Version = "0.0.2"

    _prepare(given, \"and")

    _prepareFile(given)

    given(
      "select extension e1 which dependent on protocol1, protocol2 and is start extension",
      () => {
        e1 :=
          SelectedExtensionsTool.buildSelectedExtension(
            ~name=e1Name,
            ~version=e1Version,
            ~isStart=true,
            ~protocolIconBase64="ei1",
            ~data=ExtensionTool.buildExtensionData(
              ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                ~name=e1Name,
                ~version=e1Version,
                ~displayName="ed1",
                ~protocol=(
                  {
                    name: "p1",
                    version: "^0.0.1",
                  }: Meta3d.ExtensionFileType.extensionProtocolData
                ),
                ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()
                ->Meta3dCommonlib.ImmutableHashMap.set("protocol1", "^0.1.1")
                ->Meta3dCommonlib.ImmutableHashMap.set("protocol2", "^0.2.1"),
                (),
              ),
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "select contribute c1 for protocol2 which dependent on protocol3, protocol4",
      () => {
        c1 :=
          SelectedContributesTool.buildSelectedContribute(
            ~name=c1Name,
            ~version=c1Version,
            ~protocolIconBase64="ci1",
            ~data=ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(
                ~name=c1Name,
                ~version=c1Version,
                ~displayName="cd1",
                ~protocol=(
                  {
                    name: "protocol2",
                    version: "^0.2.2",
                  }: Meta3d.ExtensionFileType.contributeProtocolData
                ),
                ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()
                ->Meta3dCommonlib.ImmutableHashMap.set("protocol3", "^0.0.1")
                ->Meta3dCommonlib.ImmutableHashMap.set("protocol4", "^0.0.1"),
                (),
              ),
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "select package p1 which has extension pe1 for protocol1 and contribute pc1 for protocol3",
      () => {
        let pe1 = ExtensionTool.generateExtension(
          ~name="pe1",
          ~version="0.5.1",
          ~protocolName="protocol1",
          ~protocolVersion="^0.2.0",
          ~displayName="ped1",
          ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
          (),
        )
        let pe1FileData = Meta3d.Main.loadExtension(pe1)

        let pc1 = ContributeTool.generateContribute(
          ~name="pc1",
          ~version="0.5.2",
          ~protocolName="protocol3",
          ~protocolVersion="^0.0.1",
          ~displayName="pcd1",
          ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
          (),
        )
        let pc1FileData = Meta3d.Main.loadContribute(pc1)

        p1 :=
          PackageSelectedPackagesTool.buildSelectedPackage(
            ~name="p1",
            ~protocolIconBase64="pi1",
            ~binaryFile=Meta3d.Main.generatePackage(
              Meta3d.Main.convertAllFileDataForPackage([pe1FileData], [pc1FileData], ["pe1"]),
              [],
            ),
            (),
          )
      },
    )

    \"when"(
      "build graph data",
      () => {
        DependencyGraphUtilsTool.useEffectOnce(
          ~setData=setDataStub.contents->Obj.magic,
          ~service=ServiceTool.build(
            ~sandbox,
            ~getAllExtensionAndContributeFileDataOfPackage=(. package) =>
              Meta3d.Main.getAllExtensionAndContributeFileDataOfPackage(package),
            (),
          ),
          ~selectedPackages=list{p1.contents},
          ~selectedExtensions=list{e1.contents},
          ~selectedContributes=list{c1.contents},
          (),
        )
      },
    )

    then(
      "should build data: e1 -> pe1, c1; c1 -> pc1, empty",
      () => {
        ReactHookTool.getValue(~setLocalValueStub=setDataStub.contents, ())
        // ->Meta3dCommonlib.Log.printForDebug
        ->Js.Json.stringify
        ->NewlineTool.removeBlankChar
        ->expect ==
          {
            j`















             {"nodes":[{"id":"p1","value":{"title":"ed1","items":[{"text":"协议名","value":"p1"},{"text":"协议版本","value":"^0.0.1"},{"text":"协议icon","icon":"ei1"},{"text":"实现名","value":"e1"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false},{"id":"protocol1","value":{"title":"ped1","items":[{"text":"协议名","value":"protocol1"},{"text":"协议版本","value":"^0.2.0"},{"text":"协议icon","icon":"pi1"},{"text":"实现名","value":"pe1"},{"text":"实现版本","value":"0.5.1"},{"text":"所属包名","value":"p1"}]},"nodeType":2,"isEmpty":false},{"id":"protocol2","value":{"title":"cd1","items":[{"text":"协议名","value":"protocol2"},{"text":"协议版本","value":"^0.2.2"},{"text":"协议icon","icon":"ci1"},{"text":"实现名","value":"c1"},{"text":"实现版本","value":"0.0.2"}]},"nodeType":1,"isEmpty":false},{"id":"protocol3","value":{"title":"pcd1","items":[{"text":"协议名","value":"protocol3"},{"text":"协议版本","value":"^0.0.1"},{"text":"协议icon","icon":"pi1"},{"text":"实现名","value":"pc1"},{"text":"实现版本","value":"0.5.2"},{"text":"所属包名","value":"p1"}]},"nodeType":3,"isEmpty":false},{"id":"protocol4","value":{"title":"无","items":[{"text":"协议名","value":"protocol4"},{"text":"协议版本","value":"^0.0.1"}]},"emptyNodeType":1,"isEmpty":true}],"edges":[{"source":"p1","target":"protocol1"},{"source":"p1","target":"protocol2"},{"source":"protocol2","target":"protocol3"},{"source":"protocol2","target":"protocol4"}]}































        `
          }->NewlineTool.removeBlankChar
      },
    )
  })

  test(.
    "if two nodes dependent on the same empty node, should remain the upper level empty node to avoid circle depdenency",
    ({given, \"when", \"and", then}) => {
      let e1 = ref(Obj.magic(1))
      let e2 = ref(Obj.magic(1))
      let e1Name = "e1"
      let e1Version = "0.0.1"
      let e2Name = "e2"
      let e2Version = "0.0.1"

      _prepare(given, \"and")

      _prepareFile(given)

      given(
        "select extension e1 which dependent on protocol1 with low version, protocol2 and is start extension",
        () => {
          e1 :=
            SelectedExtensionsTool.buildSelectedExtension(
              ~name=e1Name,
              ~version=e1Version,
              ~isStart=true,
              ~protocolIconBase64="ei1",
              ~data=ExtensionTool.buildExtensionData(
                ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                  ~name=e1Name,
                  ~version=e1Version,
                  ~displayName="ed1",
                  ~protocol=(
                    {
                      name: "p1",
                      version: "^0.0.1",
                    }: Meta3d.ExtensionFileType.extensionProtocolData
                  ),
                  ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()
                  ->Meta3dCommonlib.ImmutableHashMap.set("protocol1", "^0.0.1")
                  ->Meta3dCommonlib.ImmutableHashMap.set("protocol2", "^0.2.1"),
                  (),
                ),
                (),
              ),
              (),
            )
        },
      )

      \"and"(
        "select extension e2 for protocol2 which dependent on protocol1 with high version",
        () => {
          e2 :=
            SelectedExtensionsTool.buildSelectedExtension(
              ~name=e2Name,
              ~version=e2Version,
              ~isStart=false,
              ~protocolIconBase64="ei2",
              ~data=ExtensionTool.buildExtensionData(
                ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                  ~name=e2Name,
                  ~version=e2Version,
                  ~displayName="ed2",
                  ~protocol=(
                    {
                      name: "protocol2",
                      version: "^0.2.1",
                    }: Meta3d.ExtensionFileType.extensionProtocolData
                  ),
                  ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                    "protocol1",
                    "^0.1.1",
                  ),
                  (),
                ),
                (),
              ),
              (),
            )
        },
      )

      \"when"(
        "build graph data",
        () => {
          DependencyGraphUtilsTool.useEffectOnce(
            ~setData=setDataStub.contents->Obj.magic,
            ~service=ServiceTool.build(
              ~sandbox,
              ~getAllExtensionAndContributeFileDataOfPackage=(. package) =>
                Meta3d.Main.getAllExtensionAndContributeFileDataOfPackage(package),
              (),
            ),
            ~selectedExtensions=list{e1.contents, e2.contents},
            (),
          )
        },
      )

      then(
        "should build data: e1 -> empty with high version, e2; e2 -> empty with high version",
        () => {
          ReactHookTool.getValue(~setLocalValueStub=setDataStub.contents, ())
          // ->Meta3dCommonlib.Log.printForDebug
          ->Js.Json.stringify
          ->NewlineTool.removeBlankChar
          ->expect ==
            {
              j`















                {"nodes":[{"id":"p1","value":{"title":"ed1","items":[{"text":"协议名","value":"p1"},{"text":"协议版本","value":"^0.0.1"},{"text":"协议icon","icon":"ei1"},{"text":"实现名","value":"e1"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false},{"id":"protocol1","value":{"title":"无","items":[{"text":"协议名","value":"protocol1"},{"text":"协议版本","value":"^0.1.1"}]},"emptyNodeType":1,"isEmpty":true},{"id":"protocol2","value":{"title":"ed2","items":[{"text":"协议名","value":"protocol2"},{"text":"协议版本","value":"^0.2.1"},{"text":"协议icon","icon":"ei2"},{"text":"实现名","value":"e2"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false}],"edges":[{"source":"p1","target":"protocol1"},{"source":"p1","target":"protocol2"},{"source":"protocol2","target":"protocol1"}]}















          `
            }->NewlineTool.removeBlankChar
        },
      )
    },
  )

  test(.
    "if two nodes dependent on the same nonempty node, should remain the upper level nonempty node to avoid circle depdenency",
    ({given, \"when", \"and", then}) => {
      let e1 = ref(Obj.magic(1))
      let e2 = ref(Obj.magic(1))
      let e3 = ref(Obj.magic(1))
      let e1Name = "e1"
      let e1Version = "0.0.1"
      let e2Name = "e2"
      let e2Version = "0.0.1"
      let e3Name = "e3"
      let e3Version = "0.0.2"

      _prepare(given, \"and")

      _prepareFile(given)

      given(
        "select extension e1 which dependent on protocol1 with high version, protocol2 and is start extension",
        () => {
          e1 :=
            SelectedExtensionsTool.buildSelectedExtension(
              ~name=e1Name,
              ~version=e1Version,
              ~isStart=true,
              ~protocolIconBase64="ei1",
              ~data=ExtensionTool.buildExtensionData(
                ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                  ~name=e1Name,
                  ~version=e1Version,
                  ~displayName="ed1",
                  ~protocol=(
                    {
                      name: "p1",
                      version: "^0.0.1",
                    }: Meta3d.ExtensionFileType.extensionProtocolData
                  ),
                  ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()
                  ->Meta3dCommonlib.ImmutableHashMap.set("protocol1", "^0.1.1")
                  ->Meta3dCommonlib.ImmutableHashMap.set("protocol2", "^0.2.1"),
                  (),
                ),
                (),
              ),
              (),
            )
        },
      )

      \"and"(
        "select extension e2 for protocol2 which dependent on protocol1 with low version",
        () => {
          e2 :=
            SelectedExtensionsTool.buildSelectedExtension(
              ~name=e2Name,
              ~version=e2Version,
              ~isStart=false,
              ~protocolIconBase64="ei2",
              ~data=ExtensionTool.buildExtensionData(
                ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                  ~name=e2Name,
                  ~version=e2Version,
                  ~displayName="ed2",
                  ~protocol=(
                    {
                      name: "protocol2",
                      version: "^0.2.1",
                    }: Meta3d.ExtensionFileType.extensionProtocolData
                  ),
                  ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                    "protocol1",
                    "^0.0.2",
                  ),
                  (),
                ),
                (),
              ),
              (),
            )
        },
      )

      \"and"(
        "select extension e3 for protocol1 with higher version",
        () => {
          e3 :=
            SelectedExtensionsTool.buildSelectedExtension(
              ~name=e3Name,
              ~version=e3Version,
              ~isStart=false,
              ~protocolIconBase64="ei3",
              ~data=ExtensionTool.buildExtensionData(
                ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                  ~name=e3Name,
                  ~version=e3Version,
                  ~displayName="ed3",
                  ~protocol=(
                    {
                      name: "protocol1",
                      version: "^0.2.1",
                    }: Meta3d.ExtensionFileType.extensionProtocolData
                  ),
                  ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                  (),
                ),
                (),
              ),
              (),
            )
        },
      )

      \"when"(
        "build graph data",
        () => {
          DependencyGraphUtilsTool.useEffectOnce(
            ~setData=setDataStub.contents->Obj.magic,
            ~service=ServiceTool.build(
              ~sandbox,
              ~getAllExtensionAndContributeFileDataOfPackage=(. package) =>
                Meta3d.Main.getAllExtensionAndContributeFileDataOfPackage(package),
              (),
            ),
            ~selectedExtensions=list{e1.contents, e2.contents, e3.contents},
            (),
          )
        },
      )

      then(
        "should build data: e1 -> e3 with higher version, e2; e2 -> e3 with higher version",
        () => {
          ReactHookTool.getValue(~setLocalValueStub=setDataStub.contents, ())
          // ->Meta3dCommonlib.Log.printForDebug
          ->Js.Json.stringify
          ->NewlineTool.removeBlankChar
          ->expect ==
            {
              j`















              {"nodes":[{"id":"p1","value":{"title":"ed1","items":[{"text":"协议名","value":"p1"},{"text":"协议版本","value":"^0.0.1"},{"text":"协议icon","icon":"ei1"},{"text":"实现名","value":"e1"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false},{"id":"protocol1","value":{"title":"ed3","items":[{"text":"协议名","value":"protocol1"},{"text":"协议版本","value":"^0.2.1"},{"text":"协议icon","icon":"ei3"},{"text":"实现名","value":"e3"},{"text":"实现版本","value":"0.0.2"}]},"nodeType":0,"isEmpty":false},{"id":"protocol2","value":{"title":"ed2","items":[{"text":"协议名","value":"protocol2"},{"text":"协议版本","value":"^0.2.1"},{"text":"协议icon","icon":"ei2"},{"text":"实现名","value":"e2"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false}],"edges":[{"source":"p1","target":"protocol1"},{"source":"p1","target":"protocol2"},{"source":"protocol2","target":"protocol1"}]}















          `
            }->NewlineTool.removeBlankChar
        },
      )
    },
  )

  test(.
    "if two nodes dependent on the same node, should remain the upper level node to avoid circle depdenency",
    ({given, \"when", \"and", then}) => {
      let e1 = ref(Obj.magic(1))
      let e2 = ref(Obj.magic(1))
      let e3 = ref(Obj.magic(1))
      let e1Name = "e1"
      let e1Version = "0.0.1"
      let e2Name = "e2"
      let e2Version = "0.0.1"
      let e3Name = "e3"
      let e3Version = "0.0.2"

      _prepare(given, \"and")

      _prepareFile(given)

      given(
        "select extension e1 which dependent on protocol1 with higher version, protocol2 and is start extension",
        () => {
          e1 :=
            SelectedExtensionsTool.buildSelectedExtension(
              ~name=e1Name,
              ~version=e1Version,
              ~isStart=true,
              ~protocolIconBase64="ei1",
              ~data=ExtensionTool.buildExtensionData(
                ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                  ~name=e1Name,
                  ~version=e1Version,
                  ~displayName="ed1",
                  ~protocol=(
                    {
                      name: "p1",
                      version: "^0.0.1",
                    }: Meta3d.ExtensionFileType.extensionProtocolData
                  ),
                  ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()
                  ->Meta3dCommonlib.ImmutableHashMap.set("protocol1", "^0.2.1")
                  ->Meta3dCommonlib.ImmutableHashMap.set("protocol2", "^0.2.1"),
                  (),
                ),
                (),
              ),
              (),
            )
        },
      )

      \"and"(
        "select extension e2 for protocol2 which dependent on protocol1 with low version",
        () => {
          e2 :=
            SelectedExtensionsTool.buildSelectedExtension(
              ~name=e2Name,
              ~version=e2Version,
              ~isStart=false,
              ~protocolIconBase64="ei2",
              ~data=ExtensionTool.buildExtensionData(
                ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                  ~name=e2Name,
                  ~version=e2Version,
                  ~displayName="ed2",
                  ~protocol=(
                    {
                      name: "protocol2",
                      version: "^0.2.1",
                    }: Meta3d.ExtensionFileType.extensionProtocolData
                  ),
                  ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                    "protocol1",
                    "^0.0.2",
                  ),
                  (),
                ),
                (),
              ),
              (),
            )
        },
      )

      \"and"(
        "select extension e3 for protocol1 with high version",
        () => {
          e3 :=
            SelectedExtensionsTool.buildSelectedExtension(
              ~name=e3Name,
              ~version=e3Version,
              ~isStart=false,
              ~protocolIconBase64="ei3",
              ~data=ExtensionTool.buildExtensionData(
                ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                  ~name=e3Name,
                  ~version=e3Version,
                  ~displayName="ed3",
                  ~protocol=(
                    {
                      name: "protocol1",
                      version: "^0.1.1",
                    }: Meta3d.ExtensionFileType.extensionProtocolData
                  ),
                  ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                  (),
                ),
                (),
              ),
              (),
            )
        },
      )

      \"when"(
        "build graph data",
        () => {
          DependencyGraphUtilsTool.useEffectOnce(
            ~setData=setDataStub.contents->Obj.magic,
            ~service=ServiceTool.build(
              ~sandbox,
              ~getAllExtensionAndContributeFileDataOfPackage=(. package) =>
                Meta3d.Main.getAllExtensionAndContributeFileDataOfPackage(package),
              (),
            ),
            ~selectedExtensions=list{e1.contents, e2.contents, e3.contents},
            (),
          )
        },
      )

      then(
        "should build data: e1 -> e2, empty with higher version; e2 -> empty with higher version",
        () => {
          ReactHookTool.getValue(~setLocalValueStub=setDataStub.contents, ())
          // ->Meta3dCommonlib.Log.printForDebug
          ->Js.Json.stringify
          ->NewlineTool.removeBlankChar
          ->expect ==
            {
              j`















              {"nodes":[{"id":"p1","value":{"title":"ed1","items":[{"text":"协议名","value":"p1"},{"text":"协议版本","value":"^0.0.1"},{"text":"协议icon","icon":"ei1"},{"text":"实现名","value":"e1"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false},{"id":"protocol1","value":{"title":"无","items":[{"text":"协议名","value":"protocol1"},{"text":"协议版本","value":"^0.2.1"}]},"emptyNodeType":1,"isEmpty":true},{"id":"protocol2","value":{"title":"ed2","items":[{"text":"协议名","value":"protocol2"},{"text":"协议版本","value":"^0.2.1"},{"text":"协议icon","icon":"ei2"},{"text":"实现名","value":"e2"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false}],"edges":[{"source":"p1","target":"protocol1"},{"source":"p1","target":"protocol2"},{"source":"protocol2","target":"protocol1"}]}















          `
            }->NewlineTool.removeBlankChar
        },
      )
    },
  )

  test(."if has start package, build graph data", ({given, \"when", \"and", then}) => {
    let p1 = ref(Obj.magic(1))
    let p1ProtocolName = "protocol1"
    let p1ProtocolVersion = "^0.1.2"
    let p2 = ref(Obj.magic(1))
    let p2ProtocolName = "protocol2"
    let p2ProtocolVersion = "^0.2.2"

    _prepare(given, \"and")

    _prepareFile(given)

    given(
      "select package p2 for protocol2 which contain package p1 and dependent on p1 and is start pacakge",
      () => {
        let pe1 = ExtensionTool.generateExtension(
          ~name="pe1",
          ~version="0.5.1",
          ~protocolName=p1ProtocolName,
          ~protocolVersion=p1ProtocolVersion,
          ~displayName="ped1",
          ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
          (),
        )
        let pe1FileData = Meta3d.Main.loadExtension(pe1)

        p1 :=
          PackageSelectedPackagesTool.buildSelectedPackage(
            ~protocolName=p1ProtocolName,
            ~protocolVersion=p1ProtocolVersion,
            ~name="p1",
            ~protocolIconBase64="pi1",
            ~isStart=false,
            ~binaryFile=Meta3d.Main.generatePackage(
              Meta3d.Main.convertAllFileDataForPackage([pe1FileData], [], ["pe1"]),
              [],
            ),
            (),
          )

        let pe2 = ExtensionTool.generateExtension(
          ~name="pe2",
          ~version="0.2.1",
          ~protocolName=p2ProtocolName,
          ~protocolVersion=p2ProtocolVersion,
          ~displayName="ped2",
          ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
            p1ProtocolName,
            p1ProtocolVersion,
          ),
          (),
        )
        let pe2FileData = Meta3d.Main.loadExtension(pe2)

        p2 :=
          PackageSelectedPackagesTool.buildSelectedPackage(
            ~protocolName=p2ProtocolName,
            ~protocolVersion=p2ProtocolVersion,
            ~name="p2",
            ~protocolIconBase64="pi2",
            ~isStart=true,
            ~binaryFile=Meta3d.Main.generatePackage(
              Meta3d.Main.convertAllFileDataForPackage([pe2FileData], [], ["pe2"]),
              [p1.contents.binaryFile],
            ),
            (),
          )
      },
    )

    \"when"(
      "build graph data",
      () => {
        DependencyGraphUtilsTool.useEffectOnce(
          ~setData=setDataStub.contents->Obj.magic,
          ~service=ServiceTool.build(
            ~sandbox,
            ~getAllExtensionAndContributeFileDataOfPackage=(. package) =>
              Meta3d.Main.getAllExtensionAndContributeFileDataOfPackage(package),
            (),
          ),
          ~selectedExtensions=list{},
          ~selectedPackages=list{p2.contents},
          ~allPackagesStoredInApp=list{},
          ~selectedContributes=list{},
          (),
        )
      },
    )

    then(
      "should build data: p1 -> p2",
      () => {
        ReactHookTool.getValue(~setLocalValueStub=setDataStub.contents, ())
        // ->Meta3dCommonlib.Log.printForDebug
        ->Js.Json.stringify
        ->NewlineTool.removeBlankChar
        ->expect ==
          {
            j`
{"nodes":[{"id":"protocol2","value":{"title":"ped2","items":[{"text":"协议名","value":"protocol2"},{"text":"协议版本","value":"^0.2.2"},{"text":"协议icon","icon":"pi2"},{"text":"实现名","value":"pe2"},{"text":"实现版本","value":"0.2.1"},{"text":"所属包名","value":"p2"}]},"nodeType":2,"isEmpty":false},{"id":"protocol1","value":{"title":"ped1","items":[{"text":"协议名","value":"protocol1"},{"text":"协议版本","value":"^0.1.2"},{"text":"协议icon","icon":"pi2"},{"text":"实现名","value":"pe1"},{"text":"实现版本","value":"0.5.1"},{"text":"所属包名","value":"p2"}]},"nodeType":2,"isEmpty":false}],"edges":[{"source":"protocol2","target":"protocol1"}]}
          `
          }->NewlineTool.removeBlankChar
      },
    )
  })

  test(."if has package stored in app, they are nodes", ({given, \"when", \"and", then}) => {
    let e1 = ref(Obj.magic(1))
    let e1Name = "e1"
    let e1Version = "0.0.1"
    let p1 = ref(Obj.magic(1))
    let p1ProtocolName = "protocol1"
    let p1ProtocolVersion = "^0.1.2"
    let p2 = ref(Obj.magic(1))
    let p2ProtocolName = "protocol2"
    let p2ProtocolVersion = "^0.2.2"
    // let e2 = ref(Obj.magic(1))
    // let e2Name = "e2"
    // let e2Version = "0.0.1"
    let actionProtocol1Name = "meta3d-action-protocol1"
    let actionProtocol1Version = "^0.0.1"
    let c1 = ref(Obj.magic(1))
    let c2 = ref(Obj.magic(1))
    let c1Name = "c1"
    let c1Version = "0.0.2"
    let c2Name = "c2"
    let c2Version = "0.0.2"

    _prepare(given, \"and")

    _prepareFile(given)

    given(
      "select extension e1 which is start extension",
      () => {
        e1 :=
          SelectedExtensionsTool.buildSelectedExtension(
            ~name=e1Name,
            ~version=e1Version,
            ~isStart=true,
            // ~protocolIconBase64="ei1",
            ~data=ExtensionTool.buildExtensionData(
              ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                ~name=e1Name,
                ~version=e1Version,
                // ~displayName="ed1",
                // ~protocol=(
                //   {
                //     name: "protocol2",
                //     version: "^0.0.1",
                //   }: Meta3d.ExtensionFileType.extensionProtocolData
                // ),
                ~dependentPackageStoredInAppProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                (),
              ),
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "select package p1 for protocol1 which is stored in app",
      () => {
        p1 :=
          PackageStoredInAppTool.buildPackageStoredInApp(
            ~packageData=PackageStoredInAppTool.buildPackageData(
              ~packageProtocolName=p1ProtocolName,
              ~packageProtocolVersion=p1ProtocolVersion,
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "select package p2 for protocol2 which is not stored in app and has contribute pc1",
      () => {
        let pc1 = ContributeTool.generateContribute(
          ~name="pc1",
          ~version="0.5.2",
          ~protocolName="pc1-protocol",
          ~protocolVersion="^0.0.1",
          ~displayName="pcd1",
          // ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
          (),
        )
        let pc1FileData = Meta3d.Main.loadContribute(pc1)

        p2 :=
          PackageSelectedPackagesTool.buildSelectedPackage(
            ~protocolName=p2ProtocolName,
            ~protocolVersion=p2ProtocolVersion,
            ~name="p2",
            ~protocolIconBase64="pi2",
            ~binaryFile=Meta3d.Main.generatePackage(
              Meta3d.Main.convertAllFileDataForPackage([], [pc1FileData], []),
              [],
            ),
            (),
          )
      },
    )

    \"and"(
      "select contribute c1 for action protocol1 which dependent package on protocol1 and protocol2",
      () => {
        c1 :=
          SelectedContributesTool.buildSelectedContribute(
            ~name=c1Name,
            ~version=c1Version,
            ~protocolIconBase64="ci1",
            ~data=ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(
                ~name=c1Name,
                ~version=c1Version,
                ~displayName="cd1",
                ~protocol=(
                  {
                    name: actionProtocol1Name,
                    version: actionProtocol1Version,
                  }: Meta3d.ExtensionFileType.contributeProtocolData
                ),
                ~dependentPackageStoredInAppProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()
                ->Meta3dCommonlib.ImmutableHashMap.set(p1ProtocolName, p1ProtocolVersion)
                ->Meta3dCommonlib.ImmutableHashMap.set(p2ProtocolName, p2ProtocolVersion),
                ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                (),
              ),
              (),
            ),
            (),
          )
      },
    )

    \"when"(
      "build graph data",
      () => {
        DependencyGraphUtilsTool.useEffectOnce(
          ~setData=setDataStub.contents->Obj.magic,
          ~service=ServiceTool.build(
            ~sandbox,
            ~getAllExtensionAndContributeFileDataOfPackage=(. package) =>
              Meta3d.Main.getAllExtensionAndContributeFileDataOfPackage(package),
            (),
          ),
          ~selectedExtensions=list{e1.contents},
          ~selectedPackages=list{p2.contents},
          ~allPackagesStoredInApp=list{p1.contents},
          ~selectedContributes=list{c1.contents},
          (),
        )
      },
    )

    then(
      "should build data: c1 -> p1, empty",
      () => {
        ReactHookTool.getValue(~setLocalValueStub=setDataStub.contents, ())
        // ->Meta3dCommonlib.Log.printForDebug
        ->Js.Json.stringify
        ->NewlineTool.removeBlankChar
        ->expect ==
          {
            j`















            {"nodes":[{"id":"p1","value":{"title":"","items":[{"text":"协议名","value":"p1"},{"text":"协议版本","value":"^0.0.1"},{"text":"协议icon","icon":"i1"},{"text":"实现名","value":"e1"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false},{"id":"meta3d-action-protocol1","value":{"title":"cd1","items":[{"text":"协议名","value":"meta3d-action-protocol1"},{"text":"协议版本","value":"^0.0.1"},{"text":"协议icon","icon":"ci1"},{"text":"实现名","value":"c1"},{"text":"实现版本","value":"0.0.2"}]},"nodeType":1,"isEmpty":false},{"id":"protocol1","value":{"title":"p1","items":[{"text":"协议名","value":"protocol1"},{"text":"协议版本","value":"^0.1.2"},{"text":"协议icon","icon":"ibase64"},{"text":"实现名","value":"p1"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":4,"isEmpty":false},{"id":"protocol2","value":{"title":"无","items":[{"text":"协议名","value":"protocol2"},{"text":"协议版本","value":"^0.2.2"}]},"emptyNodeType":0,"isEmpty":true}],"edges":[{"source":"meta3d-action-protocol1","target":"protocol1"},{"source":"meta3d-action-protocol1","target":"protocol2"}]}















          `
          }->NewlineTool.removeBlankChar
      },
    )
  })

  test(."if has duplicate nodes, error", ({given, \"when", \"and", then}) => {
    let e1 = ref(Obj.magic(1))
    let e1Name = "e1"
    let e1Version = "0.0.1"
    let p1 = ref(Obj.magic(1))

    _prepare(given, \"and")

    _prepareFile(given)

    given(
      "select extension e1 for protocol1 which is start extension",
      () => {
        e1 :=
          SelectedExtensionsTool.buildSelectedExtension(
            ~name=e1Name,
            ~version=e1Version,
            ~isStart=true,
            ~protocolIconBase64="ei1",
            ~data=ExtensionTool.buildExtensionData(
              ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                ~name=e1Name,
                ~version=e1Version,
                ~displayName="ed1",
                ~protocol=(
                  {
                    name: "protocol1",
                    version: "^0.0.1",
                  }: Meta3d.ExtensionFileType.extensionProtocolData
                ),
                ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                (),
              ),
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "select package p1 which has extension pe1 for protocol1",
      () => {
        let pe1 = ExtensionTool.generateExtension(
          ~name="pe1",
          ~version="0.5.1",
          ~protocolName="protocol1",
          ~protocolVersion="^0.2.0",
          ~displayName="ped1",
          ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
          (),
        )
        let pe1FileData = Meta3d.Main.loadExtension(pe1)

        p1 :=
          PackageSelectedPackagesTool.buildSelectedPackage(
            ~name="p1",
            ~protocolIconBase64="pi1",
            ~binaryFile=Meta3d.Main.generatePackage(
              Meta3d.Main.convertAllFileDataForPackage([pe1FileData], [], ["pe1"]),
              [],
            ),
            (),
          )
      },
    )

    \"when"(
      "build graph data",
      () => {
        ()
      },
    )

    then(
      "should error",
      () => {
        expect(
          () => {
            DependencyGraphUtilsTool.useEffectOnce(
              ~setData=setDataStub.contents->Obj.magic,
              ~service=ServiceTool.build(
                ~sandbox,
                ~getAllExtensionAndContributeFileDataOfPackage=(. package) =>
                  Meta3d.Main.getAllExtensionAndContributeFileDataOfPackage(package),
                (),
              ),
              ~selectedPackages=list{p1.contents},
              ~selectedExtensions=list{e1.contents},
              (),
            )
          },
        )->toThrowMessage({j`有重复的实现`})
      },
    )
  })

  test(."if has duplicate nodes for action protocol, error", ({given, \"when", \"and", then}) => {
    let e1 = ref(Obj.magic(1))
    let e1Name = "e1"
    let e1Version = "0.0.1"
    let actionProtocol1Name = "meta3d-action-protocol1"
    let actionProtocol1Version = "^0.0.1"
    let c1 = ref(Obj.magic(1))
    let c2 = ref(Obj.magic(1))
    let c1Name = "c1"
    let c1Version = "0.0.2"
    let c2Name = "c2"
    let c2Version = "0.0.2"

    _prepare(given, \"and")

    _prepareFile(given)

    given(
      "select extension e1 which is start extension",
      () => {
        e1 :=
          SelectedExtensionsTool.buildSelectedExtension(
            ~name=e1Name,
            ~version=e1Version,
            ~isStart=true,
            ~protocolIconBase64="ei1",
            ~data=ExtensionTool.buildExtensionData(
              ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                ~name=e1Name,
                ~version=e1Version,
                ~displayName="ed1",
                ~protocol=(
                  {
                    name: "p1",
                    version: "^0.0.1",
                  }: Meta3d.ExtensionFileType.extensionProtocolData
                ),
                ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                (),
              ),
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "select contribute c1, c2 for action protocol1",
      () => {
        c1 :=
          SelectedContributesTool.buildSelectedContribute(
            ~name=c1Name,
            ~version=c1Version,
            ~protocolIconBase64="ci1",
            ~data=ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(
                ~name=c1Name,
                ~version=c1Version,
                ~displayName="cd1",
                ~protocol=(
                  {
                    name: actionProtocol1Name,
                    version: actionProtocol1Version,
                  }: Meta3d.ExtensionFileType.contributeProtocolData
                ),
                ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                (),
              ),
              (),
            ),
            (),
          )

        c2 :=
          SelectedContributesTool.buildSelectedContribute(
            ~name=c2Name,
            ~version=c2Version,
            ~protocolIconBase64="ci2",
            ~data=ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(
                ~name=c2Name,
                ~version=c2Version,
                ~displayName="cd2",
                ~protocol=(
                  {
                    name: actionProtocol1Name,
                    version: actionProtocol1Version,
                  }: Meta3d.ExtensionFileType.contributeProtocolData
                ),
                ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                (),
              ),
              (),
            ),
            (),
          )
      },
    )

    \"when"(
      "build graph data",
      () => {
        ()
      },
    )

    then(
      "should error",
      () => {
        expect(
          () => {
            DependencyGraphUtilsTool.useEffectOnce(
              ~setData=setDataStub.contents->Obj.magic,
              ~service=ServiceTool.build(
                ~sandbox,
                ~getAllExtensionAndContributeFileDataOfPackage=(. package) =>
                  Meta3d.Main.getAllExtensionAndContributeFileDataOfPackage(package),
                (),
              ),
              ~selectedExtensions=list{e1.contents},
              ~selectedContributes=list{c1.contents, c2.contents},
              (),
            )
          },
        )->toThrowMessage({j`有重复的实现`})
      },
    )
  })

  test(."if has duplicate nodes which is package stored in app, not error", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let e1 = ref(Obj.magic(1))
    let e1Name = "e1"
    let e1Version = "0.0.1"
    let p1 = ref(Obj.magic(1))

    _prepare(given, \"and")

    _prepareFile(given)

    given(
      "select extension e1 for protocol1 which is start extension",
      () => {
        e1 :=
          SelectedExtensionsTool.buildSelectedExtension(
            ~name=e1Name,
            ~version=e1Version,
            ~isStart=true,
            ~protocolIconBase64="ei1",
            ~data=ExtensionTool.buildExtensionData(
              ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                ~name=e1Name,
                ~version=e1Version,
                ~displayName="ed1",
                ~protocol=(
                  {
                    name: "protocol1",
                    version: "^0.0.1",
                  }: Meta3d.ExtensionFileType.extensionProtocolData
                ),
                ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                (),
              ),
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "select package p1 which has extension pe1 for protocol1 and is stored in app",
      () => {
        let pe1 = ExtensionTool.generateExtension(
          ~name="pe1",
          ~version="0.5.1",
          ~protocolName="protocol1",
          ~protocolVersion="^0.2.0",
          ~displayName="ped1",
          ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
          (),
        )
        let pe1FileData = Meta3d.Main.loadExtension(pe1)

        // p1 :=
        //   PackageSelectedPackagesTool.buildSelectedPackage(
        //     ~name="p1",
        //     ~protocolIconBase64="pi1",
        //     ~binaryFile=Meta3d.Main.generatePackage(
        //       Meta3d.Main.convertAllFileDataForPackage([pe1FileData], [], ["pe1"]),
        //       [],
        //     ),
        //     (),
        //   )

        p1 :=
          PackageStoredInAppTool.buildPackageStoredInApp(
            ~pacakgeBinaryFile=Meta3d.Main.generatePackage(
              Meta3d.Main.convertAllFileDataForPackage([pe1FileData], [], ["pe1"]),
              [],
            ),
            ~packageData=PackageStoredInAppTool.buildPackageData(
              ~packageName="p1",
              ~packageProtocolIconBase64="pi1",
              (),
            ),
            (),
          )
      },
    )

    \"when"(
      "build graph data",
      () => {
        ()
      },
    )

    then(
      "should not error",
      () => {
        expect(
          () => {
            DependencyGraphUtilsTool.useEffectOnce(
              ~setData=setDataStub.contents->Obj.magic,
              ~service=ServiceTool.build(
                ~sandbox,
                ~getAllExtensionAndContributeFileDataOfPackage=(. package) =>
                  Meta3d.Main.getAllExtensionAndContributeFileDataOfPackage(package),
                (),
              ),
              ~allPackagesStoredInApp=list{p1.contents},
              ~selectedExtensions=list{e1.contents},
              (),
            )
          },
        )->toNotThrow
      },
    )
  })

  // test(."if has duplicate nodes come from selected packages which are stored in app, not error", ({
  //   given,
  //   \"when",
  //   \"and",
  //   then,
  // }) => {
  //   let e1 = ref(Obj.magic(1))
  //   let e1Name = "e1"
  //   let e1Version = "0.0.1"
  //   let actionProtocol1Name = "meta3d-action-protocol1"
  //   let actionProtocol1Version = "^0.0.1"
  //   let c1 = ref(Obj.magic(1))
  //   let c2 = ref(Obj.magic(1))
  //   let c1Name = "c1"
  //   let c1Version = "0.0.2"
  //   let c2Name = "c2"
  //   let c2Version = "0.0.2"

  //   _prepare(given, \"and")

  //   _prepareFile(given)

  //   given(
  //     "select extension e1 which is start extension",
  //     () => {
  //       e1 :=
  //         SelectedExtensionsTool.buildSelectedExtension(
  //           ~name=e1Name,
  //           ~version=e1Version,
  //           ~isStart=true,
  //           ~protocolIconBase64="ei1",
  //           ~data=ExtensionTool.buildExtensionData(
  //             ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
  //               ~name=e1Name,
  //               ~version=e1Version,
  //               ~displayName="ed1",
  //               ~protocol=(
  //                 {
  //                   name: "p1",
  //                   version: "^0.0.1",
  //                 }: Meta3d.ExtensionFileType.extensionProtocolData
  //               ),
  //               ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //               (),
  //             ),
  //             (),
  //           ),
  //           (),
  //         )
  //     },
  //   )

  //   \"and"(
  //     "select contribute c1, c2 for action protocol1",
  //     () => {
  //       c1 :=
  //         SelectedContributesTool.buildSelectedContribute(
  //           ~name=c1Name,
  //           ~version=c1Version,
  //           ~protocolIconBase64="ci1",
  //           ~data=ContributeTool.buildContributeData(
  //             ~contributePackageData=ContributeTool.buildContributePackageData(
  //               ~name=c1Name,
  //               ~version=c1Version,
  //               ~displayName="cd1",
  //               ~protocol=(
  //                 {
  //                   name: actionProtocol1Name,
  //                   version: actionProtocol1Version,
  //                 }: Meta3d.ExtensionFileType.contributeProtocolData
  //               ),
  //               ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //               (),
  //             ),
  //             (),
  //           ),
  //           (),
  //         )

  //       c2 :=
  //         SelectedContributesTool.buildSelectedContribute(
  //           ~name=c2Name,
  //           ~version=c2Version,
  //           ~protocolIconBase64="ci2",
  //           ~data=ContributeTool.buildContributeData(
  //             ~contributePackageData=ContributeTool.buildContributePackageData(
  //               ~name=c2Name,
  //               ~version=c2Version,
  //               ~displayName="cd2",
  //               ~protocol=(
  //                 {
  //                   name: actionProtocol1Name,
  //                   version: actionProtocol1Version,
  //                 }: Meta3d.ExtensionFileType.contributeProtocolData
  //               ),
  //               ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //               (),
  //             ),
  //             (),
  //           ),
  //           (),
  //         )
  //     },
  //   )

  //   \"when"(
  //     "build graph data",
  //     () => {
  //       DependencyGraphUtilsTool.useEffectOnce(
  //         ~setData=setDataStub.contents->Obj.magic,
  //         ~service=ServiceTool.build(
  //           ~sandbox,
  //           ~getAllExtensionAndContributeFileDataOfPackage=(. package) =>
  //             Meta3d.Main.getAllExtensionAndContributeFileDataOfPackage(package),
  //           (),
  //         ),
  //         ~selectedExtensions=list{e1.contents},
  //         ~selectedContributes=list{c1.contents, c2.contents},
  //         (),
  //       )
  //     },
  //   )

  //   then(
  //     "should build data: e1",
  //     () => {
  //       ReactHookTool.getValue(~setLocalValueStub=setDataStub.contents, ())
  //       // ->Meta3dCommonlib.Log.printForDebug
  //       ->Js.Json.stringify
  //       ->NewlineTool.removeBlankChar
  //       ->expect ==
  //         {
  //           j`
  //            {"nodes":[{"id":"p1","value":{"title":"ed1","items":[{"text":"协议名","value":"p1"},{"text":"协议版本","value":"^0.0.1"},{"text":"协议icon","icon":"ei1"},{"text":"实现名","value":"e1"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false}],"edges":[]}
  //         `
  //         }->NewlineTool.removeBlankChar
  //     },
  //   )
  // })

  test(."if dependency recursive, build recursive graph data", ({given, \"when", \"and", then}) => {
    let e1 = ref(Obj.magic(1))
    let e2 = ref(Obj.magic(1))
    let e1Name = "e1"
    let e1Version = "0.0.1"
    let e2Name = "e2"
    let e2Version = "0.0.1"

    _prepare(given, \"and")

    _prepareFile(given)

    given(
      "select extension e1 for protocol1 which dependent on protocol2 and is start extension",
      () => {
        e1 :=
          SelectedExtensionsTool.buildSelectedExtension(
            ~name=e1Name,
            ~version=e1Version,
            ~isStart=true,
            ~protocolIconBase64="ei1",
            ~data=ExtensionTool.buildExtensionData(
              ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                ~name=e1Name,
                ~version=e1Version,
                ~displayName="ed1",
                ~protocol=(
                  {
                    name: "protocol1",
                    version: "^0.0.1",
                  }: Meta3d.ExtensionFileType.extensionProtocolData
                ),
                ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "protocol2",
                  "^0.0.1",
                ),
                (),
              ),
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "select extension e2 for protocol2 which dependent on protocol1",
      () => {
        e2 :=
          SelectedExtensionsTool.buildSelectedExtension(
            ~name=e2Name,
            ~version=e2Version,
            ~isStart=false,
            ~protocolIconBase64="ei2",
            ~data=ExtensionTool.buildExtensionData(
              ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                ~name=e2Name,
                ~version=e2Version,
                ~displayName="ed2",
                ~protocol=(
                  {
                    name: "protocol2",
                    version: "^0.0.1",
                  }: Meta3d.ExtensionFileType.extensionProtocolData
                ),
                ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "protocol1",
                  "^0.0.1",
                ),
                (),
              ),
              (),
            ),
            (),
          )
      },
    )

    \"when"(
      "build graph data",
      () => {
        DependencyGraphUtilsTool.useEffectOnce(
          ~setData=setDataStub.contents->Obj.magic,
          ~service=ServiceTool.build(
            ~sandbox,
            ~getAllExtensionAndContributeFileDataOfPackage=(. package) =>
              Meta3d.Main.getAllExtensionAndContributeFileDataOfPackage(package),
            (),
          ),
          ~selectedExtensions=list{e1.contents, e2.contents},
          (),
        )
      },
    )

    then(
      "should build data: e1 -> e2; e2 -> e1",
      () => {
        ReactHookTool.getValue(~setLocalValueStub=setDataStub.contents, ())
        // ->Meta3dCommonlib.Log.printForDebug
        ->Js.Json.stringify
        ->NewlineTool.removeBlankChar
        ->expect ==
          {
            j`















             {"nodes":[{"id":"protocol1","value":{"title":"ed1","items":[{"text":"协议名","value":"protocol1"},{"text":"协议版本","value":"^0.0.1"},{"text":"协议icon","icon":"ei1"},{"text":"实现名","value":"e1"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false},{"id":"protocol2","value":{"title":"ed2","items":[{"text":"协议名","value":"protocol2"},{"text":"协议版本","value":"^0.0.1"},{"text":"协议icon","icon":"ei2"},{"text":"实现名","value":"e2"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false}],"edges":[{"source":"protocol1","target":"protocol2"},{"source":"protocol2","target":"protocol1"}]}















          `
          }->NewlineTool.removeBlankChar
      },
    )
  })

  test(."if has action nodes, they are root nodes", ({given, \"when", \"and", then}) => {
    let e1 = ref(Obj.magic(1))
    let e1Name = "e1"
    let e1Version = "0.0.1"
    let e2 = ref(Obj.magic(1))
    let e2Name = "e2"
    let e2Version = "0.0.1"
    let actionProtocol1Name = "meta3d-action-protocol1"
    let actionProtocol1Version = "^0.0.1"
    let actionProtocol2Name = "meta3d-action-protocol2"
    let actionProtocol2Version = "^0.0.2"
    let c1 = ref(Obj.magic(1))
    let c2 = ref(Obj.magic(1))
    let c1Name = "c1"
    let c1Version = "0.0.2"
    let c2Name = "c2"
    let c2Version = "0.0.2"

    _prepare(given, \"and")

    _prepareFile(given)

    given(
      "select extension e1 for protocol2 which is start extension",
      () => {
        e1 :=
          SelectedExtensionsTool.buildSelectedExtension(
            ~name=e1Name,
            ~version=e1Version,
            ~isStart=true,
            ~protocolIconBase64="ei1",
            ~data=ExtensionTool.buildExtensionData(
              ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                ~name=e1Name,
                ~version=e1Version,
                ~displayName="ed1",
                ~protocol=(
                  {
                    name: "protocol2",
                    version: "^0.0.1",
                  }: Meta3d.ExtensionFileType.extensionProtocolData
                ),
                ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                (),
              ),
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "select extension e2 for protocol1",
      () => {
        e2 :=
          SelectedExtensionsTool.buildSelectedExtension(
            ~name=e2Name,
            ~version=e2Version,
            ~isStart=false,
            ~data=ExtensionTool.buildExtensionData(
              ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                ~name=e2Name,
                ~version=e2Version,
                ~displayName="ed2",
                ~protocol=(
                  {
                    name: "protocol1",
                    version: "^0.0.1",
                  }: Meta3d.ExtensionFileType.extensionProtocolData
                ),
                ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                (),
              ),
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "select contribute c1 for action protocol1 and c2 for action protocol2 that they are dependent on protocol1",
      () => {
        c1 :=
          SelectedContributesTool.buildSelectedContribute(
            ~name=c1Name,
            ~version=c1Version,
            ~protocolIconBase64="ci1",
            ~data=ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(
                ~name=c1Name,
                ~version=c1Version,
                ~displayName="cd1",
                ~protocol=(
                  {
                    name: actionProtocol1Name,
                    version: actionProtocol1Version,
                  }: Meta3d.ExtensionFileType.contributeProtocolData
                ),
                ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "protocol1",
                  "^0.0.1",
                ),
                (),
              ),
              (),
            ),
            (),
          )

        c2 :=
          SelectedContributesTool.buildSelectedContribute(
            ~name=c2Name,
            ~version=c2Version,
            ~protocolIconBase64="ci2",
            ~data=ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(
                ~name=c2Name,
                ~version=c2Version,
                ~displayName="cd2",
                ~protocol=(
                  {
                    name: actionProtocol2Name,
                    version: actionProtocol2Version,
                  }: Meta3d.ExtensionFileType.contributeProtocolData
                ),
                ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "protocol1",
                  "^0.0.1",
                ),
                (),
              ),
              (),
            ),
            (),
          )
      },
    )

    \"when"(
      "build graph data",
      () => {
        DependencyGraphUtilsTool.useEffectOnce(
          ~setData=setDataStub.contents->Obj.magic,
          ~service=ServiceTool.build(
            ~sandbox,
            ~getAllExtensionAndContributeFileDataOfPackage=(. package) =>
              Meta3d.Main.getAllExtensionAndContributeFileDataOfPackage(package),
            (),
          ),
          ~selectedExtensions=list{e1.contents, e2.contents},
          ~selectedContributes=list{c1.contents, c2.contents},
          (),
        )
      },
    )

    then(
      "should build data: c1 -> e2; c2 -> e2",
      () => {
        ReactHookTool.getValue(~setLocalValueStub=setDataStub.contents, ())
        // ->Meta3dCommonlib.Log.printForDebug
        ->Js.Json.stringify
        ->NewlineTool.removeBlankChar
        ->expect ==
          {
            j`















             {"nodes":[{"id":"protocol2","value":{"title":"ed1","items":[{"text":"协议名","value":"protocol2"},{"text":"协议版本","value":"^0.0.1"},{"text":"协议icon","icon":"ei1"},{"text":"实现名","value":"e1"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false},{"id":"meta3d-action-protocol1","value":{"title":"cd1","items":[{"text":"协议名","value":"meta3d-action-protocol1"},{"text":"协议版本","value":"^0.0.1"},{"text":"协议icon","icon":"ci1"},{"text":"实现名","value":"c1"},{"text":"实现版本","value":"0.0.2"}]},"nodeType":1,"isEmpty":false},{"id":"protocol1","value":{"title":"ed2","items":[{"text":"协议名","value":"protocol1"},{"text":"协议版本","value":"^0.0.1"},{"text":"协议icon","icon":"i1"},{"text":"实现名","value":"e2"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false},{"id":"meta3d-action-protocol2","value":{"title":"cd2","items":[{"text":"协议名","value":"meta3d-action-protocol2"},{"text":"协议版本","value":"^0.0.2"},{"text":"协议icon","icon":"ci2"},{"text":"实现名","value":"c2"},{"text":"实现版本","value":"0.0.2"}]},"nodeType":1,"isEmpty":false}],"edges":[{"source":"meta3d-action-protocol1","target":"protocol1"},{"source":"meta3d-action-protocol2","target":"protocol1"}]}















          `
          }->NewlineTool.removeBlankChar
      },
    )
  })

  test(."auto upgrade selected packages, extensions, contributes", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let e1 = ref(Obj.magic(1))
    let p1 = ref(Obj.magic(1))
    let c1 = ref(Obj.magic(1))
    let e1Name = "e1"
    let e1LowVersion = "0.0.1"
    let e1HighVersion = "0.1.1"
    let e1ProtocolName = "e1-protocol"
    let e1ProtocolConfig = Js.Nullable.null
    let e1Description = "e1Description"
    let e1DisplayName = "e1DisplayName"
    let e1RepoLink = "e1RepoLink"
    let e1File = ExtensionTool.buildExtensionData(
      ~extensionPackageData=ExtensionTool.buildExtensionPackageData(~name=e1Name, ()),
      (),
    )
    let e1Account = "e1Account"
    let e1ProtocolLowVersion = "0.1.1"
    let e1ProtocolHighVersion = "0.2.1"
    let e1ProtocolVersionRange = "^0.1.1"
    let e1ProtocolIconBase64 = "e1ProtocolIconBase64"
    let e1ProtocolDisplayName = "e1ProtocolDisplayName"
    let e1ProtocolRepoLink = "e1ProtocolRepoLink"
    let e1ProtocolDescription = "e1ProtocolDescription"
    let c1Name = "c1"
    let c1LowVersion = "0.2.1"
    let c1HighVersion = "0.3.1"
    let c1ProtocolName = "c1-protocol"
    let c1ProtocolConfig = Js.Nullable.null
    let c1Description = "c1Description"
    let c1DisplayName = "c1DisplayName"
    let c1RepoLink = "c1RepoLink"
    let c1File = ContributeTool.buildContributeData(
      ~contributePackageData=ContributeTool.buildContributePackageData(~name=c1Name, ()),
      (),
    )
    let c1Account = "c1Account"
    let c1ProtocolLowVersion = "0.2.1"
    let c1ProtocolHighVersion = "0.3.1"
    let c1ProtocolVersionRange = "^0.2.1"
    let c1ProtocolIconBase64 = "c1ProtocolIconBase64"
    let c1ProtocolDisplayName = "c1ProtocolDisplayName"
    let c1ProtocolRepoLink = "c1ProtocolRepoLink"
    let c1ProtocolDescription = "c1ProtocolDescription"
    let p1Name = "p1"
    let p1Version = "0.0.1"
    let p1ProtocolName = "p1-protocol"
    let p1ProtocolVersion = "0.1.0"
    let p1ProtocolIconbase64 = "ib"
    let p1File = Js.Typed_array.ArrayBuffer.make(10)
    let findNewestPublishPackageStub = ref(Obj.magic(1))
    let findNewestPublishExtensionStub = ref(Obj.magic(1))
    let findNewestPublishContributeStub = ref(Obj.magic(1))
    let loadExtensionFake = (. file) => file
    let loadContributeFake = (. file) => file
    let dispatchUpdateSelectedPackagesAndExtensionsAndContributesActionStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given(
      "prepare backend",
      () => {
        dispatchUpdateSelectedPackagesAndExtensionsAndContributesActionStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))

        findNewestPublishPackageStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->withThreeArgs(matchAny, p1ProtocolName, p1Name, _)
          ->returns(
            Meta3dBsMostDefault.Most.just((
              p1File,
              p1ProtocolVersion,
              p1Version,
              p1ProtocolIconbase64,
            )),
            _,
          )

        findNewestPublishExtensionStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->withThreeArgs(matchAny, e1Name, e1ProtocolName, _)
          ->returns(
            Meta3dBsMostDefault.Most.just((
              (e1Description, e1DisplayName, e1RepoLink, e1HighVersion, e1File, e1Account),
              (
                e1ProtocolHighVersion,
                e1ProtocolIconBase64,
                e1ProtocolDisplayName,
                e1ProtocolRepoLink,
                e1ProtocolDescription,
              ),
              e1ProtocolConfig,
            )),
            _,
          )

        findNewestPublishContributeStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->withThreeArgs(matchAny, c1Name, c1ProtocolName, _)
          ->returns(
            Meta3dBsMostDefault.Most.just((
              (c1Description, c1DisplayName, c1RepoLink, c1HighVersion, c1File, c1Account),
              (
                c1ProtocolHighVersion,
                c1ProtocolIconBase64,
                c1ProtocolDisplayName,
                c1ProtocolRepoLink,
                c1ProtocolDescription,
              ),
              c1ProtocolConfig,
            )),
            _,
          )
      },
    )

    \"and"(
      "select extension e1",
      () => {
        e1 :=
          SelectedExtensionsTool.buildSelectedExtension(
            ~id="e1",
            ~name=e1Name,
            ~version=e1LowVersion,
            ~isStart=true,
            ~protocolIconBase64=e1ProtocolIconBase64,
            ~protocolConfigStr=None,
            ~data=ExtensionTool.buildExtensionData(
              ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                ~name=e1Name,
                // ~version=e1Version,
                // ~displayName=e1DisplayName,
                // ~repoLink=e1RepoLink,
                // ~description=e1Description,
                ~protocol={
                  name: e1ProtocolName,
                  version: e1ProtocolVersionRange,
                },
                (),
              ),
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "select contribute c1",
      () => {
        c1 :=
          SelectedContributesTool.buildSelectedContribute(
            ~id="c1",
            ~name=c1Name,
            ~version=c1LowVersion,
            ~protocolIconBase64=c1ProtocolIconBase64,
            ~protocolConfigStr=None,
            ~data=ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(
                ~name=c1Name,
                ~protocol={
                  name: c1ProtocolName,
                  version: c1ProtocolVersionRange,
                },
                (),
              ),
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "select package p1",
      () => {
        p1 :=
          PackageSelectedPackagesTool.buildSelectedPackage(
            ~name=p1Name,
            ~protocolIconBase64=p1ProtocolIconbase64,
            ~protocolName=p1ProtocolName,
            ~protocolVersion=p1ProtocolVersion,
            ~binaryFile=p1File,
            ~isStart=true,
            (),
          )
      },
    )

    CucumberAsync.execStep(
      \"when",
      "auto upgrade",
      () => {
        DependencyGraphUtilsTool.autoUpgradeVersion(
          ServiceTool.build(
            ~sandbox,
            ~loadExtension=loadExtensionFake->Obj.magic,
            ~loadContribute=loadContributeFake->Obj.magic,
            ~findNewestPublishPackage=findNewestPublishPackageStub.contents->Obj.magic,
            ~findNewestPublishExtension=findNewestPublishExtensionStub.contents->Obj.magic,
            ~findNewestPublishContribute=findNewestPublishContributeStub.contents->Obj.magic,
            ~dispatchUpdateSelectedPackagesAndExtensionsAndContributesAction=dispatchUpdateSelectedPackagesAndExtensionsAndContributesActionStub.contents->Obj.magic,
            (),
          ),
          createEmptyStub(refJsObjToSandbox(sandbox.contents)),
          createEmptyStub(refJsObjToSandbox(sandbox.contents)),
          createEmptyStub(refJsObjToSandbox(sandbox.contents)),
          createEmptyStub(refJsObjToSandbox(sandbox.contents)),
          list{p1.contents},
          list{e1.contents},
          list{c1.contents},
        )
      },
    )

    then(
      "should update the newest ones to app store, ap assemble store, package assemble store",
      () => {
        (
          dispatchUpdateSelectedPackagesAndExtensionsAndContributesActionStub.contents
          ->Obj.magic
          ->SinonTool.getArg(~callIndex=0, ~argIndex=3, ~stub=_, ())
          ->Js.Json.stringify,
          dispatchUpdateSelectedPackagesAndExtensionsAndContributesActionStub.contents
          ->Obj.magic
          ->SinonTool.getArg(~callIndex=0, ~argIndex=4, ~stub=_, ())
          ->Js.Json.stringify,
          dispatchUpdateSelectedPackagesAndExtensionsAndContributesActionStub.contents
          ->Obj.magic
          ->SinonTool.getArg(~callIndex=0, ~argIndex=4, ~stub=_, ())
          ->Js.Json.stringify,
        )->expect ==
          (
            "[{\"hd\":{\"id\":\"p1\",\"protocol\":{\"version\":\"0.1.0\",\"name\":\"p1-protocol\",\"iconBase64\":\"ib\"},\"entryExtensionName\":\"pet1\",\"version\":\"0.0.1\",\"name\":\"p1\",\"binaryFile\":{},\"isStart\":true},\"tl\":0},{\"hd\":[{\"id\":\"e1\",\"protocolName\":\"e1-protocol\",\"protocolVersion\":\"0.2.1\",\"protocolIconBase64\":\"e1ProtocolIconBase64\",\"protocolDisplayName\":\"e1ProtocolDisplayName\",\"protocolRepoLink\":\"e1ProtocolRepoLink\",\"protocolDescription\":\"e1ProtocolDescription\",\"data\":{\"extensionPackageData\":{\"name\":\"e1\",\"version\":\"0.0.1\",\"account\":\"meta3d\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"displayName\":\"\",\"repoLink\":\"\",\"description\":\"\",\"dependentPackageStoredInAppProtocolNameMap\":{},\"dependentBlockProtocolNameMap\":{}},\"extensionFuncData\":{}},\"version\":\"0.1.1\",\"account\":\"e1Account\"},null],\"tl\":0},{\"hd\":[{\"id\":\"c1\",\"protocolName\":\"c1-protocol\",\"protocolVersion\":\"0.3.1\",\"protocolIconBase64\":\"c1ProtocolIconBase64\",\"data\":{\"contributePackageData\":{\"name\":\"c1\",\"version\":\"0.0.1\",\"account\":\"meta3d\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"displayName\":\"d1\",\"repoLink\":\"\",\"description\":\"dp1\",\"dependentPackageStoredInAppProtocolNameMap\":{},\"dependentBlockProtocolNameMap\":{}},\"contributeFuncData\":{}},\"version\":\"0.3.1\",\"account\":\"c1Account\"},null],\"tl\":0}]",
            "[{\"hd\":{\"id\":\"p1\",\"protocol\":{\"version\":\"0.1.0\",\"name\":\"p1-protocol\",\"iconBase64\":\"ib\"},\"entryExtensionName\":\"pet1\",\"version\":\"0.0.1\",\"name\":\"p1\",\"binaryFile\":{},\"isStart\":true},\"tl\":0},{\"hd\":{\"id\":\"e1\",\"protocolIconBase64\":\"e1ProtocolIconBase64\",\"isStart\":true,\"version\":\"0.1.1\",\"data\":{\"extensionPackageData\":{\"name\":\"e1\",\"version\":\"0.0.1\",\"account\":\"meta3d\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"displayName\":\"\",\"repoLink\":\"\",\"description\":\"\",\"dependentPackageStoredInAppProtocolNameMap\":{},\"dependentBlockProtocolNameMap\":{}},\"extensionFuncData\":{}}},\"tl\":0},{\"hd\":{\"id\":\"c1\",\"protocolIconBase64\":\"c1ProtocolIconBase64\",\"version\":\"0.3.1\",\"data\":{\"contributePackageData\":{\"name\":\"c1\",\"version\":\"0.0.1\",\"account\":\"meta3d\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"displayName\":\"d1\",\"repoLink\":\"\",\"description\":\"dp1\",\"dependentPackageStoredInAppProtocolNameMap\":{},\"dependentBlockProtocolNameMap\":{}},\"contributeFuncData\":{}}},\"tl\":0}]",
            "[{\"hd\":{\"id\":\"p1\",\"protocol\":{\"version\":\"0.1.0\",\"name\":\"p1-protocol\",\"iconBase64\":\"ib\"},\"entryExtensionName\":\"pet1\",\"version\":\"0.0.1\",\"name\":\"p1\",\"binaryFile\":{},\"isStart\":true},\"tl\":0},{\"hd\":{\"id\":\"e1\",\"protocolIconBase64\":\"e1ProtocolIconBase64\",\"isStart\":true,\"version\":\"0.1.1\",\"data\":{\"extensionPackageData\":{\"name\":\"e1\",\"version\":\"0.0.1\",\"account\":\"meta3d\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"displayName\":\"\",\"repoLink\":\"\",\"description\":\"\",\"dependentPackageStoredInAppProtocolNameMap\":{},\"dependentBlockProtocolNameMap\":{}},\"extensionFuncData\":{}}},\"tl\":0},{\"hd\":{\"id\":\"c1\",\"protocolIconBase64\":\"c1ProtocolIconBase64\",\"version\":\"0.3.1\",\"data\":{\"contributePackageData\":{\"name\":\"c1\",\"version\":\"0.0.1\",\"account\":\"meta3d\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"displayName\":\"d1\",\"repoLink\":\"\",\"description\":\"dp1\",\"dependentPackageStoredInAppProtocolNameMap\":{},\"dependentBlockProtocolNameMap\":{}},\"contributeFuncData\":{}}},\"tl\":0}]",
          )
      },
    )
  })
})
