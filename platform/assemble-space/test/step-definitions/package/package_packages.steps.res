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

  test(."show packages list", ({given, \"when", \"and", then}) => {
    _prepare(given)

    \"when"(
      "render",
      () => {
        ()
      },
    )

    then(
      "should show packages list",
      () => {
        PackagePackagesTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(~sandbox, ()),
          ~selectedPackagesFromMarket=list{PackageTool.buildSelectedPackage()},
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
      "select package a1",
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
