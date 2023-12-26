

import * as Antd from "antd";
import * as Most from "most";
import * as Curry from "../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Semver from "semver";
import * as Caml_obj from "../../../../../../../../../../../node_modules/rescript/lib/es6/caml_obj.js";
import * as Js_promise from "../../../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as AppUtils$Frontend from "./AppUtils.bs.js";
import * as Graphs from "@ant-design/graphs";
import * as MostUtils$Frontend from "../../../utils/MostUtils.bs.js";
import * as Log$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as ReduxUtils$Frontend from "../../../utils/utils/ReduxUtils.bs.js";
import * as MessageUtils$Frontend from "../../../utils/utils/MessageUtils.bs.js";
import * as PackageUtils$Frontend from "./PackageUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as ContributeTypeUtils$Frontend from "../../../utils/utils/ContributeTypeUtils.bs.js";
import * as MutableHashMap$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/MutableHashMap.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function _buildNodes(service, param, selectedExtensions, selectedContributes) {
  var nodes = ListSt$Meta3dCommonlib.reduce(param[0], /* [] */0, (function (nodes, param) {
          var isStart = param.isStart;
          var name = param.name;
          var protocol = param.protocol;
          var match = PackageUtils$Frontend.getPackageAllExtensionAndContributeFileData(service, param.binaryFile);
          var nodes$1 = ArraySt$Meta3dCommonlib.reduceOneParam(match[0], (function (nodes, param) {
                  var extensionPackageData = param[0];
                  return ListSt$Meta3dCommonlib.push(nodes, {
                              nodeType: /* PackageExtension */2,
                              isStart: extensionPackageData.protocol.name === protocol.name ? isStart : false,
                              packageName: name,
                              protocol: extensionPackageData.protocol,
                              protocolIconBase64: protocol.iconBase64,
                              displayName: extensionPackageData.displayName,
                              name: extensionPackageData.name,
                              version: extensionPackageData.version,
                              dependentBlockProtocolNameMap: extensionPackageData.dependentBlockProtocolNameMap,
                              dependentPackageStoredInAppProtocolNameMap: extensionPackageData.dependentPackageStoredInAppProtocolNameMap
                            });
                }), nodes);
          return ArraySt$Meta3dCommonlib.reduceOneParam(match[1], (function (nodes, param) {
                        var contributePackageData = param[0];
                        return ListSt$Meta3dCommonlib.push(nodes, {
                                    nodeType: /* PackageContribute */3,
                                    isStart: false,
                                    packageName: name,
                                    protocol: contributePackageData.protocol,
                                    protocolIconBase64: protocol.iconBase64,
                                    displayName: contributePackageData.displayName,
                                    name: contributePackageData.name,
                                    version: contributePackageData.version,
                                    dependentBlockProtocolNameMap: contributePackageData.dependentBlockProtocolNameMap,
                                    dependentPackageStoredInAppProtocolNameMap: contributePackageData.dependentPackageStoredInAppProtocolNameMap
                                  });
                      }), nodes$1);
        }));
  var nodes$1 = ListSt$Meta3dCommonlib.reduce(param[1], nodes, (function (nodes, param) {
          var match = param[0];
          var protocol = match[0];
          return ListSt$Meta3dCommonlib.push(nodes, {
                      nodeType: /* PackageStoredInApp */4,
                      isStart: false,
                      packageName: undefined,
                      protocol: {
                        name: protocol.name,
                        version: protocol.version
                      },
                      protocolIconBase64: protocol.iconBase64,
                      displayName: undefined,
                      name: match[3],
                      version: match[2],
                      dependentBlockProtocolNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                      dependentPackageStoredInAppProtocolNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                    });
        }));
  var nodes$2 = ListSt$Meta3dCommonlib.reduce(selectedExtensions, nodes$1, (function (nodes, extension) {
          return ListSt$Meta3dCommonlib.push(nodes, {
                      nodeType: /* Extension */0,
                      isStart: extension.isStart,
                      packageName: undefined,
                      protocol: extension.data.extensionPackageData.protocol,
                      protocolIconBase64: extension.protocolIconBase64,
                      displayName: extension.data.extensionPackageData.displayName,
                      name: extension.data.extensionPackageData.name,
                      version: extension.data.extensionPackageData.version,
                      dependentBlockProtocolNameMap: extension.data.extensionPackageData.dependentBlockProtocolNameMap,
                      dependentPackageStoredInAppProtocolNameMap: extension.data.extensionPackageData.dependentPackageStoredInAppProtocolNameMap
                    });
        }));
  return ListSt$Meta3dCommonlib.reduce(selectedContributes, nodes$2, (function (nodes, contribute) {
                return ListSt$Meta3dCommonlib.push(nodes, {
                            nodeType: /* Contribute */1,
                            isStart: false,
                            packageName: undefined,
                            protocol: contribute.data.contributePackageData.protocol,
                            protocolIconBase64: contribute.protocolIconBase64,
                            displayName: contribute.data.contributePackageData.displayName,
                            name: contribute.data.contributePackageData.name,
                            version: contribute.data.contributePackageData.version,
                            dependentBlockProtocolNameMap: contribute.data.contributePackageData.dependentBlockProtocolNameMap,
                            dependentPackageStoredInAppProtocolNameMap: contribute.data.contributePackageData.dependentPackageStoredInAppProtocolNameMap
                          });
              }));
}

