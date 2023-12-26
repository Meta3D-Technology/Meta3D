

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Publish$Frontend from "../publish/components/Publish.bs.js";
import * as Packages$Frontend from "../packages/Packages.bs.js";
import * as ApInspector$Frontend from "../ap_inspector/components/ApInspector.bs.js";
import * as Contributes$Frontend from "../contributes/components/Contributes.bs.js";
import * as ApController$Frontend from "../ap_controller/components/ApController.bs.js";
import * as PackageInspector$Frontend from "../package_inspector/components/PackageInspector.bs.js";
import * as SelectedPackages$Frontend from "../selected_packages/SelectedPackages.bs.js";
import * as ApDependencyGraph$Frontend from "../ap_dependency_graph/components/ApDependencyGraph.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as ExtensionInspector$Frontend from "../extension_Inspector/components/ExtensionInspector.bs.js";
import * as ContributeInspector$Frontend from "../contribute_Inspector/components/ContributeInspector.bs.js";
import * as SelectedContributes$Frontend from "../selected_contributes/components/SelectedContributes.bs.js";
import * as AssembleSpaceStoreType$Frontend from "../../../../utils/utils/assemble_space/AssembleSpaceStoreType.bs.js";

import 'antd/dist/reset.css'
;

function resetAllAssemble(dispatchForAssembleSpaceStore) {
  return Curry._1(dispatchForAssembleSpaceStore, {
              RE_EXN_ID: AssembleSpaceStoreType$Frontend.ResetWhenSwitch
            });
}

var Method = {
  resetAllAssemble: resetAllAssemble
};

function ApAssemble(Props) {
  var service = Props.service;
  var account = Props.account;
  var selectedPackagesFromMarket = Props.selectedPackagesFromMarket;
  var selectedContributesFromMarket = Props.selectedContributesFromMarket;
  var dispatchForAssembleSpaceStore = Curry._1(service.react.useDispatch, undefined);
  Curry._1(service.react.useEffectOnce, (function (param) {
          Curry._1(dispatchForAssembleSpaceStore, {
                RE_EXN_ID: AssembleSpaceStoreType$Frontend.ResetWhenSwitch
              });
          return [
                  undefined,
                  undefined
                ];
        }));
  return React.createElement(Antd.Layout, {
              children: null
            }, React.createElement(Antd.Layout.Content, {
                  children: React.createElement(Antd.Space, {
                        direction: "horizontal",
                        size: "small",
                        children: null
                      }, React.createElement(Publish$Frontend.make, {
                            service: service,
                            account: account,
                            publishButtonTarget: NullableSt$Meta3dCommonlib.getEmpty(undefined),
                            publishModalTarget: NullableSt$Meta3dCommonlib.getEmpty(undefined)
                          }), React.createElement(ApController$Frontend.make, {
                            service: service,
                            selectedPackagesFromMarket: selectedPackagesFromMarket,
                            selectedContributesFromMarket: selectedContributesFromMarket
                          }))
                }), React.createElement(Antd.Layout, {
                  children: null
                }, React.createElement(Antd.Layout.Sider, {
                      theme: "light",
                      children: React.createElement(Antd.Collapse, {
                            defaultActiveKey: ["1"],
                            children: null
                          }, React.createElement(Antd.Collapse.Panel, {
                                header: "Packages",
                                key: "1",
                                children: React.createElement(Packages$Frontend.make, {
                                      service: service,
                                      selectedPackagesFromMarket: selectedPackagesFromMarket
                                    })
                              }), React.createElement(Antd.Collapse.Panel, {
                                header: "Contributes",
                                key: "3",
                                children: React.createElement(Contributes$Frontend.make, {
                                      service: service,
                                      selectedContributesFromMarket: selectedContributesFromMarket
                                    })
                              }), React.createElement(Antd.Collapse.Panel, {
                                header: "Selected Packages",
                                key: "4",
                                children: React.createElement(SelectedPackages$Frontend.make, {
                                      service: service
                                    })
                              }), React.createElement(Antd.Collapse.Panel, {
                                header: "Selected Contributes",
                                key: "6",
                                children: React.createElement(SelectedContributes$Frontend.make, {
                                      service: service
                                    })
                              }))
                    }), React.createElement(Antd.Layout.Content, {
                      children: React.createElement(ApDependencyGraph$Frontend.make, {
                            service: service
                          })
                    }), React.createElement(Antd.Layout.Sider, {
                      theme: "light",
                      children: null
                    }, React.createElement(ExtensionInspector$Frontend.make, {
                          service: service
                        }), React.createElement(ContributeInspector$Frontend.make, {
                          service: service
                        }), React.createElement(PackageInspector$Frontend.make, {
                          service: service
                        }), React.createElement(ApInspector$Frontend.make, {
                          service: service
                        }))));
}

var make = ApAssemble;

export {
  Method ,
  make ,
}
/*  Not a pure module */
