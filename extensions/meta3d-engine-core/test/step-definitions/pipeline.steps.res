open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Promise

let feature = loadFeature("./test/features/pipeline.feature")

defineFeature(feature, test => {
  let contribute1 = ref(Obj.magic(1))
  let contribute2 = ref(Obj.magic(1))
  let contribute3 = ref(Obj.magic(1))
  let sandbox = ref(Obj.magic(1))
  let meta3dState: ref<Meta3dType.Index.state> = ref(Obj.magic(1))

  let _prepareRegister = given => {
    given("prepare register", () => {
      CreateState.createState()->StateContainer.setState
    })
  }

  let _prepareSandbox = given => {
    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })
  }

  let _buildPipelineContribute = (
    ~pipelineName="pipelineA",
    ~createStateFunc=(_, _) => Obj.magic(1),
    ~initFunc=state => (),
    ~getExecFunc=(_, _) => Js.Nullable.null,
    ~allPipelineData=[],
    (),
  ): Meta3dEngineCoreProtocol.PipelineManagerType.pipelineContributeForRegister => {
    pipelineName,
    createStateFunc,
    initFunc,
    getExecFunc,
    allPipelineData,
  }

  let _buildJobOrder = (
    ~insertElementName,
    ~pipelineName="pipeline",
    ~insertAction=#after,
    (),
  ): Meta3dEngineCoreProtocol.RegisterPipelineVOType.jobOrder => {
    pipelineName,
    insertElementName,
    insertAction,
  }

  let _convertAllRegisteredPipelineData = (
    allRegisteredPipelineContribute: Meta3dEngineCoreProtocol.PipelineManagerType.allRegisteredPipelineContribute,
  ) => {
    allRegisteredPipelineContribute->Meta3dCommonlib.ListSt.map(((
      pipelineContribute,
      _,
      jobOrders,
    )) => {
      (pipelineContribute, jobOrders->VOTool.convertJobOrdersDOToVO)
    })
  }

  let _getAllPipelineContributes = () => {
    StateContainer.unsafeGetState().allRegisteredPipelineContribute->_convertAllRegisteredPipelineData
  }

  // let MainTool.getStates = () => {
  //   StateContainer.unsafeGetState().states
  // }

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

    \"when"(
      "open debug",
      () => {
        MainTool.setIsDebug(true)
      },
    )

    then(
      "get is debug should return true",
      () => {
        MainTool.getIsDebug()->expect == true
      },
    )
  })

  test(."register one pipeline", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    \"when"(
      "register pipeline contribute",
      () => {
        contribute1 := _buildPipelineContribute()

        MainTool.registerPipeline(~contribute=contribute1.contents, ())
      },
    )

    then(
      "should add pipeline contribute",
      () => {
        _getAllPipelineContributes()->expect == list{(contribute1.contents, [])}
      },
    )
  })

  test(."register two pipelines with jobOrders", ({given, \"when", \"and", then}) => {
    let jobOrders2 = ref(Obj.magic(1))

    _prepareRegister(given)

    \"when"(
      "register pipeline1 contribute",
      () => {
        contribute1 := _buildPipelineContribute(~pipelineName="a1", ())

        MainTool.registerPipeline(~contribute=contribute1.contents, ())
      },
    )

    \"and"(
      "register pipeline2 contribute with jobOrders2",
      () => {
        jobOrders2 := [_buildJobOrder(~insertElementName="", ())]
        contribute2 := _buildPipelineContribute(~pipelineName="a2", ())

        MainTool.registerPipeline(
          ~contribute=contribute2.contents,
          ~jobOrders=jobOrders2.contents,
          (),
        )
      },
    )

    then(
      "should add pipeline1 and pipeline2 contribute",
      () => {
        _getAllPipelineContributes()->expect ==
          list{(contribute1.contents, []), (contribute2.contents, jobOrders2.contents)}
      },
    )
  })

  test(."register one pipeline and unregister it", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    \"when"(
      "register pipeline contribute",
      () => {
        contribute1 := _buildPipelineContribute(~pipelineName="a", ())

        MainTool.registerPipeline(~contribute=contribute1.contents, ())
      },
    )

    \"and"(
      "unregister it",
      () => {
        MainTool.unregisterPipeline("a")
      },
    )

    then(
      "should not has pipeline contribute",
      () => {
        _getAllPipelineContributes()->expect == list{}
      },
    )
  })

  test(."register two pipelines and unregister the first one", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    \"when"(
      "register pipeline1 contribute",
      () => {
        contribute1 := _buildPipelineContribute(~pipelineName="a1", ())

        MainTool.registerPipeline(~contribute=contribute1.contents, ())
      },
    )

    \"and"(
      "register pipeline2 contribute",
      () => {
        contribute2 := _buildPipelineContribute(~pipelineName="a2", ())

        MainTool.registerPipeline(~contribute=contribute2.contents, ())
      },
    )

    \"and"(
      "unregister pipeline1 contribute",
      () => {
        MainTool.unregisterPipeline("a1")
      },
    )

    then(
      "should only has pipeline2 contribute",
      () => {
        _getAllPipelineContributes()->expect == list{(contribute2.contents, [])}
      },
    )
  })

  test(."init pipelines", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))
    let stub1 = ref(Obj.magic(1))
    let stub2 = ref(Obj.magic(1))
    let config1 = ref(Obj.magic(1))
    let config2 = ref(Obj.magic(1))

    _prepareRegister(given)

    _prepareSandbox(given)

    \"when"(
      "register pipeline1 contribute with config1",
      () => {
        stub1 := createEmptyStubWithJsObjSandbox(sandbox)
        state1 := _createState1()
        config1 :=
          {
            "a": 1,
          }->Obj.magic
        contribute1 :=
          _buildPipelineContribute(
            ~pipelineName="a1",
            ~createStateFunc=(_, config1) =>
              (state1.contents["d1"] + (config1->Meta3dCommonlib.NullableSt.getExn->Obj.magic)["a"])
                ->Obj.magic,
            ~initFunc=state1 => {
              stub1.contents(state1)
            },
            (),
          )

        MainTool.registerPipeline(
          ~contribute=contribute1.contents,
          ~config=config1.contents->Js.Nullable.return,
          (),
        )
      },
    )

    \"and"(
      "register pipeline2 contribute with config2",
      () => {
        stub2 := createEmptyStubWithJsObjSandbox(sandbox)
        state2 := _createState2()
        config2 :=
          {
            "a": 2,
          }->Obj.magic
        contribute2 :=
          _buildPipelineContribute(
            ~pipelineName="a2",
            ~createStateFunc=(_, config2) =>
              (state2.contents["dd2"] +
              (config2->Meta3dCommonlib.NullableSt.getExn->Obj.magic)["a"])->Obj.magic,
            ~initFunc=state2 => {
              stub2.contents()
            },
            (),
          )

        MainTool.registerPipeline(
          ~contribute=contribute2.contents,
          ~config=config2.contents->Js.Nullable.return,
          (),
        )
      },
    )

    \"when"(
      "init",
      () => {
        MainTool.init(meta3dState.contents)
      },
    )

    then(
      "invoke pipeline1's createStateFunc with config1 and pipeline2's createStateFunc with config2 and store result",
      () => {
        let states = MainTool.getStates()
        (
          states->Meta3dCommonlib.ImmutableHashMap.get("a1"),
          states->Meta3dCommonlib.ImmutableHashMap.get("a2"),
        )->expect == (Some(1), Some(3))
      },
    )

    \"and"(
      "invoke pipeline1's and pipeline2's initFunc",
      () => {
        (
          stub1.contents->Obj.magic->getCallCount,
          stub1.contents->Obj.magic->SinonTool.calledWith(1),
          stub2.contents->Obj.magic->getCallCount,
        )->expect == (1, true, 1)
      },
    )
  })

  let _prepareData1 = (
    ~changedState1=_createState1(~d1=10, ()),
    ~rootJob=(
      meta3dState,
      {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
    ) => {
      meta3dState
      ->getStatesFunc
      ->Meta3dCommonlib.ImmutableHashMap.set("a1", changedState1)
      ->setStatesFunc(meta3dState, _)
      ->Meta3dBsMost.Most.just
    },
    ~state1=_createState1(),
    ~initFunc=state => (),
    (),
  ) => {
    let rootJobName = "root_a1"

    (
      rootJobName,
      _buildPipelineContribute(
        ~pipelineName="a1",
        ~createStateFunc=(_, _) => state1,
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

  test(."test register one pipeline", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let api = ref(Obj.magic(1))

    _prepareRegister(given)

    _prepareSandbox(given)

    given(
      "register pipeline contribute",
      () => {
        let (_, contribute1, s1) = _prepareData1()

        state1 := s1

        MainTool.registerPipeline(~contribute=contribute1, ())
      },
    )

    \"and"(
      "init",
      () => {
        MainTool.init(meta3dState.contents)
      },
    )

    CucumberAsync.execStep(
      \"when",
      "run init pipeline",
      () => {
        let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

        MainTool.runPipeline(~sandbox, ~data, ~meta3dState, ~pipelineName="init", ())
        ->Meta3dBsMost.Most.drain
        ->Obj.magic
      },
    )

    then(
      "run init pipeline's all jobs",
      () => {
        (MainTool.getStates()->Meta3dCommonlib.ImmutableHashMap.get("a1")->expect ==
          Some(state1.contents))
        ->resolve
        ->Obj.magic
      },
    )
  })

  let _prepareData2 = () => {
    let job1Name_a2 = "job1_a2"
    let state2 = _createState2()
    let job1 = (
      meta3dState,
      {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
    ) => {
      meta3dState
      ->getStatesFunc
      ->Meta3dCommonlib.ImmutableHashMap.set("a2", _createState2(~d2="c", ~dd2=100, ()))
      ->setStatesFunc(meta3dState, _)
      ->Meta3dBsMost.Most.just
    }
    let job2 = (
      meta3dState,
      {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
    ) => {
      let states = meta3dState->getStatesFunc

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
      ->setStatesFunc(meta3dState, _)
      ->Meta3dBsMost.Most.just
    }
    let contribute2 = _buildPipelineContribute(
      ~pipelineName="a2",
      ~createStateFunc=(_, _) => state2,
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

  test(."test register two pipelines that pipeline has one job", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))

    _prepareRegister(given)

    _prepareSandbox(given)

    given(
      "register pipeline1 contribute",
      () => {
        let (rootJobName, contribute1, s1) = _prepareData1()
        state1 := s1

        MainTool.registerPipeline(~contribute=contribute1, ())
      },
    )

    \"and"(
      "register pipeline2 contribute",
      () => {
        let (rootJobName, _, _) = _prepareData1()
        let s2 = _createState2()
        let changedState2 = _createState2(~d2="c", ())
        state2 := changedState2
        let job1 = (
          meta3dState,
          {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
        ) => {
          meta3dState
          ->getStatesFunc
          ->Meta3dCommonlib.ImmutableHashMap.set("a2", changedState2)
          ->setStatesFunc(meta3dState, _)
          ->Meta3dBsMost.Most.just
        }
        let contribute2 = _buildPipelineContribute(
          ~pipelineName="a2",
          ~createStateFunc=(_, _) => s2,
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

        MainTool.registerPipeline(
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
      },
    )

    \"and"(
      "init",
      () => {
        MainTool.init(meta3dState.contents)
      },
    )

    CucumberAsync.execStep(
      \"when",
      "run init pipeline",
      () => {
        let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

        MainTool.runPipeline(~sandbox, ~data, ~meta3dState, ~pipelineName="init", ())
        ->Meta3dBsMost.Most.drain
        ->Obj.magic
      },
    )

    then(
      "run init pipeline's all jobs",
      () => {
        let states = MainTool.getStates()

        ((
          states->Meta3dCommonlib.ImmutableHashMap.get("a1"),
          states->Meta3dCommonlib.ImmutableHashMap.get("a2"),
        )->expect == (Some(state1.contents), Some(state2.contents)))
        ->resolve
        ->Obj.magic
      },
    )
  })

  test(."test register two pipelines that pipeline has two jobs", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))
    let meta3dState: ref<Meta3dType.Index.state> = ref(Obj.magic(1))

    _prepareRegister(given)

    _prepareSandbox(given)

    given(
      "register pipeline1 contribute",
      () => {
        let (_, contribute1, s1) = _prepareData1()
        state1 := s1

        MainTool.registerPipeline(~contribute=contribute1, ())
      },
    )

    \"and"(
      "register pipeline2 contribute",
      () => {
        let (rootJobName, _, _) = _prepareData1()
        let (job1Name_a2, contribute2, s2) = _prepareData2()
        state2 := s2

        MainTool.registerPipeline(
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
      },
    )

    \"and"(
      "init",
      () => {
        MainTool.init(meta3dState.contents)
      },
    )

    CucumberAsync.execStep(
      \"when",
      "run init pipeline",
      () => {
        let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

        MainTool.runPipeline(~sandbox, ~data, ~meta3dState, ~pipelineName="init", ())
        ->Meta3dBsMost.Most.drain
        ->Obj.magic
      },
    )

    then(
      "run init pipeline's all jobs",
      () => {
        let states = MainTool.getStates()

        ((
          states->Meta3dCommonlib.ImmutableHashMap.get("a1"),
          states->Meta3dCommonlib.ImmutableHashMap.get("a2"),
        )->expect == (Some(state1.contents), Some(state2.contents)))
        ->resolve
        ->Obj.magic
      },
    )
  })

  let _createState3 = (~d3=222, ()) => {
    {
      "d3": d3,
    }->Obj.magic
  }

  let _prepareForRegisterThreePipelines = () => {
    let (rootJobName, contribute1, changedState1) = _prepareData1()
    let (job1Name_a2, contribute2, changedState2) = _prepareData2()
    let state3 = _createState3()
    let changedState3 = _createState3(~d3=2, ())
    let job1 = (
      meta3dState,
      {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
    ) => {
      meta3dState
      ->getStatesFunc
      ->Meta3dCommonlib.ImmutableHashMap.set("a3", changedState3)
      ->setStatesFunc(meta3dState, _)
      ->Meta3dBsMost.Most.just
    }
    let contribute3 = _buildPipelineContribute(
      ~pipelineName="a3",
      ~createStateFunc=(_, _) => state3,
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

  test(."test register three pipelines case1", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))
    let state3 = ref(Obj.magic(1))

    _prepareRegister(given)

    _prepareSandbox(given)

    given(
      "register pipeline1, pipeline2, pipeline3 contribute",
      () => {
        let (
          (rootJobName, contribute1, s1),
          (job1Name_a2, contribute2, s2),
          (contribute3, s3),
        ) = _prepareForRegisterThreePipelines()
        state1 := s1
        state2 := s2
        state3 := s3

        MainTool.registerPipeline(
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
        MainTool.registerPipeline(~contribute=contribute1, ())
        MainTool.registerPipeline(
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
      },
    )

    \"and"(
      "init",
      () => {
        MainTool.init(meta3dState.contents)
      },
    )

    CucumberAsync.execStep(
      \"when",
      "run init pipeline",
      () => {
        let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

        MainTool.runPipeline(~sandbox, ~data, ~meta3dState, ~pipelineName="init", ())
        ->Meta3dBsMost.Most.drain
        ->Obj.magic
      },
    )

    then(
      "run init pipeline's all jobs",
      () => {
        let states = MainTool.getStates()

        ((
          states->Meta3dCommonlib.ImmutableHashMap.get("a1"),
          states->Meta3dCommonlib.ImmutableHashMap.get("a2"),
          states->Meta3dCommonlib.ImmutableHashMap.get("a3"),
        )->expect == (Some(state1.contents), Some(state2.contents), Some(state3.contents)))
        ->resolve
        ->Obj.magic
      },
    )
  })

  test(."test register three pipelines case2", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))
    let state3 = ref(Obj.magic(1))

    _prepareRegister(given)

    _prepareSandbox(given)

    given(
      "register pipeline1, pipeline2, pipeline3 contribute",
      () => {
        let (
          (rootJobName, contribute1, s1),
          (job1Name_a2, contribute2, s2),
          (contribute3, s3),
        ) = _prepareForRegisterThreePipelines()
        state1 := s1
        state2 := s2
        state3 := s3

        MainTool.registerPipeline(
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
        MainTool.registerPipeline(
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
        MainTool.registerPipeline(~contribute=contribute1, ())
      },
    )

    \"and"(
      "init",
      () => {
        MainTool.init(meta3dState.contents)
      },
    )

    CucumberAsync.execStep(
      \"when",
      "run init pipeline",
      () => {
        let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

        MainTool.runPipeline(~sandbox, ~data, ~meta3dState, ~pipelineName="init", ())
        ->Meta3dBsMost.Most.drain
        ->Obj.magic
      },
    )

    then(
      "run init pipeline's all jobs",
      () => {
        let states = MainTool.getStates()

        ((
          states->Meta3dCommonlib.ImmutableHashMap.get("a1"),
          states->Meta3dCommonlib.ImmutableHashMap.get("a2"),
          states->Meta3dCommonlib.ImmutableHashMap.get("a3"),
        )->expect == (Some(state1.contents), Some(state2.contents), Some(state3.contents)))
        ->resolve
        ->Obj.magic
      },
    )
  })

  test(."test register four pipelines case1", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))
    let state3 = ref(Obj.magic(1))
    let state4 = ref(Obj.magic(1))
    let stubJob1_3 = ref(Obj.magic(1))
    let stubJob2_4 = ref(Obj.magic(1))

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

    _prepareSandbox(given)

    given(
      "register pipeline1, pipeline2, pipeline3, pipeline4 contribute",
      () => {
        let (rootJobName, contribute1, s1) = _prepareData1()
        let (job1Name_a2, contribute2, s2) = _prepareData2()
        stubJob1_3 := createEmptyStubWithJsObjSandbox(sandbox)
        let s3 = _createState3(~d3=2, ())
        let job1 = (
          meta3dState,
          {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
        ) => {
          stubJob1_3.contents()

          meta3dState
          ->getStatesFunc
          ->Meta3dCommonlib.ImmutableHashMap.set("a3", s3)
          ->setStatesFunc(meta3dState, _)
          ->Meta3dBsMost.Most.just
        }
        let contribute3 = _buildPipelineContribute(
          ~pipelineName="a3",
          ~createStateFunc=(_, _) => _createState3(),
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
          meta3dState,
          {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
        ) => {
          meta3dState
          ->getStatesFunc
          ->Meta3dCommonlib.ImmutableHashMap.set("a4", s4)
          ->setStatesFunc(meta3dState, _)
          ->Meta3dBsMost.Most.just
        }
        let job2 = (
          meta3dState,
          {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
        ) => {
          stubJob2_4.contents()

          meta3dState->getStatesFunc->setStatesFunc(meta3dState, _)->Meta3dBsMost.Most.just
        }
        let data4 = _buildPipelineContribute(
          ~pipelineName="a4",
          ~createStateFunc=(_, _) => _createState4(),
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

        MainTool.registerPipeline(
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
        MainTool.registerPipeline(~contribute=contribute1, ())
        MainTool.registerPipeline(
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
        MainTool.registerPipeline(
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
      },
    )

    \"and"(
      "init",
      () => {
        MainTool.init(meta3dState.contents)
      },
    )

    CucumberAsync.execStep(
      \"when",
      "run init pipeline",
      () => {
        let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

        MainTool.runPipeline(~sandbox, ~data, ~meta3dState, ~pipelineName="init", ())
        ->Meta3dBsMost.Most.drain
        ->Obj.magic
      },
    )

    then(
      "run init pipeline's all jobs",
      () => {
        let states = MainTool.getStates()

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
      },
    )
  })

  test(."test register pipelines in initFunc", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))

    _prepareRegister(given)

    _prepareSandbox(given)

    given(
      "register pipeline1 contribute",
      () => {
        ()
      },
    )

    \"and"(
      "register pipeline2 contribute in pipeline1 contribute's initFunc",
      () => {
        let s2 = _createState2(~d2="c", ())
        let job1 = (
          meta3dState,
          {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
        ) => {
          meta3dState
          ->getStatesFunc
          ->Meta3dCommonlib.ImmutableHashMap.set("a2", s2)
          ->setStatesFunc(meta3dState, _)
          ->Meta3dBsMost.Most.just
        }
        let contribute2 = _buildPipelineContribute(
          ~pipelineName="a2",
          ~createStateFunc=(_, _) => _createState2(),
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
        let (rootJobName, contribute1, s1) = _prepareData1(
          ~initFunc=state => {
            let rootJobName = "root_a1"

            MainTool.registerPipeline(
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
          },
          (),
        )

        state1 := s1
        state2 := s2

        MainTool.registerPipeline(~contribute=contribute1, ())
      },
    )

    \"and"(
      "init",
      () => {
        MainTool.init(meta3dState.contents)
      },
    )

    CucumberAsync.execStep(
      \"when",
      "run init pipeline",
      () => {
        let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

        MainTool.runPipeline(~sandbox, ~data, ~meta3dState, ~pipelineName="init", ())
        ->Meta3dBsMost.Most.drain
        ->Obj.magic
      },
    )

    then(
      "run init pipeline's all jobs",
      () => {
        let states = MainTool.getStates()

        ((
          states->Meta3dCommonlib.ImmutableHashMap.get("a1"),
          states->Meta3dCommonlib.ImmutableHashMap.get("a2"),
        )->expect == (Some(state1.contents), Some(state2.contents)))
        ->resolve
        ->Obj.magic
      },
    )
  })

  test(."test register one pipeline with init, update pipeline jobs", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let state1 = ref(Obj.magic(1))
    let stub1 = ref(Obj.magic(1))
    let stub2 = ref(Obj.magic(1))

    _prepareRegister(given)

    _prepareSandbox(given)

    given(
      "register pipeline contribute with init, update pipeline jobs",
      () => {
        stub1 := createEmptyStubWithJsObjSandbox(sandbox)
        stub2 := createEmptyStubWithJsObjSandbox(sandbox)
        let rootJob1_init = (
          meta3dState,
          {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
        ) => {
          stub1.contents()

          meta3dState->Meta3dBsMost.Most.just
        }
        let rootJob1_update = (
          meta3dState,
          {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
        ) => {
          stub2.contents()

          meta3dState->getStatesFunc->setStatesFunc(meta3dState, _)->Meta3dBsMost.Most.just
        }
        let contribute1 = _buildPipelineContribute(
          ~pipelineName="a1",
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

        MainTool.registerPipeline(~contribute=contribute1, ())
      },
    )

    \"and"(
      "init",
      () => {
        MainTool.init(meta3dState.contents)
      },
    )

    CucumberAsync.execStep(
      \"when",
      "run update pipeline",
      () => {
        let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

        MainTool.runPipeline(~sandbox, ~data, ~meta3dState, ~pipelineName="update", ())
        ->Meta3dBsMost.Most.drain
        ->Obj.magic
      },
    )

    then(
      "run update pipeline's all jobs",
      () => {
        ((
          stub1.contents->Obj.magic->getCallCount,
          stub2.contents->Obj.magic->getCallCount,
        )->expect == (0, 1))
        ->resolve
        ->Obj.magic
      },
    )
  })

  test(."test register three pipelines with init, update pipeline jobs", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let stub1 = ref(Obj.magic(1))
    let stub2 = ref(Obj.magic(1))
    let stub3 = ref(Obj.magic(1))

    _prepareRegister(given)

    _prepareSandbox(given)

    given(
      "register pipeline1 contribute with one init pipeline job",
      () => {
        stub1 := createEmptyStubWithJsObjSandbox(sandbox)
        let rootJob1_init = (
          meta3dState,
          {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
        ) => {
          stub1.contents()

          meta3dState->getStatesFunc->setStatesFunc(meta3dState, _)->Meta3dBsMost.Most.just
        }
        let contribute1 = _buildPipelineContribute(
          ~pipelineName="a1",
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

        MainTool.registerPipeline(~contribute=contribute1, ())
      },
    )

    given(
      "register pipeline2 contribute with one update pipeline job",
      () => {
        stub2 := createEmptyStubWithJsObjSandbox(sandbox)
        let job1 = (
          meta3dState,
          {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
        ) => {
          stub2.contents()

          meta3dState->getStatesFunc->setStatesFunc(meta3dState, _)->Meta3dBsMost.Most.just
        }
        let contribute2 = _buildPipelineContribute(
          ~pipelineName="a2",
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

        MainTool.registerPipeline(~contribute=contribute2, ())
      },
    )

    given(
      "register pipeline3 contribute with one init pipeline job",
      () => {
        stub3 := createEmptyStubWithJsObjSandbox(sandbox)
        let job2 = (
          meta3dState,
          {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
        ) => {
          stub3.contents()

          meta3dState->getStatesFunc->setStatesFunc(meta3dState, _)->Meta3dBsMost.Most.just
        }
        let contribute3 = _buildPipelineContribute(
          ~pipelineName="a3",
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

        MainTool.registerPipeline(
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
      },
    )

    \"and"(
      "init",
      () => {
        MainTool.init(meta3dState.contents)
      },
    )

    CucumberAsync.execStep(
      \"when",
      "run init pipeline",
      () => {
        let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

        MainTool.runPipeline(~sandbox, ~data, ~meta3dState, ~pipelineName="init", ())
        ->Meta3dBsMost.Most.drain
        ->Obj.magic
      },
    )

    then(
      "run init pipeline's two jobs",
      () => {
        ((
          stub1.contents->Obj.magic->getCallCount,
          stub2.contents->Obj.magic->getCallCount,
          stub3.contents->Obj.magic->getCallCount,
        )->expect == (1, 0, 1))
        ->resolve
        ->Obj.magic
      },
    )
  })

  test(."if first_group not in groups, error", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    _prepareSandbox(given)

    given(
      "register wrong pipeline contribute",
      () => {
        let contribute1 = _buildPipelineContribute(
          ~pipelineName="a1",
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

        MainTool.registerPipeline(~contribute=contribute1, ())
      },
    )

    \"and"(
      "init",
      () => {
        MainTool.init(meta3dState.contents)
      },
    )

    \"when"(
      "run init pipeline",
      () => {
        ()
      },
    )

    then(
      %re("/^should error: \"(.*)\"$/")->Obj.magic,
      arg0 => {
        expect(
          () => {
            let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

            MainTool.runPipeline(~sandbox, ~data, ~meta3dState, ~pipelineName="init", ())
            ->Meta3dBsMost.Most.drain
            ->Obj.magic
          },
        )->toThrowMessage(arg0->Obj.magic)
      },
    )
  })

  test(."if first_group has more than one in groups, error", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    _prepareSandbox(given)

    given(
      "register wrong pipeline contribute",
      () => {
        let contribute1 = _buildPipelineContribute(
          ~pipelineName="a1",
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

        MainTool.registerPipeline(~contribute=contribute1, ())
      },
    )

    \"and"(
      "init",
      () => {
        MainTool.init(meta3dState.contents)
      },
    )

    \"when"(
      "run init pipeline",
      () => {
        ()
      },
    )

    then(
      %re("/^should error: \"(.*)\"$/")->Obj.magic,
      arg0 => {
        expect(
          () => {
            let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

            MainTool.runPipeline(~sandbox, ~data, ~meta3dState, ~pipelineName="init", ())
            ->Meta3dBsMost.Most.drain
            ->Obj.magic
          },
        )->toThrowMessage(arg0->Obj.magic)
      },
    )
  })

  test(."test not set job's state", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))
    let setMeta3dStateStub = ref(Obj.magic(1))

    _prepareRegister(given)

    _prepareSandbox(given)

    given(
      "register pipeline contribute with init jobs use merge and not set the second merge job's state",
      () => {
        let s1 = _createState1(~d1=1, ())
        let s2 = _createState1(~d1=2, ())
        let rootJob1_init = (
          meta3dState,
          {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
        ) => {
          meta3dState
          ->getStatesFunc
          ->Meta3dCommonlib.ImmutableHashMap.set("a", s1)
          ->setStatesFunc(meta3dState, _)
          ->Meta3dBsMost.Most.just
        }
        let rootJob2_init = (
          meta3dState,
          {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
        ) => {
          meta3dState
          ->getStatesFunc
          ->Meta3dCommonlib.ImmutableHashMap.set("a", s2)
          ->setStatesFunc(meta3dState, _)
          ->Meta3dBsMost.Most.just
        }
        let contribute1 = _buildPipelineContribute(
          ~allPipelineData=[
            {
              name: "init",
              groups: [
                {
                  name: "first_a1",
                  link: #merge,
                  elements: [
                    {
                      name: "root_init_a1",
                      type_: #job,
                      is_set_state: true->Js.Nullable.return,
                    },
                    {
                      name: "root_init_a2",
                      type_: #job,
                      is_set_state: false->Js.Nullable.return,
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
            | "root_init_a2" => rootJob2_init->Js.Nullable.return
            | _ => Js.Nullable.null
            }
          },
          (),
        )

        state1 := s1
        state2 := s2

        MainTool.registerPipeline(~contribute=contribute1, ())
      },
    )

    \"and"(
      "init",
      () => {
        MainTool.init(meta3dState.contents)
      },
    )

    CucumberAsync.execStep(
      \"when",
      "run init pipeline",
      () => {
        setMeta3dStateStub := createEmptyStubWithJsObjSandbox(sandbox)

        let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

        MainTool.runPipeline(
          ~sandbox,
          ~data,
          ~meta3dState,
          ~pipelineName="init",
          ~setMeta3dState=setMeta3dStateStub.contents,
          (),
        )
        ->Meta3dBsMost.Most.drain
        ->Obj.magic
      },
    )

    then(
      "should only set the first merge job's state",
      () => {
        setMeta3dStateStub.contents->Obj.magic->getCallCount->expect == 2
      },
    )
  })

  test(."test register four pipelines case2", ({given, \"when", \"and", then}) => {
    let stub1 = ref(Obj.magic(1))
    let stub2 = ref(Obj.magic(1))
    let stub3 = ref(Obj.magic(1))
    let stub4 = ref(Obj.magic(1))
    let stub5 = ref(Obj.magic(1))

    _prepareRegister(given)

    _prepareSandbox(given)

    given(
      "register pipeline1, pipeline2, pipeline3, pipeline4 contribute",
      () => {
        stub1 := createEmptyStubWithJsObjSandbox(sandbox)
        stub2 := createEmptyStubWithJsObjSandbox(sandbox)
        stub3 := createEmptyStubWithJsObjSandbox(sandbox)
        stub4 := createEmptyStubWithJsObjSandbox(sandbox)
        stub5 := createEmptyStubWithJsObjSandbox(sandbox)

        let rootJob_init = (
          meta3dState,
          {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
        ) => {
          stub1.contents()

          meta3dState->Meta3dBsMost.Most.just
        }
        let contribute1 = _buildPipelineContribute(
          ~pipelineName="a1",
          ~allPipelineData=[
            {
              name: "init",
              groups: [
                {
                  name: "first_a1",
                  link: #concat,
                  elements: [
                    {
                      name: "root_init",
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
            | "root_init" => rootJob_init->Js.Nullable.return
            | _ => Js.Nullable.null
            }
          },
          (),
        )

        let createGLJob = (
          meta3dState,
          {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
        ) => {
          stub2.contents()

          meta3dState->Meta3dBsMost.Most.just
        }
        let contribute2 = _buildPipelineContribute(
          ~pipelineName="a2",
          ~allPipelineData=[
            {
              name: "init",
              groups: [
                {
                  name: "first_a2",
                  link: #concat,
                  elements: [
                    {
                      name: "create_gl",
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
            | "create_gl" => createGLJob->Js.Nullable.return
            | _ => Js.Nullable.null
            }
          },
          (),
        )

        let detectGLJob = (
          meta3dState,
          {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
        ) => {
          stub3.contents()

          meta3dState->Meta3dBsMost.Most.just
        }
        let contribute3 = _buildPipelineContribute(
          ~pipelineName="a3",
          ~allPipelineData=[
            {
              name: "init",
              groups: [
                {
                  name: "first_a3",
                  link: #concat,
                  elements: [
                    {
                      name: "detect_gl",
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
            | "detect_gl" => detectGLJob->Js.Nullable.return
            | _ => Js.Nullable.null
            }
          },
          (),
        )

        let webglWorkerJob1 = (
          meta3dState,
          {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
        ) => {
          stub4.contents()

          meta3dState->Meta3dBsMost.Most.just
        }
        let webglWorkerJob2 = (
          meta3dState,
          {getStatesFunc, setStatesFunc}: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs,
        ) => {
          stub5.contents()

          meta3dState->Meta3dBsMost.Most.just
        }
        let contribute4 = _buildPipelineContribute(
          ~pipelineName="a4",
          ~allPipelineData=[
            {
              name: "init",
              groups: [
                {
                  name: "first_a4",
                  link: #concat,
                  elements: [
                    {
                      name: "webgl_job1",
                      type_: #job,
                      is_set_state: true->Js.Nullable.return,
                    },
                    {
                      name: "webgl_job2",
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
            | "webgl_job1" => webglWorkerJob1->Js.Nullable.return
            | "webgl_job2" => webglWorkerJob2->Js.Nullable.return
            | _ => Js.Nullable.null
            }
          },
          (),
        )

        MainTool.registerPipeline(~contribute=contribute1, ())
        MainTool.registerPipeline(
          ~contribute=contribute2,
          ~jobOrders=[
            _buildJobOrder(
              ~pipelineName="init",
              ~insertElementName="webgl_job1",
              ~insertAction=#after,
              (),
            ),
          ],
          (),
        )
        MainTool.registerPipeline(
          ~contribute=contribute3,
          ~jobOrders=[
            _buildJobOrder(
              ~pipelineName="init",
              ~insertElementName="create_gl",
              ~insertAction=#after,
              (),
            ),
          ],
          (),
        )
        MainTool.registerPipeline(
          ~contribute=contribute4,
          ~jobOrders=[
            _buildJobOrder(
              ~pipelineName="init",
              ~insertElementName="root_init",
              ~insertAction=#after,
              (),
            ),
          ],
          (),
        )
      },
    )

    \"and"(
      "init",
      () => {
        MainTool.init(meta3dState.contents)
      },
    )

    CucumberAsync.execStep(
      \"when",
      "run init pipeline",
      () => {
        let (data, meta3dState) = RunPipelineTool.buildFakeDataAndMeta3DState(sandbox)

        MainTool.runPipeline(~sandbox, ~data, ~meta3dState, ~pipelineName="init", ())
        ->Meta3dBsMost.Most.drain
        ->Obj.magic
      },
    )

    then(
      "run init pipeline's all jobs",
      () => {
        ((
          stub1.contents->Obj.magic->getCallCount,
          stub2.contents->Obj.magic->getCallCount,
          stub3.contents->Obj.magic->getCallCount,
          stub4.contents->Obj.magic->getCallCount,
          stub5.contents->Obj.magic->getCallCount,
          stub4.contents->Obj.magic->calledAfter(stub1.contents->Obj.magic),
          stub5.contents->Obj.magic->calledAfter(stub2.contents->Obj.magic),
          stub2.contents->Obj.magic->calledAfter(stub4.contents->Obj.magic),
          stub3.contents->Obj.magic->calledAfter(stub2.contents->Obj.magic),
        )->expect == (1, 1, 1, 1, 1, true, true, true, true))
        ->resolve
        ->Obj.magic
      },
    )
  })
})