function _buildNodeErrorInfo(node) {
  var match = node.nodeType;
  var tmp;
  switch (match) {
    case /* Extension */0 :
        tmp = "- 类型：扩展；";
        break;
    case /* Contribute */1 :
        tmp = "- 类型：贡献";
        break;
    case /* PackageExtension */2 :
        tmp = "- 类型：扩展；所属包名：" + OptionSt$Meta3dCommonlib.getExn(node.packageName) + "；";
        break;
    case /* PackageContribute */3 :
        tmp = "- 类型：贡献；所属包名：" + OptionSt$Meta3dCommonlib.getExn(node.packageName) + "；";
        break;
    case /* PackageStoredInApp */4 :
        tmp = "- 类型：保存在App中的包；";
        break;
    
  }
  return tmp + ("显示名：" + OptionSt$Meta3dCommonlib.getWithDefault(node.displayName, "") + "；实现名：" + node.name + "；实现版本：" + node.version + "\n\n\n\n    ");
}

function _getNodeId(node) {
  return "" + node.protocol.name + "";
}

function _checkDuplicateNode(nodes) {
  var arr = ListSt$Meta3dCommonlib.toArray(ListSt$Meta3dCommonlib.filter(ListSt$Meta3dCommonlib.filter(nodes, (function (param) {
                  return param.nodeType < 4;
                })), (function (param) {
              return !ContributeTypeUtils$Frontend.isInput(param.protocol.name);
            })));
  var map = MutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
  for(var i = 0 ,i_finish = arr.length; i < i_finish; ++i){
    var item = arr[i];
    var key = _getNodeId(item);
    var oldItem = MutableHashMap$Meta3dCommonlib.get(map, key);
    if (oldItem !== undefined) {
      var title = "协议名：" + key + "有重复的实现，它们分别是：\n\n\n\n    " + _buildNodeErrorInfo(item) + _buildNodeErrorInfo(oldItem);
      Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage(title, "", "", "", "")));
    } else {
      MutableHashMap$Meta3dCommonlib.set(map, key, item);
    }
  }
}

function _getEmptyNodeTitle(param) {
  return "无";
}

function _isNeedUpdateNodeInData(nodeInData, nodeProtocolVersion) {
  return Semver.gte(Semver.minVersion(nodeProtocolVersion), Semver.minVersion(nodeInData.protocol.version));
}

function _updateNodeInData(nodesData, newNodeInData) {
  return ArraySt$Meta3dCommonlib.map(nodesData, (function (oldNodeInData) {
                if (oldNodeInData.id === newNodeInData.id) {
                  return newNodeInData;
                } else {
                  return oldNodeInData;
                }
              }));
}

