module ParsePipelineData = {
  // TODO use Result instead of throw err

  open Meta3dEngineCoreSceneviewProtocol.PipelineType

  // let _getStates = () => {
  //   StateContainer.unsafeGetState().states
  // }

  // let _setStates = (states): unit => {
  //   {
  //     ...StateContainer.unsafeGetState(),
  //     states: states,
  //   }->StateContainer.setState
  // }

  let _findGroup = (groupName, groups) => {
    groups
    ->Meta3dCommonlib.ArraySt.filter(({name}: group) => name === groupName)
    ->Meta3dCommonlib.ArraySt.length > 1
      ? {
          Meta3dCommonlib.Exception.throwErr(
            Meta3dCommonlib.Exception.buildErr(j`groupName:$groupName has more than one in groups`),
          )
        }
      : {
          ()
        }

    switch groups
    ->Meta3dCommonlib.ListSt.fromArray
    ->Meta3dCommonlib.ListSt.getBy(({name}: group) => name === groupName) {
    | None =>
      Meta3dCommonlib.Exception.throwErr(
        Meta3dCommonlib.Exception.buildErr(j`groupName:$groupName not in groups`),
      )
    | Some(group) => group
    }
  }

  // let _getStates = (meta3dState:Meta3dType.Index.state, meta3dEngineCoreExtensionProtocolName, {states}: Meta3dEngineCoreSceneviewProtocol.StateType.state) => states
  let _getStates = (
    api: Meta3dType.Index.api,
    meta3dEngineCoreExtensionProtocolName,
    meta3dState: Meta3dType.Index.state,
  ) => {
    let {states}: Meta3dEngineCoreSceneviewProtocol.StateType.state = api.getExtensionState(.
      meta3dState,
      meta3dEngineCoreExtensionProtocolName,
    )

    states
  }

  // let _setStates = (state, states): Meta3dEngineCoreSceneviewProtocol.StateType.state => {
  //   ...state,
  //   states: states,
  // }

  let _setStates = (
    api: Meta3dType.Index.api,
    meta3dEngineCoreExtensionProtocolName,
    meta3dState: Meta3dType.Index.state,
    states,
  ): Meta3dType.Index.state => {
    api.setExtensionState(.
      meta3dState,
      meta3dEngineCoreExtensionProtocolName,
      {
        ...(
          api.getExtensionState(.
            meta3dState,
            meta3dEngineCoreExtensionProtocolName,
          ): Meta3dEngineCoreSceneviewProtocol.StateType.state
        ),
        states: states,
      },
    )
  }

  let _buildJobStream = (
    {just, flatMap, map}: Meta3dBsMostProtocol.ServiceType.service,
    (
      api: Meta3dType.Index.api,
      unsafeGetMeta3dState,
      setMeta3dState,
      meta3dEngineCoreExtensionProtocolName,
    ),
    is_set_state,
    execFunc,
  ): Meta3dBsMostProtocol.StreamType.stream<unit> => {
    execFunc->just->flatMap(func =>
      func(
        unsafeGetMeta3dState(),
        (
          {
            api: api,
            getStatesFunc: _getStates(api, meta3dEngineCoreExtensionProtocolName),
            setStatesFunc: _setStates(api, meta3dEngineCoreExtensionProtocolName),
            meta3dEngineCoreExtensionProtocolName: meta3dEngineCoreExtensionProtocolName,
          }: Meta3dEngineCoreSceneviewProtocol.StateType.operateStatesFuncs
        ),
      )
    , _)->map(
      meta3dState =>
        is_set_state->Meta3dCommonlib.NullableSt.getWithDefault(true)
          ? setMeta3dState(meta3dState)
          : (),
      _,
    )
  }

