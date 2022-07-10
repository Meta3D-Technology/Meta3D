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

  test(."if not loaded, show loading", ({given, \"when", \"and", then}) => {
    _prepare(given)

    \"when"("not loaded and render", () => {
      ()
    })

    then("should show loading", () => {
      ExtensionsTool.buildUI(~sandbox, ~service=ServiceTool.build(~sandbox, ()), ())
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  let _setExtensions = extensions => {
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

  test(."set extensions", ({given, \"when", \"and", then}) => {
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
          ExtensionTool.buildSelectedExtension(
            ~protocolName=a.name,
            ~protocolVersion=">= 1.0.0",
            (),
          ),
        }
    })

    \"when"("render after useEffectOnce", () => {
      ()
    })

    CucumberAsync.execStep(then, "should mark loaded", () => {
      let setIsLoadedStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))

      ExtensionsTool.useEffectOnce(
        ~sandbox,
        ~setIsLoaded=setIsLoadedStub,
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
        (ReactHookTool.getValue(~setLocalValueStub=setIsLoadedStub, ())->expect == true)->resolve
      }, _)
    })

    CucumberAsync.execStep(\"and", "should set a's name and icon and a1", () => {
      _setExtensions([
        (a.name, a.iconBase64, selectedExtensionsFromShop.contents->ListTool.getHeadExn),
      ])
    })
  })

  test(."select extension", ({given, \"when", \"and", then}) => {
    let a: FrontendUtils.BackendCloudbaseType.protocol = {
      name: "a",
      version: "1.0.1",
      iconBase64: "i1",
    }
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    given("publish extension protocol a", () => {
      allPublishExtensionProtocols := [a]
    })

    \"and"("select extension a1 for a", () => {
      selectedExtensionsFromShop :=
        list{
          ExtensionTool.buildSelectedExtension(
            ~protocolName=a.name,
            ~protocolVersion=">= 1.0.0",
            (),
          ),
        }
    })

    \"and"("render after useEffectOnce", () => {
      ()
    })

    \"when"("select a1", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      ExtensionsTool.selectExtension(
        ~dispatch=dispatchStub.contents,
        ~iconBase64=a.iconBase64,
        ~extension=selectedExtensionsFromShop.contents->ListTool.getHeadExn,
      )
    })

    then("should dispatch selectExtension action", () => {
      dispatchStub.contents
      ->Obj.magic
      ->SinonTool.calledWith(
        FrontendUtils.AssembleSpaceStoreType.SelectExtension(
          a.iconBase64,
          selectedExtensionsFromShop.contents->ListTool.getHeadExn,
        ),
      )
      ->expect == true
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
        list{ExtensionTool.buildSelectedExtension(~protocolName="b", ~protocolVersion="0.0.1", ())}
    })

    \"when"("render after useEffectOnce", () => {
      ()
    })

    CucumberAsync.execStep(then, "should set empty", () => {
      _setExtensions([])
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
          ExtensionTool.buildSelectedExtension(
            ~id="a1",
            ~protocolName=a.name,
            ~protocolVersion=a.version,
            (),
          ),
          ExtensionTool.buildSelectedExtension(
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

    CucumberAsync.execStep(then, "should set empty", () => {
      _setExtensions([])
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
          ExtensionTool.buildSelectedExtension(
            ~protocolName=a.name,
            ~protocolVersion=">= 1.0.0",
            (),
          ),
        }
    })

    \"when"("render after useEffectOnce", () => {
      ()
    })

    CucumberAsync.execStep(then, "should set empty", () => {
      _setExtensions([])
    })
  })
})