function _updateNodesDataForNonEmptyNode(nodesData, node) {
  var nodeId = _getNodeId(node);
  var nodeInData = ArraySt$Meta3dCommonlib.find(nodesData, (function (param) {
          return param.id === nodeId;
        }));
  if (nodeInData === undefined) {
    return [
            ArraySt$Meta3dCommonlib.push(nodesData, {
                  id: nodeId,
                  nodeType: node.nodeType,
                  emptyNodeType: undefined,
                  isEmpty: false,
                  packageName: node.packageName,
                  protocol: node.protocol,
                  protocolIconBase64: node.protocolIconBase64,
                  title: OptionSt$Meta3dCommonlib.getWithDefault(node.displayName, node.name),
                  name: node.name,
                  version: node.version
                }),
            false
          ];
  }
  var tmp;
  if (_isNeedUpdateNodeInData(nodeInData, node.protocol.version)) {
    var init = nodeInData.protocol;
    tmp = _updateNodeInData(nodesData, {
          id: nodeInData.id,
          nodeType: nodeInData.nodeType,
          emptyNodeType: nodeInData.emptyNodeType,
          isEmpty: nodeInData.isEmpty,
          packageName: nodeInData.packageName,
          protocol: {
            name: init.name,
            version: node.protocol.version
          },
          protocolIconBase64: nodeInData.protocolIconBase64,
          title: nodeInData.title,
          name: nodeInData.name,
          version: OptionSt$Meta3dCommonlib.map(nodeInData.version, (function (param) {
                  return node.version;
                }))
        });
  } else {
    tmp = nodesData;
  }
  return [
          tmp,
          true
        ];
}

function _updateNodesDataForEmptyNode(nodesData, nodeId, param) {
  var protocolVersion = param[1];
  var newNodeInData_emptyNodeType = param[2];
  var newNodeInData_protocol = {
    name: OptionSt$Meta3dCommonlib.getExn(param[0]),
    version: OptionSt$Meta3dCommonlib.getExn(protocolVersion)
  };
  var newNodeInData = {
    id: nodeId,
    nodeType: undefined,
    emptyNodeType: newNodeInData_emptyNodeType,
    isEmpty: true,
    packageName: undefined,
    protocol: newNodeInData_protocol,
    protocolIconBase64: undefined,
    title: "无",
    name: undefined,
    version: undefined
  };
  var nodeInData = ArraySt$Meta3dCommonlib.find(nodesData, (function (param) {
          return param.id === nodeId;
        }));
  if (nodeInData !== undefined) {
    if (_isNeedUpdateNodeInData(nodeInData, OptionSt$Meta3dCommonlib.getExn(protocolVersion))) {
      return _updateNodeInData(nodesData, newNodeInData);
    } else {
      return nodesData;
    }
  } else {
    return ArraySt$Meta3dCommonlib.push(nodesData, newNodeInData);
  }
}

function _updateEdgesData(edgesData, nodeId, parentNodeId) {
  if (parentNodeId !== undefined) {
    return ArraySt$Meta3dCommonlib.removeDuplicateItemsWithBuildKeyFunc(ArraySt$Meta3dCommonlib.push(edgesData, {
                    source: parentNodeId,
                    target: nodeId
                  }), (function (param) {
                  return "" + param.source + "_" + param.target + "";
                }));
  } else {
    return edgesData;
  }
}

function _buildDependenciesData(param, nodes, nodeId, dependentProtocolNameMap, emptyNodeType) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(ImmutableHashMap$Meta3dCommonlib.entries(dependentProtocolNameMap), (function (param, param$1) {
                var protocolVersion = param$1[1];
                var protocolName = param$1[0];
                return _buildData([
                            param[0],
                            param[1]
                          ], ListSt$Meta3dCommonlib.find(nodes, (function (param) {
                                  var protocol = param.protocol;
                                  if (protocol.name === protocolName) {
                                    return Semver.gte(Semver.minVersion(protocol.version), Semver.minVersion(protocolVersion));
                                  } else {
                                    return false;
                                  }
                                })), nodes, nodeId, [
                            protocolName,
                            protocolVersion,
                            emptyNodeType
                          ]);
              }), [
              param[0],
              param[1]
            ]);
}

function _buildData(param, node, nodes, parentNodeId, param$1) {
  var protocolName = param$1[0];
  var edgesData = param[1];
  var nodesData = param[0];
  ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
  if (node !== undefined) {
    var match = _updateNodesDataForNonEmptyNode(nodesData, node);
    var nodesData$1 = match[0];
    var nodeId = _getNodeId(node);
    var edgesData$1 = _updateEdgesData(edgesData, nodeId, parentNodeId);
    if (match[1]) {
      return [
              nodesData$1,
              edgesData$1
            ];
    } else {
      return _buildDependenciesData(_buildDependenciesData([
                      nodesData$1,
                      edgesData$1
                    ], nodes, nodeId, node.dependentBlockProtocolNameMap, /* ParentIsOther */1), nodes, nodeId, node.dependentPackageStoredInAppProtocolNameMap, /* ParentIsPackageStoredInApp */0);
    }
  }
  var nodeId$1 = OptionSt$Meta3dCommonlib.getExn(protocolName);
  var nodesData$2 = _updateNodesDataForEmptyNode(nodesData, nodeId$1, [
        protocolName,
        param$1[1],
        param$1[2]
      ]);
  var edgesData$2 = _updateEdgesData(edgesData, nodeId$1, parentNodeId);
  return [
          nodesData$2,
          edgesData$2
        ];
}

