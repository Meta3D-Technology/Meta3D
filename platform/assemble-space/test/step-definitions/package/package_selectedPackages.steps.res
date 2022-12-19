open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/package/package_selectedPackages.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
    })
  }

  test(."show selected packages", ({given, \"when", \"and", then}) => {
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given(
      "select package a1, a2",
      () => {
        useSelectorStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            list{
              PackageSelectedPackagesTool.buildSelectedPackage(
                ~name="p1",
                ~protocolIconBase64="i1",
                (),
              ),
              PackageSelectedPackagesTool.buildSelectedPackage(
                ~name="p2",
                ~protocolIconBase64="i2",
                (),
              ),
            },
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
      "should show a1 and a2",
      () => {
        PackageSelectedPackagesTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
          (),
        )
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })
})
