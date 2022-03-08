

import * as Curry from "./../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_array from "./../../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as Log$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as ListSt$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as Result$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Result.bs.js";
import * as ArraySt$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as TreeNode$Meta3dEngineCore from "./TreeNode.bs.js";
import * as IterateTree$Meta3dEngineCore from "./IterateTree.bs.js";
import * as OperateTree$Meta3dEngineCore from "./OperateTree.bs.js";
import * as StateContainer$Meta3dEngineCore from "../../state/StateContainer.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function _getStates(param) {
  return StateContainer$Meta3dEngineCore.unsafeGetState(undefined).states;
}

function _setStates(states) {
  var init = StateContainer$Meta3dEngineCore.unsafeGetState(undefined);
  return StateContainer$Meta3dEngineCore.setState({
              allRegisteredWorkPluginContribute: init.allRegisteredWorkPluginContribute,
              states: states,
              pluginData: init.pluginData,
              componentContributeData: init.componentContributeData,
              gameObjectContribute: init.gameObjectContribute,
              usedGameObjectContribute: init.usedGameObjectContribute
            });
}

function _findGroup(groupName, groups) {
  if (ArraySt$Meta3dCommonlib.length(ArraySt$Meta3dCommonlib.filter(groups, (function (param) {
                return param.name === groupName;
              }))) > 1) {
    Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr("groupName:" + groupName + " has more than one in groups"));
  }
  var group = ListSt$Meta3dCommonlib.getBy(ListSt$Meta3dCommonlib.fromArray(groups), (function (param) {
          return param.name === groupName;
        }));
  if (group !== undefined) {
    return group;
  } else {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr("groupName:" + groupName + " not in groups"));
  }
}

function _buildJobStream(param, execFunc) {
  var __x = Curry._1(param.just, execFunc);
  return Curry._2(param.map, _setStates, Curry._2(param.flatMap, (function (func) {
                    return Curry._1(func, StateContainer$Meta3dEngineCore.unsafeGetState(undefined).states);
                  }), __x));
}

function _getExecFunc(_getExecFuncs, pipelineName, jobName) {
  while(true) {
    var getExecFuncs = _getExecFuncs;
    if (ListSt$Meta3dCommonlib.length(getExecFuncs) === 0) {
      return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildFatalMessage("_getExecFunc", "can't get execFunc with pipelineName:" + pipelineName + ", jobName:" + jobName, "", "", "")));
    }
    if (getExecFuncs) {
      var result = Curry._2(getExecFuncs.hd, pipelineName, jobName);
      if (!(result == null)) {
        return OptionSt$Meta3dCommonlib.getExn(OptionSt$Meta3dCommonlib.fromNullable(result));
      }
      _getExecFuncs = getExecFuncs.tl;
      continue ;
    }
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "WorkPluginManager.res",
            66,
            14
          ],
          Error: new Error()
        };
  };
}

function _buildJobStreams(mostService, param, param$1, groups) {
  var pipelineName = param$1[0];
  var getExecFuncs = param[1];
  var buildPipelineStreamFunc = param[0];
  return ListSt$Meta3dCommonlib.reduce(ListSt$Meta3dCommonlib.fromArray(param$1[1]), /* [] */0, (function (streams, param) {
                var name = param.name;
                if (param.type_ === "group") {
                  var group = _findGroup(name, groups);
                  var stream = Curry._5(buildPipelineStreamFunc, mostService, getExecFuncs, pipelineName, group, groups);
                  return ListSt$Meta3dCommonlib.push(streams, stream);
                }
                var execFunc = _getExecFunc(getExecFuncs, pipelineName, name);
                return ListSt$Meta3dCommonlib.push(streams, _buildJobStream(mostService, execFunc));
              }));
}