  let rec _getExecFunc = (
    getExecFuncs: Meta3dEngineCoreSceneviewProtocol.PipelineManagerType.getExecFuncs,
    pipelineName,
    jobName,
  ): Meta3dEngineCoreSceneviewProtocol.PipelineManagerType.execFunc => {
    getExecFuncs->Meta3dCommonlib.ListSt.length === 0
      ? Meta3dCommonlib.Exception.throwErr(
          Meta3dCommonlib.Exception.buildErr(
            Meta3dCommonlib.Log.buildFatalMessage(
              ~title="_getExecFunc",
              ~description=j`can't get execFunc with pipelineName:${pipelineName}, jobName:${jobName}`,
              ~reason="",
              ~solution=j``,
              ~params=j``,
            ),
          ),
        )
      : {
          let list{headGetElementFunc, ...remainGetElementFuncs} = getExecFuncs

          let result = headGetElementFunc(pipelineName, jobName)

          result->Js.Nullable.isNullable
            ? _getExecFunc(remainGetElementFuncs, pipelineName, jobName)
            : result->Meta3dCommonlib.OptionSt.fromNullable->Meta3dCommonlib.OptionSt.getExn
        }
  }

  let _buildJobStreams = (
    (
      api: Meta3dType.Index.api,
      mostService: Meta3dBsMostProtocol.ServiceType.service,
      unsafeGetMeta3dState,
      setMeta3dState,
      meta3dEngineCoreExtensionProtocolName,
    ) as data,
    (buildPipelineStreamFunc, getExecFuncs),
    (pipelineName, elements),
    groups,
  ) =>
    elements
    ->Meta3dCommonlib.ListSt.fromArray
    ->Meta3dCommonlib.ListSt.reduce(list{}, (streams, {name, type_, is_set_state}: element) =>
      switch type_ {
      | #job =>
        let execFunc = _getExecFunc(getExecFuncs, pipelineName, name)

        streams->Meta3dCommonlib.ListSt.push(
          _buildJobStream(
            mostService,
            (api, unsafeGetMeta3dState, setMeta3dState, meta3dEngineCoreExtensionProtocolName),
            is_set_state,
            execFunc,
          ),
        )
      | #group =>
        // TODO fix: handle is_set_state for group

        let group = _findGroup(name, groups)
        let stream = buildPipelineStreamFunc(data, getExecFuncs, pipelineName, group, groups)
        streams->Meta3dCommonlib.ListSt.push(stream)
      }
    )

  let rec _buildPipelineStream = (
    (_, mostService: Meta3dBsMostProtocol.ServiceType.service, _, _, _) as data,
    getExecFuncs,
    pipelineName,
    {name, link, elements},
    groups,
  ) => {
    let streams = _buildJobStreams(
      data,
      (_buildPipelineStream, getExecFuncs),
      (pipelineName, elements),
      groups,
    )

    streams
    ->Meta3dCommonlib.ListSt.toArray
    ->switch link {
    | #merge => mostService.mergeArray
    | #concat => mostService.concatArray
    }
  }

  let parse = (
    meta3dState: Meta3dType.Index.state,
    (
      _,
      mostService: Meta3dBsMostProtocol.ServiceType.service,
      unsafeGetMeta3dState,
      setMeta3dState,
      _,
    ) as data,
    getExecFuncs,
    {name, groups, first_group},
  ): Meta3dBsMostProtocol.StreamType.stream<Meta3dType.Index.state> => {
    let group = _findGroup(first_group, groups)

    meta3dState->setMeta3dState

    _buildPipelineStream(data, getExecFuncs, name, group, groups)->mostService.map(
      () => unsafeGetMeta3dState(),
      _,
    )
  }
}

let registerPipeline = (
  {allRegisteredPipelineContribute} as state: Meta3dEngineCoreSceneviewProtocol.StateType.state,
  contribute: Meta3dEngineCoreSceneviewProtocol.PipelineManagerType.pipelineContributeForRegister,
  config: Js.Nullable.t<Meta3dEngineCoreSceneviewProtocol.RegisterPipelineType.config>,
  jobOrders: Meta3dEngineCoreSceneviewProtocol.RegisterPipelineType.jobOrders,
): Meta3dEngineCoreSceneviewProtocol.StateType.state => {
  {
    ...state,
    allRegisteredPipelineContribute: allRegisteredPipelineContribute->Meta3dCommonlib.ListSt.push((
      contribute,
      config,
      jobOrders,
    )),
  }
}

