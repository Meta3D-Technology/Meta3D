

import * as Antd from "antd";
import * as Most from "most";
import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Caml_array from "../../../../../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as Js_promise from "../../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Loading$Frontend from "../../loading/components/Loading.bs.js";
import * as AppStore$Frontend from "../../store/AppStore.bs.js";
import * as LinkUtils$Frontend from "../../utils/LinkUtils.bs.js";
import * as GuideUtils$Frontend from "../../utils/GuideUtils.bs.js";
import * as LoginUtils$Frontend from "../../utils/LoginUtils.bs.js";
import * as RescriptReactRouter from "../../../../../../../../../../node_modules/@rescript/react/lib/es6_global/src/RescriptReactRouter.bs.js";
import * as AppStoreType$Frontend from "../../utils/utils/assemble_space/AppStoreType.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";

import 'antd/dist/reset.css'
;

function Login(Props) {
  var service = Props.service;
  var dispatch = Curry._1(AppStore$Frontend.useDispatch, undefined);
  var match = React.useState(function () {
        return false;
      });
  var setIsLoginBegin = match[1];
  var _login = function (param) {
    if (NullableSt$Meta3dCommonlib.isNullable(window.ethereum)) {
      Curry._1(setIsLoginBegin, (function (param) {
              return false;
            }));
      return service.console.error("请开启MetaMask钱包", 2);
    }
    Curry._1(setIsLoginBegin, (function (param) {
            return true;
          }));
    var accountRef = {
      contents: 1
    };
    var match = window.ethereum;
    var __x = Most.fromPromise(Curry._1(match.request, {
              method: "eth_requestAccounts"
            }));
    var __x$1 = Most.map((function (accounts) {
            return Caml_array.get(accounts, 0);
          }), __x);
    var __x$2 = Most.flatMap((function (account) {
            accountRef.contents = account;
            return Curry._1(service.backend.handleLoginForWeb3, account);
          }), __x$1);
    var __x$3 = Most.drain(Most.tap((function (param) {
                LoginUtils$Frontend.saveAccount(accountRef.contents);
                Curry._1(dispatch, {
                      RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                      _1: {
                        TAG: /* SetAccount */9,
                        _0: accountRef.contents
                      }
                    });
                RescriptReactRouter.push("/");
              }), __x$2));
    var __x$4 = Js_promise.then_((function (param) {
            Curry._1(setIsLoginBegin, (function (param) {
                    return false;
                  }));
            return Promise.resolve(undefined);
          }), __x$3);
    Js_promise.$$catch((function (e) {
            return service.console.errorWithExn(e, undefined);
          }), __x$4);
  };
  var _onFinish = function (values) {
    var account = values.account;
    Curry._1(setIsLoginBegin, (function (param) {
            return true;
          }));
    var __x = Curry._1(service.backend.isLoginSuccess, account);
    return Most.drain(Most.tap((function (param) {
                      if (param[0]) {
                        LoginUtils$Frontend.login(dispatch, account);
                        return Curry._1(setIsLoginBegin, (function (param) {
                                      return false;
                                    }));
                      } else {
                        Curry._1(setIsLoginBegin, (function (param) {
                                return false;
                              }));
                        service.console.error(NullableSt$Meta3dCommonlib.getExn(param[1]), 2);
                        return ;
                      }
                    }), __x));
  };
  return React.createElement(React.Fragment, undefined, GuideUtils$Frontend.readIsFinishFirstLogin(undefined) ? React.createElement(Antd.Layout, {
                    children: React.createElement(Antd.Layout.Content, {
                          children: null
                        }, React.createElement(Antd.Space, {
                              direction: "vertical",
                              size: "large",
                              children: null
                            }, React.createElement(Antd.Typography.Paragraph, {
                                  children: null
                                }, React.createElement(Antd.Typography.Title, {
                                      children: "只需要邮箱即可登录"
                                    }), React.createElement(Antd.Form, {
                                      initialValues: {
                                        remember: true
                                      },
                                      labelCol: {
                                        span: 8
                                      },
                                      wrapperCol: {
                                        span: 6
                                      },
                                      autoComplete: "off",
                                      onFinish: _onFinish,
                                      onFinishFailed: (function (param) {
                                          return service.console.error("Failed: " + JSON.stringify(param) + "", 2);
                                        }),
                                      children: null
                                    }, React.createElement(Antd.Form.Item, {
                                          label: "邮箱",
                                          children: React.createElement(Antd.Input, {}),
                                          name: "account",
                                          rules: [{
                                              type: NullableSt$Meta3dCommonlib.$$return("email"),
                                              required: true,
                                              message: "请输入正确的邮箱"
                                            }]
                                        }), React.createElement(Antd.Form.Item, {
                                          children: null,
                                          wrapperCol: {
                                            offset: 8,
                                            span: 16
                                          }
                                        }, React.createElement(Antd.Button, {
                                              htmlType: "submit",
                                              children: "登录",
                                              type: "primary"
                                            }), React.createElement(Antd.Button, {
                                              onClick: (function (param) {
                                                  RescriptReactRouter.push("/Register");
                                                }),
                                              children: "快速注册"
                                            })))), React.createElement(Antd.Typography.Paragraph, {
                                  children: null
                                }, React.createElement(Antd.Typography.Title, {
                                      children: "或者使用MetaMask钱包登录"
                                    }), React.createElement(Antd.Button, {
                                      onClick: (function (param) {
                                          _login(undefined);
                                        }),
                                      children: "使用MetaMask钱包登录",
                                      type: "primary"
                                    }), React.createElement(Antd.Typography.Link, {
                                      href: "https://zhuanlan.zhihu.com/p/112285438",
                                      target: "_blank",
                                      children: "如何开启MetaMask钱包？"
                                    }))), match[0] ? React.createElement(Loading$Frontend.make, {
                                text: "加载中，请稍候"
                              }) : null)
                  }) : React.createElement(Antd.Modal, {
                    title: "欢迎来到Meta3D",
                    visible: true,
                    onOk: (function (param) {
                        GuideUtils$Frontend.markFinishFirstLogin(undefined);
                        RescriptReactRouter.push("/Login");
                      }),
                    onCancel: (function (param) {
                        GuideUtils$Frontend.markFinishFirstLogin(undefined);
                        RescriptReactRouter.push("/Login");
                      }),
                    footer: null,
                    children: React.createElement(Antd.Space, {
                          direction: "vertical",
                          children: null
                        }, React.createElement(Antd.Typography.Title, {
                              level: 2,
                              children: "Meta3D是开源Web3D低代码平台，致力于建设共享互助开放的Web3D生态，实现快速搭建Web3D编辑器"
                            }), React.createElement(Antd.Typography.Text, {
                              type: "warning",
                              children: "目前处于内测阶段，完全免费"
                            }), React.createElement(Antd.Space, {
                              direction: "horizontal",
                              children: null
                            }, React.createElement(Antd.Button, {
                                  onClick: (function (param) {
                                      GuideUtils$Frontend.markFinishFirstLogin(undefined);
                                      RescriptReactRouter.push("/Login");
                                    }),
                                  children: "登录",
                                  type: "primary"
                                }), React.createElement(Antd.Button, {
                                  onClick: (function (param) {
                                      LinkUtils$Frontend.openLink("https://meta3d-website.4everland.app/");
                                    }),
                                  children: "了解详情",
                                  type: "default"
                                })))
                  }));
}

var make = Login;

export {
  make ,
}
/*  Not a pure module */