function _buildPipelineStream(mostService, getExecFuncs, pipelineName, param, groups) {
  var streams = _buildJobStreams(mostService, [
        _buildPipelineStream,
        getExecFuncs
      ], [
        pipelineName,
        param.elements
      ], groups);
  return Curry._1(param.link === "merge" ? mostService.mergeArray : mostService.concatArray, ListSt$Meta3dCommonlib.toArray(streams));
}

function parse(state, mostService, getExecFuncs, param) {
  var groups = param.groups;
  var group = _findGroup(param.first_group, groups);
  StateContainer$Meta3dEngineCore.setState(state);
  var __x = _buildPipelineStream(mostService, getExecFuncs, param.name, group, groups);
  return Curry._2(mostService.map, (function (param) {
                return StateContainer$Meta3dEngineCore.unsafeGetState(undefined);
              }), __x);
}

var ParsePipelineData = {
  _getStates: _getStates,
  _setStates: _setStates,
  _findGroup: _findGroup,
  _buildJobStream: _buildJobStream,
  _getExecFunc: _getExecFunc,
  _buildJobStreams: _buildJobStreams,
  _buildPipelineStream: _buildPipelineStream,
  parse: parse
};

function registerPlugin(state, contribute, jobOrders) {
  return {
          allRegisteredWorkPluginContribute: ListSt$Meta3dCommonlib.push(state.allRegisteredWorkPluginContribute, [
                contribute,
                jobOrders
              ]),
          states: state.states,
          pluginData: state.pluginData,
          componentContributeData: state.componentContributeData,
          gameObjectContribute: state.gameObjectContribute,
          usedGameObjectContribute: state.usedGameObjectContribute
        };
}

function unregisterPlugin(state, targetPluginName) {
  return {
          allRegisteredWorkPluginContribute: ListSt$Meta3dCommonlib.filter(state.allRegisteredWorkPluginContribute, (function (param) {
                  return param[0].workPluginName !== targetPluginName;
                })),
          states: state.states,
          pluginData: state.pluginData,
          componentContributeData: state.componentContributeData,
          gameObjectContribute: state.gameObjectContribute,
          usedGameObjectContribute: state.usedGameObjectContribute
        };
}

function init(state) {
  var allRegisteredWorkPluginContribute = state.allRegisteredWorkPluginContribute;
  return ListSt$Meta3dCommonlib.reduce(allRegisteredWorkPluginContribute, {
              allRegisteredWorkPluginContribute: state.allRegisteredWorkPluginContribute,
              states: ListSt$Meta3dCommonlib.reduce(allRegisteredWorkPluginContribute, ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), (function (states, param) {
                      var match = param[0];
                      return ImmutableHashMap$Meta3dCommonlib.set(states, match.workPluginName, Curry._1(match.createStateFunc, undefined));
                    })),
              pluginData: state.pluginData,
              componentContributeData: state.componentContributeData,
              gameObjectContribute: state.gameObjectContribute,
              usedGameObjectContribute: state.usedGameObjectContribute
            }, (function (state, param) {
                var match = param[0];
                StateContainer$Meta3dEngineCore.setState(state);
                Curry._1(match.initFunc, OptionSt$Meta3dCommonlib.unsafeGet(ImmutableHashMap$Meta3dCommonlib.get(state.states, match.workPluginName)));
                return StateContainer$Meta3dEngineCore.unsafeGetState(undefined);
              }));
}

function _findInsertPluginName(insertElementName, allRegisteredWorkPluginContribute) {
  return OptionSt$Meta3dCommonlib.get(OptionSt$Meta3dCommonlib.map(ListSt$Meta3dCommonlib.find(allRegisteredWorkPluginContribute, (function (param) {
                        var match = Caml_array.get(param[0].allPipelineData, 0);
                        return ArraySt$Meta3dCommonlib.includesByFunc(match.groups, (function (param) {
                                      return ArraySt$Meta3dCommonlib.includesByFunc(param.elements, (function (param) {
                                                    return param.name === insertElementName;
                                                  }));
                                    }));
                      })), (function (param) {
                    return param[0].workPluginName;
                  })));
}

