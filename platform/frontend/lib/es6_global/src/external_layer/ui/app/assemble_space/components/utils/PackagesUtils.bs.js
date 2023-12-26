

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";

import 'antd/dist/reset.css'
;

function getDifferenceSet(packages, selectedPackageNames) {
  return ArraySt$Meta3dCommonlib.filter(packages, (function (param) {
                return !ListSt$Meta3dCommonlib.includes(selectedPackageNames, param.name);
              }));
}

var Method = {
  getDifferenceSet: getDifferenceSet
};

function PackagesUtils(Props) {
  var service = Props.service;
  var selectedPackagesFromMarket = Props.selectedPackagesFromMarket;
  var selectedPackageNames = Props.selectedPackageNames;
  var useDispatch = Props.useDispatch;
  var selectPackage = Props.selectPackage;
  var dispatch = Curry._1(useDispatch, service.react.useDispatch);
  return React.createElement(Antd.List, {
              grid: {
                gutter: 16,
                column: 2
              },
              dataSource: getDifferenceSet(ListSt$Meta3dCommonlib.toArray(selectedPackagesFromMarket), selectedPackageNames),
              renderItem: (function ($$package) {
                  var name = $$package.name;
                  return React.createElement(Antd.List.Item, {
                              children: React.createElement(Antd.Card, {
                                    key: name,
                                    onClick: (function (param) {
                                        Curry._2(selectPackage, dispatch, $$package);
                                      }),
                                    bodyStyle: {
                                      padding: "0px"
                                    },
                                    cover: React.createElement(Antd.Image, {
                                          preview: false,
                                          width: 50,
                                          height: 50,
                                          src: $$package.protocol.iconBase64
                                        }),
                                    children: React.createElement(Antd.Card.Meta, {
                                          title: React.createElement("span", {
                                                style: {
                                                  whiteSpace: "normal",
                                                  wordBreak: "break-all",
                                                  wordWrap: "break-word"
                                                }
                                              }, name)
                                        })
                                  })
                            });
                })
            });
}

var make = PackagesUtils;

export {
  Method ,
  make ,
}
/*  Not a pure module */
