

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as AppStore$Frontend from "../../store/AppStore.bs.js";
import * as IntUtils$Frontend from "../../assemble_space/components/utils/IntUtils.bs.js";
import * as GuideUtils$Frontend from "../../utils/GuideUtils.bs.js";
import * as ReactUtils$Frontend from "../../utils/ReactUtils.bs.js";
import * as ReduxUtils$Frontend from "../../utils/utils/ReduxUtils.bs.js";
import * as RescriptReactRouter from "../../../../../../../../../../node_modules/@rescript/react/lib/es6_global/src/RescriptReactRouter.bs.js";
import * as MessageUtils$Frontend from "../../utils/utils/MessageUtils.bs.js";

import 'antd/dist/reset.css'
;

function Help(Props) {
  var guideTarget = Props.guideTarget;
  var dispatch = Curry._1(AppStore$Frontend.useDispatch, undefined);
  var dispatchForElementAssembleStore = ReduxUtils$Frontend.ElementAssemble.useDispatch(ReactUtils$Frontend.useDispatchForAssembleSpaceStore);
  var match = Curry._1(AppStore$Frontend.useSelector, (function (param) {
          return param.userCenterState;
        }));
  var release = match.release;
  var tmp;
  if (release !== undefined) {
    var releaseDateUntilNow = release.releaseDateUntilNow;
    tmp = React.createElement(React.Fragment, undefined, React.createElement(Antd.Typography.Title, {
              level: 5,
              children: "Meta3D " + release.version + ""
            }), React.createElement(Antd.Typography.Title, {
              level: 5,
              children: releaseDateUntilNow === 0 ? "今天" : "" + IntUtils$Frontend.intToString(releaseDateUntilNow) + "天前更新"
            }));
  } else {
    tmp = null;
  }
  return React.createElement(React.Fragment, undefined, React.createElement(Antd.Card, {
                  key: "0",
                  children: React.createElement(Antd.Tooltip, {
                        title: "来点个star吧，感恩~",
                        placement: "right",
                        children: React.createElement("iframe", {
                              style: {
                                borderWidth: "0px"
                              },
                              title: "GitHub",
                              height: "30",
                              scrolling: "0",
                              src: "https://ghbtns.com/github-btn.html?user=Meta3D-Technology&repo=Meta3D&type=star&count=true&size=large",
                              width: "170"
                            })
                      })
                }), React.createElement(Antd.Card, {
                  key: "1",
                  children: React.createElement("section", {
                        ref: guideTarget
                      }, React.createElement(Antd.Tooltip, {
                            title: "打开“从头创建新的编辑器”的引导",
                            children: React.createElement(Antd.Button, {
                                  onClick: (function (param) {
                                      GuideUtils$Frontend.startCreateFromScratchTour(dispatch, dispatchForElementAssembleStore);
                                      RescriptReactRouter.push("/CreateFromScratchGuideBeginInUserCenter");
                                    }),
                                  children: "打开新人引导",
                                  type: "primary"
                                })
                          }), React.createElement(Antd.Tooltip, {
                            title: "当您执行某些操作时，会打开对应的帮助文档",
                            children: React.createElement(Antd.Button, {
                                  onClick: (function (param) {
                                      GuideUtils$Frontend.markIsFinishShowInput(false);
                                      GuideUtils$Frontend.markIsFinishShowAction(false);
                                      MessageUtils$Frontend.success("成功", undefined);
                                    }),
                                  children: "打开帮助文档",
                                  type: "default"
                                })
                          }))
                }), React.createElement(Antd.Card, {
                  key: "2",
                  children: React.createElement("span", undefined, React.createElement("a", {
                            href: "http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=r1Z4Z5uToIO1dISsXvdJvQOtFr3IoPJx&authKey=Ft1KpywYZrlO4yUGQj5jCliI4DaVf4hkM5jiiZtm195Ei4bSNiwo1SHEogLcrc%2Fp&noverify=0&group_code=568338939",
                            target: "_blank"
                          }, "点这里"), "加QQ群")
                }), React.createElement(Antd.Card, {
                  key: "3",
                  children: React.createElement("span", undefined, React.createElement("a", {
                            href: "https://meta3d-website.4everland.app/docs/%E7%AE%80%E4%BB%8B",
                            target: "_blank"
                          }, "文档"), "")
                }), React.createElement(Antd.Card, {
                  key: "4",
                  children: React.createElement("span", undefined, React.createElement("a", {
                            href: "https://github.com/Meta3D-Technology/Meta3D/issues/new/choose",
                            target: "_blank"
                          }, "Github"), "上提Issue")
                }), React.createElement(Antd.Card, {
                  key: "5",
                  children: React.createElement("span", undefined, React.createElement("a", {
                            href: "https://github.com/Meta3D-Technology/Meta3D/discussions",
                            target: "_blank"
                          }, "论坛"), "上寻求帮助")
                }), tmp);
}

var make = Help;

export {
  make ,
}
/*  Not a pure module */
