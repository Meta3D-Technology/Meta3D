module ParsePipelineData = {
  // TODO use Result instead of throw err

  open Meta3dEngineCoreType.PipelineType

  let _getStates = () => {
    POContainer.unsafeGetPO().states
  }

  let _setStates = (states): unit => {
    {
      ...POContainer.unsafeGetPO(),
      states: states,
    }->POContainer.setPO
  }

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

  let _buildJobStream = (
    {just, flatMap, map}: Meta3dBsMostType.ServiceType.service,
    execFunc,
  ): Meta3dBsMostType.ServiceType.stream<unit> => {
    execFunc->just->flatMap(func => func(_getStates()), _)->map(_setStates, _)
  }

  let rec _getExecFunc = (
    getExecFuncs: WorkManagerType.getExecFuncs,
    pipelineName,
    jobName,
  ): WorkManagerType.execFunc => {
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
          let list{headGetExecFunc, ...remainGetExecFuncs} = getExecFuncs

          let result = headGetExecFunc(pipelineName, jobName)

          result->Js.Nullable.isNullable
            ? _getExecFunc(remainGetExecFuncs, pipelineName, jobName)
            : result->Meta3dCommonlib.OptionSt.fromNullable->Meta3dCommonlib.OptionSt.getExn
        }
  }

  let _buildJobStreams = (
    mostService: Meta3dBsMostType.ServiceType.service,
    (buildPipelineStreamFunc, getExecFuncs),
    (pipelineName, elements),
    groups,
  ) =>
    elements
    ->Meta3dCommonlib.ListSt.fromArray
    ->Meta3dCommonlib.ListSt.reduce(list{}, (streams, {name, type_}: element) =>
      switch type_ {
      | #job =>
        let execFunc = _getExecFunc(getExecFuncs, pipelineName, name)

        streams->Meta3dCommonlib.ListSt.push(_buildJobStream(mostService, execFunc))
      | #group =>
        let group = _findGroup(name, groups)
        let stream = buildPipelineStreamFunc(mostService, getExecFuncs, pipelineName, group, groups)
        streams->Meta3dCommonlib.ListSt.push(stream)
      }
    )

  let rec _buildPipelineStream = (
    mostService: Meta3dBsMostType.ServiceType.service,
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
    po,
    mostService: Meta3dBsMostType.ServiceType.service,
    getExecFuncs,
    {name, groups, first_group},
  ): Meta3dBsMostType.ServiceType.stream<POType.po> => {
    let group = _findGroup(first_group, groups)

    po->POContainer.setPO

    _buildPipelineStream(mostService, getExecFuncs, name, group, groups)->mostService.map(
      () => POContainer.unsafeGetPO(),
      _,
    )
  }
}

let registerPlugin = (
  {allRegisteredWorkPluginData} as po: POType.po,
  data: WorkManagerType.registeredWorkPlugin,
  jobOrders: RegisterWorkPluginType.jobOrders,
): POType.po => {
  {
    ...po,
    allRegisteredWorkPluginData: allRegisteredWorkPluginData->Meta3dCommonlib.ListSt.push((
      data,
      jobOrders,
    )),
  }
}

let unregisterPlugin = (
  {allRegisteredWorkPluginData} as po: POType.po,
  targetPluginName: string,
): POType.po => {
  ...po,
  allRegisteredWorkPluginData: allRegisteredWorkPluginData->Meta3dCommonlib.ListSt.filter(((
    {pluginName},
    _,
  )) => {
    pluginName !== targetPluginName
  }),
}

let init = ({allRegisteredWorkPluginData} as po: POType.po): POType.po => {
  allRegisteredWorkPluginData->Meta3dCommonlib.ListSt.reduce(
    {
      ...po,
      states: allRegisteredWorkPluginData->Meta3dCommonlib.ListSt.reduce(
        Meta3dCommonlib.ImmutableHashMap.createEmpty(),
        (states, ({pluginName, initFunc, createStateFunc}, _)) => {
          states->Meta3dCommonlib.ImmutableHashMap.set(pluginName, createStateFunc())
        },
      ),
    },
    ({states} as po, ({pluginName, initFunc}, _)) => {
      po->POContainer.setPO

      initFunc(
        states
        ->Meta3dCommonlib.ImmutableHashMap.get(pluginName)
        ->Meta3dCommonlib.OptionSt.unsafeGet,
      )

      POContainer.unsafeGetPO()
    },
  )
}

module MergePipelineData = {
  let _findInsertPluginName = (
    insertElementName,
    allRegisteredWorkPluginData: WorkManagerType.allRegisteredWorkPluginData,
  ): Meta3dCommonlib.Result.t2<Meta3dEngineCoreType.IWorkForJs.pluginName> => {
    allRegisteredWorkPluginData
    ->Meta3dCommonlib.ListSt.find((({pluginName, allPipelineData}, _)) => {
      let {groups} = allPipelineData[0]

      groups->Meta3dCommonlib.ArraySt.includesByFunc(({elements}) => {
        elements->Meta3dCommonlib.ArraySt.includesByFunc(({name}) => {
          name === insertElementName
        })
      })
    })
    ->Meta3dCommonlib.OptionSt.map((({pluginName}, _)) => pluginName)
    ->Meta3dCommonlib.OptionSt.get
  }

