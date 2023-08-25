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
        ->Js.Json.stringify
        ->NewlineTool.removeBlankChar
        ->expect ==
          {
            j`
        {"nodes":[{"id":"p1","value":{"title":"ed1","items":[{"text":"协议名","value":"p1"},{"text":"协议版本","value":"^0.0.1"},{"text":"协议icon","icon":"ei1"},{"text":"实现名","value":"e1"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false},{"id":"protocol1","value":{"title":"ped1","items":[{"text":"协议名","value":"protocol1"},{"text":"协议版本","value":"^0.2.0"},{"text":"协议icon","icon":"pi1"},{"text":"实现名","value":"pe1"},{"text":"实现版本","value":"0.5.1"},{"text":"所属包名","value":"p1"}]},"nodeType":2,"isEmpty":false},{"id":"protocol2","value":{"title":"cd1","items":[{"text":"协议名","value":"protocol2"},{"text":"协议版本","value":"^0.2.2"},{"text":"协议icon","icon":"ci1"},{"text":"实现名","value":"c1"},{"text":"实现版本","value":"0.0.2"}]},"nodeType":1,"isEmpty":false},{"id":"protocol3","value":{"title":"pcd1","items":[{"text":"协议名","value":"protocol3"},{"text":"协议版本","value":"^0.0.1"},{"text":"协议icon","icon":"pi1"},{"text":"实现名","value":"pc1"},{"text":"实现版本","value":"0.5.2"},{"text":"所属包名","value":"p1"}]},"nodeType":3,"isEmpty":false},{"id":"protocol4","value":{"title":"无","items":[{"text":"协议名","value":"protocol4"},{"text":"协议版本","value":"^0.0.1"}]},"isEmpty":true}],"edges":[{"source":"p1","target":"protocol1"},{"source":"p1","target":"protocol2"},{"source":"protocol2","target":"protocol3"},{"source":"protocol2","target":"protocol4"}]}
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
                {"nodes":[{"id":"p1","value":{"title":"ed1","items":[{"text":"协议名","value":"p1"},{"text":"协议版本","value":"^0.0.1"},{"text":"协议icon","icon":"ei1"},{"text":"实现名","value":"e1"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false},{"id":"protocol1","value":{"title":"无","items":[{"text":"协议名","value":"protocol1"},{"text":"协议版本","value":"^0.1.1"}]},"isEmpty":true},{"id":"protocol2","value":{"title":"ed2","items":[{"text":"协议名","value":"protocol2"},{"text":"协议版本","value":"^0.2.1"},{"text":"协议icon","icon":"ei2"},{"text":"实现名","value":"e2"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false}],"edges":[{"source":"p1","target":"protocol1"},{"source":"p1","target":"protocol2"},{"source":"protocol2","target":"protocol1"}]}
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
               {"nodes":[{"id":"p1","value":{"title":"ed1","items":[{"text":"协议名","value":"p1"},{"text":"协议版本","value":"^0.0.1"},{"text":"协议icon","icon":"ei1"},{"text":"实现名","value":"e1"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false},{"id":"protocol1","value":{"title":"无","items":[{"text":"协议名","value":"protocol1"},{"text":"协议版本","value":"^0.2.1"}]},"isEmpty":true},{"id":"protocol2","value":{"title":"ed2","items":[{"text":"协议名","value":"protocol2"},{"text":"协议版本","value":"^0.2.1"},{"text":"协议icon","icon":"ei2"},{"text":"实现名","value":"e2"},{"text":"实现版本","value":"0.0.1"}]},"nodeType":0,"isEmpty":false}],"edges":[{"source":"p1","target":"protocol1"},{"source":"p1","target":"protocol2"},{"source":"protocol2","target":"protocol1"}]}

          `
            }->NewlineTool.removeBlankChar
        },
      )
    },
  )

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
        )->toThrowMessage({j`协议名：protocol1有重复的实现`})
      },
    )
  })

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
})