function _check(registeredWorkPluginContribute) {
  if (ArraySt$Meta3dCommonlib.length(registeredWorkPluginContribute[0].allPipelineData) <= 1 && ArraySt$Meta3dCommonlib.length(registeredWorkPluginContribute[1]) <= 1) {
    return Result$Meta3dCommonlib.succeed(registeredWorkPluginContribute);
  } else {
    return Result$Meta3dCommonlib.failWith(Log$Meta3dCommonlib.buildErrorMessage("allPipelineData or jobOrders should has the same pipeline <= 1", "", "", "", ""));
  }
}

function _findAllSpecificPipelineRelatedData(allRegisteredWorkPluginContribute, targetPipelineName) {
  return Result$Meta3dCommonlib.bind(Result$Meta3dCommonlib.mapSuccess(ListSt$Meta3dCommonlib.traverseResultM(allRegisteredWorkPluginContribute, (function (param) {
                        var workPluginContribute = param[0];
                        return _check([
                                    {
                                      workPluginName: workPluginContribute.workPluginName,
                                      createStateFunc: workPluginContribute.createStateFunc,
                                      initFunc: workPluginContribute.initFunc,
                                      getExecFunc: workPluginContribute.getExecFunc,
                                      allPipelineData: ArraySt$Meta3dCommonlib.filter(workPluginContribute.allPipelineData, (function (param) {
                                              return param.name === targetPipelineName;
                                            }))
                                    },
                                    ArraySt$Meta3dCommonlib.filter(param[1], (function (param) {
                                            return param.pipelineName === targetPipelineName;
                                          }))
                                  ]);
                      })), (function (allRegisteredWorkPluginContribute) {
                    return ListSt$Meta3dCommonlib.filter(allRegisteredWorkPluginContribute, (function (param) {
                                  return ArraySt$Meta3dCommonlib.length(param[0].allPipelineData) === 1;
                                }));
                  })), (function (allRegisteredWorkPluginContribute) {
                return ListSt$Meta3dCommonlib.traverseResultM(ListSt$Meta3dCommonlib.map(allRegisteredWorkPluginContribute, (function (param) {
                                  var registeredWorkPluginContribute = param[0];
                                  return [
                                          registeredWorkPluginContribute.workPluginName,
                                          registeredWorkPluginContribute.getExecFunc,
                                          Caml_array.get(registeredWorkPluginContribute.allPipelineData, 0),
                                          ArraySt$Meta3dCommonlib.getFirst(param[1])
                                        ];
                                })), (function (param) {
                              var pipelineData = param[2];
                              var getExecFunc = param[1];
                              var workPluginName = param[0];
                              return Result$Meta3dCommonlib.mapSuccess(OptionSt$Meta3dCommonlib.sequenceResultM(OptionSt$Meta3dCommonlib.map(param[3], (function (param) {
                                                    var insertAction = param.insertAction;
                                                    var insertElementName = param.insertElementName;
                                                    return Result$Meta3dCommonlib.mapSuccess(_findInsertPluginName(insertElementName, allRegisteredWorkPluginContribute), (function (insertPluginName) {
                                                                  return {
                                                                          insertPluginName: insertPluginName,
                                                                          insertElementName: insertElementName,
                                                                          insertAction: insertAction
                                                                        };
                                                                }));
                                                  }))), (function (jobOrderOpt) {
                                            return {
                                                    workPluginName: workPluginName,
                                                    getExecFunc: getExecFunc,
                                                    pipelineData: pipelineData,
                                                    jobOrder: jobOrderOpt
                                                  };
                                          }));
                            }));
              }));
}

