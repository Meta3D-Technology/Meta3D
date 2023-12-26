

import * as Curry from "../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as RescriptReactRouter from "../../../../../../../../../node_modules/@rescript/react/lib/es6_global/src/RescriptReactRouter.bs.js";
import * as AppStoreType$Frontend from "./utils/assemble_space/AppStoreType.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as LocalStorageUtils$Frontend from "./LocalStorageUtils.bs.js";

function judgeToJumpToLogin(func, account) {
  if (account !== undefined) {
    return Curry._1(func, undefined);
  } else {
    return RescriptReactRouter.push("/Login");
  }
}

function _buildAccountKey(param) {
  return "meta3d_account";
}

function saveAccount(account) {
  return LocalStorageUtils$Frontend.set("meta3d_account", account);
}

function readAccount(param) {
  return OptionSt$Meta3dCommonlib.fromNullable(LocalStorageUtils$Frontend.get("meta3d_account"));
}

function logOut(param) {
  return LocalStorageUtils$Frontend.remove("meta3d_account");
}

function login(dispatch, account) {
  LocalStorageUtils$Frontend.set("meta3d_account", account);
  Curry._1(dispatch, {
        RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
        _1: {
          TAG: /* SetAccount */9,
          _0: account
        }
      });
  RescriptReactRouter.push("/");
}

export {
  judgeToJumpToLogin ,
  _buildAccountKey ,
  saveAccount ,
  readAccount ,
  logOut ,
  login ,
}
/* RescriptReactRouter Not a pure module */
