

import * as Antd from "antd";
import * as Curry from "../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as PublishPackage$Frontend from "../publish/components/PublishPackage.bs.js";
import * as PackagePackages$Frontend from "../packages/PackagePackages.bs.js";
import * as PackageController$Frontend from "../package_controller/components/PackageController.bs.js";
import * as PackageExtensions$Frontend from "../extensions/components/PackageExtensions.bs.js";
import * as PackageContributes$Frontend from "../contributes/components/PackageContributes.bs.js";
import * as AssembleSpaceStoreType$Frontend from "../../../../utils/utils/assemble_space/AssembleSpaceStoreType.bs.js";
import * as PackageDependencyGraph$Frontend from "../package_dependency_graph/components/PackageDependencyGraph.bs.js";
import * as PackageSelectedPackages$Frontend from "../selected_packages/PackageSelectedPackages.bs.js";
import * as PackageExtensionInspector$Frontend from "../extension_Inspector/components/PackageExtensionInspector.bs.js";
import * as PackageSelectedExtensions$Frontend from "../selected_extensions/components/PackageSelectedExtensions.bs.js";
import * as PackageContributeInspector$Frontend from "../contribute_Inspector/components/PackageContributeInspector.bs.js";
import * as PackageSelectedContributes$Frontend from "../selected_contributes/components/PackageSelectedContributes.bs.js";

import 'antd/dist/reset.css'
;

function resetAllAssemble(dispatch) {
  return Curry._1(dispatch, {
              RE_EXN_ID: AssembleSpaceStoreType$Frontend.ResetWhenSwitch
            });
}

var Method = {
  resetAllAssemble: resetAllAssemble
};

function PackageAssemble(Props) {
  var service = Props.service;
  var account = Props.account;
  var selectedPackagesFromMarket = Props.selectedPackagesFromMarket;
  var selectedExtensionsFromMarket = Props.selectedExtensionsFromMarket;
  var selectedContributesFromMarket = Props.selectedContributesFromMarket;
  var dispatch = Curry._1(service.react.useDispatch, undefined);
  Curry._1(service.react.useEffectOnce, (function (param) {
          Curry._1(dispatch, {
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
                      }, React.createElement(PublishPackage$Frontend.make, {
                            service: service,
                            account: account
                          }), React.createElement(PackageController$Frontend.make, {
                            service: service,
                            selectedPackagesFromMarket: selectedPackagesFromMarket,
                            selectedExtensionsFromMarket: selectedExtensionsFromMarket,
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
                                children: React.createElement(PackagePackages$Frontend.make, {
                                      service: service,
                                      selectedPackagesFromMarket: selectedPackagesFromMarket
                                    })
                              }), React.createElement(Antd.Collapse.Panel, {
                                header: "Extensions",
                                key: "2",
                                children: React.createElement(PackageExtensions$Frontend.make, {
                                      service: service,
                                      selectedExtensionsFromMarket: selectedExtensionsFromMarket
                                    })
                              }), React.createElement(Antd.Collapse.Panel, {
                                header: "Contributes",
                                key: "3",
                                children: React.createElement(PackageContributes$Frontend.make, {
                                      service: service,
                                      selectedContributesFromMarket: selectedContributesFromMarket
                                    })
                              }), React.createElement(Antd.Collapse.Panel, {
                                header: "Selected Packages",
                                key: "4",
                                children: React.createElement(PackageSelectedPackages$Frontend.make, {
                                      service: service
                                    })
                              }), React.createElement(Antd.Collapse.Panel, {
                                header: "Selected Extensions",
                                key: "5",
                                children: React.createElement(PackageSelectedExtensions$Frontend.make, {
                                      service: service
                                    })
                              }), React.createElement(Antd.Collapse.Panel, {
                                header: "Selected Contributes",
                                key: "6",
                                children: React.createElement(PackageSelectedContributes$Frontend.make, {
                                      service: service
                                    })
                              }))
                    }), React.createElement(Antd.Layout.Content, {
                      children: React.createElement(PackageDependencyGraph$Frontend.make, {
                            service: service
                          })
                    }), React.createElement(Antd.Layout.Sider, {
                      theme: "light",
                      children: null
                    }, React.createElement(PackageExtensionInspector$Frontend.make, {
                          service: service
                        }), React.createElement(PackageContributeInspector$Frontend.make, {}))));
}

var make = PackageAssemble;

export {
  Method ,
  make ,
}
/*  Not a pure module */
