

import * as Antd from "antd";
import * as Most from "most";
import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as ReactDom from "react-dom";
import * as Js_promise from "../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Caml_option from "../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as App$Frontend from "./external_layer/ui/app/components/App.bs.js";
import * as AppStore$Frontend from "./external_layer/ui/app/store/AppStore.bs.js";
import * as EnvUtils$Frontend from "./external_layer/ui/app/utils/EnvUtils.bs.js";
import * as InitUtils$Frontend from "./external_layer/ui/app/utils/InitUtils.bs.js";
import * as MessageUtils$Frontend from "./external_layer/ui/app/utils/utils/MessageUtils.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as BackendCloudbase$Frontend from "./externals/backend_cloudbase/BackendCloudbase.bs.js";

var _hiddenLoadding = (function(){
    document.querySelector("#loading").style.display = "none"
    });

function _buildFrontendService(env) {
  return {
          backend: BackendCloudbase$Frontend.buildFrontendService(undefined),
          console: {
            error: MessageUtils$Frontend.error,
            errorWithExn: MessageUtils$Frontend.errorWithExn
          }
        };
}

Curry._1(_hiddenLoadding, undefined);

var service = _buildFrontendService(EnvUtils$Frontend.getEnv(undefined));

var __x = Most.drain(Curry._1(service.backend.init, InitUtils$Frontend.getBackendEnv(EnvUtils$Frontend.getEnv(undefined))));

Js_promise.then_((function (param) {
        return Promise.resolve((console.log("init backend success"), undefined));
      }), __x);

ReactDom.render(React.createElement(React.StrictMode, {
          children: React.createElement(AppStore$Frontend.AppStore.Provider.make, {
                store: AppStore$Frontend.store,
                children: React.createElement(Antd.ConfigProvider, {
                      theme: {
                        components: {
                          Layout: {
                            headerBg: "#ffffff",
                            headerPadding: "0 20px"
                          },
                          Button: {
                            textHoverBg: "#ffffff"
                          }
                        }
                      },
                      children: React.createElement(App$Frontend.make, {
                            service: service,
                            env: EnvUtils$Frontend.getEnv(undefined)
                          })
                    })
              })
        }), OptionSt$Meta3dCommonlib.getExn(Caml_option.nullable_to_opt(document.querySelector("#root"))));

export {
  _hiddenLoadding ,
  _buildFrontendService ,
  service ,
}
/*  Not a pure module */