  let _check = (
    ({allPipelineData}, jobOrders) as registeredWorkPluginData: POType.registeredWorkPluginData,
  ) => {
    allPipelineData->Meta3dCommonlib.ArraySt.length <= 1 &&
      jobOrders->Meta3dCommonlib.ArraySt.length <= 1
      ? registeredWorkPluginData->Meta3dCommonlib.Result.succeed
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
    allRegisteredWorkPluginData: WorkManagerType.allRegisteredWorkPluginData,
    targetPipelineName: Meta3dEngineCoreType.PipelineType.pipelineName,
  ): Meta3dCommonlib.Result.t2<list<WorkManagerType.specificPipelineRelatedData>> => {
    allRegisteredWorkPluginData
    ->Meta3dCommonlib.ListSt.traverseResultM(((
      {allPipelineData} as registeredWorkPlugin,
      jobOrders,
    )) => {
      (
        {
          ...registeredWorkPlugin,
          allPipelineData: allPipelineData->Meta3dCommonlib.ArraySt.filter(({name}) => {
            name === targetPipelineName
          }),
        },
        jobOrders->Meta3dCommonlib.ArraySt.filter(({pipelineName}) => {
          pipelineName === targetPipelineName
        }),
      )->_check
    })
    ->Meta3dCommonlib.Result.mapSuccess(allRegisteredWorkPluginData => {
      allRegisteredWorkPluginData->Meta3dCommonlib.ListSt.filter(((
        {allPipelineData} as registeredWorkPluginData,
        _,
      )) => {
        allPipelineData->Meta3dCommonlib.ArraySt.length === 1
      })
    })
    ->Meta3dCommonlib.Result.bind(allRegisteredWorkPluginData => {
      allRegisteredWorkPluginData
      ->Meta3dCommonlib.ListSt.map(((
        {pluginName, getExecFunc, allPipelineData} as registeredWorkPluginData,
        jobOrders,
      )) => {
        (pluginName, getExecFunc, allPipelineData[0], jobOrders->Meta3dCommonlib.ArraySt.getFirst)
      })
      ->Meta3dCommonlib.ListSt.traverseResultM(((
        pluginName,
        getExecFunc,
        pipelineData,
        jobOrderOpt,
      )) => {
        jobOrderOpt
        ->Meta3dCommonlib.OptionSt.map(({insertElementName, insertAction}) => {
          _findInsertPluginName(
            insertElementName,
            allRegisteredWorkPluginData,
          )->Meta3dCommonlib.Result.mapSuccess((insertPluginName): WorkManagerType.jobOrder => {
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
        ): WorkManagerType.specificPipelineRelatedData => {
          {
            pluginName: pluginName,
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
    (pluginName, getExecFunc, pipelineData, nodeJobOrderOpt, nodeInsertPluginNameOpt),
  ) => {
    treeDataList->Meta3dCommonlib.ListSt.reduce((list{}, None), (
      (newTreeDataList, insertedTreeOpt),
      (sameLevelTreeList, insertPluginNameOpt) as treeData,
    ) => {
      switch insertPluginNameOpt {
      | Some(insertPluginName) if insertPluginName === pluginName =>
        let insertedTree = TreeNode.buildNode(
          pluginName,
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
    treeDataList: WorkManagerType.treeDataList,
    node,
    insertPluginNameOpt,
  ): WorkManagerType.treeDataList => {
    list{(list{node}, insertPluginNameOpt), ...treeDataList}
  }

  let _insertToAsChildNodeOrSameLevelTree = (
    treeDataList: WorkManagerType.treeDataList,
    nodeInsertPluginName,
    node: TreeType.tree,
  ): (WorkManagerType.treeDataList, bool) => {
    treeDataList->Meta3dCommonlib.ListSt.reduce((list{}, false), (
      (newTreeDataList, isInsertTo),
      (sameLevelTreeList, insertPluginNameOpt),
    ) => {
      switch insertPluginNameOpt {
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
            let (tree, isInsertTo) = tree->OperateTree.insertNode(nodeInsertPluginName, node)

            (sameLevelTreeList->Meta3dCommonlib.ListSt.addInReduce(tree), isInsertTo)
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
    })
  }

  let _removeInsertedTree = (
    treeDataList: WorkManagerType.treeDataList,
    insertedTree,
  ): WorkManagerType.treeDataList => {
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
    allSpecificPipelineRelatedData: list<WorkManagerType.specificPipelineRelatedData>,
  ): Meta3dCommonlib.Result.t2<TreeType.tree> => {
    allSpecificPipelineRelatedData
    ->Meta3dCommonlib.ListSt.reduce(list{}, (
      treeDataList,
      {pluginName, getExecFunc, pipelineData, jobOrder},
    ) => {
      switch jobOrder {
      | None =>
        let (treeDataList, insertedTreeOpt) =
          treeDataList->_handleInsertedAsRootNode((
            pluginName,
            getExecFunc,
            pipelineData,
            None,
            None,
          ))

        _isInserted(insertedTreeOpt)
          ? treeDataList
          : treeDataList->_add(
              TreeNode.buildNode(pluginName, (getExecFunc, pipelineData, None), list{}),
              None,
            )
      | Some({insertPluginName, insertElementName, insertAction}) =>
        let nodeJobOrderOpt =
          (
            {insertElementName: insertElementName, insertAction: insertAction}: TreeType.jobOrder
          )->Some

        let (treeDataList, insertedTreeOpt) =
          treeDataList->_handleInsertedAsRootNode((
            pluginName,
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
            pluginName,
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
    groups: Meta3dEngineCoreType.PipelineType.groups,
    first_group,
  ): Meta3dCommonlib.Result.t2<Meta3dEngineCoreType.PipelineType.element> => {
    groups
    ->Meta3dCommonlib.ArraySt.find(({name}) => {
      name === first_group
    })
    ->Meta3dCommonlib.OptionSt.map(({name}): Meta3dEngineCoreType.PipelineType.element => {
      name: name,
      type_: #group,
    })
    ->Meta3dCommonlib.OptionSt.get
  }

  let _insertElement = (
    groups: Meta3dEngineCoreType.PipelineType.groups,
    insertAction,
    insertElementName,
    insertElement: Meta3dEngineCoreType.PipelineType.element,
  ) => {
    groups->Meta3dCommonlib.ArraySt.map(({name, elements} as group) => {
      {
        ...group,
        elements: elements->Meta3dCommonlib.ArraySt.reduceOneParam(
          (. result, {name} as element) => {
            name === insertElementName
              ? {
                  switch insertAction {
                  | RegisterWorkPluginType.Before =>
                    result
                    ->Meta3dCommonlib.ArraySt.push(insertElement)
                    ->Meta3dCommonlib.ArraySt.push(element)
                  | RegisterWorkPluginType.After =>
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
    groups: Meta3dEngineCoreType.PipelineType.groups,
    insertGroups: Meta3dEngineCoreType.PipelineType.groups,
  ): Meta3dEngineCoreType.PipelineType.groups => {
    Js.Array.concat(groups, insertGroups)
  }

  let _mergeGetExecFuncs = (getExecFuncs: WorkManagerType.getExecFuncs, insertGetExecFuncs) => {
    Meta3dCommonlib.ListSt.concat(getExecFuncs, insertGetExecFuncs)
  }

  let _mergeToRootNode = (tree: TreeType.tree): Meta3dCommonlib.Result.t2<(
    list<Meta3dEngineCoreType.IWorkForJs.getExecFunc<RegisterWorkPluginType.states>>,
    Meta3dEngineCoreType.PipelineType.pipelineData,
  )> => {
    IterateTree.postOrderCataWithParentNode(
      ~tree,
      ~nodeFunc=(
        parentNodeOpt,
        pluginName,
        {getExecFuncs, pipelineData, jobOrder} as nodeData,
        children,
      ) => {
        let node = TreeNode.buildNodeByNodeData(pluginName, nodeData, children)

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
              parentNodeData.getExecFuncs = _mergeGetExecFuncs(
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
    allRegisteredWorkPluginData: WorkManagerType.allRegisteredWorkPluginData,
    pipelineName: Meta3dEngineCoreType.PipelineType.pipelineName,
  ): Meta3dCommonlib.Result.t2<(
    list<Meta3dEngineCoreType.IWorkForJs.getExecFunc<RegisterWorkPluginType.states>>,
    Meta3dEngineCoreType.PipelineType.pipelineData,
  )> => {
    allRegisteredWorkPluginData
    ->_findAllSpecificPipelineRelatedData(pipelineName)
    ->Meta3dCommonlib.Result.bind(_buildTree)
    ->Meta3dCommonlib.Result.bind(_mergeToRootNode)
  }
}

let runPipeline = (
  {allRegisteredWorkPluginData, states} as po: POType.po,
  mostService: Meta3dBsMostType.ServiceType.service,
  pipelineName: Meta3dEngineCoreType.PipelineType.pipelineName,
): Meta3dCommonlib.Result.t2<Meta3dBsMostType.ServiceType.stream<POType.po>> => {
  // TODO check is allRegisteredWorkPluginData duplicate

  allRegisteredWorkPluginData
  ->MergePipelineData.merge(pipelineName)
  ->Meta3dCommonlib.Result.mapSuccess(((getExecFuncs, pipelineData)) => {
    ParsePipelineData.parse(po, mostService, getExecFuncs, pipelineData)
  })
}