function _convertNodesData(nodesData) {
  return ArraySt$Meta3dCommonlib.map(nodesData, (function (param) {
                var version = param.version;
                var name = param.name;
                var protocolIconBase64 = param.protocolIconBase64;
                var protocol = param.protocol;
                var packageName = param.packageName;
                var items = [
                  {
                    text: "协议名",
                    value: protocol.name
                  },
                  {
                    text: "协议版本",
                    value: protocol.version
                  }
                ];
                var items$1 = protocolIconBase64 !== undefined ? ArraySt$Meta3dCommonlib.push(items, {
                        text: "协议icon",
                        icon: protocolIconBase64
                      }) : items;
                var items$2 = name !== undefined ? ArraySt$Meta3dCommonlib.push(items$1, {
                        text: "实现名",
                        value: name
                      }) : items$1;
                var items$3 = version !== undefined ? ArraySt$Meta3dCommonlib.push(items$2, {
                        text: "实现版本",
                        value: version
                      }) : items$2;
                var items$4 = packageName !== undefined ? ArraySt$Meta3dCommonlib.push(items$3, {
                        text: "所属包名",
                        value: packageName
                      }) : items$3;
                return {
                        id: param.id,
                        value: {
                          title: param.title,
                          items: items$4
                        },
                        nodeType: param.nodeType,
                        emptyNodeType: param.emptyNodeType,
                        isEmpty: param.isEmpty
                      };
              }));
}

function _convertEdgesData(edgesData) {
  return ArraySt$Meta3dCommonlib.map(edgesData, (function (param) {
                return {
                        source: param.source,
                        target: param.target
                      };
              }));
}

function _notHasEmptyNode(nodesData) {
  return !ArraySt$Meta3dCommonlib.includesByFunc(nodesData, (function (param) {
                return param.isEmpty;
              }));
}

function useEffectOnce(setData, service, markIsPassDependencyGraphCheck, param) {
  var selectedExtensions = param[1];
  var match = param[0];
  var allPackagesNotStoredInApp = match[0];
  var match$1 = ListSt$Meta3dCommonlib.find(allPackagesNotStoredInApp, (function (param) {
          return param.isStart;
        }));
  var match$2 = ListSt$Meta3dCommonlib.find(selectedExtensions, (function (param) {
          return param.isStart;
        }));
  if (match$1 === undefined && match$2 === undefined) {
    Curry._1(setData, (function (param) {
            return ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
          }));
    return Curry._1(markIsPassDependencyGraphCheck, false);
  }
  var nodes = _buildNodes(service, [
        allPackagesNotStoredInApp,
        match[1]
      ], selectedExtensions, param[2]);
  _checkDuplicateNode(nodes);
  var match$3 = _buildData([
        [],
        []
      ], ListSt$Meta3dCommonlib.find(ListSt$Meta3dCommonlib.filter(nodes, (function (param) {
                  return !ContributeTypeUtils$Frontend.isAction(param.protocol.name);
                })), (function (param) {
              return param.isStart;
            })), nodes, undefined, [
        undefined,
        undefined,
        undefined
      ]);
  var match$4 = ListSt$Meta3dCommonlib.reduce(ListSt$Meta3dCommonlib.filter(nodes, (function (param) {
              return ContributeTypeUtils$Frontend.isAction(param.protocol.name);
            })), [
        match$3[0],
        match$3[1]
      ], (function (param, node) {
          return _buildData([
                      param[0],
                      param[1]
                    ], node, nodes, undefined, [
                      undefined,
                      undefined,
                      undefined
                    ]);
        }));
  var edgesData = match$4[1];
  var nodesData = match$4[0];
  Curry._1(setData, (function (param) {
          return {
                  nodes: _convertNodesData(nodesData),
                  edges: _convertEdgesData(edgesData)
                };
        }));
  return Curry._1(markIsPassDependencyGraphCheck, _notHasEmptyNode(nodesData));
}