function _handleInsertedAsRootNode(treeDataList, param) {
  var nodeInsertPluginNameOpt = param[4];
  var nodeJobOrderOpt = param[3];
  var pipelineData = param[2];
  var getExecFunc = param[1];
  var workPluginName = param[0];
  return ListSt$Meta3dCommonlib.reduce(treeDataList, [
              /* [] */0,
              undefined
            ], (function (param, treeData) {
                var insertPluginNameOpt = treeData[1];
                var insertedTreeOpt = param[1];
                var newTreeDataList = param[0];
                if (insertPluginNameOpt === undefined) {
                  return [
                          ListSt$Meta3dCommonlib.addInReduce(newTreeDataList, treeData),
                          insertedTreeOpt
                        ];
                }
                if (insertPluginNameOpt !== workPluginName) {
                  return [
                          ListSt$Meta3dCommonlib.addInReduce(newTreeDataList, treeData),
                          insertedTreeOpt
                        ];
                }
                var insertedTree = TreeNode$Meta3dEngineCore.buildNode(workPluginName, [
                      getExecFunc,
                      pipelineData,
                      nodeJobOrderOpt
                    ], treeData[0]);
                return [
                        ListSt$Meta3dCommonlib.addInReduce(newTreeDataList, [
                              {
                                hd: insertedTree,
                                tl: /* [] */0
                              },
                              nodeInsertPluginNameOpt
                            ]),
                        insertedTree
                      ];
              }));
}

function _add(treeDataList, node, insertPluginNameOpt) {
  return {
          hd: [
            {
              hd: node,
              tl: /* [] */0
            },
            insertPluginNameOpt
          ],
          tl: treeDataList
        };
}

function _insertToAsChildNodeOrSameLevelTree(treeDataList, nodeInsertPluginName, node) {
  return ListSt$Meta3dCommonlib.reduce(treeDataList, [
              /* [] */0,
              false
            ], (function (param, param$1) {
                var insertPluginNameOpt = param$1[1];
                var sameLevelTreeList = param$1[0];
                var newTreeDataList = param[0];
                if (insertPluginNameOpt !== undefined && insertPluginNameOpt === nodeInsertPluginName) {
                  return [
                          ListSt$Meta3dCommonlib.addInReduce(newTreeDataList, [
                                ListSt$Meta3dCommonlib.push(sameLevelTreeList, node),
                                insertPluginNameOpt
                              ]),
                          true
                        ];
                }
                var match = ListSt$Meta3dCommonlib.reduce(sameLevelTreeList, [
                      /* [] */0,
                      false
                    ], (function (param, tree) {
                        var match = OperateTree$Meta3dEngineCore.insertNode(tree, nodeInsertPluginName, node);
                        return [
                                ListSt$Meta3dCommonlib.addInReduce(param[0], match[0]),
                                match[1]
                              ];
                      }));
                return [
                        ListSt$Meta3dCommonlib.addInReduce(newTreeDataList, [
                              match[0],
                              insertPluginNameOpt
                            ]),
                        match[1]
                      ];
              }));
}

function _removeInsertedTree(treeDataList, insertedTree) {
  return ListSt$Meta3dCommonlib.filter(ListSt$Meta3dCommonlib.map(treeDataList, (function (param) {
                    return [
                            ListSt$Meta3dCommonlib.filter(param[0], (function (sameLevelTree) {
                                    return !TreeNode$Meta3dEngineCore.isEqual(sameLevelTree, insertedTree);
                                  })),
                            param[1]
                          ];
                  })), (function (param) {
                return ListSt$Meta3dCommonlib.length(param[0]) > 0;
              }));
}

function _getTree(treeDataList) {
  if (ListSt$Meta3dCommonlib.length(treeDataList) !== 1) {
    return Result$Meta3dCommonlib.failWith(Log$Meta3dCommonlib.buildErrorMessage("treeDataList.length should be 1", "", "", "", ""));
  } else {
    return Result$Meta3dCommonlib.bind(OptionSt$Meta3dCommonlib.get(ListSt$Meta3dCommonlib.head(treeDataList)), (function (param) {
                  var sameLevelTreeList = param[0];
                  if (ListSt$Meta3dCommonlib.length(sameLevelTreeList) !== 1) {
                    return Result$Meta3dCommonlib.failWith(Log$Meta3dCommonlib.buildErrorMessage("sameLevelTreeList.length should be 1", "", "", "", ""));
                  } else {
                    return OptionSt$Meta3dCommonlib.get(ListSt$Meta3dCommonlib.head(sameLevelTreeList));
                  }
                }));
  }
}

