

import * as Remporium from "../../../../../../../../../node_modules/remporium/lib/es6_global/src/Remporium.bs.js";
import * as Fbemitter from "fbemitter";
import * as AppStoreType$Frontend from "../utils/utils/assemble_space/AppStoreType.bs.js";
import * as EnterAppStore$Frontend from "../enter_app/store/EnterAppStore.bs.js";
import * as UserCenterStore$Frontend from "../user_center/store/UserCenterStore.bs.js";
import * as AssembleSpaceStore$Frontend from "../assemble_space/store/AssembleSpaceStore.bs.js";

function reducer(state, action) {
  if (action.RE_EXN_ID === AppStoreType$Frontend.UserCenterAction) {
    return {
            userCenterState: UserCenterStore$Frontend.reducer(state.userCenterState, action._1),
            enterAppState: state.enterAppState,
            assembleSpaceState: state.assembleSpaceState,
            eventEmitter: state.eventEmitter
          };
  }
  if (action.RE_EXN_ID === AppStoreType$Frontend.EnterAppAction) {
    return {
            userCenterState: state.userCenterState,
            enterAppState: EnterAppStore$Frontend.reducer(state.enterAppState, action._1),
            assembleSpaceState: state.assembleSpaceState,
            eventEmitter: state.eventEmitter
          };
  }
  if (action.RE_EXN_ID === AppStoreType$Frontend.AssembleSpaceAction) {
    return {
            userCenterState: state.userCenterState,
            enterAppState: state.enterAppState,
            assembleSpaceState: AssembleSpaceStore$Frontend.reducer(state.assembleSpaceState, action._1),
            eventEmitter: state.eventEmitter
          };
  }
  throw {
        RE_EXN_ID: "Match_failure",
        _1: [
          "AppStore.res",
          17,
          2
        ],
        Error: new Error()
      };
}

var initialState_eventEmitter = new Fbemitter.EventEmitter();

var initialState = {
  userCenterState: UserCenterStore$Frontend.initialState,
  enterAppState: EnterAppStore$Frontend.initialState,
  assembleSpaceState: AssembleSpaceStore$Frontend.initialState,
  eventEmitter: initialState_eventEmitter
};

var store = Remporium.makeStore(initialState, reducer);

var AppStore = Remporium.CreateModule({});

var useDispatch = AppStore.useDispatch;

var useSelector = AppStore.useSelector;

export {
  reducer ,
  initialState ,
  store ,
  AppStore ,
  useDispatch ,
  useSelector ,
}
/* initialState Not a pure module */