let unregisterPipeline = (
  {allRegisteredPipelineContribute} as state: Meta3dEngineCoreSceneviewProtocol.StateType.state,
  targetPipelineName: string,
): Meta3dEngineCoreSceneviewProtocol.StateType.state => {
  ...state,
  allRegisteredPipelineContribute: allRegisteredPipelineContribute->Meta3dCommonlib.ListSt.filter(
    (({pipelineName}, _, _)) => {
      pipelineName !== targetPipelineName
    },
  ),
}

let init = (
  {allRegisteredPipelineContribute} as state: Meta3dEngineCoreSceneviewProtocol.StateType.state,
  meta3dState: Meta3dType.Index.state,
): Meta3dEngineCoreSceneviewProtocol.StateType.state => {
  allRegisteredPipelineContribute->Meta3dCommonlib.ListSt.reduce(
    {
      ...state,
      states: allRegisteredPipelineContribute->Meta3dCommonlib.ListSt.reduce(
        Meta3dCommonlib.ImmutableHashMap.createEmpty(),
        (states, ({pipelineName, initFunc, createStateFunc}, config, _)) => {
          states->Meta3dCommonlib.ImmutableHashMap.set(
            pipelineName,
            createStateFunc(meta3dState, config),
          )
        },
      ),
    },
    ({states} as state, ({pipelineName, initFunc}, _, _)) => {
      state->StateContainer.setState

      initFunc(
        states
        ->Meta3dCommonlib.ImmutableHashMap.get(pipelineName)
        ->Meta3dCommonlib.OptionSt.unsafeGet,
      )

      StateContainer.unsafeGetState()
    },
  )
}

module MergePipelineData = {
  let _findInsertPipelineName = (
    insertElementName,
    allRegisteredPipelineContribute: Meta3dEngineCoreSceneviewProtocol.PipelineManagerType.allRegisteredPipelineContribute,
  ): Meta3dCommonlib.Result.t2<
    Meta3dEngineCoreSceneviewProtocol.PipelineContributeType.pipelineName,
  > => {
    allRegisteredPipelineContribute
    ->Meta3dCommonlib.ListSt.find((({pipelineName, allPipelineData}, _, _)) => {
      let {groups} = allPipelineData[0]

      groups->Meta3dCommonlib.ArraySt.includesByFunc(({elements}) => {
        elements->Meta3dCommonlib.ArraySt.includesByFunc(({name}) => {
          name === insertElementName
        })
      })
    })
    ->Meta3dCommonlib.OptionSt.map((({pipelineName}, _, _)) => pipelineName)
    ->Meta3dCommonlib.OptionSt.get
  }

  let _check = (
    (
      {allPipelineData},
      _,
      jobOrders,
    ) as registeredPipelineContribute: Meta3dEngineCoreSceneviewProtocol.StateType.registeredPipelineContribute,
  ) => {
    allPipelineData->Meta3dCommonlib.ArraySt.length <= 1 &&
      jobOrders->Meta3dCommonlib.ArraySt.length <= 1
      ? registeredPipelineContribute->Meta3dCommonlib.Result.succeed
      : Meta3dCommonlib.Result.failWith(
          Meta3dCommonlib.Log.buildErrorMessage(
            ~title="allPipelineData or jobOrders should has the same pipeline <= 1",
            ~description="",
            ~reason="",
            ~solution="",
            ~params="",
          ),
        )
  }

