open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Promise

let feature = loadFeature("./test/features/contributes.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let allPublishContributeProtocols = ref([])
  let selectedContributesFromShop = ref(list{})

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
      ContributesTool.buildUI(~sandbox, ~service=ServiceTool.build(~sandbox, ()), ())
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  let _setContributes = contributes => {
    let setContributesStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))

    ContributesTool.useEffectOnceAsync(
      ~sandbox,
      ~setContributes=setContributesStub,
      ~service=ServiceTool.build(
        ~sandbox,
        ~getAllPublishContributeProtocols=createEmptyStub(
          refJsObjToSandbox(sandbox.contents),
        )->returns(Meta3dBsMost.Most.just(allPublishContributeProtocols.contents), _),
        (),
      ),
      ~selectedContributesFromShop=selectedContributesFromShop.contents,
      (),
    )
    ->ServiceTool.getUseEffectOncePromise
    ->then_(() => {
      (ReactHookTool.getValue(~setLocalValueStub=setContributesStub, ())->expect == contributes)
        ->resolve
    }, _)
  }

  test(."set contributes", ({given, \"when", \"and", then}) => {
    let a: FrontendUtils.BackendCloudbaseType.protocol = {
      name: "a",
      version: "1.0.1",
      iconBase64: "i1",
    }

    _prepare(given)

    given("publish contribute protocol a", () => {
      allPublishContributeProtocols := [a]
    })

    \"and"("select contribute a1 for a", () => {
      selectedContributesFromShop :=
        list{
          ContributeTool.buildSelectedContribute(
            ~protocolName=a.name,
            ~protocolVersion=">= 1.0.0",
            (),
          ),
        }
    })

    \"when"("render after useEffectOnceAsync", () => {
      ()
    })

    CucumberAsync.execStep(then, "should mark loaded", () => {
      let setIsLoadedStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))

      ContributesTool.useEffectOnceAsync(
        ~sandbox,
        ~setIsLoaded=setIsLoadedStub,
        ~service=ServiceTool.build(
          ~sandbox,
          ~getAllPublishContributeProtocols=createEmptyStub(
            refJsObjToSandbox(sandbox.contents),
          )->returns(Meta3dBsMost.Most.just(allPublishContributeProtocols.contents), _),
          (),
        ),
        ~selectedContributesFromShop=selectedContributesFromShop.contents,
        (),
      )
      ->ServiceTool.getUseEffectOncePromise
      ->then_(() => {
        (ReactHookTool.getValue(~setLocalValueStub=setIsLoadedStub, ())->expect == true)->resolve
      }, _)
    })

    CucumberAsync.execStep(\"and", "should set a's name and icon and a1", () => {
      _setContributes([
        (a.name, a.iconBase64, selectedContributesFromShop.contents->ListTool.getHeadExn),
      ])
    })
  })

  test(."select contribute", ({given, \"when", \"and", then}) => {
    let a: FrontendUtils.BackendCloudbaseType.protocol = {
      name: "a",
      version: "1.0.1",
      iconBase64: "i1",
    }
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    given("publish contribute protocol a", () => {
      allPublishContributeProtocols := [a]
    })

    \"and"("select contribute a1 for a", () => {
      selectedContributesFromShop :=
        list{
          ContributeTool.buildSelectedContribute(
            ~protocolName=a.name,
            ~protocolVersion=">= 1.0.0",
            (),
          ),
        }
    })

    \"and"("render after useEffectOnceAsync", () => {
      ()
    })

    \"when"("select a1", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      ContributesTool.selectContribute(
        ~dispatch=dispatchStub.contents,
        ~iconBase64=a.iconBase64,
        ~contribute=selectedContributesFromShop.contents->ListTool.getHeadExn,
      )
    })

    then("should dispatch selectContribute action", () => {
      dispatchStub.contents
      ->Obj.magic
      ->SinonTool.calledWith(
        FrontendUtils.AssembleSpaceStoreType.SelectContribute(
          a.iconBase64,
          selectedContributesFromShop.contents->ListTool.getHeadExn,
        ),
      )
      ->expect == true
    })
  })

  test(."has zero implement of contribute protocol", ({given, \"when", \"and", then}) => {
    let a: FrontendUtils.BackendCloudbaseType.protocol = {
      name: "a",
      version: "0.0.1",
      iconBase64: "i1",
    }

    _prepare(given)

    given("publish contribute protocol a", () => {
      allPublishContributeProtocols := [a]
    })

    \"and"("select contribute b1 for protocol b", () => {
      selectedContributesFromShop :=
        list{
          ContributeTool.buildSelectedContribute(~protocolName="b", ~protocolVersion="0.0.1", ()),
        }
    })

    \"when"("render after useEffectOnceAsync", () => {
      ()
    })

    CucumberAsync.execStep(then, "should set empty", () => {
      _setContributes([])
    })
  })

  test(."has multiple implements of contribute protocol", ({given, \"when", \"and", then}) => {
    let a: FrontendUtils.BackendCloudbaseType.protocol = {
      name: "a",
      version: "0.0.1",
      iconBase64: "i1",
    }

    _prepare(given)

    given("publish contribute protocol a", () => {
      allPublishContributeProtocols := [a]
    })

    \"and"("select contribute a1 and a2 for a", () => {
      selectedContributesFromShop :=
        list{
          ContributeTool.buildSelectedContribute(
            ~id="a1",
            ~protocolName=a.name,
            ~protocolVersion=a.version,
            (),
          ),
          ContributeTool.buildSelectedContribute(
            ~id="a2",
            ~protocolName=a.name,
            ~protocolVersion=a.version,
            (),
          ),
        }
    })

    \"when"("render after useEffectOnceAsync", () => {
      ()
    })

    CucumberAsync.execStep(then, "should set empty", () => {
      _setContributes([])
    })
  })

  test(."contribute's version not match", ({given, \"when", \"and", then}) => {
    let a: FrontendUtils.BackendCloudbaseType.protocol = {
      name: "a",
      version: "0.1.1",
      iconBase64: "i1",
    }

    _prepare(given)

    given("publish contribute protocol a", () => {
      allPublishContributeProtocols := [a]
    })

    \"and"("select contribute a1 for a with old version", () => {
      selectedContributesFromShop :=
        list{
          ContributeTool.buildSelectedContribute(
            ~protocolName=a.name,
            ~protocolVersion=">= 1.0.0",
            (),
          ),
        }
    })

    \"when"("render after useEffectOnceAsync", () => {
      ()
    })

    CucumberAsync.execStep(then, "should set empty", () => {
      _setContributes([])
    })
  })
})
