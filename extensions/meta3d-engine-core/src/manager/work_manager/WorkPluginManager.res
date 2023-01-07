module ParsePipelineData = {
  // TODO use Result instead of throw err

  open Meta3dEngineCoreProtocol.PipelineType

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

  let _getStates = ({states}: Meta3dEngineCoreProtocol.StateType.state) => states

  let _setStates = (state, states): Meta3dEngineCoreProtocol.StateType.state => {
    ...state,
    states: states,
  }

  let _buildJobStream = (
    {just, flatMap, map}: Meta3dBsMostProtocol.ServiceType.service,
    is_set_state,
    execFunc,
  ): Meta3dBsMostProtocol.StreamType.stream<unit> => {
    execFunc->just->flatMap(func =>
      func(
        StateContainer.unsafeGetState(),
        (
          {
            getStatesFunc: _getStates,
            setStatesFunc: _setStates,
          }: Meta3dEngineCoreProtocol.StateType.operateStatesFuncs
        ),
      )
    , _)->map(
      state =>
        is_set_state->Meta3dCommonlib.NullableSt.getWithDefault(true)
          ? StateContainer.setState(state)
          : (),
      _,
    )
  }

  let rec _getExecFunc = (
    getExecFuncs: Meta3dEngineCoreProtocol.WorkPluginManagerType.getExecFuncs,
    pipelineName,
    jobName,
  ): Meta3dEngineCoreProtocol.WorkPluginManagerType.execFunc => {
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
    mostService: Meta3dBsMostProtocol.ServiceType.service,
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

        streams->Meta3dCommonlib.ListSt.push(_buildJobStream(mostService, is_set_state, execFunc))
      | #group =>
        let group = _findGroup(name, groups)
        let stream = buildPipelineStreamFunc(mostService, getExecFuncs, pipelineName, group, groups)
        streams->Meta3dCommonlib.ListSt.push(stream)
      }
    )

  let rec _buildPipelineStream = (
    mostService: Meta3dBsMostProtocol.ServiceType.service,
    getExecFuncs,
    pipelineName,
    {name, link, elements},
    groups,
  ) => {
    let streams = _buildJobStreams(
      mostService,
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
    state,
    mostService: Meta3dBsMostProtocol.ServiceType.service,
    getExecFuncs,
    {name, groups, first_group},
  ): Meta3dBsMostProtocol.StreamType.stream<Meta3dEngineCoreProtocol.StateType.state> => {
    let group = _findGroup(first_group, groups)

    state->StateContainer.setState

    _buildPipelineStream(mostService, getExecFuncs, name, group, groups)->mostService.map(
      () => StateContainer.unsafeGetState(),
      _,
    )
  }
}

let registerPlugin = (
  {allRegisteredWorkPluginContribute} as state: Meta3dEngineCoreProtocol.StateType.state,
  contribute: Meta3dEngineCoreProtocol.WorkPluginManagerType.workPluginContributeForRegister,
  config: Js.Nullable.t<Meta3dEngineCoreProtocol.RegisterWorkPluginType.config>,
  jobOrders: Meta3dEngineCoreProtocol.RegisterWorkPluginType.jobOrders,
): Meta3dEngineCoreProtocol.StateType.state => {
  {
    ...state,
    allRegisteredWorkPluginContribute: allRegisteredWorkPluginContribute->Meta3dCommonlib.ListSt.push((
      contribute,
      config,
      jobOrders,
    )),
  }
}

let unregisterPlugin = (
  {allRegisteredWorkPluginContribute} as state: Meta3dEngineCoreProtocol.StateType.state,
  targetPluginName: string,
): Meta3dEngineCoreProtocol.StateType.state => {
  ...state,
  allRegisteredWorkPluginContribute: allRegisteredWorkPluginContribute->Meta3dCommonlib.ListSt.filter(
    (({workPluginName}, _, _)) => {
      workPluginName !== targetPluginName
    },
  ),
}