function _findStartPackageProtocolName(selectedPackages) {
  return OptionSt$Meta3dCommonlib.map(ListSt$Meta3dCommonlib.find(selectedPackages, (function (param) {
                    return param.isStart;
                  })), (function (param) {
                return param.protocol.name;
              }));
}

function _findStartExtensionProtocolName(selectedExtensions) {
  return OptionSt$Meta3dCommonlib.map(ListSt$Meta3dCommonlib.find(selectedExtensions, (function (param) {
                    return param.isStart;
                  })), (function (param) {
                return param.data.extensionPackageData.protocol.name;
              }));
}

function _convertSelectedDataFromForAppStoreToForApAssembleStore(selectedPackagesForAppStore, selectedExtensionsForAppStoreEdit, selectedContributesForAppStore, param) {
  var startExtensionProtocolName = param[1];
  var startPackageProtocolName = param[0];
  return [
          startPackageProtocolName !== undefined ? ListSt$Meta3dCommonlib.map(selectedPackagesForAppStore, (function ($$package) {
                    return {
                            id: $$package.id,
                            protocol: $$package.protocol,
                            entryExtensionName: $$package.entryExtensionName,
                            version: $$package.version,
                            name: $$package.name,
                            binaryFile: $$package.binaryFile,
                            isStart: $$package.protocol.name === startPackageProtocolName,
                            protocolConfigStr: $$package.protocolConfigStr
                          };
                  })) : selectedPackagesForAppStore,
          ListSt$Meta3dCommonlib.map(selectedExtensionsForAppStoreEdit, (function (param) {
                  var match = param[0];
                  var extension = match[0];
                  return {
                          id: extension.id,
                          protocolIconBase64: extension.protocolIconBase64,
                          protocolConfigStr: OptionSt$Meta3dCommonlib.map(match[1], (function (param) {
                                  return param.configStr;
                                })),
                          isStart: startExtensionProtocolName !== undefined ? extension.protocolName === startExtensionProtocolName : false,
                          version: extension.version,
                          data: extension.data
                        };
                })),
          ListSt$Meta3dCommonlib.map(selectedContributesForAppStore, (function (param) {
                  var contribute = param[0];
                  return {
                          id: contribute.id,
                          protocolIconBase64: contribute.protocolIconBase64,
                          protocolConfigStr: OptionSt$Meta3dCommonlib.map(param[1], (function (param) {
                                  return param.configStr;
                                })),
                          version: contribute.version,
                          data: contribute.data
                        };
                }))
        ];
}

function _convertSelectedDataFromForApAssembleStoreToForPackageAssembleStore(selectedPackagesForApAssembleStore, selectedExtensionsForAppStoreEdit, selectedContributesForApAssembleStore, param) {
  var startExtensionProtocolName = param[1];
  var startPackageProtocolName = param[0];
  return [
          startPackageProtocolName !== undefined ? ListSt$Meta3dCommonlib.map(selectedPackagesForApAssembleStore, (function ($$package) {
                    return {
                            id: $$package.id,
                            protocol: $$package.protocol,
                            entryExtensionName: $$package.entryExtensionName,
                            version: $$package.version,
                            name: $$package.name,
                            binaryFile: $$package.binaryFile,
                            isStart: $$package.protocol.name === startPackageProtocolName,
                            protocolConfigStr: $$package.protocolConfigStr
                          };
                  })) : selectedPackagesForApAssembleStore,
          ListSt$Meta3dCommonlib.map(selectedExtensionsForAppStoreEdit, (function (param) {
                  var match = param[1];
                  var match$1 = param[0];
                  var extension = match$1[0];
                  return {
                          id: extension.id,
                          protocolName: extension.data.extensionPackageData.protocol.name,
                          protocolVersion: extension.protocolVersion,
                          protocolIconBase64: extension.protocolIconBase64,
                          protocolConfigStr: OptionSt$Meta3dCommonlib.map(match$1[1], (function (param) {
                                  return param.configStr;
                                })),
                          protocolDisplayName: match[0],
                          protocolRepoLink: match[1],
                          protocolDescription: match[2],
                          isEntry: startExtensionProtocolName !== undefined ? extension.protocolName === startExtensionProtocolName : false,
                          version: extension.version,
                          data: extension.data
                        };
                })),
          selectedContributesForApAssembleStore
        ];
}

