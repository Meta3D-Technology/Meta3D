

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as ExtensionsContributesUtils$Frontend from "./ExtensionsContributesUtils.bs.js";

import 'antd/dist/reset.css'
;

function getDifferenceSet(selectedContributesFromMarket, selectedContributeNames) {
  return ArraySt$Meta3dCommonlib.filter(selectedContributesFromMarket, (function (param) {
                return !ListSt$Meta3dCommonlib.includes(selectedContributeNames, param[0].data.contributePackageData.name);
              }));
}

var Method = {
  getDifferenceSet: getDifferenceSet
};

function ContributesUtils(Props) {
  var service = Props.service;
  var selectedContributesFromMarket = Props.selectedContributesFromMarket;
  var selectedContributeNames = Props.selectedContributeNames;
  var useDispatch = Props.useDispatch;
  var selectContribute = Props.selectContribute;
  var dispatch = Curry._1(useDispatch, service.react.useDispatch);
  return React.createElement(Antd.List, {
              grid: {
                gutter: 16,
                column: 2
              },
              dataSource: getDifferenceSet(ListSt$Meta3dCommonlib.toArray(selectedContributesFromMarket), selectedContributeNames),
              renderItem: (function (param) {
                  var protocolConfigOpt = param[1];
                  var contribute = param[0];
                  return React.createElement(Antd.List.Item, {
                              children: React.createElement(Antd.Card, {
                                    key: contribute.data.contributePackageData.displayName,
                                    onClick: (function (param) {
                                        Curry._4(selectContribute, dispatch, contribute.protocolIconBase64, ExtensionsContributesUtils$Frontend.getProtocolConfigStr(protocolConfigOpt), contribute);
                                      }),
                                    bodyStyle: {
                                      padding: "0px"
                                    },
                                    cover: React.createElement(Antd.Image, {
                                          preview: false,
                                          width: 50,
                                          height: 50,
                                          src: contribute.protocolIconBase64
                                        }),
                                    children: React.createElement(Antd.Card.Meta, {
                                          title: React.createElement("span", {
                                                style: {
                                                  whiteSpace: "normal",
                                                  wordBreak: "break-all",
                                                  wordWrap: "break-word"
                                                }
                                              }, contribute.data.contributePackageData.displayName)
                                        })
                                  })
                            });
                })
            });
}

var make = ContributesUtils;

export {
  Method ,
  make ,
}
/*  Not a pure module */