let init = (
  {allRegisteredWorkPluginContribute} as state: Meta3dEngineCoreProtocol.StateType.state,
  meta3dState: Meta3dType.Index.state,
): Meta3dEngineCoreProtocol.StateType.state => {
  allRegisteredWorkPluginContribute->Meta3dCommonlib.ListSt.reduce(
    {
      ...state,
      states: allRegisteredWorkPluginContribute->Meta3dCommonlib.ListSt.reduce(
        Meta3dCommonlib.ImmutableHashMap.createEmpty(),
        (states, ({workPluginName, initFunc, createStateFunc}, config, _)) => {
          states->Meta3dCommonlib.ImmutableHashMap.set(
            workPluginName,
            createStateFunc(meta3dState, config),
          )
        },
      ),
    },
    ({states} as state, ({workPluginName, initFunc}, _, _)) => {
      state->StateContainer.setState

      initFunc(
        states
        ->Meta3dCommonlib.ImmutableHashMap.get(workPluginName)
        ->Meta3dCommonlib.OptionSt.unsafeGet,
      )

      StateContainer.unsafeGetState()
    },
  )
}

module MergePipelineData = {
  let _findInsertPluginName = (
    insertElementName,
    allRegisteredWorkPluginContribute: Meta3dEngineCoreProtocol.WorkPluginManagerType.allRegisteredWorkPluginContribute,
  ): Meta3dCommonlib.Result.t2<
    Meta3dEngineCoreProtocol.WorkPluginContributeType.workPluginName,
  > => {
    allRegisteredWorkPluginContribute
    ->Meta3dCommonlib.ListSt.find((({workPluginName, allPipelineData}, _, _)) => {
      let {groups} = allPipelineData[0]

      groups->Meta3dCommonlib.ArraySt.includesByFunc(({elements}) => {
        elements->Meta3dCommonlib.ArraySt.includesByFunc(({name}) => {
          name === insertElementName
        })
      })
    })
    ->Meta3dCommonlib.OptionSt.map((({workPluginName}, _, _)) => workPluginName)
    ->Meta3dCommonlib.OptionSt.get
  }