function autoUpgradeVersion(service, setOperateInfo, dispatchForAppStore, dispatchForApAssembleStore, dispatchForPackageAssembleStore, selectedPackages, selectedExtensions, selectedContributes) {
  Curry._1(setOperateInfo, (function (param) {
          return "自动升级版本中...";
        }));
  var startPackageProtocolName = _findStartPackageProtocolName(selectedPackages);
  var startExtensionProtocolName = _findStartExtensionProtocolName(selectedExtensions);
  var __x = ListSt$Meta3dCommonlib.traverseReducePromiseM(selectedPackages, /* [] */0, (function (result, $$package) {
          var __x = service.backend.findNewestPublishPackage((function (progress) {
                  
                }), $$package.protocol.name, $$package.name);
          var __x$1 = MostUtils$Frontend.toPromise(Most.flatMap((function (data) {
                      var match = NullableSt$Meta3dCommonlib.getExn(data);
                      var entryExtensionProtocolConfigStr = match[4];
                      var init = $$package.protocol;
                      var tmp = entryExtensionProtocolConfigStr === "" ? $$package.protocolConfigStr : entryExtensionProtocolConfigStr;
                      return Most.just({
                                  id: $$package.id,
                                  protocol: {
                                    version: match[1],
                                    name: init.name,
                                    iconBase64: match[3]
                                  },
                                  entryExtensionName: $$package.entryExtensionName,
                                  version: match[2],
                                  name: $$package.name,
                                  binaryFile: match[0],
                                  isStart: $$package.isStart,
                                  protocolConfigStr: tmp
                                });
                    }), __x));
          return Js_promise.then_((function ($$package) {
                        return Promise.resolve(ListSt$Meta3dCommonlib.push(result, $$package));
                      }), __x$1);
        }));
  var __x$1 = Js_promise.then_((function (selectedPackages) {
          var __x = ListSt$Meta3dCommonlib.traverseReducePromiseM(selectedExtensions, /* [] */0, (function (result, extension) {
                  var __x = service.backend.findNewestPublishExtension((function (progress) {
                          
                        }), extension.data.extensionPackageData.name, extension.data.extensionPackageData.protocol.name);
                  var __x$1 = MostUtils$Frontend.toPromise(Most.flatMap((function (param) {
                              var match = param[1];
                              var protocolDescription = match[4];
                              var protocolRepoLink = match[3];
                              var protocolDisplayName = match[2];
                              var match$1 = param[0];
                              return Most.just([
                                          [
                                            {
                                              id: extension.id,
                                              protocolName: extension.data.extensionPackageData.protocol.name,
                                              protocolVersion: match[0],
                                              protocolIconBase64: match[1],
                                              protocolDisplayName: protocolDisplayName,
                                              protocolRepoLink: protocolRepoLink,
                                              protocolDescription: protocolDescription,
                                              data: service.meta3d.loadExtension(match$1[4]),
                                              version: match$1[3],
                                              account: match$1[5]
                                            },
                                            OptionSt$Meta3dCommonlib.fromNullable(param[2])
                                          ],
                                          [
                                            protocolDisplayName,
                                            protocolRepoLink,
                                            protocolDescription
                                          ]
                                        ]);
                            }), __x));
                  return Js_promise.then_((function (extensionData) {
                                return Promise.resolve(ListSt$Meta3dCommonlib.push(result, extensionData));
                              }), __x$1);
                }));
          return Js_promise.then_((function (selectedExtensions) {
                        return Promise.resolve([
                                    selectedPackages,
                                    selectedExtensions
                                  ]);
                      }), __x);
        }), __x);
  var __x$2 = Js_promise.then_((function (param) {
          var selectedExtensions = param[1];
          var selectedPackages = param[0];
          var __x = ListSt$Meta3dCommonlib.traverseReducePromiseM(selectedContributes, /* [] */0, (function (result, contribute) {
                  var __x = service.backend.findNewestPublishContribute((function (progress) {
                          
                        }), contribute.data.contributePackageData.name, contribute.data.contributePackageData.protocol.name);
                  var __x$1 = MostUtils$Frontend.toPromise(Most.flatMap((function (param) {
                              var match = param[1];
                              var match$1 = param[0];
                              return Most.just([
                                          {
                                            id: contribute.id,
                                            protocolName: contribute.data.contributePackageData.protocol.name,
                                            protocolVersion: match[0],
                                            protocolIconBase64: match[1],
                                            data: service.meta3d.loadContribute(match$1[4]),
                                            version: match$1[3],
                                            account: match$1[5]
                                          },
                                          OptionSt$Meta3dCommonlib.fromNullable(param[2])
                                        ]);
                            }), __x));
                  return Js_promise.then_((function (contributeData) {
                                return Promise.resolve(ListSt$Meta3dCommonlib.push(result, contributeData));
                              }), __x$1);
                }));
          return Js_promise.then_((function (selectedContributes) {
                        return Promise.resolve([
                                    selectedPackages,
                                    selectedExtensions,
                                    selectedContributes
                                  ]);
                      }), __x);
        }), __x$1);
  return Js_promise.then_((function (param) {
                var selectedContributesForAppStore = param[2];
                var selectedExtensionsForAppStoreEdit = param[1];
                var selectedPackagesForAppStore = param[0];
                Curry._1(setOperateInfo, (function (param) {
                        return "";
                      }));
                var match = _convertSelectedDataFromForAppStoreToForApAssembleStore(selectedPackagesForAppStore, selectedExtensionsForAppStoreEdit, selectedContributesForAppStore, [
                      startPackageProtocolName,
                      startExtensionProtocolName
                    ]);
                var selectedContributesForApAssembleStore = match[2];
                var selectedPackagesForApAssembleStore = match[0];
                service.app.dispatchUpdateSelectedPackagesAndExtensionsAndContributesAction(dispatchForAppStore, dispatchForApAssembleStore, dispatchForPackageAssembleStore, [
                      selectedPackagesForAppStore,
                      ListSt$Meta3dCommonlib.map(selectedExtensionsForAppStoreEdit, (function (param) {
                              return param[0];
                            })),
                      selectedContributesForAppStore
                    ], [
                      selectedPackagesForApAssembleStore,
                      match[1],
                      selectedContributesForApAssembleStore
                    ], _convertSelectedDataFromForApAssembleStoreToForPackageAssembleStore(selectedPackagesForApAssembleStore, selectedExtensionsForAppStoreEdit, selectedContributesForApAssembleStore, [
                          startPackageProtocolName,
                          startExtensionProtocolName
                        ]));
                return Promise.resolve(undefined);
              }), __x$2);
}

