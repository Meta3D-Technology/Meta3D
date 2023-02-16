open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Promise

let feature = loadFeature("./test/features/package/package_packages.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  // let allPublishPackageProtocols = ref([])
  let selectedPackagesFromMarket = ref(list{})

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
    })
  }

  test(."show packages list exclude selected packages", ({given, \"when", \"and", then}) => {
    let package1Name = "p1"
    let package2Name = "p2"
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given)

    given(
      "prepare selected packages from market",
      () => {
        selectedPackagesFromMarket :=
          list{
            PackageTool.buildSelectedPackage(~name=package1Name, ()),
            PackageTool.buildSelectedPackage(~name=package2Name, ()),
          }
      },
    )

    \"and"(
      "prepare selected packages",
      () => {
        useSelectorStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            list{PackageSelectedPackagesTool.buildSelectedPackage(~name=package1Name, ())},
            _,
          )
      },
    )

    \"when"(
      "render",
      () => {
        ()
      },
    )

    then(
      "should show packages list exclude selected packages",
      () => {
        PackagePackagesTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(
            ~sandbox,
            ~useSelector=useSelectorStub.contents->Obj.magic,
            (),
          ),
          ~selectedPackagesFromMarket=selectedPackagesFromMarket.contents,
          (),
        )
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })

  test(."select package", ({given, \"when", \"and", then}) => {
    // let a: FrontendUtils.BackendCloudbaseType.protocol = {
    //   name: "a",
    //   version: "1.0.1",
    //   iconBase64: "i1",
    //   account: "meta3d",
    // }
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    // given(
    //   "publish package protocol a",
    //   () => {
    //     // allPublishPackageProtocols := [a]
    //   },
    // )

    given(
      "select package a1 from market",
      () => {
        selectedPackagesFromMarket :=
          list{
            PackageTool.buildSelectedPackage(
              ~protocolName="a1_protocol",
              ~protocolVersion="^0.0.1",
              ~version="0.0.1",
              (),
            ),
          }
      },
    )

    \"and"(
      "render",
      () => {
        ()
      },
    )

    \"when"(
      "select a1",
      () => {
        dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        let package = selectedPackagesFromMarket.contents->ListTool.getHeadExn

        PackagePackagesTool.selectPackage(~dispatch=dispatchStub.contents, ~package)
      },
    )

    then(
      "should dispatch SelectPackage action",
      () => {
        let package = selectedPackagesFromMarket.contents->ListTool.getHeadExn

        dispatchStub.contents
        ->Obj.magic
        ->SinonTool.calledWith(FrontendUtils.PackageAssembleStoreType.SelectPackage(package))
        ->expect == true
      },
    )
  })
})