  let _check = (
    (
      {allPipelineData},
      _,
      jobOrders,
    ) as registeredWorkPluginContribute: Meta3dEngineCoreProtocol.StateType.registeredWorkPluginContribute,
  ) => {
    allPipelineData->Meta3dCommonlib.ArraySt.length <= 1 &&
      jobOrders->Meta3dCommonlib.ArraySt.length <= 1
      ? registeredWorkPluginContribute->Meta3dCommonlib.Result.succeed
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
    allRegisteredWorkPluginContribute: Meta3dEngineCoreProtocol.WorkPluginManagerType.allRegisteredWorkPluginContribute,
    targetPipelineName: Meta3dEngineCoreProtocol.PipelineType.pipelineName,
  ): Meta3dCommonlib.Result.t2<
    list<Meta3dEngineCoreProtocol.WorkPluginManagerType.specificPipelineRelatedData>,
  > => {
    allRegisteredWorkPluginContribute
    ->Meta3dCommonlib.ListSt.traverseResultM(((
      {allPipelineData} as workPluginContribute,
      config,
      jobOrders,
    )) => {
      (
        {
          ...workPluginContribute,
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
    ->Meta3dCommonlib.Result.mapSuccess(allRegisteredWorkPluginContribute => {
      allRegisteredWorkPluginContribute->Meta3dCommonlib.ListSt.filter(((
        {allPipelineData} as registeredWorkPluginContribute,
        _,
        _,
      )) => {
        allPipelineData->Meta3dCommonlib.ArraySt.length === 1
      })
    })
    ->Meta3dCommonlib.Result.bind(allRegisteredWorkPluginContribute => {
      allRegisteredWorkPluginContribute
      ->Meta3dCommonlib.ListSt.map(((
        {workPluginName, getExecFunc, allPipelineData} as registeredWorkPluginContribute,
        _,
        jobOrders,
      )) => {
        (
          workPluginName,
          getExecFunc,
          allPipelineData[0],
          jobOrders->Meta3dCommonlib.ArraySt.getFirst,
        )
      })
      ->Meta3dCommonlib.ListSt.traverseResultM(((
        workPluginName,
        getExecFunc,
        pipelineData,
        jobOrderOpt,
      )) => {
        jobOrderOpt
        ->Meta3dCommonlib.OptionSt.map(({insertElementName, insertAction}) => {
          _findInsertPluginName(
            insertElementName,
            allRegisteredWorkPluginContribute,
          )->Meta3dCommonlib.Result.mapSuccess((
            insertPluginName
          ): Meta3dEngineCoreProtocol.WorkPluginManagerType.jobOrder => {
            {
              insertPluginName: insertPluginName,
              insertElementName: insertElementName,
              insertAction: insertAction,
            }
          })
        })
        ->Meta3dCommonlib.OptionSt.sequenceResultM
        ->Meta3dCommonlib.Result.mapSuccess((
          jobOrderOpt
        ): Meta3dEngineCoreProtocol.WorkPluginManagerType.specificPipelineRelatedData => {
          {
            workPluginName: workPluginName,
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
    (workPluginName, getExecFunc, pipelineData, nodeJobOrderOpt, nodeInsertPluginNameOpt),
  ) => {
    treeDataList->Meta3dCommonlib.ListSt.reduce((list{}, None), (
      (newTreeDataList, insertedTreeOpt),
      (sameLevelTreeList, insertPluginNameOpt) as treeData,
    ) => {
      switch insertPluginNameOpt {
      | Some(insertPluginName) if insertPluginName === workPluginName =>
        let insertedTree = TreeNode.buildNode(
          workPluginName,
          (getExecFunc, pipelineData, nodeJobOrderOpt),
          sameLevelTreeList,
        )

        (
          newTreeDataList->Meta3dCommonlib.ListSt.addInReduce((
            list{insertedTree},
            nodeInsertPluginNameOpt,
          )),
          Some(insertedTree),
        )
      | _ => (newTreeDataList->Meta3dCommonlib.ListSt.addInReduce(treeData), insertedTreeOpt)
      }
    })
  }

  let _isInserted = Meta3dCommonlib.OptionSt.isSome

  let _add = (
    treeDataList: Meta3dEngineCoreProtocol.WorkPluginManagerType.treeDataList,
    node,
    insertPluginNameOpt,
  ): Meta3dEngineCoreProtocol.WorkPluginManagerType.treeDataList => {
    list{(list{node}, insertPluginNameOpt), ...treeDataList}
  }

  let _insertToAsChildNodeOrSameLevelTree = (
    treeDataList: Meta3dEngineCoreProtocol.WorkPluginManagerType.treeDataList,
    nodeInsertPluginName,
    node: Meta3dEngineCoreProtocol.TreeType.tree,
  ): (Meta3dEngineCoreProtocol.WorkPluginManagerType.treeDataList, bool) => {
    treeDataList->Meta3dCommonlib.ListSt.reduce((list{}, false), (
      (newTreeDataList, isInsertTo),
      (sameLevelTreeList, insertPluginNameOpt),
    ) => {
      let (newTreeDataList, isInsertTo_) = switch insertPluginNameOpt {
      | Some(insertPluginName) if insertPluginName === nodeInsertPluginName => (
          newTreeDataList->Meta3dCommonlib.ListSt.addInReduce((
            sameLevelTreeList->Meta3dCommonlib.ListSt.push(node),
            insertPluginNameOpt,
          )),
          true,
        )
      | _ =>
        let (sameLevelTreeList, isInsertTo) = sameLevelTreeList->Meta3dCommonlib.ListSt.reduce(
          (list{}, false),
          ((sameLevelTreeList, isInsertTo), tree) => {
            let (tree, isInsertTo_) = tree->OperateTree.insertNode(nodeInsertPluginName, node)

            (
              sameLevelTreeList->Meta3dCommonlib.ListSt.addInReduce(tree),
              isInsertTo ? isInsertTo : isInsertTo_,
            )
          },
        )

        (
          newTreeDataList->Meta3dCommonlib.ListSt.addInReduce((
            sameLevelTreeList,
            insertPluginNameOpt,
          )),
          isInsertTo,
        )
      }

      (newTreeDataList, isInsertTo ? isInsertTo : isInsertTo_)
    })
  }

  let _removeInsertedTree = (
    treeDataList: Meta3dEngineCoreProtocol.WorkPluginManagerType.treeDataList,
    insertedTree,
  ): Meta3dEngineCoreProtocol.WorkPluginManagerType.treeDataList => {
    treeDataList
    ->Meta3dCommonlib.ListSt.map(((sameLevelTreeList, insertPluginNameOpt)) => {
      (
        sameLevelTreeList->Meta3dCommonlib.ListSt.filter(sameLevelTree =>
          !TreeNode.isEqual(sameLevelTree, insertedTree)
        ),
        insertPluginNameOpt,
      )
    })
    ->Meta3dCommonlib.ListSt.filter(((sameLevelTreeList, insertPluginNameOpt)) => {
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
      Meta3dEngineCoreProtocol.WorkPluginManagerType.specificPipelineRelatedData,
    >,
  ): Meta3dCommonlib.Result.t2<Meta3dEngineCoreProtocol.TreeType.tree> => {
    allSpecificPipelineRelatedData
    ->Meta3dCommonlib.ListSt.reduce(list{}, (
      treeDataList,
      {workPluginName, getExecFunc, pipelineData, jobOrder},
    ) => {
      switch jobOrder {
      | None =>
        let (treeDataList, insertedTreeOpt) =
          treeDataList->_handleInsertedAsRootNode((
            workPluginName,
            getExecFunc,
            pipelineData,
            None,
            None,
          ))

        _isInserted(insertedTreeOpt)
          ? treeDataList
          : treeDataList->_add(
              TreeNode.buildNode(workPluginName, (getExecFunc, pipelineData, None), list{}),
              None,
            )
      | Some({insertPluginName, insertElementName, insertAction}) =>
        let nodeJobOrderOpt = (
          {
            insertElementName: insertElementName,
            insertAction: insertAction,
          }: Meta3dEngineCoreProtocol.TreeType.jobOrder
        )->Some

        let (treeDataList, insertedTreeOpt) =
          treeDataList->_handleInsertedAsRootNode((
            workPluginName,
            getExecFunc,
            pipelineData,
            nodeJobOrderOpt,
            insertPluginName->Some,
          ))

        switch insertedTreeOpt {
        | Some(insertedTree) =>
          let (treeDataList, isInsertTo) =
            treeDataList->_insertToAsChildNodeOrSameLevelTree(insertPluginName, insertedTree)

          isInsertTo ? treeDataList->_removeInsertedTree(insertedTree) : treeDataList
        | None =>
          let node = TreeNode.buildNode(
            workPluginName,
            (getExecFunc, pipelineData, nodeJobOrderOpt),
            list{},
          )

          let (treeDataList, isInsertTo) =
            treeDataList->_insertToAsChildNodeOrSameLevelTree(insertPluginName, node)

          isInsertTo ? treeDataList : treeDataList->_add(node, Some(insertPluginName))
        }
      }
    })
    ->_getTree
  }

  let _buildFirstGroupElement = (
    groups: Meta3dEngineCoreProtocol.PipelineType.groups,
    first_group,
  ): Meta3dCommonlib.Result.t2<Meta3dEngineCoreProtocol.PipelineType.element> => {
    groups
    ->Meta3dCommonlib.ArraySt.find(({name}) => {
      name === first_group
    })
    ->Meta3dCommonlib.OptionSt.map(({name}): Meta3dEngineCoreProtocol.PipelineType.element => {
      name: name,
      type_: #group,
      is_set_state: false->Js.Nullable.return,
    })
    ->Meta3dCommonlib.OptionSt.get
  }

  let _insertElement = (
    groups: Meta3dEngineCoreProtocol.PipelineType.groups,
    insertAction,
    insertElementName,
    insertElement: Meta3dEngineCoreProtocol.PipelineType.element,
  ) => {
    groups->Meta3dCommonlib.ArraySt.map(({name, elements} as group) => {
      {
        ...group,
        elements: elements->Meta3dCommonlib.ArraySt.reduceOneParam(
          (. result, {name} as element) => {
            name === insertElementName
              ? {
                  switch insertAction {
                  | Meta3dEngineCoreProtocol.RegisterWorkPluginType.Before =>
                    result
                    ->Meta3dCommonlib.ArraySt.push(insertElement)
                    ->Meta3dCommonlib.ArraySt.push(element)
                  | Meta3dEngineCoreProtocol.RegisterWorkPluginType.After =>
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
    groups: Meta3dEngineCoreProtocol.PipelineType.groups,
    insertGroups: Meta3dEngineCoreProtocol.PipelineType.groups,
  ): Meta3dEngineCoreProtocol.PipelineType.groups => {
    Js.Array.concat(groups, insertGroups)
  }

  let _mergeGetElementFuncs = (
    getExecFuncs: Meta3dEngineCoreProtocol.WorkPluginManagerType.getExecFuncs,
    insertGetElementFuncs,
  ) => {
    Meta3dCommonlib.ListSt.concat(getExecFuncs, insertGetElementFuncs)
  }

  let _mergeToRootNode = (tree: Meta3dEngineCoreProtocol.TreeType.tree): Meta3dCommonlib.Result.t2<(
    list<Meta3dEngineCoreProtocol.StateType.getExecFunc>,
    Meta3dEngineCoreProtocol.PipelineType.pipelineData,
  )> => {
    IterateTree.postOrderCataWithParentNode(
      ~tree,
      ~nodeFunc=(
        parentNodeOpt,
        workPluginName,
        {getExecFuncs, pipelineData, jobOrder} as nodeData,
        children,
      ) => {
        let node = TreeNode.buildNodeByNodeData(workPluginName, nodeData, children)

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
    allRegisteredWorkPluginContribute: Meta3dEngineCoreProtocol.WorkPluginManagerType.allRegisteredWorkPluginContribute,
    pipelineName: Meta3dEngineCoreProtocol.PipelineType.pipelineName,
  ): Meta3dCommonlib.Result.t2<(
    list<Meta3dEngineCoreProtocol.StateType.getExecFunc>,
    Meta3dEngineCoreProtocol.PipelineType.pipelineData,
  )> => {
    allRegisteredWorkPluginContribute
    ->_findAllSpecificPipelineRelatedData(pipelineName)
    ->Meta3dCommonlib.Result.bind(_buildTree)
    ->Meta3dCommonlib.Result.bind(_mergeToRootNode)
  }
}

let runPipeline = (
  {allRegisteredWorkPluginContribute, states} as state: Meta3dEngineCoreProtocol.StateType.state,
  mostService: Meta3dBsMostProtocol.ServiceType.service,
  pipelineName: Meta3dEngineCoreProtocol.PipelineType.pipelineName,
): Meta3dCommonlib.Result.t2<
  Meta3dBsMostProtocol.StreamType.stream<Meta3dEngineCoreProtocol.StateType.state>,
> => {
  // TODO check is allRegisteredWorkPluginContribute duplicate

  allRegisteredWorkPluginContribute
  ->MergePipelineData.merge(pipelineName)
  ->Meta3dCommonlib.Result.mapSuccess(((getExecFuncs, pipelineData)) => {
    ParsePipelineData.parse(state, mostService, getExecFuncs, pipelineData)
  })
}
