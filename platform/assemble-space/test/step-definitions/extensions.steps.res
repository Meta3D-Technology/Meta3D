open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Promise

let feature = loadFeature("./test/features/extensions.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let allPublishExtensionProtocols = ref([])
  let selectedExtensionsFromShop = ref(list{})

  let _prepare = given => {
    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })
  }

  let _show = extensions => {
    let setExtensionsStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))

    ExtensionsTool.useEffectOnce(
      ~sandbox,
      ~setExtensions=setExtensionsStub,
      ~service=ServiceTool.build(
        ~sandbox,
        ~getAllPublishExtensionProtocols=createEmptyStub(
          refJsObjToSandbox(sandbox.contents),
        )->returns(Meta3dBsMost.Most.just(allPublishExtensionProtocols.contents), _),
        (),
      ),
      ~selectedExtensionsFromShop=selectedExtensionsFromShop.contents,
      (),
    )
    ->ServiceTool.getUseEffectOncePromise
    ->then_(() => {
      (ReactHookTool.getValue(~setLocalValueStub=setExtensionsStub, ())->expect == extensions)
        ->resolve
    }, _)
  }

  test(."show extensions", ({given, \"when", \"and", then}) => {
    let a: FrontendUtils.BackendCloudbaseType.protocol = {
      name: "a",
      version: "1.0.1",
      iconBase64: "i1",
    }

    _prepare(given)

    given("publish extension protocol a", () => {
      allPublishExtensionProtocols := [a]
    })

    \"and"("select extension a1 for a", () => {
      selectedExtensionsFromShop :=
        list{
          AssembleSpaceTool.buildSelectedExtension(
            ~protocolName=a.name,
            ~protocolVersion=">= 1.0.0",
            (),
          ),
        }
    })

    \"when"("render after useEffectOnce", () => {
      ()
    })

    CucumberAsync.execStep(then, "should mark is loaded", () => {
      let dispatchStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))

      ExtensionsTool.useEffectOnce(
        ~sandbox,
        ~dispatch=dispatchStub,
        ~service=ServiceTool.build(
          ~sandbox,
          ~getAllPublishExtensionProtocols=createEmptyStub(
            refJsObjToSandbox(sandbox.contents),
          )->returns(Meta3dBsMost.Most.just(allPublishExtensionProtocols.contents), _),
          (),
        ),
        ~selectedExtensionsFromShop=selectedExtensionsFromShop.contents,
        (),
      )
      ->ServiceTool.getUseEffectOncePromise
      ->then_(() => {
        (dispatchStub
        ->SinonTool.calledWith(FrontendUtils.AssembleSpaceStoreType.SetIsLoaded(true))
        ->expect == true)->resolve
      }, _)
    })

    CucumberAsync.execStep(\"and", "should show a's name and icon", () => {
      _show([(a.name, a.iconBase64)])
    })
  })

  test(."has zero implement of extension protocol", ({given, \"when", \"and", then}) => {
    let a: FrontendUtils.BackendCloudbaseType.protocol = {
      name: "a",
      version: "0.0.1",
      iconBase64: "i1",
    }

    _prepare(given)

    given("publish extension protocol a", () => {
      allPublishExtensionProtocols := [a]
    })

    \"and"("select extension b1 for protocol b", () => {
      selectedExtensionsFromShop :=
        list{
          AssembleSpaceTool.buildSelectedExtension(~protocolName="b", ~protocolVersion="0.0.1", ()),
        }
    })

    \"when"("render after useEffectOnce", () => {
      ()
    })

    CucumberAsync.execStep(then, "should show empty", () => {
      _show([])
    })
  })

  test(."has multiple implements of extension protocol", ({given, \"when", \"and", then}) => {
    let a: FrontendUtils.BackendCloudbaseType.protocol = {
      name: "a",
      version: "0.0.1",
      iconBase64: "i1",
    }

    _prepare(given)

    given("publish extension protocol a", () => {
      allPublishExtensionProtocols := [a]
    })

    \"and"("select extension a1 and a2 for a", () => {
      selectedExtensionsFromShop :=
        list{
          AssembleSpaceTool.buildSelectedExtension(
            ~id="a1",
            ~protocolName=a.name,
            ~protocolVersion=a.version,
            (),
          ),
          AssembleSpaceTool.buildSelectedExtension(
            ~id="a2",
            ~protocolName=a.name,
            ~protocolVersion=a.version,
            (),
          ),
        }
    })

    \"when"("render after useEffectOnce", () => {
      ()
    })

    CucumberAsync.execStep(then, "should show empty", () => {
      _show([])
    })
  })

  test(."extension's version not match", ({given, \"when", \"and", then}) => {
    let a: FrontendUtils.BackendCloudbaseType.protocol = {
      name: "a",
      version: "0.1.1",
      iconBase64: "i1",
    }

    _prepare(given)

    given("publish extension protocol a", () => {
      allPublishExtensionProtocols := [a]
    })

    \"and"("select extension a1 for a with old version", () => {
      selectedExtensionsFromShop :=
        list{
          AssembleSpaceTool.buildSelectedExtension(
            ~protocolName=a.name,
            ~protocolVersion=">= 1.0.0",
            (),
          ),
        }
    })

    \"when"("render after useEffectOnce", () => {
      ()
    })

    CucumberAsync.execStep(then, "should show empty", () => {
      _show([])
    })
  })
})
