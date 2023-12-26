

import * as Antd from "antd";
import * as Most from "most";
import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Js_promise from "../../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as AppStore$Frontend from "../../store/AppStore.bs.js";
import * as RescriptReactRouter from "../../../../../../../../../../node_modules/@rescript/react/lib/es6_global/src/RescriptReactRouter.bs.js";
import * as AppStoreType$Frontend from "../../utils/utils/assemble_space/AppStoreType.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";

import 'antd/dist/reset.css'
;

function Register(Props) {
  var service = Props.service;
  var dispatch = Curry._1(AppStore$Frontend.useDispatch, undefined);
  var _onFinish = function (values) {
    var account = values.account;
    var __x = Curry._1(service.backend.checkUserName, account);
    var __x$1 = Most.drain(Most.flatMap((function (isPass) {
                if (isPass) {
                  var __x = Curry._1(service.backend.registerUser, account);
                  return Most.tap((function (param) {
                                Curry._1(dispatch, {
                                      RE_EXN_ID: AppStoreType$Frontend.UserCenterAction,
                                      _1: {
                                        TAG: /* SetAccount */9,
                                        _0: account
                                      }
                                    });
                                RescriptReactRouter.push("/");
                              }), __x);
                }
                service.console.error("邮箱已经存在，请重新输入新的邮箱", 2);
                return Most.empty();
              }), __x));
    return Js_promise.$$catch((function (e) {
                  return service.console.errorWithExn(e, undefined);
                }), __x$1);
  };
  var _onFinishFailed = function (errorInfo) {
    service.console.error("Failed: " + JSON.stringify(errorInfo) + "", 2);
  };
  return React.createElement(Antd.Layout, {
              children: React.createElement(Antd.Layout.Content, {
                    children: React.createElement(Antd.Form, {
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
                          onFinishFailed: _onFinishFailed,
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
                              children: React.createElement(Antd.Button, {
                                    htmlType: "submit",
                                    children: "注册",
                                    type: "primary"
                                  }),
                              wrapperCol: {
                                offset: 8,
                                span: 16
                              }
                            }))
                  })
            });
}

var make = Register;

export {
  make ,
}
/*  Not a pure module */