  let _findAllSpecificPipelineRelatedData = (
    allRegisteredPipelineContribute: Meta3dEngineCoreSceneviewProtocol.PipelineManagerType.allRegisteredPipelineContribute,
    targetPipelineName: Meta3dEngineCoreSceneviewProtocol.PipelineType.pipelineName,
  ): Meta3dCommonlib.Result.t2<
    list<Meta3dEngineCoreSceneviewProtocol.PipelineManagerType.specificPipelineRelatedData>,
  > => {
    allRegisteredPipelineContribute
    ->Meta3dCommonlib.ListSt.traverseResultM(((
      {allPipelineData} as pipelineContribute,
      config,
      jobOrders,
    )) => {
      (
        {
          ...pipelineContribute,
          allPipelineData: allPipelineData->Meta3dCommonlib.ArraySt.filter(({name}) => {
            name === targetPipelineName
          }),
        },
        config,
        jobOrders->Meta3dCommonlib.ArraySt.filter(({pipelineName}) => {
          pipelineName === targetPipelineName
        }),
      )->_check
    })
    ->Meta3dCommonlib.Result.mapSuccess(allRegisteredPipelineContribute => {
      allRegisteredPipelineContribute->Meta3dCommonlib.ListSt.filter(((
        {allPipelineData} as registeredPipelineContribute,
        _,
        _,
      )) => {
        allPipelineData->Meta3dCommonlib.ArraySt.length === 1
      })
    })
    ->Meta3dCommonlib.Result.bind(allRegisteredPipelineContribute => {
      allRegisteredPipelineContribute
      ->Meta3dCommonlib.ListSt.map(((
        {pipelineName, getExecFunc, allPipelineData} as registeredPipelineContribute,
        _,
        jobOrders,
      )) => {
        (
          pipelineName,
          getExecFunc,
          allPipelineData[0],
          jobOrders->Meta3dCommonlib.ArraySt.getFirst,
        )
      })
      ->Meta3dCommonlib.ListSt.traverseResultM(((
        pipelineName,
        getExecFunc,
        pipelineData,
        jobOrderOpt,
      )) => {
        jobOrderOpt
        ->Meta3dCommonlib.OptionSt.map(({insertElementName, insertAction}) => {
          _findInsertPipelineName(
            insertElementName,
            allRegisteredPipelineContribute,
          )->Meta3dCommonlib.Result.mapSuccess((
            insertPipelineName
          ): Meta3dEngineCoreSceneviewProtocol.PipelineManagerType.jobOrder => {
            {
              insertPipelineName: insertPipelineName,
              insertElementName: insertElementName,
              insertAction: insertAction,
            }
          })
        })
        ->Meta3dCommonlib.OptionSt.sequenceResultM
        ->Meta3dCommonlib.Result.mapSuccess((
          jobOrderOpt
        ): Meta3dEngineCoreSceneviewProtocol.PipelineManagerType.specificPipelineRelatedData => {
          {
            pipelineName: pipelineName,
            getExecFunc: getExecFunc,
            pipelineData: pipelineData,
            jobOrder: jobOrderOpt,
          }
        })
      })
    })
  }

  let _handleInsertedAsRootNode = (
    treeDataList,
    (pipelineName, getExecFunc, pipelineData, nodeJobOrderOpt, nodeInsertPipelineNameOpt),
  ) => {
    treeDataList->Meta3dCommonlib.ListSt.reduce((list{}, None), (
      (newTreeDataList, insertedTreeOpt),
      (sameLevelTreeList, insertPipelineNameOpt) as treeData,
    ) => {
      switch insertPipelineNameOpt {
      | Some(insertPipelineName) if insertPipelineName === pipelineName =>
        let insertedTree = TreeNode.buildNode(
          pipelineName,
          (getExecFunc, pipelineData, nodeJobOrderOpt),
          sameLevelTreeList,
        )

        (
          newTreeDataList->Meta3dCommonlib.ListSt.addInReduce((
            list{insertedTree},
            nodeInsertPipelineNameOpt,
          )),
          Some(insertedTree),
        )
      | _ => (newTreeDataList->Meta3dCommonlib.ListSt.addInReduce(treeData), insertedTreeOpt)
      }
    })
  }

  let _isInserted = Meta3dCommonlib.OptionSt.isSome

  let _add = (
    treeDataList: Meta3dEngineCoreSceneviewProtocol.PipelineManagerType.treeDataList,
    node,
    insertPipelineNameOpt,
  ): Meta3dEngineCoreSceneviewProtocol.PipelineManagerType.treeDataList => {
    list{(list{node}, insertPipelineNameOpt), ...treeDataList}
  }