function buildOperateInfoDefault(param) {
  return "";
}

var Method = {
  _buildNodes: _buildNodes,
  _buildNodeErrorInfo: _buildNodeErrorInfo,
  _getNodeId: _getNodeId,
  _checkDuplicateNode: _checkDuplicateNode,
  _getEmptyNodeTitle: _getEmptyNodeTitle,
  _isNeedUpdateNodeInData: _isNeedUpdateNodeInData,
  _updateNodeInData: _updateNodeInData,
  _updateNodesDataForNonEmptyNode: _updateNodesDataForNonEmptyNode,
  _updateNodesDataForEmptyNode: _updateNodesDataForEmptyNode,
  _updateEdgesData: _updateEdgesData,
  _buildDependenciesData: _buildDependenciesData,
  _buildData: _buildData,
  _convertNodesData: _convertNodesData,
  _convertEdgesData: _convertEdgesData,
  _notHasEmptyNode: _notHasEmptyNode,
  useEffectOnce: useEffectOnce,
  _findStartPackageProtocolName: _findStartPackageProtocolName,
  _findStartExtensionProtocolName: _findStartExtensionProtocolName,
  _convertSelectedDataFromForAppStoreToForApAssembleStore: _convertSelectedDataFromForAppStoreToForApAssembleStore,
  _convertSelectedDataFromForApAssembleStoreToForPackageAssembleStore: _convertSelectedDataFromForApAssembleStoreToForPackageAssembleStore,
  autoUpgradeVersion: autoUpgradeVersion,
  buildOperateInfoDefault: buildOperateInfoDefault
};

