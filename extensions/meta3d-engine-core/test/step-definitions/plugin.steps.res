open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Promise

let feature = loadFeature("./test/features/plugin.feature")

// TODO test is_set_state for merge

defineFeature(feature, test => {
  let contribute1 = ref(Obj.magic(1))
  let contribute2 = ref(Obj.magic(1))
  let contribute3 = ref(Obj.magic(1))

  let _prepareRegister = given => {
    given("prepare register", () => {
      CreateState.createState()->StateContainer.setState
    })
  }

  let _buildWorkPluginContribute = (
    ~workPluginName="pluginA",
    ~createStateFunc=() => Obj.magic(1),
    ~initFunc=state => (),
    ~getExecFunc=(_, _) => Js.Nullable.null,
    ~allPipelineData=[],
    (),
  ): Meta3dEngineCoreProtocol.WorkPluginManagerType.workPluginContributeForRegister => {
    workPluginName: workPluginName,
    createStateFunc: createStateFunc,
    initFunc: initFunc,
    getExecFunc: getExecFunc,
    allPipelineData: allPipelineData,
  }

  let _buildJobOrder = (
    ~insertElementName,
    ~pipelineName="pipeline",
    ~insertAction=#after,
    (),
  ): Meta3dEngineCoreProtocol.RegisterWorkPluginVOType.jobOrder => {
    pipelineName: pipelineName,
    insertElementName: insertElementName,
    insertAction: insertAction,
  }

  let _convertAllRegisteredWorkPluginData = (
    allRegisteredWorkPluginContribute: Meta3dEngineCoreProtocol.WorkPluginManagerType.allRegisteredWorkPluginContribute,
  ) => {
    allRegisteredWorkPluginContribute->Meta3dCommonlib.ListSt.map(((
      workPluginContribute,
      jobOrders,
    )) => {
      (workPluginContribute, jobOrders->VOTool.convertJobOrdersDOToVO)
    })
  }

  let _getAllWorkPluginContributes = () => {
    StateContainer.unsafeGetState().allRegisteredWorkPluginContribute->_convertAllRegisteredWorkPluginData
  }

  let _getStates = () => {
    StateContainer.unsafeGetState().states
  }

  let _createState1 = (~d1=0, ()) => {
    {
      "d1": d1,
    }->Obj.magic
  }

  let _createState2 = (~d2="aaa", ~dd2=1, ()) => {
    {
      "d2": d2,
      "dd2": dd2,
    }->Obj.magic
  }

  test(."open debug", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    \"when"("open debug", () => {
      MainTool.setIsDebug(true)
    })

    then("get is debug should return true", () => {
      MainTool.getIsDebug()->expect == true
    })
  })

  test(."register one plugin", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    \"when"("register plugin contribute", () => {
      contribute1 := _buildWorkPluginContribute()

      MainTool.registerWorkPlugin(~contribute=contribute1.contents, ())
    })

    then("should add plugin contribute", () => {
      _getAllWorkPluginContributes()->expect == list{(contribute1.contents, [])}
    })
  })

  test(."register two plugins with jobOrders", ({given, \"when", \"and", then}) => {
    let jobOrders2 = ref(Obj.magic(1))

    _prepareRegister(given)

    \"when"("register plugin1 contribute", () => {
      contribute1 := _buildWorkPluginContribute(~workPluginName="a1", ())

      MainTool.registerWorkPlugin(~contribute=contribute1.contents, ())
    })

    \"and"("register plugin2 contribute with jobOrders2", () => {
      jobOrders2 := [_buildJobOrder(~insertElementName="", ())]
      contribute2 := _buildWorkPluginContribute(~workPluginName="a2", ())

      MainTool.registerWorkPlugin(
        ~contribute=contribute2.contents,
        ~jobOrders=jobOrders2.contents,
        (),
      )
    })

    then("should add plugin1 and plugin2 contribute", () => {
      _getAllWorkPluginContributes()->expect ==
        list{(contribute1.contents, []), (contribute2.contents, jobOrders2.contents)}
    })
  })

  test(."register one plugin and unregister it", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    \"when"("register plugin contribute", () => {
      contribute1 := _buildWorkPluginContribute(~workPluginName="a", ())

      MainTool.registerWorkPlugin(~contribute=contribute1.contents, ())
    })

    \"and"("unregister it", () => {
      MainTool.unregisterWorkPlugin("a")
    })

    then("should not has plugin contribute", () => {
      _getAllWorkPluginContributes()->expect == list{}
    })
  })

  test(."register two plugins and unregister the first one", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    \"when"("register plugin1 contribute", () => {
      contribute1 := _buildWorkPluginContribute(~workPluginName="a1", ())

      MainTool.registerWorkPlugin(~contribute=contribute1.contents, ())
    })

    \"and"("register plugin2 contribute", () => {
      contribute2 := _buildWorkPluginContribute(~workPluginName="a2", ())

      MainTool.registerWorkPlugin(~contribute=contribute2.contents, ())
    })

    \"and"("unregister plugin1 contribute", () => {
      MainTool.unregisterWorkPlugin("a1")
    })

    then("should only has plugin2 contribute", () => {
      _getAllWorkPluginContributes()->expect == list{(contribute2.contents, [])}
    })
  })

  test(."init plugins", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))
    let sandbox = ref(Obj.magic(1))
    let stub1 = ref(Obj.magic(1))
    let stub2 = ref(Obj.magic(1))

    _prepareRegister(given)

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"when"("register plugin1 contribute", () => {
      stub1 := createEmptyStubWithJsObjSandbox(sandbox)
      state1 := _createState1()
      contribute1 :=
        _buildWorkPluginContribute(
          ~workPluginName="a1",
          ~createStateFunc=() => state1.contents,
          ~initFunc=state1 => {
            stub1.contents(state1)
          },
          (),
        )

      MainTool.registerWorkPlugin(~contribute=contribute1.contents, ())
    })

    \"and"("register plugin2 contribute", () => {
      stub2 := createEmptyStubWithJsObjSandbox(sandbox)
      state2 := _createState2()
      contribute2 :=
        _buildWorkPluginContribute(
          ~workPluginName="a2",
          ~createStateFunc=() => state2.contents,
          ~initFunc=state2 => {
            stub2.contents()
          },
          (),
        )

      MainTool.registerWorkPlugin(~contribute=contribute2.contents, ())
    })

    \"when"("init", () => {
      MainTool.init()
    })

    then("invoke plugin1's and plugin2's createStateFunc and store result", () => {
      let states = _getStates()
      (
        states->Meta3dCommonlib.ImmutableHashMap.get("a1"),
        states->Meta3dCommonlib.ImmutableHashMap.get("a2"),
      )->expect == (Some(state1.contents), Some(state2.contents))
    })

    \"and"("invoke plugin1's and plugin2's initFunc", () => {
      (
        stub1.contents->Obj.magic->getCallCount,
        stub1.contents->Obj.magic->SinonTool.calledWith(state1.contents),
        stub2.contents->Obj.magic->getCallCount,
      )->expect == (1, true, 1)
    })
  })

  let _prepareData1 = (
    ~changedState1=_createState1(~d1=10, ()),
    ~rootJob=(
      state,
      {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
    ) => {
      state
      ->getStatesFunc
      ->Meta3dCommonlib.ImmutableHashMap.set("a1", changedState1)
      ->setStatesFunc(state, _)
      ->Meta3dBsMost.Most.just
    },
    ~state1=_createState1(),
    ~initFunc=state => (),
    (),
  ) => {
    let rootJobName = "root_a1"

    (
      rootJobName,
      _buildWorkPluginContribute(
        ~workPluginName="a1",
        ~createStateFunc=() => state1,
        ~initFunc,
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a1",
                link: #concat,
                elements: [
                  {
                    name: rootJobName,
                    type_: #job,
                    is_set_state: true->Js.Nullable.return,
                  },
                ],
              },
            ],
            first_group: "first_a1",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | jobName if Meta3dCommonlib.EqualTool.isEqual(jobName, rootJobName) =>
            rootJob->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      ),
      changedState1,
    )
  }

  test(."test register one plugin", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let sandbox = ref(Obj.magic(1))

    _prepareRegister(given)

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    given("register plugin contribute", () => {
      let (_, contribute1, s1) = _prepareData1()

      state1 := s1

      MainTool.registerWorkPlugin(~contribute=contribute1, ())
    })

    \"and"("init", () => {
      MainTool.init()
    })

    \"when"("run init pipeline", () => {
      let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

      MainTool.runPipeline(data, meta3dState, "init")->Meta3dBsMost.Most.drain->Obj.magic
    })

    then("run init pipeline's all jobs", () => {
      (_getStates()->Meta3dCommonlib.ImmutableHashMap.get("a1")->expect == Some(state1.contents))
      ->resolve
      ->Obj.magic
    })
  })

  let _prepareData2 = () => {
    let job1Name_a2 = "job1_a2"
    let state2 = _createState2()
    let job1 = (
      state,
      {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
    ) => {
      state
      ->getStatesFunc
      ->Meta3dCommonlib.ImmutableHashMap.set("a2", _createState2(~d2="c", ~dd2=100, ()))
      ->setStatesFunc(state, _)
      ->Meta3dBsMost.Most.just
    }
    let job2 = (
      state,
      {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
    ) => {
      let states = state->getStatesFunc

      states
      ->Meta3dCommonlib.ImmutableHashMap.set(
        "a2",
        _createState2(
          ~d2="d",
          ~dd2=states
          ->Meta3dCommonlib.ImmutableHashMap.get("a2")
          ->Meta3dCommonlib.OptionSt.getExn
          ->JsObjTool.getObjValue("dd2"),
          (),
        ),
      )
      ->setStatesFunc(state, _)
      ->Meta3dBsMost.Most.just
    }
    let contribute2 = _buildWorkPluginContribute(
      ~workPluginName="a2",
      ~createStateFunc=() => state2,
      ~allPipelineData=[
        {
          name: "init",
          groups: [
            {
              name: "first_a2",
              link: #concat,
              elements: [
                {
                  name: job1Name_a2,
                  type_: #job,
                  is_set_state: true->Js.Nullable.return,
                },
                {
                  name: "job2_a2",
                  type_: #job,
                  is_set_state: true->Js.Nullable.return,
                },
              ],
            },
          ],
          first_group: "first_a2",
        },
      ],
      ~getExecFunc=(_, jobName) => {
        switch jobName {
        | jobName if Meta3dCommonlib.EqualTool.isEqual(jobName, job1Name_a2) =>
          job1->Js.Nullable.return
        | "job2_a2" => job2->Js.Nullable.return
        | _ => Js.Nullable.null
        }
      },
      (),
    )

    (job1Name_a2, contribute2, _createState2(~d2="d", ~dd2=100, ()))
  }

  test(."test register two plugins that plugin has one job", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))
    let sandbox = ref(Obj.magic(1))

    _prepareRegister(given)

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    given("register plugin1 contribute", () => {
      let (rootJobName, contribute1, s1) = _prepareData1()
      state1 := s1

      MainTool.registerWorkPlugin(~contribute=contribute1, ())
    })

    \"and"("register plugin2 contribute", () => {
      let (rootJobName, _, _) = _prepareData1()
      let s2 = _createState2()
      let changedState2 = _createState2(~d2="c", ())
      state2 := changedState2
      let job1 = (
        state,
        {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
      ) => {
        state
        ->getStatesFunc
        ->Meta3dCommonlib.ImmutableHashMap.set("a2", changedState2)
        ->setStatesFunc(state, _)
        ->Meta3dBsMost.Most.just
      }
      let contribute2 = _buildWorkPluginContribute(
        ~workPluginName="a2",
        ~createStateFunc=() => s2,
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a2",
                link: #concat,
                elements: [
                  {
                    name: "job1_a2",
                    type_: #job,
                    is_set_state: true->Js.Nullable.return,
                  },
                ],
              },
            ],
            first_group: "first_a2",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | "job1_a2" => job1->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      )

      MainTool.registerWorkPlugin(
        ~contribute=contribute2,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=rootJobName,
            ~insertAction=#after,
            (),
          ),
        ],
        (),
      )
    })

    \"and"("init", () => {
      MainTool.init()
    })

    \"when"("run init pipeline", () => {
      let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

      MainTool.runPipeline(data, meta3dState, "init")->Meta3dBsMost.Most.drain->Obj.magic
    })

    then("run init pipeline's all jobs", () => {
      let states = _getStates()

      ((
        states->Meta3dCommonlib.ImmutableHashMap.get("a1"),
        states->Meta3dCommonlib.ImmutableHashMap.get("a2"),
      )->expect == (Some(state1.contents), Some(state2.contents)))
      ->resolve
      ->Obj.magic
    })
  })

  test(."test register two plugins that plugin has two jobs", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))
    let sandbox = ref(Obj.magic(1))

    _prepareRegister(given)

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    given("register plugin1 contribute", () => {
      let (_, contribute1, s1) = _prepareData1()
      state1 := s1

      MainTool.registerWorkPlugin(~contribute=contribute1, ())
    })

    \"and"("register plugin2 contribute", () => {
      let (rootJobName, _, _) = _prepareData1()
      let (job1Name_a2, contribute2, s2) = _prepareData2()
      state2 := s2

      MainTool.registerWorkPlugin(
        ~contribute=contribute2,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=rootJobName,
            ~insertAction=#after,
            (),
          ),
        ],
        (),
      )
    })

    \"and"("init", () => {
      MainTool.init()
    })

    \"when"("run init pipeline", () => {
      let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

      MainTool.runPipeline(data, meta3dState, "init")->Meta3dBsMost.Most.drain->Obj.magic
    })

    then("run init pipeline's all jobs", () => {
      let states = _getStates()

      ((
        states->Meta3dCommonlib.ImmutableHashMap.get("a1"),
        states->Meta3dCommonlib.ImmutableHashMap.get("a2"),
      )->expect == (Some(state1.contents), Some(state2.contents)))
      ->resolve
      ->Obj.magic
    })
  })

  let _createState3 = (~d3=222, ()) => {
    {
      "d3": d3,
    }->Obj.magic
  }

  let _prepareForRegisterThreePlugins = () => {
    let (rootJobName, contribute1, changedState1) = _prepareData1()
    let (job1Name_a2, contribute2, changedState2) = _prepareData2()
    let state3 = _createState3()
    let changedState3 = _createState3(~d3=2, ())
    let job1 = (
      state,
      {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
    ) => {
      state
      ->getStatesFunc
      ->Meta3dCommonlib.ImmutableHashMap.set("a3", changedState3)
      ->setStatesFunc(state, _)
      ->Meta3dBsMost.Most.just
    }
    let contribute3 = _buildWorkPluginContribute(
      ~workPluginName="a3",
      ~createStateFunc=() => state3,
      ~allPipelineData=[
        {
          name: "init",
          groups: [
            {
              name: "first_a3",
              link: #concat,
              elements: [
                {
                  name: "job1_a3",
                  type_: #job,
                  is_set_state: true->Js.Nullable.return,
                },
              ],
            },
          ],
          first_group: "first_a3",
        },
      ],
      ~getExecFunc=(_, jobName) => {
        switch jobName {
        | "job1_a3" => job1->Js.Nullable.return
        | _ => Js.Nullable.null
        }
      },
      (),
    )

    (
      (rootJobName, contribute1, changedState1),
      (job1Name_a2, contribute2, changedState2),
      (contribute3, changedState3),
    )
  }

  test(."test register three plugins case1", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))
    let state3 = ref(Obj.magic(1))
    let sandbox = ref(Obj.magic(1))

    _prepareRegister(given)

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    given("register plugin1, plugin2, plugin3 contribute", () => {
      let (
        (rootJobName, contribute1, s1),
        (job1Name_a2, contribute2, s2),
        (contribute3, s3),
      ) = _prepareForRegisterThreePlugins()
      state1 := s1
      state2 := s2
      state3 := s3

      MainTool.registerWorkPlugin(
        ~contribute=contribute3,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=job1Name_a2,
            ~insertAction=#before,
            (),
          ),
        ],
        (),
      )
      MainTool.registerWorkPlugin(~contribute=contribute1, ())
      MainTool.registerWorkPlugin(
        ~contribute=contribute2,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=rootJobName,
            ~insertAction=#after,
            (),
          ),
        ],
        (),
      )
    })

    \"and"("init", () => {
      MainTool.init()
    })

    \"when"("run init pipeline", () => {
      let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

      MainTool.runPipeline(data, meta3dState, "init")->Meta3dBsMost.Most.drain->Obj.magic
    })

    then("run init pipeline's all jobs", () => {
      let states = _getStates()

      ((
        states->Meta3dCommonlib.ImmutableHashMap.get("a1"),
        states->Meta3dCommonlib.ImmutableHashMap.get("a2"),
        states->Meta3dCommonlib.ImmutableHashMap.get("a3"),
      )->expect == (Some(state1.contents), Some(state2.contents), Some(state3.contents)))
      ->resolve
      ->Obj.magic
    })
  })

  test(."test register three plugins case2", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))
    let state3 = ref(Obj.magic(1))
    let sandbox = ref(Obj.magic(1))

    _prepareRegister(given)

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    given("register plugin1, plugin2, plugin3 contribute", () => {
      let (
        (rootJobName, contribute1, s1),
        (job1Name_a2, contribute2, s2),
        (contribute3, s3),
      ) = _prepareForRegisterThreePlugins()
      state1 := s1
      state2 := s2
      state3 := s3

      MainTool.registerWorkPlugin(
        ~contribute=contribute3,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=rootJobName,
            ~insertAction=#before,
            (),
          ),
        ],
        (),
      )
      MainTool.registerWorkPlugin(
        ~contribute=contribute2,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=rootJobName,
            ~insertAction=#after,
            (),
          ),
        ],
        (),
      )
      MainTool.registerWorkPlugin(~contribute=contribute1, ())
    })

    \"and"("init", () => {
      MainTool.init()
    })

    \"when"("run init pipeline", () => {
      let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

      MainTool.runPipeline(data, meta3dState, "init")->Meta3dBsMost.Most.drain->Obj.magic
    })

    then("run init pipeline's all jobs", () => {
      let states = _getStates()

      ((
        states->Meta3dCommonlib.ImmutableHashMap.get("a1"),
        states->Meta3dCommonlib.ImmutableHashMap.get("a2"),
        states->Meta3dCommonlib.ImmutableHashMap.get("a3"),
      )->expect == (Some(state1.contents), Some(state2.contents), Some(state3.contents)))
      ->resolve
      ->Obj.magic
    })
  })

  test(."test register four plugins", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))
    let state3 = ref(Obj.magic(1))
    let state4 = ref(Obj.magic(1))
    let sandbox = ref(Obj.magic(1))
    let stubJob1_3 = ref(Obj.magic(1))
    let stubJob2_4 = ref(Obj.magic(1))
    let sandbox = ref(Obj.magic(1))

    let _createState3 = (~d3=222, ()) => {
      {
        "d3": d3,
      }->Obj.magic
    }

    let _createState4 = (~d4=56, ()) => {
      {
        "d4": d4,
      }->Obj.magic
    }

    _prepareRegister(given)

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    given("register plugin1, plugin2, plugin3, plugin4 contribute", () => {
      let (rootJobName, contribute1, s1) = _prepareData1()
      let (job1Name_a2, contribute2, s2) = _prepareData2()
      stubJob1_3 := createEmptyStubWithJsObjSandbox(sandbox)
      let s3 = _createState3(~d3=2, ())
      let job1 = (
        state,
        {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
      ) => {
        stubJob1_3.contents()

        state
        ->getStatesFunc
        ->Meta3dCommonlib.ImmutableHashMap.set("a3", s3)
        ->setStatesFunc(state, _)
        ->Meta3dBsMost.Most.just
      }
      let contribute3 = _buildWorkPluginContribute(
        ~workPluginName="a3",
        ~createStateFunc=() => _createState3(),
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a3",
                link: #concat,
                elements: [
                  {
                    name: "job1_a3",
                    type_: #job,
                    is_set_state: true->Js.Nullable.return,
                  },
                ],
              },
            ],
            first_group: "first_a3",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | "job1_a3" => job1->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      )
      stubJob2_4 := createEmptyStubWithJsObjSandbox(sandbox)
      let s4 = _createState4(~d4=5, ())
      let job1 = (
        state,
        {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
      ) => {
        state
        ->getStatesFunc
        ->Meta3dCommonlib.ImmutableHashMap.set("a4", s4)
        ->setStatesFunc(state, _)
        ->Meta3dBsMost.Most.just
      }
      let job2 = (
        state,
        {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
      ) => {
        stubJob2_4.contents()

        state->getStatesFunc->setStatesFunc(state, _)->Meta3dBsMost.Most.just
      }
      let data4 = _buildWorkPluginContribute(
        ~workPluginName="a4",
        ~createStateFunc=() => _createState4(),
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a4",
                link: #concat,
                elements: [
                  {
                    name: "group1_a4",
                    type_: #group,
                    is_set_state: false->Js.Nullable.return,
                  },
                  {
                    name: "job1_a4",
                    type_: #job,
                    is_set_state: true->Js.Nullable.return,
                  },
                ],
              },
              {
                name: "group1_a4",
                link: #concat,
                elements: [
                  {
                    name: "job2_a4",
                    type_: #job,
                    is_set_state: true->Js.Nullable.return,
                  },
                ],
              },
            ],
            first_group: "first_a4",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | "job1_a4" => job1->Js.Nullable.return
          | "job2_a4" => job2->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      )

      state1 := s1
      state2 := s2
      state3 := s3
      state4 := s4

      MainTool.registerWorkPlugin(
        ~contribute=contribute3,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=job1Name_a2,
            ~insertAction=#before,
            (),
          ),
        ],
        (),
      )
      MainTool.registerWorkPlugin(~contribute=contribute1, ())
      MainTool.registerWorkPlugin(
        ~contribute=data4,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=job1Name_a2,
            ~insertAction=#before,
            (),
          ),
        ],
        (),
      )
      MainTool.registerWorkPlugin(
        ~contribute=contribute2,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=rootJobName,
            ~insertAction=#after,
            (),
          ),
        ],
        (),
      )
    })

    \"and"("init", () => {
      MainTool.init()
    })

    \"when"("run init pipeline", () => {
      let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

      MainTool.runPipeline(data, meta3dState, "init")->Meta3dBsMost.Most.drain->Obj.magic
    })

    then("run init pipeline's all jobs", () => {
      let states = _getStates()

      ((
        states->Meta3dCommonlib.ImmutableHashMap.get("a1"),
        states->Meta3dCommonlib.ImmutableHashMap.get("a2"),
        states->Meta3dCommonlib.ImmutableHashMap.get("a3"),
        states->Meta3dCommonlib.ImmutableHashMap.get("a4"),
        stubJob1_3.contents->Obj.magic->getCallCount,
        stubJob2_4.contents->Obj.magic->getCallCount,
        stubJob2_4.contents->Obj.magic->calledAfter(stubJob1_3.contents->Obj.magic),
      )->expect ==
        (
          Some(state1.contents),
          Some(state2.contents),
          Some(state3.contents),
          Some(state4.contents),
          1,
          1,
          true,
        ))
      ->resolve
      ->Obj.magic
    })
  })

  test(."test register plugins in initFunc", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))
    let sandbox = ref(Obj.magic(1))

    _prepareRegister(given)

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    given("register plugin1 contribute", () => {
      ()
    })

    \"and"("register plugin2 contribute in plugin1 contribute's initFunc", () => {
      let s2 = _createState2(~d2="c", ())
      let job1 = (
        state,
        {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
      ) => {
        state
        ->getStatesFunc
        ->Meta3dCommonlib.ImmutableHashMap.set("a2", s2)
        ->setStatesFunc(state, _)
        ->Meta3dBsMost.Most.just
      }
      let contribute2 = _buildWorkPluginContribute(
        ~workPluginName="a2",
        ~createStateFunc=() => _createState2(),
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a2",
                link: #concat,
                elements: [
                  {
                    name: "job1_a2",
                    type_: #job,
                    is_set_state: true->Js.Nullable.return,
                  },
                ],
              },
            ],
            first_group: "first_a2",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | "job1_a2" => job1->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      )
      let (rootJobName, contribute1, s1) = _prepareData1(~initFunc=state => {
        let rootJobName = "root_a1"

        MainTool.registerWorkPlugin(
          ~contribute=contribute2,
          ~jobOrders=[
            _buildJobOrder(
              ~pipelineName="init",
              ~insertElementName=rootJobName,
              ~insertAction=#after,
              (),
            ),
          ],
          (),
        )

        ()
      }, ())

      state1 := s1
      state2 := s2

      MainTool.registerWorkPlugin(~contribute=contribute1, ())
    })

    \"and"("init", () => {
      MainTool.init()
    })

    \"when"("run init pipeline", () => {
      let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

      MainTool.runPipeline(data, meta3dState, "init")->Meta3dBsMost.Most.drain->Obj.magic
    })

    then("run init pipeline's all jobs", () => {
      let states = _getStates()

      ((
        states->Meta3dCommonlib.ImmutableHashMap.get("a1"),
        states->Meta3dCommonlib.ImmutableHashMap.get("a2"),
      )->expect == (Some(state1.contents), Some(state2.contents)))
      ->resolve
      ->Obj.magic
    })
  })

  test(."test register one plugin with init, update pipeline jobs", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let state1 = ref(Obj.magic(1))
    let sandbox = ref(Obj.magic(1))
    let stub1 = ref(Obj.magic(1))
    let stub2 = ref(Obj.magic(1))
    let sandbox = ref(Obj.magic(1))

    _prepareRegister(given)

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    given("register plugin contribute with init, update pipeline jobs", () => {
      stub1 := createEmptyStubWithJsObjSandbox(sandbox)
      stub2 := createEmptyStubWithJsObjSandbox(sandbox)
      let rootJob1_init = (
        state,
        {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
      ) => {
        stub1.contents()

        state->Meta3dBsMost.Most.just
      }
      let rootJob1_update = (
        state,
        {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
      ) => {
        stub2.contents()

        state->getStatesFunc->setStatesFunc(state, _)->Meta3dBsMost.Most.just
      }
      let contribute1 = _buildWorkPluginContribute(
        ~workPluginName="a1",
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a1",
                link: #concat,
                elements: [
                  {
                    name: "root_init_a1",
                    type_: #job,
                    is_set_state: true->Js.Nullable.return,
                  },
                ],
              },
            ],
            first_group: "first_a1",
          },
          {
            name: "update",
            groups: [
              {
                name: "first_a1",
                link: #concat,
                elements: [
                  {
                    name: "root_update_a1",
                    type_: #job,
                    is_set_state: true->Js.Nullable.return,
                  },
                ],
              },
            ],
            first_group: "first_a1",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | "root_init_a1" => rootJob1_init->Js.Nullable.return
          | "root_update_a1" => rootJob1_update->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      )

      MainTool.registerWorkPlugin(~contribute=contribute1, ())
    })

    \"and"("init", () => {
      MainTool.init()
    })

    \"when"("run update pipeline", () => {
      let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

      MainTool.runPipeline(data, meta3dState, "update")->Meta3dBsMost.Most.drain->Obj.magic
    })

    then("run update pipeline's all jobs", () => {
      ((stub1.contents->Obj.magic->getCallCount, stub2.contents->Obj.magic->getCallCount)->expect ==
        (0, 1))
      ->resolve
      ->Obj.magic
    })
  })

  test(."test register three plugins with init, update pipeline jobs", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let sandbox = ref(Obj.magic(1))
    let stub1 = ref(Obj.magic(1))
    let stub2 = ref(Obj.magic(1))
    let stub3 = ref(Obj.magic(1))

    _prepareRegister(given)

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    given("register plugin1 contribute with one init pipeline job", () => {
      stub1 := createEmptyStubWithJsObjSandbox(sandbox)
      let rootJob1_init = (
        state,
        {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
      ) => {
        stub1.contents()

        state->getStatesFunc->setStatesFunc(state, _)->Meta3dBsMost.Most.just
      }
      let contribute1 = _buildWorkPluginContribute(
        ~workPluginName="a1",
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a1",
                link: #concat,
                elements: [
                  {
                    name: "root_init_a1",
                    type_: #job,
                    is_set_state: true->Js.Nullable.return,
                  },
                ],
              },
            ],
            first_group: "first_a1",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | "root_init_a1" => rootJob1_init->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      )

      MainTool.registerWorkPlugin(~contribute=contribute1, ())
    })

    given("register plugin2 contribute with one update pipeline job", () => {
      stub2 := createEmptyStubWithJsObjSandbox(sandbox)
      let job1 = (
        state,
        {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
      ) => {
        stub2.contents()

        state->getStatesFunc->setStatesFunc(state, _)->Meta3dBsMost.Most.just
      }
      let contribute2 = _buildWorkPluginContribute(
        ~workPluginName="a2",
        ~allPipelineData=[
          {
            name: "update",
            groups: [
              {
                name: "first_a2",
                link: #concat,
                elements: [
                  {
                    name: "job1_a2",
                    type_: #job,
                    is_set_state: true->Js.Nullable.return,
                  },
                ],
              },
            ],
            first_group: "first_a2",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | "job1_a2" => job1->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      )

      MainTool.registerWorkPlugin(~contribute=contribute2, ())
    })

    given("register plugin3 contribute with one init pipeline job", () => {
      stub3 := createEmptyStubWithJsObjSandbox(sandbox)
      let job2 = (
        state,
        {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
      ) => {
        stub3.contents()

        state->getStatesFunc->setStatesFunc(state, _)->Meta3dBsMost.Most.just
      }
      let contribute3 = _buildWorkPluginContribute(
        ~workPluginName="a3",
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a3",
                link: #concat,
                elements: [
                  {
                    name: "job2_a3",
                    type_: #job,
                    is_set_state: true->Js.Nullable.return,
                  },
                ],
              },
            ],
            first_group: "first_a3",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | "job2_a3" => job2->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      )

      MainTool.registerWorkPlugin(
        ~contribute=contribute3,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName="root_init_a1",
            ~insertAction=#after,
            (),
          ),
        ],
        (),
      )
    })

    \"and"("init", () => {
      MainTool.init()
    })

    \"when"("run init pipeline", () => {
      let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

      MainTool.runPipeline(data, meta3dState, "init")->Meta3dBsMost.Most.drain->Obj.magic
    })

    then("run init pipeline's two jobs", () => {
      ((
        stub1.contents->Obj.magic->getCallCount,
        stub2.contents->Obj.magic->getCallCount,
        stub3.contents->Obj.magic->getCallCount,
      )->expect == (1, 0, 1))
      ->resolve
      ->Obj.magic
    })
  })

  test(."if first_group not in groups, error", ({given, \"when", \"and", then}) => {
    let sandbox = ref(Obj.magic(1))

    _prepareRegister(given)

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    given("register wrong plugin contribute", () => {
      let contribute1 = _buildWorkPluginContribute(
        ~workPluginName="a1",
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a1",
                link: #concat,
                elements: [
                  {
                    name: "root_init_a1",
                    type_: #job,
                    is_set_state: true->Js.Nullable.return,
                  },
                ],
              },
            ],
            first_group: "aaa",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          Js.Nullable.null
        },
        (),
      )

      MainTool.registerWorkPlugin(~contribute=contribute1, ())
    })

    \"and"("init", () => {
      MainTool.init()
    })

    \"when"("run init pipeline", () => {
      ()
    })

    then(%re("/^should error: \"(.*)\"$/")->Obj.magic, arg0 => {
      expect(() => {
        let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

        MainTool.runPipeline(data, meta3dState, "init")->Meta3dBsMost.Most.drain->Obj.magic
      })->toThrowMessage(arg0->Obj.magic)
    })
  })

  test(."if first_group has more than one in groups, error", ({given, \"when", \"and", then}) => {
    let sandbox = ref(Obj.magic(1))

    _prepareRegister(given)

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    given("register wrong plugin contribute", () => {
      let contribute1 = _buildWorkPluginContribute(
        ~workPluginName="a1",
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a1",
                link: #concat,
                elements: [
                  {
                    name: "root_init_a1",
                    type_: #job,
                    is_set_state: true->Js.Nullable.return,
                  },
                ],
              },
              {
                name: "first_a1",
                link: #concat,
                elements: [
                  {
                    name: "root_init_a1",
                    type_: #job,
                    is_set_state: true->Js.Nullable.return,
                  },
                ],
              },
            ],
            first_group: "first_a1",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          Js.Nullable.null
        },
        (),
      )

      MainTool.registerWorkPlugin(~contribute=contribute1, ())
    })

    \"and"("init", () => {
      MainTool.init()
    })

    \"when"("run init pipeline", () => {
      ()
    })

    then(%re("/^should error: \"(.*)\"$/")->Obj.magic, arg0 => {
      expect(() => {
        let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

        MainTool.runPipeline(data, meta3dState, "init")->Meta3dBsMost.Most.drain->Obj.magic
      })->toThrowMessage(arg0->Obj.magic)
    })
  })
})