  let _insertToAsChildNodeOrSameLevelTree = (
    treeDataList: Meta3dEngineCoreSceneviewProtocol.PipelineManagerType.treeDataList,
    nodeInsertPipelineName,
    node: Meta3dEngineCoreSceneviewProtocol.TreeType.tree,
  ): (Meta3dEngineCoreSceneviewProtocol.PipelineManagerType.treeDataList, bool) => {
    treeDataList->Meta3dCommonlib.ListSt.reduce((list{}, false), (
      (newTreeDataList, isInsertTo),
      (sameLevelTreeList, insertPipelineNameOpt),
    ) => {
      let (newTreeDataList, isInsertTo_) = switch insertPipelineNameOpt {
      | Some(insertPipelineName) if insertPipelineName === nodeInsertPipelineName => (
          newTreeDataList->Meta3dCommonlib.ListSt.addInReduce((
            sameLevelTreeList->Meta3dCommonlib.ListSt.push(node),
            insertPipelineNameOpt,
          )),
          true,
        )
      | _ =>
        let (sameLevelTreeList, isInsertTo) = sameLevelTreeList->Meta3dCommonlib.ListSt.reduce(
          (list{}, false),
          ((sameLevelTreeList, isInsertTo), tree) => {
            let (tree, isInsertTo_) = tree->OperateTree.insertNode(nodeInsertPipelineName, node)

            (
              sameLevelTreeList->Meta3dCommonlib.ListSt.addInReduce(tree),
              isInsertTo ? isInsertTo : isInsertTo_,
            )
          },
        )

        (
          newTreeDataList->Meta3dCommonlib.ListSt.addInReduce((
            sameLevelTreeList,
            insertPipelineNameOpt,
          )),
          isInsertTo,
        )
      }

      (newTreeDataList, isInsertTo ? isInsertTo : isInsertTo_)
    })
  }

  let _removeInsertedTree = (
    treeDataList: Meta3dEngineCoreSceneviewProtocol.PipelineManagerType.treeDataList,
    insertedTree,
  ): Meta3dEngineCoreSceneviewProtocol.PipelineManagerType.treeDataList => {
    treeDataList
    ->Meta3dCommonlib.ListSt.map(((sameLevelTreeList, insertPipelineNameOpt)) => {
      (
        sameLevelTreeList->Meta3dCommonlib.ListSt.filter(sameLevelTree =>
          !TreeNode.isEqual(sameLevelTree, insertedTree)
        ),
        insertPipelineNameOpt,
      )
    })
    ->Meta3dCommonlib.ListSt.filter(((sameLevelTreeList, insertPipelineNameOpt)) => {
      sameLevelTreeList->Meta3dCommonlib.ListSt.length > 0
    })
  }

  let _getTree = treeDataList => {
    treeDataList->Meta3dCommonlib.ListSt.length !== 1
      ? {
          Meta3dCommonlib.Result.failWith(
            Meta3dCommonlib.Log.buildErrorMessage(
              ~title="treeDataList.length should be 1",
              ~description="",
              ~reason={
                ""
              },
              ~solution="",
              ~params="",
            ),
          )
        }
      : {
          treeDataList
          ->Meta3dCommonlib.ListSt.head
          ->Meta3dCommonlib.OptionSt.get
          ->Meta3dCommonlib.Result.bind(((sameLevelTreeList, _)) => {
            sameLevelTreeList->Meta3dCommonlib.ListSt.length !== 1
              ? {
                  Meta3dCommonlib.Result.failWith(
                    Meta3dCommonlib.Log.buildErrorMessage(
                      ~title="sameLevelTreeList.length should be 1",
                      ~description="",
                      ~reason={
                        ""
                      },
                      ~solution="",
                      ~params="",
                    ),
                  )
                }
              : {
                  sameLevelTreeList->Meta3dCommonlib.ListSt.head->Meta3dCommonlib.OptionSt.get
                }
          })
        }
  }