function _buildTree(allSpecificPipelineRelatedData) {
  return _getTree(ListSt$Meta3dCommonlib.reduce(allSpecificPipelineRelatedData, /* [] */0, (function (treeDataList, param) {
                    var jobOrder = param.jobOrder;
                    var pipelineData = param.pipelineData;
                    var getExecFunc = param.getExecFunc;
                    var workPluginName = param.workPluginName;
                    if (jobOrder !== undefined) {
                      var insertPluginName = jobOrder.insertPluginName;
                      var nodeJobOrderOpt = {
                        insertElementName: jobOrder.insertElementName,
                        insertAction: jobOrder.insertAction
                      };
                      var match = _handleInsertedAsRootNode(treeDataList, [
                            workPluginName,
                            getExecFunc,
                            pipelineData,
                            nodeJobOrderOpt,
                            insertPluginName
                          ]);
                      var insertedTreeOpt = match[1];
                      var treeDataList$1 = match[0];
                      if (insertedTreeOpt !== undefined) {
                        var match$1 = _insertToAsChildNodeOrSameLevelTree(treeDataList$1, insertPluginName, insertedTreeOpt);
                        var treeDataList$2 = match$1[0];
                        if (match$1[1]) {
                          return _removeInsertedTree(treeDataList$2, insertedTreeOpt);
                        } else {
                          return treeDataList$2;
                        }
                      }
                      var node = TreeNode$Meta3dEngineCore.buildNode(workPluginName, [
                            getExecFunc,
                            pipelineData,
                            nodeJobOrderOpt
                          ], /* [] */0);
                      var match$2 = _insertToAsChildNodeOrSameLevelTree(treeDataList$1, insertPluginName, node);
                      var treeDataList$3 = match$2[0];
                      if (match$2[1]) {
                        return treeDataList$3;
                      } else {
                        return _add(treeDataList$3, node, insertPluginName);
                      }
                    }
                    var match$3 = _handleInsertedAsRootNode(treeDataList, [
                          workPluginName,
                          getExecFunc,
                          pipelineData,
                          undefined,
                          undefined
                        ]);
                    var treeDataList$4 = match$3[0];
                    if (OptionSt$Meta3dCommonlib.isSome(match$3[1])) {
                      return treeDataList$4;
                    } else {
                      return _add(treeDataList$4, TreeNode$Meta3dEngineCore.buildNode(workPluginName, [
                                      getExecFunc,
                                      pipelineData,
                                      undefined
                                    ], /* [] */0), undefined);
                    }
                  })));
}

function _buildFirstGroupElement(groups, first_group) {
  return OptionSt$Meta3dCommonlib.get(OptionSt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.find(groups, (function (param) {
                        return param.name === first_group;
                      })), (function (param) {
                    return {
                            name: param.name,
                            type_: "group"
                          };
                  })));
}

function _insertElement(groups, insertAction, insertElementName, insertElement) {
  return ArraySt$Meta3dCommonlib.map(groups, (function (group) {
                return {
                        name: group.name,
                        link: group.link,
                        elements: ArraySt$Meta3dCommonlib.reduceOneParam(group.elements, (function (result, element) {
                                if (element.name === insertElementName) {
                                  if (insertAction) {
                                    return ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(result, element), insertElement);
                                  } else {
                                    return ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(result, insertElement), element);
                                  }
                                } else {
                                  return ArraySt$Meta3dCommonlib.push(result, element);
                                }
                              }), [])
                      };
              }));
}

