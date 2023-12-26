

import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_string from "../../../../../../../../../../node_modules/rescript/lib/es6/js_string.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as VersionConfig$Frontend from "./config/VersionConfig.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function getElementContributeProtocolName(param) {
  return "meta3d-element-assemble-element-protocol";
}

function getElementContributeVersion(param) {
  return VersionConfig$Frontend.getPlatformVersion(undefined);
}

function getElementContributeProtocolVersion(param) {
  return "^" + VersionConfig$Frontend.getPlatformVersion(undefined) + "";
}

function buildContribute(version, data, idOpt, param) {
  var id = idOpt !== undefined ? idOpt : "";
  return {
          id: id,
          protocolIconBase64: "",
          protocolConfigStr: undefined,
          version: version,
          data: data
        };
}

function _handleProtocolName(name) {
  return Js_string.replaceByRe(/_/g, "-", name);
}

function buildCustomInputProtocolNamePrefix(param) {
  return "-input-custom-";
}

function buildCustomActionProtocolNamePrefix(param) {
  return "-action-custom-";
}

function _buildPackageData(account, name, protocolName) {
  return {
          name: name,
          version: VersionConfig$Frontend.getPlatformVersion(undefined),
          account: account,
          protocol: {
            name: protocolName,
            version: getElementContributeProtocolVersion(undefined)
          },
          displayName: "",
          repoLink: "",
          description: "",
          dependentPackageStoredInAppProtocolNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          dependentBlockProtocolNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
        };
}

function _addGeneratedContributeForElementAssemble(param, selectedContributes, account, param$1, protocolName) {
  var name = param$1[0];
  var __x = param[1](param[0](_buildPackageData(account, name, protocolName), param$1[1]));
  return ListSt$Meta3dCommonlib.push(selectedContributes, buildContribute(VersionConfig$Frontend.getPlatformVersion(undefined), __x, name, undefined));
}

function _addGeneratedContributeForRunApp(param, allContributeDataList, account, param$1, protocolName) {
  var match = Curry._1(param[1], Curry._2(param[0], _buildPackageData(account, param$1[0], protocolName), param$1[1]));
  return ListSt$Meta3dCommonlib.push(allContributeDataList, {
              contributePackageData: match.contributePackageData,
              contributeFuncData: Curry._1(param[2], match.contributeFuncData)
            });
}

function buildCustomInputProtocolName(name) {
  return _handleProtocolName("meta3d-input-custom-" + name + "-protocol");
}

function buildCustomActionProtocolName(name) {
  return _handleProtocolName("meta3d-action-custom-" + name + "-protocol");
}

function addGeneratedInputContributesForElementAssemble(param, selectedContributes, account, customInputs) {
  var loadContribute = param[1];
  var generateContribute = param[0];
  return ListSt$Meta3dCommonlib.reduce(customInputs, selectedContributes, (function (selectedContributes, param) {
                var name = param.name;
                return _addGeneratedContributeForElementAssemble([
                            generateContribute,
                            loadContribute
                          ], selectedContributes, account, [
                            name,
                            OptionSt$Meta3dCommonlib.getExn(param.transpiledFileStr)
                          ], buildCustomInputProtocolName(name));
              }));
}

function addGeneratedInputContributesForRunApp(param, allContributeDataList, account, customInputs) {
  var convertContributeFuncData = param[2];
  var loadContribute = param[1];
  var generateContribute = param[0];
  return ListSt$Meta3dCommonlib.reduce(customInputs, allContributeDataList, (function (allContributeDataList, param) {
                var name = param.name;
                return _addGeneratedContributeForRunApp([
                            generateContribute,
                            loadContribute,
                            convertContributeFuncData
                          ], allContributeDataList, account, [
                            name,
                            OptionSt$Meta3dCommonlib.getExn(param.transpiledFileStr)
                          ], buildCustomInputProtocolName(name));
              }));
}

function addGeneratedActionContributesForElementAssemble(param, selectedContributes, account, customActions) {
  var loadContribute = param[1];
  var generateContribute = param[0];
  return ListSt$Meta3dCommonlib.reduce(customActions, selectedContributes, (function (selectedContributes, param) {
                var name = param.name;
                return _addGeneratedContributeForElementAssemble([
                            generateContribute,
                            loadContribute
                          ], selectedContributes, account, [
                            name,
                            OptionSt$Meta3dCommonlib.getExn(param.transpiledFileStr)
                          ], buildCustomActionProtocolName(name));
              }));
}

function addGeneratedActionContributesForRunApp(param, allContributeDataList, account, customActions) {
  var convertContributeFuncData = param[2];
  var loadContribute = param[1];
  var generateContribute = param[0];
  return ListSt$Meta3dCommonlib.reduce(customActions, allContributeDataList, (function (allContributeDataList, param) {
                var name = param.name;
                return _addGeneratedContributeForRunApp([
                            generateContribute,
                            loadContribute,
                            convertContributeFuncData
                          ], allContributeDataList, account, [
                            name,
                            OptionSt$Meta3dCommonlib.getExn(param.transpiledFileStr)
                          ], buildCustomActionProtocolName(name));
              }));
}

export {
  getElementContributeProtocolName ,
  getElementContributeVersion ,
  getElementContributeProtocolVersion ,
  buildContribute ,
  _handleProtocolName ,
  buildCustomInputProtocolNamePrefix ,
  buildCustomActionProtocolNamePrefix ,
  _buildPackageData ,
  _addGeneratedContributeForElementAssemble ,
  _addGeneratedContributeForRunApp ,
  buildCustomInputProtocolName ,
  buildCustomActionProtocolName ,
  addGeneratedInputContributesForElementAssemble ,
  addGeneratedInputContributesForRunApp ,
  addGeneratedActionContributesForElementAssemble ,
  addGeneratedActionContributesForRunApp ,
}
/* No side effect */