  let _buildTree = (
    allSpecificPipelineRelatedData: list<
      Meta3dEngineCoreSceneviewProtocol.PipelineManagerType.specificPipelineRelatedData,
    >,
  ): Meta3dCommonlib.Result.t2<Meta3dEngineCoreSceneviewProtocol.TreeType.tree> => {
    allSpecificPipelineRelatedData
    ->Meta3dCommonlib.ListSt.reduce(list{}, (
      treeDataList,
      {pipelineName, getExecFunc, pipelineData, jobOrder},
    ) => {
      switch jobOrder {
      | None =>
        let (treeDataList, insertedTreeOpt) =
          treeDataList->_handleInsertedAsRootNode((
            pipelineName,
            getExecFunc,
            pipelineData,
            None,
            None,
          ))

        _isInserted(insertedTreeOpt)
          ? treeDataList
          : treeDataList->_add(
              TreeNode.buildNode(pipelineName, (getExecFunc, pipelineData, None), list{}),
              None,
            )
      | Some({insertPipelineName, insertElementName, insertAction}) =>
        let nodeJobOrderOpt = (
          {
            insertElementName: insertElementName,
            insertAction: insertAction,
          }: Meta3dEngineCoreSceneviewProtocol.TreeType.jobOrder
        )->Some

        let (treeDataList, insertedTreeOpt) =
          treeDataList->_handleInsertedAsRootNode((
            pipelineName,
            getExecFunc,
            pipelineData,
            nodeJobOrderOpt,
            insertPipelineName->Some,
          ))

        switch insertedTreeOpt {
        | Some(insertedTree) =>
          let (treeDataList, isInsertTo) =
            treeDataList->_insertToAsChildNodeOrSameLevelTree(insertPipelineName, insertedTree)

          isInsertTo ? treeDataList->_removeInsertedTree(insertedTree) : treeDataList
        | None =>
          let node = TreeNode.buildNode(
            pipelineName,
            (getExecFunc, pipelineData, nodeJobOrderOpt),
            list{},
          )

          let (treeDataList, isInsertTo) =
            treeDataList->_insertToAsChildNodeOrSameLevelTree(insertPipelineName, node)

          isInsertTo ? treeDataList : treeDataList->_add(node, Some(insertPipelineName))
        }
      }
    })
    ->_getTree
  }

  let _buildFirstGroupElement = (
    groups: Meta3dEngineCoreSceneviewProtocol.PipelineType.groups,
    first_group,
  ): Meta3dCommonlib.Result.t2<Meta3dEngineCoreSceneviewProtocol.PipelineType.element> => {
    groups
    ->Meta3dCommonlib.ArraySt.find(({name}) => {
      name === first_group
    })
    ->Meta3dCommonlib.OptionSt.map(({name}): Meta3dEngineCoreSceneviewProtocol.PipelineType.element => {
      name: name,
      type_: #group,
      is_set_state: false->Js.Nullable.return,
    })
    ->Meta3dCommonlib.OptionSt.get
  }

  let _insertElement = (
    groups: Meta3dEngineCoreSceneviewProtocol.PipelineType.groups,
    insertAction,
    insertElementName,
    insertElement: Meta3dEngineCoreSceneviewProtocol.PipelineType.element,
  ) => {
    groups->Meta3dCommonlib.ArraySt.map(({name, elements} as group) => {
      {
        ...group,
        elements: elements->Meta3dCommonlib.ArraySt.reduceOneParam(
          (. result, {name} as element) => {
            name === insertElementName
              ? {
                  switch insertAction {
                  | Meta3dEngineCoreSceneviewProtocol.RegisterPipelineType.Before =>
                    result
                    ->Meta3dCommonlib.ArraySt.push(insertElement)
                    ->Meta3dCommonlib.ArraySt.push(element)
                  | Meta3dEngineCoreSceneviewProtocol.RegisterPipelineType.After =>
                    result
                    ->Meta3dCommonlib.ArraySt.push(element)
                    ->Meta3dCommonlib.ArraySt.push(insertElement)
                  }
                }
              : result->Meta3dCommonlib.ArraySt.push(element)
          },
          [],
        ),
      }
    })
  }

  let _mergeGroups = (
    groups: Meta3dEngineCoreSceneviewProtocol.PipelineType.groups,
    insertGroups: Meta3dEngineCoreSceneviewProtocol.PipelineType.groups,
  ): Meta3dEngineCoreSceneviewProtocol.PipelineType.groups => {
    Js.Array.concat(groups, insertGroups)
  }

