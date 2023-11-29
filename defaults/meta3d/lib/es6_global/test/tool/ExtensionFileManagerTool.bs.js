

import * as Caml_option from "../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Main$Meta3d from "../../src/Main.bs.js";
import * as PackageManagerTool$Meta3d from "./PackageManagerTool.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function generateExtension(name, protocolOpt, versionOpt, accountOpt, displayNameOpt, repoLinkOpt, descriptionOpt, fileStrOpt, dependentPackageStoredInAppProtocolNameMapOpt, dependentBlockProtocolNameMapOpt, param) {
  var protocol = protocolOpt !== undefined ? protocolOpt : ({
        name: "e1-protocol",
        version: "^0.0.1"
      });
  var version = versionOpt !== undefined ? versionOpt : "0.0.1";
  var account = accountOpt !== undefined ? accountOpt : "meta3d";
  var displayName = displayNameOpt !== undefined ? displayNameOpt : "";
  var repoLink = repoLinkOpt !== undefined ? repoLinkOpt : "";
  var description = descriptionOpt !== undefined ? descriptionOpt : "";
  var fileStr = fileStrOpt !== undefined ? fileStrOpt : PackageManagerTool$Meta3d.buildEmptyExtensionFileStr(undefined);
  var dependentPackageStoredInAppProtocolNameMap = dependentPackageStoredInAppProtocolNameMapOpt !== undefined ? Caml_option.valFromOption(dependentPackageStoredInAppProtocolNameMapOpt) : ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
  var dependentBlockProtocolNameMap = dependentBlockProtocolNameMapOpt !== undefined ? Caml_option.valFromOption(dependentBlockProtocolNameMapOpt) : ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
  return Main$Meta3d.generateExtension({
              name: name,
              version: version,
              account: account,
              protocol: protocol,
              displayName: displayName,
              repoLink: repoLink,
              description: description,
              dependentPackageStoredInAppProtocolNameMap: dependentPackageStoredInAppProtocolNameMap,
              dependentBlockProtocolNameMap: dependentBlockProtocolNameMap
            }, fileStr);
}

function generateContribute(name, protocolOpt, versionOpt, accountOpt, displayNameOpt, repoLinkOpt, descriptionOpt, fileStrOpt, dependentPackageStoredInAppProtocolNameMapOpt, dependentBlockProtocolNameMapOpt, param) {
  var protocol = protocolOpt !== undefined ? protocolOpt : ({
        name: "c1-protocol",
        version: "^0.0.1"
      });
  var version = versionOpt !== undefined ? versionOpt : "0.0.1";
  var account = accountOpt !== undefined ? accountOpt : "meta3d";
  var displayName = displayNameOpt !== undefined ? displayNameOpt : "";
  var repoLink = repoLinkOpt !== undefined ? repoLinkOpt : "";
  var description = descriptionOpt !== undefined ? descriptionOpt : "";
  var fileStr = fileStrOpt !== undefined ? fileStrOpt : PackageManagerTool$Meta3d.buildEmptyContributeFileStr(undefined);
  var dependentPackageStoredInAppProtocolNameMap = dependentPackageStoredInAppProtocolNameMapOpt !== undefined ? Caml_option.valFromOption(dependentPackageStoredInAppProtocolNameMapOpt) : ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
  var dependentBlockProtocolNameMap = dependentBlockProtocolNameMapOpt !== undefined ? Caml_option.valFromOption(dependentBlockProtocolNameMapOpt) : ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
  return Main$Meta3d.generateContribute({
              name: name,
              version: version,
              account: account,
              protocol: protocol,
              displayName: displayName,
              repoLink: repoLink,
              description: description,
              dependentPackageStoredInAppProtocolNameMap: dependentPackageStoredInAppProtocolNameMap,
              dependentBlockProtocolNameMap: dependentBlockProtocolNameMap
            }, fileStr);
}

export {
  generateExtension ,
  generateContribute ,
}
/* Main-Meta3d Not a pure module */
