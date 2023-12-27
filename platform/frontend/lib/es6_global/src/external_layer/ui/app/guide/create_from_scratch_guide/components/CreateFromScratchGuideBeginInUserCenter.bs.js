

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Nav$Frontend from "../../../nav/components/Nav.bs.js";
import * as AppStore$Frontend from "../../../store/AppStore.bs.js";
import * as LinkUtils$Frontend from "../../../utils/LinkUtils.bs.js";
import * as GuideUtils$Frontend from "../../../utils/GuideUtils.bs.js";
import * as RescriptReactRouter from "../../../../../../../../../../../node_modules/@rescript/react/lib/es6_global/src/RescriptReactRouter.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as PublishedAppUtils$Frontend from "../../../utils/PublishedAppUtils.bs.js";

import 'antd/dist/reset.css'
;

function CreateFromScratchGuideBeginInUserCenter(Props) {
  var account = Props.account;
  Curry._1(AppStore$Frontend.useDispatch, undefined);
  return React.createElement(Antd.Layout, {
              children: null
            }, React.createElement(Antd.Layout.Header, {
                  children: React.createElement(Nav$Frontend.make, {
                        currentKey: "1",
                        navTarget: NullableSt$Meta3dCommonlib.getEmpty(undefined),
                        account: account
                      })
                }), React.createElement(Antd.Layout.Content, {
                  children: null
                }, GuideUtils$Frontend.buildSteps((function (param) {
                        RescriptReactRouter.push("/UserCenter");
                      }), 0, GuideUtils$Frontend.buildCreateFromScratchStepData(undefined)), React.createElement(Antd.Button, {
                      onClick: (function (param) {
                          LinkUtils$Frontend.openLink(PublishedAppUtils$Frontend.buildURL("meta3d", "最简单的编辑器1"));
                        }),
                      children: "提前预览最终成果",
                      type: "link"
                    })));
}

var make = CreateFromScratchGuideBeginInUserCenter;

export {
  make ,
}
/*  Not a pure module */