function DependencyGraphUtils(Props) {
  var service = Props.service;
  var markIsPassDependencyGraphCheck = Props.markIsPassDependencyGraphCheck;
  var selectedPackages = Props.selectedPackages;
  var storedPackageIdsInApp = Props.storedPackageIdsInApp;
  var selectedExtensions = Props.selectedExtensions;
  var selectedContributes = Props.selectedContributes;
  var dispatchForAppStore = Curry._1(service.app.useDispatch, undefined);
  var dispatchForApAssembleStore = ReduxUtils$Frontend.ApAssemble.useDispatch(service.react.useDispatch);
  var dispatchForPackageAssembleStore = ReduxUtils$Frontend.PackageAssemble.useDispatch(service.react.useDispatch);
  var match = Curry._1(service.react.useState, (function (param) {
          return ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
        }));
  var setData = match[1];
  var data = match[0];
  var match$1 = Curry._1(service.react.useState, (function (param) {
          return "";
        }));
  var setOperateInfo = match$1[1];
  var operateInfo = match$1[0];
  var match$2 = AppUtils$Frontend.splitPackages(selectedPackages, storedPackageIdsInApp);
  var allPackagesStoredInApp = match$2[1];
  var allPackagesNotStoredInApp = match$2[0];
  service.react.useEffect1((function (param) {
          MessageUtils$Frontend.showCatchedErrorMessageWithFunc((function (param) {
                  useEffectOnce(setData, service, markIsPassDependencyGraphCheck, [
                        [
                          ListSt$Meta3dCommonlib.fromArray(allPackagesNotStoredInApp),
                          ListSt$Meta3dCommonlib.fromArray(allPackagesStoredInApp)
                        ],
                        selectedExtensions,
                        selectedContributes
                      ]);
                }), (function (param) {
                  Curry._1(markIsPassDependencyGraphCheck, false);
                }), 5);
        }), [
        selectedPackages,
        selectedExtensions,
        selectedContributes
      ]);
  if (Caml_obj.equal(data, ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined))) {
    return "请指定启动扩展";
  } else {
    return React.createElement(React.Fragment, undefined, React.createElement("p", undefined, operateInfo), operateInfo === "" ? React.createElement(Antd.Button, {
                      onClick: (function (param) {
                          MessageUtils$Frontend.showCatchedErrorMessage((function (param) {
                                  autoUpgradeVersion(service, setOperateInfo, dispatchForAppStore, dispatchForApAssembleStore, dispatchForPackageAssembleStore, selectedPackages, selectedExtensions, selectedContributes);
                                }), 5);
                        }),
                      children: "自动升级版本"
                    }) : null, React.createElement(Graphs.FlowAnalysisGraph, {
                    behaviors: [
                      "drag-canvas",
                      "zoom-canvas",
                      "drag-node"
                    ],
                    nodeCfg: {
                      autoWidth: true,
                      items: {
                        layout: "follow"
                      },
                      title: {
                        containerStyle: (function (node) {
                            if (node.isEmpty) {
                              var match = node.emptyNodeType;
                              return {
                                      fill: match ? "red" : "#ED9121"
                                    };
                            }
                            var match$1 = node.nodeType;
                            var tmp;
                            switch (match$1) {
                              case /* Extension */0 :
                                  tmp = "#1E90FF";
                                  break;
                              case /* Contribute */1 :
                                  tmp = "#008000";
                                  break;
                              case /* PackageExtension */2 :
                                  tmp = "#87CEFA";
                                  break;
                              case /* PackageContribute */3 :
                                  tmp = "#00FF00";
                                  break;
                              case /* PackageStoredInApp */4 :
                                  tmp = "#FFD700";
                                  break;
                              
                            }
                            return {
                                    fill: tmp
                                  };
                          })
                      }
                    },
                    edgeCfg: {
                      endArrow: true,
                      style: (function (edge, $$event) {
                          var match = OptionSt$Meta3dCommonlib.getExn(ArraySt$Meta3dCommonlib.find($$event.cfg.nodes, (function (param) {
                                      return param._cfg.model.id === edge.target;
                                    })));
                          if (match._cfg.model.isEmpty) {
                            return {
                                    stroke: "#FF00FF"
                                  };
                          } else {
                            return {
                                    stroke: "#696969"
                                  };
                          }
                        })
                    },
                    markerCfg: (function (cfg) {
                        return {
                                show: ArraySt$Meta3dCommonlib.length(ArraySt$Meta3dCommonlib.filter(data.edges, (function (item) {
                                            return item.source === cfg.id;
                                          })))
                              };
                      }),
                    data: data
                  }));
  }
}

var make = DependencyGraphUtils;

export {
  Method ,
  make ,
}
/* antd Not a pure module */