function _mergeGroups(groups, insertGroups) {
  return insertGroups.concat(groups);
}

var _mergeGetElementFuncs = ListSt$Meta3dCommonlib.concat;

function _mergeToRootNode(tree) {
  return Result$Meta3dCommonlib.mapSuccess(IterateTree$Meta3dEngineCore.postOrderCataWithParentNode((function (parentNodeOpt, workPluginName, nodeData) {
                    var getExecFuncs = nodeData.getExecFuncs;
                    var pipelineData = nodeData.pipelineData;
                    var jobOrder = nodeData.jobOrder;
                    return function (children) {
                      var node = TreeNode$Meta3dEngineCore.buildNodeByNodeData(workPluginName, nodeData, children);
                      if (parentNodeOpt === undefined) {
                        return Result$Meta3dCommonlib.succeed(node);
                      }
                      var parentNodeData = TreeNode$Meta3dEngineCore.getNodeData(parentNodeOpt);
                      return Result$Meta3dCommonlib.bind(OptionSt$Meta3dCommonlib.get(jobOrder), (function (param) {
                                    var insertAction = param.insertAction;
                                    var insertElementName = param.insertElementName;
                                    return Result$Meta3dCommonlib.mapSuccess(_buildFirstGroupElement(pipelineData.groups, pipelineData.first_group), (function (insertElement) {
                                                  var init = parentNodeData.pipelineData;
                                                  parentNodeData.pipelineData = {
                                                    name: init.name,
                                                    groups: pipelineData.groups.concat(_insertElement(parentNodeData.pipelineData.groups, insertAction, insertElementName, insertElement)),
                                                    first_group: init.first_group
                                                  };
                                                  parentNodeData.getExecFuncs = ListSt$Meta3dCommonlib.concat(parentNodeData.getExecFuncs, getExecFuncs);
                                                  return node;
                                                }));
                                  }));
                    };
                  }), tree, undefined, undefined), (function (tree) {
                var match = TreeNode$Meta3dEngineCore.getNodeData(tree);
                var getExecFuncs = match.getExecFuncs;
                var pipelineData = match.pipelineData;
                return [
                        getExecFuncs,
                        pipelineData
                      ];
              }));
}

function merge(allRegisteredWorkPluginContribute, pipelineName) {
  return Result$Meta3dCommonlib.bind(Result$Meta3dCommonlib.bind(_findAllSpecificPipelineRelatedData(allRegisteredWorkPluginContribute, pipelineName), _buildTree), _mergeToRootNode);
}

var MergePipelineData = {
  _findInsertPluginName: _findInsertPluginName,
  _check: _check,
  _findAllSpecificPipelineRelatedData: _findAllSpecificPipelineRelatedData,
  _handleInsertedAsRootNode: _handleInsertedAsRootNode,
  _isInserted: OptionSt$Meta3dCommonlib.isSome,
  _add: _add,
  _insertToAsChildNodeOrSameLevelTree: _insertToAsChildNodeOrSameLevelTree,
  _removeInsertedTree: _removeInsertedTree,
  _getTree: _getTree,
  _buildTree: _buildTree,
  _buildFirstGroupElement: _buildFirstGroupElement,
  _insertElement: _insertElement,
  _mergeGroups: _mergeGroups,
  _mergeGetElementFuncs: _mergeGetElementFuncs,
  _mergeToRootNode: _mergeToRootNode,
  merge: merge
};

function runPipeline(state, mostService, pipelineName) {
  return Result$Meta3dCommonlib.mapSuccess(merge(state.allRegisteredWorkPluginContribute, pipelineName), (function (param) {
                return parse(state, mostService, param[0], param[1]);
              }));
}

export {
  ParsePipelineData ,
  registerPlugin ,
  unregisterPlugin ,
  init ,
  MergePipelineData ,
  runPipeline ,
  
}
/* No side effect */