  let _mergeGetElementFuncs = (
    getExecFuncs: Meta3dEngineCoreSceneviewProtocol.PipelineManagerType.getExecFuncs,
    insertGetElementFuncs,
  ) => {
    Meta3dCommonlib.ListSt.concat(getExecFuncs, insertGetElementFuncs)
  }

  let _mergeToRootNode = (tree: Meta3dEngineCoreSceneviewProtocol.TreeType.tree): Meta3dCommonlib.Result.t2<(
    list<Meta3dEngineCoreSceneviewProtocol.StateType.getExecFunc>,
    Meta3dEngineCoreSceneviewProtocol.PipelineType.pipelineData,
  )> => {
    IterateTree.postOrderCataWithParentNode(
      ~tree,
      ~nodeFunc=(
        parentNodeOpt,
        pipelineName,
        {getExecFuncs, pipelineData, jobOrder} as nodeData,
        children,
      ) => {
        let node = TreeNode.buildNodeByNodeData(pipelineName, nodeData, children)

        switch parentNodeOpt {
        | None => node->Meta3dCommonlib.Result.succeed
        | Some(parentNode) =>
          let parentNodeData = TreeNode.getNodeData(parentNode)

          jobOrder
          ->Meta3dCommonlib.OptionSt.get
          ->Meta3dCommonlib.Result.bind(({insertElementName, insertAction}) => {
            _buildFirstGroupElement(
              pipelineData.groups,
              pipelineData.first_group,
            )->Meta3dCommonlib.Result.mapSuccess(insertElement => {
              parentNodeData.pipelineData = {
                ...parentNodeData.pipelineData,
                groups: parentNodeData.pipelineData.groups
                ->_insertElement(insertAction, insertElementName, insertElement)
                ->_mergeGroups(pipelineData.groups),
              }
              parentNodeData.getExecFuncs = _mergeGetElementFuncs(
                parentNodeData.getExecFuncs,
                getExecFuncs,
              )

              node
            })
          })
        }
      },
      (),
    )->Meta3dCommonlib.Result.mapSuccess(tree => {
      let {getExecFuncs, pipelineData} = TreeNode.getNodeData(tree)

      (getExecFuncs, pipelineData)
    })
  }

  let merge = (
    allRegisteredPipelineContribute: Meta3dEngineCoreSceneviewProtocol.PipelineManagerType.allRegisteredPipelineContribute,
    pipelineName: Meta3dEngineCoreSceneviewProtocol.PipelineType.pipelineName,
  ): Meta3dCommonlib.Result.t2<(
    list<Meta3dEngineCoreSceneviewProtocol.StateType.getExecFunc>,
    Meta3dEngineCoreSceneviewProtocol.PipelineType.pipelineData,
  )> => {
    allRegisteredPipelineContribute
    ->_findAllSpecificPipelineRelatedData(pipelineName)
    ->Meta3dCommonlib.Result.bind(_buildTree)
    ->Meta3dCommonlib.Result.bind(_mergeToRootNode)
  }
}

let runPipeline = (
  meta3dState: Meta3dType.Index.state,
  (
    api: Meta3dType.Index.api,
    mostService: Meta3dBsMostProtocol.ServiceType.service,
    unsafeGetMeta3dState,
    setMeta3dState,
    meta3dEngineCoreExtensionProtocolName,
  ) as data,
  pipelineName: Meta3dEngineCoreSceneviewProtocol.PipelineType.pipelineName,
): Meta3dCommonlib.Result.t2<Meta3dBsMostProtocol.StreamType.stream<Meta3dType.Index.state>> => {
  // TODO check is allRegisteredPipelineContribute duplicate

  let {
    allRegisteredPipelineContribute,
  }: Meta3dEngineCoreSceneviewProtocol.StateType.state = api.getExtensionState(.
    meta3dState,
    meta3dEngineCoreExtensionProtocolName,
  )

  allRegisteredPipelineContribute
  ->MergePipelineData.merge(pipelineName)
  ->Meta3dCommonlib.Result.mapSuccess(((getExecFuncs, pipelineData)) => {
    ParsePipelineData.parse(meta3dState, data, getExecFuncs, pipelineData)
  })
}
