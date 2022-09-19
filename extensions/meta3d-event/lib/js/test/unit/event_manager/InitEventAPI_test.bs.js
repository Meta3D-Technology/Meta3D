'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Sinon$1 = require("sinon");
var Caml_array = require("rescript/lib/js/caml_array.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Meta3d_jest = require("meta3d-bs-jest/lib/js/src/meta3d_jest.bs.js");
var BodyAPI$Meta3dEvent = require("../../tool/api/BodyAPI.bs.js");
var BodyTool$Meta3dEvent = require("../../tool/event_manager/BodyTool.bs.js");
var TestTool$Meta3dEvent = require("../../tool/event_manager/TestTool.bs.js");
var EventTool$Meta3dEvent = require("../../tool/event_manager/EventTool.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var InitEventAPI$Meta3dEvent = require("../../tool/api/InitEventAPI.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var ManageEventAPI$Meta3dEvent = require("../../tool/api/ManageEventAPI.bs.js");
var MouseEventTool$Meta3dEvent = require("../../tool/event_manager/MouseEventTool.bs.js");
var TouchEventTool$Meta3dEvent = require("../../tool/event_manager/TouchEventTool.bs.js");
var CustomEventTool$Meta3dEvent = require("../../tool/event_manager/CustomEventTool.bs.js");
var KeyboardEventTool$Meta3dEvent = require("../../tool/event_manager/KeyboardEventTool.bs.js");

Meta3d_jest.describe("InitEventAPI", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(undefined);
        beforeEach(function () {
              sandbox.contents = Sinon$1.sandbox.create();
              return TestTool$Meta3dEvent.prepareState(undefined);
            });
        afterEach(function () {
              return Sinon.restoreSandbox(sandbox.contents);
            });
        Meta3d_jest.describe("bind dom event", (function (param) {
                Meta3d_jest.describe("bind mouse event", (function (param) {
                        var _testMouseEvent = function (mouseEventName, mouseDomEventName) {
                          Meta3d_jest.test("test bind", (function (param) {
                                  MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                  var value = {
                                    contents: 0
                                  };
                                  ManageEventAPI$Meta3dEvent.onMouseEvent(mouseEventName, 0, (function ($$event, state) {
                                          value.contents = 1;
                                          return state;
                                        }));
                                  EventTool$Meta3dEvent.triggerDomEvent(mouseDomEventName, EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                  EventTool$Meta3dEvent.restore(undefined);
                                  return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 1);
                                }));
                          return Meta3d_jest.describe("test unbind by handleFunc", (function (param) {
                                        Meta3d_jest.test("test", (function (param) {
                                                MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                var value = {
                                                  contents: 0
                                                };
                                                var handleFunc = function ($$event, state) {
                                                  value.contents = value.contents + 1 | 0;
                                                  return state;
                                                };
                                                ManageEventAPI$Meta3dEvent.onMouseEvent(mouseEventName, 0, handleFunc);
                                                ManageEventAPI$Meta3dEvent.offMouseEventByHandleFunc(mouseEventName, handleFunc);
                                                EventTool$Meta3dEvent.triggerDomEvent("" + mouseDomEventName, EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                EventTool$Meta3dEvent.restore(undefined);
                                                return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 0);
                                              }));
                                        return Meta3d_jest.test("test unbind one handleFunc of the eventName", (function (param) {
                                                      MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                      var value = {
                                                        contents: 0
                                                      };
                                                      var handleFunc = function ($$event, state) {
                                                        value.contents = value.contents + 1 | 0;
                                                        return state;
                                                      };
                                                      ManageEventAPI$Meta3dEvent.onMouseEvent(mouseEventName, 0, handleFunc);
                                                      ManageEventAPI$Meta3dEvent.onMouseEvent(mouseEventName, 0, (function ($$event, state) {
                                                              value.contents = value.contents + 10 | 0;
                                                              return state;
                                                            }));
                                                      ManageEventAPI$Meta3dEvent.offMouseEventByHandleFunc(mouseEventName, handleFunc);
                                                      EventTool$Meta3dEvent.triggerDomEvent("" + mouseDomEventName, EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                      EventTool$Meta3dEvent.restore(undefined);
                                                      return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 10);
                                                    }));
                                      }));
                        };
                        Meta3d_jest.describe("bind contextmenu event", (function (param) {
                                return Meta3d_jest.test("preventDefault", (function (param) {
                                              BodyAPI$Meta3dEvent.setBody(BodyTool$Meta3dEvent.getBody(undefined));
                                              InitEventAPI$Meta3dEvent.initEvent(undefined);
                                              var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var stopPropagationFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              EventTool$Meta3dEvent.triggerDomEvent("contextmenu", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, preventDefaultFunc, stopPropagationFunc, undefined));
                                              EventTool$Meta3dEvent.restore(undefined);
                                              return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect([
                                                              Sinon.getCallCount(preventDefaultFunc),
                                                              Sinon.getCallCount(stopPropagationFunc)
                                                            ]), [
                                                          1,
                                                          1
                                                        ]);
                                            }));
                              }));
                        Meta3d_jest.describe("bind mousedown event", (function (param) {
                                _testMouseEvent(/* MouseDown */2, "mousedown");
                                Meta3d_jest.describe("test mouse event", (function (param) {
                                        Meta3d_jest.describe("test locationInView", (function (param) {
                                                Meta3d_jest.test("test view has no offsetParent", (function (param) {
                                                        MouseEventTool$Meta3dEvent.prepare(sandbox, 1, 2, undefined, undefined, undefined);
                                                        var valueX = {
                                                          contents: 0
                                                        };
                                                        var valueY = {
                                                          contents: 0
                                                        };
                                                        ManageEventAPI$Meta3dEvent.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                                                var match = $$event.locationInView;
                                                                valueX.contents = match[0];
                                                                valueY.contents = match[1];
                                                                return state;
                                                              }));
                                                        EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(10, 20, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                        EventTool$Meta3dEvent.restore(undefined);
                                                        return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect([
                                                                        valueX.contents,
                                                                        valueY.contents
                                                                      ]), [
                                                                    9,
                                                                    18
                                                                  ]);
                                                      }));
                                                return Meta3d_jest.test("test view has offsetParent", (function (param) {
                                                              MouseEventTool$Meta3dEvent.prepare(sandbox, 1, 2, {
                                                                    offsetLeft: 11,
                                                                    offsetTop: 12,
                                                                    offsetParent: undefined
                                                                  }, undefined, undefined);
                                                              var valueX = {
                                                                contents: 0
                                                              };
                                                              var valueY = {
                                                                contents: 0
                                                              };
                                                              ManageEventAPI$Meta3dEvent.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                                                      var match = $$event.locationInView;
                                                                      valueX.contents = match[0];
                                                                      valueY.contents = match[1];
                                                                      return state;
                                                                    }));
                                                              EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(10, 20, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                              EventTool$Meta3dEvent.restore(undefined);
                                                              return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect([
                                                                              valueX.contents,
                                                                              valueY.contents
                                                                            ]), [
                                                                          -2,
                                                                          6
                                                                        ]);
                                                            }));
                                              }));
                                        Meta3d_jest.describe("test button", (function (param) {
                                                var _test = function (eventButton, targetButton) {
                                                  MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                  var button = {
                                                    contents: /* Right */2
                                                  };
                                                  ManageEventAPI$Meta3dEvent.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                                          button.contents = $$event.button;
                                                          return state;
                                                        }));
                                                  EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, eventButton, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                  EventTool$Meta3dEvent.restore(undefined);
                                                  return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(button.contents), targetButton);
                                                };
                                                Meta3d_jest.test("test NoButton", (function (param) {
                                                        return _test(0, /* NoButton */0);
                                                      }));
                                                Meta3d_jest.test("test Left", (function (param) {
                                                        return _test(1, /* Left */1);
                                                      }));
                                                Meta3d_jest.test("test Center", (function (param) {
                                                        return _test(2, /* Center */3);
                                                      }));
                                                return Meta3d_jest.test("test Right", (function (param) {
                                                              return _test(3, /* Right */2);
                                                            }));
                                              }));
                                        Meta3d_jest.describe("test movementDelta", (function (param) {
                                                Meta3d_jest.describe("if is pointer locked", (function (param) {
                                                        return Meta3d_jest.test("get data from event.movementX/movementY", (function (param) {
                                                                      MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                                      MouseEventTool$Meta3dEvent.setPointerLocked();
                                                                      var valueX = {
                                                                        contents: 0
                                                                      };
                                                                      var valueY = {
                                                                        contents: 0
                                                                      };
                                                                      ManageEventAPI$Meta3dEvent.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                                                              var match = $$event.movementDelta;
                                                                              valueX.contents = match[0];
                                                                              valueY.contents = match[1];
                                                                              return state;
                                                                            }));
                                                                      EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, 1, 2, undefined, undefined, undefined, undefined, undefined));
                                                                      EventTool$Meta3dEvent.restore(undefined);
                                                                      return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect([
                                                                                      valueX.contents,
                                                                                      valueY.contents
                                                                                    ]), [
                                                                                  1,
                                                                                  2
                                                                                ]);
                                                                    }));
                                                      }));
                                                return Meta3d_jest.describe("else, compute", (function (param) {
                                                              var _test = function (param, param$1, param$2) {
                                                                MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                                MouseEventTool$Meta3dEvent.setNotPointerLocked();
                                                                MouseEventTool$Meta3dEvent.setLastXY(param[0], param[1]);
                                                                var valueX = {
                                                                  contents: 0
                                                                };
                                                                var valueY = {
                                                                  contents: 0
                                                                };
                                                                ManageEventAPI$Meta3dEvent.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                                                        var match = $$event.movementDelta;
                                                                        valueX.contents = match[0];
                                                                        valueY.contents = match[1];
                                                                        return state;
                                                                      }));
                                                                EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(param$1[0], param$1[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                                EventTool$Meta3dEvent.restore(undefined);
                                                                return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect([
                                                                                valueX.contents,
                                                                                valueY.contents
                                                                              ]), [
                                                                            param$2[0],
                                                                            param$2[1]
                                                                          ]);
                                                              };
                                                              Meta3d_jest.test("test has no lastX, lastY", (function (param) {
                                                                      return _test([
                                                                                  undefined,
                                                                                  undefined
                                                                                ], [
                                                                                  0,
                                                                                  0
                                                                                ], [
                                                                                  0,
                                                                                  0
                                                                                ]);
                                                                    }));
                                                              return Meta3d_jest.test("test has lastX, lastY", (function (param) {
                                                                            return _test([
                                                                                        1,
                                                                                        2
                                                                                      ], [
                                                                                        10,
                                                                                        11
                                                                                      ], [
                                                                                        9,
                                                                                        9
                                                                                      ]);
                                                                          }));
                                                            }));
                                              }));
                                        Meta3d_jest.describe("test wheel", (function (param) {
                                                var _test = function (mouseEvent, targetWheel) {
                                                  MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                  var wheel = {
                                                    contents: 0
                                                  };
                                                  ManageEventAPI$Meta3dEvent.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                                          wheel.contents = $$event.wheel;
                                                          return state;
                                                        }));
                                                  EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), mouseEvent);
                                                  EventTool$Meta3dEvent.restore(undefined);
                                                  return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(wheel.contents), targetWheel);
                                                };
                                                Meta3d_jest.describe("if event.detail exist", (function (param) {
                                                        Meta3d_jest.test("if event.detail !== 0, use it", (function (param) {
                                                                return _test(MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined), -2);
                                                              }));
                                                        return Meta3d_jest.test("else, use event.wheelDelta", (function (param) {
                                                                      return _test(MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, 0, 120, undefined, undefined, undefined), 1);
                                                                    }));
                                                      }));
                                                Meta3d_jest.test("else, use event.wheelDelta", (function (param) {
                                                        return _test(MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, Caml_option.some(undefined), 120, undefined, undefined, undefined), 1);
                                                      }));
                                                return Meta3d_jest.test("else, return 0", (function (param) {
                                                              return _test(MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, Caml_option.some(undefined), Caml_option.some(undefined), undefined, undefined, undefined), 0);
                                                            }));
                                              }));
                                        return Meta3d_jest.describe("test other data", (function (param) {
                                                      return Meta3d_jest.test("test name, location", (function (param) {
                                                                    MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                                    var name = {
                                                                      contents: /* MouseUp */3
                                                                    };
                                                                    var valueX = {
                                                                      contents: 0
                                                                    };
                                                                    var valueY = {
                                                                      contents: 0
                                                                    };
                                                                    ManageEventAPI$Meta3dEvent.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                                                            var match = $$event.location;
                                                                            valueX.contents = match[0];
                                                                            valueY.contents = match[1];
                                                                            name.contents = $$event.name;
                                                                            return state;
                                                                          }));
                                                                    EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(10, 20, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                                    EventTool$Meta3dEvent.restore(undefined);
                                                                    return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect([
                                                                                    name.contents,
                                                                                    valueX.contents,
                                                                                    valueY.contents
                                                                                  ]), [
                                                                                /* MouseDown */2,
                                                                                10,
                                                                                20
                                                                              ]);
                                                                  }));
                                                    }));
                                      }));
                                return Meta3d_jest.describe("test priority", (function (param) {
                                              return Meta3d_jest.test("the higher priority handleFunc is executed first", (function (param) {
                                                            MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                            var value = {
                                                              contents: 2
                                                            };
                                                            ManageEventAPI$Meta3dEvent.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                                                    value.contents = value.contents - 2 | 0;
                                                                    return state;
                                                                  }));
                                                            ManageEventAPI$Meta3dEvent.onMouseEvent(/* MouseDown */2, 1, (function ($$event, state) {
                                                                    value.contents = (value.contents << 1);
                                                                    return state;
                                                                  }));
                                                            EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                            EventTool$Meta3dEvent.restore(undefined);
                                                            return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 2);
                                                          }));
                                            }));
                              }));
                        Meta3d_jest.describe("bind mouseup event", (function (param) {
                                return _testMouseEvent(/* MouseUp */3, "mouseup");
                              }));
                        Meta3d_jest.describe("bind click event", (function (param) {
                                return _testMouseEvent(/* Click */1, "click");
                              }));
                        Meta3d_jest.describe("bind mousewheel event", (function (param) {
                                return _testMouseEvent(/* MouseWheel */5, "mousewheel");
                              }));
                        Meta3d_jest.describe("bind mousemove event", (function (param) {
                                _testMouseEvent(/* MouseMove */4, "mousemove");
                                return Meta3d_jest.describe("test mouse event", (function (param) {
                                              return Meta3d_jest.describe("test movementDelta", (function (param) {
                                                            return Meta3d_jest.test("set lastX, lastY after handle", (function (param) {
                                                                          MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                                          MouseEventTool$Meta3dEvent.setNotPointerLocked();
                                                                          MouseEventTool$Meta3dEvent.setLastXY(undefined, undefined);
                                                                          var valueX = {
                                                                            contents: 0
                                                                          };
                                                                          var valueY = {
                                                                            contents: 0
                                                                          };
                                                                          ManageEventAPI$Meta3dEvent.onMouseEvent(/* MouseMove */4, 0, (function ($$event, state) {
                                                                                  var match = $$event.movementDelta;
                                                                                  valueX.contents = valueX.contents + match[0] | 0;
                                                                                  valueY.contents = valueY.contents + match[1] | 0;
                                                                                  return state;
                                                                                }));
                                                                          EventTool$Meta3dEvent.triggerDomEvent("mousemove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(10, 20, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                                          EventTool$Meta3dEvent.triggerDomEvent("mousemove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(30, 50, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                                          EventTool$Meta3dEvent.restore(undefined);
                                                                          return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect([
                                                                                          valueX.contents,
                                                                                          valueY.contents
                                                                                        ]), [
                                                                                      20,
                                                                                      30
                                                                                    ]);
                                                                        }));
                                                          }));
                                            }));
                              }));
                        return Meta3d_jest.describe("bind mousedrag event", (function (param) {
                                      Meta3d_jest.test("trigger mousedragstart event when mousedown", (function (param) {
                                              MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                              var value = {
                                                contents: 0
                                              };
                                              ManageEventAPI$Meta3dEvent.onMouseEvent(/* MouseDragStart */6, 0, (function ($$event, state) {
                                                      value.contents = value.contents + 1 | 0;
                                                      return state;
                                                    }));
                                              EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                              EventTool$Meta3dEvent.restore(undefined);
                                              return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 1);
                                            }));
                                      Meta3d_jest.test("trigger mousedragover event when mousemove after mousedown", (function (param) {
                                              MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                              var value = {
                                                contents: 0
                                              };
                                              ManageEventAPI$Meta3dEvent.onMouseEvent(/* MouseDragOver */7, 0, (function ($$event, state) {
                                                      value.contents = value.contents + 1 | 0;
                                                      return state;
                                                    }));
                                              EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                              EventTool$Meta3dEvent.triggerFirstMouseDragOverEvent(MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                              EventTool$Meta3dEvent.triggerDomEvent("mousemove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                              EventTool$Meta3dEvent.restore(undefined);
                                              return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 2);
                                            }));
                                      Meta3d_jest.test("trigger mousedragdrop event when mouseup", (function (param) {
                                              MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                              var value = {
                                                contents: 0
                                              };
                                              ManageEventAPI$Meta3dEvent.onMouseEvent(/* MouseDragDrop */8, 0, (function ($$event, state) {
                                                      value.contents = value.contents + 1 | 0;
                                                      return state;
                                                    }));
                                              EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                              EventTool$Meta3dEvent.triggerDomEvent("mousemove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                              EventTool$Meta3dEvent.triggerDomEvent("mouseup", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                              EventTool$Meta3dEvent.triggerDomEvent("mousemove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                              EventTool$Meta3dEvent.restore(undefined);
                                              return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 1);
                                            }));
                                      Meta3d_jest.describe("test unbind by handleFunc", (function (param) {
                                              return Meta3d_jest.test("test", (function (param) {
                                                            MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                            var value = {
                                                              contents: 0
                                                            };
                                                            var handleFunc = function ($$event, state) {
                                                              value.contents = value.contents + 1 | 0;
                                                              return state;
                                                            };
                                                            ManageEventAPI$Meta3dEvent.onMouseEvent(/* MouseDragOver */7, 0, handleFunc);
                                                            ManageEventAPI$Meta3dEvent.offMouseEventByHandleFunc(/* MouseDragOver */7, handleFunc);
                                                            EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                            EventTool$Meta3dEvent.triggerDomEvent("mousemove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                            EventTool$Meta3dEvent.restore(undefined);
                                                            return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 0);
                                                          }));
                                            }));
                                      Meta3d_jest.describe("test movement", (function (param) {
                                              var _prepare = function (param) {
                                                MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                MouseEventTool$Meta3dEvent.setNotPointerLocked();
                                                var movementX = {
                                                  contents: 0
                                                };
                                                var movementY = {
                                                  contents: 0
                                                };
                                                ManageEventAPI$Meta3dEvent.onMouseEvent(/* MouseDragOver */7, 0, (function ($$event, state) {
                                                        var match = $$event.movementDelta;
                                                        movementX.contents = match[0];
                                                        movementY.contents = match[1];
                                                        return state;
                                                      }));
                                                return [
                                                        movementX,
                                                        movementY
                                                      ];
                                              };
                                              Meta3d_jest.test("if not set lastXY on mousemove event if mousedragover event is triggering", (function (param) {
                                                      var match = _prepare(undefined);
                                                      EventTool$Meta3dEvent.triggerDomEvent("mousemove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(1, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                      EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                      EventTool$Meta3dEvent.triggerFirstMouseDragOverEvent(MouseEventTool$Meta3dEvent.buildMouseEvent(10, 20, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                      EventTool$Meta3dEvent.triggerDomEvent("mousemove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(50, 70, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                      EventTool$Meta3dEvent.restore(undefined);
                                                      return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect([
                                                                      match[0].contents,
                                                                      match[1].contents
                                                                    ]), [
                                                                  40,
                                                                  50
                                                                ]);
                                                    }));
                                              return Meta3d_jest.test("reset lastX,lastY when drag start", (function (param) {
                                                            var match = _prepare(undefined);
                                                            EventTool$Meta3dEvent.triggerDomEvent("mousemove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(1, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                            EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                            EventTool$Meta3dEvent.triggerFirstMouseDragOverEvent(MouseEventTool$Meta3dEvent.buildMouseEvent(50, 80, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                            EventTool$Meta3dEvent.restore(undefined);
                                                            return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect([
                                                                            match[0].contents,
                                                                            match[1].contents
                                                                          ]), [
                                                                        0,
                                                                        0
                                                                      ]);
                                                          }));
                                            }));
                                      Meta3d_jest.describe("test locationInView", (function (param) {
                                              var _prepare = function (param) {
                                                MouseEventTool$Meta3dEvent.prepare(sandbox, 0, 0, undefined, undefined, undefined);
                                                MouseEventTool$Meta3dEvent.setNotPointerLocked();
                                                var locationInViewArr = [];
                                                ManageEventAPI$Meta3dEvent.onMouseEvent(/* MouseDragOver */7, 0, (function ($$event, state) {
                                                        ArraySt$Meta3dCommonlib.push(locationInViewArr, $$event.locationInView);
                                                        return state;
                                                      }));
                                                return locationInViewArr;
                                              };
                                              return Meta3d_jest.test("test view has no offsetParent", (function (param) {
                                                            var locationInViewArr = _prepare(undefined);
                                                            EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(50, 80, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                            EventTool$Meta3dEvent.triggerFirstMouseDragOverEvent(MouseEventTool$Meta3dEvent.buildMouseEvent(55, 110, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                            EventTool$Meta3dEvent.triggerDomEvent("mousemove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(60, 110, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                            EventTool$Meta3dEvent.restore(undefined);
                                                            return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(locationInViewArr), [
                                                                        [
                                                                          55,
                                                                          110
                                                                        ],
                                                                        [
                                                                          60,
                                                                          110
                                                                        ]
                                                                      ]);
                                                          }));
                                            }));
                                      return Meta3d_jest.describe("test button", (function (param) {
                                                    var _test = function (eventButton, targetButton) {
                                                      MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                      var button = {
                                                        contents: /* Right */2
                                                      };
                                                      ManageEventAPI$Meta3dEvent.onMouseEvent(/* MouseDragOver */7, 0, (function ($$event, state) {
                                                              button.contents = $$event.button;
                                                              return state;
                                                            }));
                                                      EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, eventButton, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                      EventTool$Meta3dEvent.triggerFirstMouseDragOverEvent(MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, eventButton, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                      EventTool$Meta3dEvent.restore(undefined);
                                                      return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(button.contents), targetButton);
                                                    };
                                                    Meta3d_jest.test("test NoButton", (function (param) {
                                                            return _test(0, /* NoButton */0);
                                                          }));
                                                    Meta3d_jest.test("test Left", (function (param) {
                                                            return _test(1, /* Left */1);
                                                          }));
                                                    Meta3d_jest.test("test Center", (function (param) {
                                                            return _test(2, /* Center */3);
                                                          }));
                                                    return Meta3d_jest.test("test Right", (function (param) {
                                                                  return _test(3, /* Right */2);
                                                                }));
                                                  }));
                                    }));
                      }));
                Meta3d_jest.describe("bind keyboard event", (function (param) {
                        var _testKeyboardEvent = function (keyboardEventName, keyboardDomEventName) {
                          Meta3d_jest.test("test bind", (function (param) {
                                  KeyboardEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined);
                                  var value = {
                                    contents: 0
                                  };
                                  ManageEventAPI$Meta3dEvent.onKeyboardEvent(keyboardEventName, 0, (function ($$event, state) {
                                          value.contents = 1;
                                          return state;
                                        }));
                                  EventTool$Meta3dEvent.triggerDomEvent("" + keyboardDomEventName, EventTool$Meta3dEvent.getKeyboardEventBindedDom(undefined), KeyboardEventTool$Meta3dEvent.buildKeyboardEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                  EventTool$Meta3dEvent.restore(undefined);
                                  return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 1);
                                }));
                          return Meta3d_jest.describe("test unbind by handleFunc", (function (param) {
                                        Meta3d_jest.test("test", (function (param) {
                                                KeyboardEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined);
                                                var value = {
                                                  contents: 0
                                                };
                                                var handleFunc = function ($$event, state) {
                                                  value.contents = value.contents + 1 | 0;
                                                  return state;
                                                };
                                                ManageEventAPI$Meta3dEvent.onKeyboardEvent(keyboardEventName, 0, handleFunc);
                                                ManageEventAPI$Meta3dEvent.offKeyboardEventByHandleFunc(keyboardEventName, handleFunc);
                                                EventTool$Meta3dEvent.triggerDomEvent("" + keyboardDomEventName, EventTool$Meta3dEvent.getKeyboardEventBindedDom(undefined), KeyboardEventTool$Meta3dEvent.buildKeyboardEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                EventTool$Meta3dEvent.restore(undefined);
                                                return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 0);
                                              }));
                                        return Meta3d_jest.test("test unbind one handleFunc of the eventName", (function (param) {
                                                      KeyboardEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined);
                                                      var value = {
                                                        contents: 0
                                                      };
                                                      var handleFunc = function ($$event, state) {
                                                        value.contents = value.contents + 1 | 0;
                                                        return state;
                                                      };
                                                      ManageEventAPI$Meta3dEvent.onKeyboardEvent(keyboardEventName, 0, handleFunc);
                                                      ManageEventAPI$Meta3dEvent.onKeyboardEvent(keyboardEventName, 0, (function ($$event, state) {
                                                              value.contents = value.contents + 10 | 0;
                                                              return state;
                                                            }));
                                                      ManageEventAPI$Meta3dEvent.offKeyboardEventByHandleFunc(keyboardEventName, handleFunc);
                                                      EventTool$Meta3dEvent.triggerDomEvent("" + keyboardDomEventName, EventTool$Meta3dEvent.getKeyboardEventBindedDom(undefined), KeyboardEventTool$Meta3dEvent.buildKeyboardEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                      EventTool$Meta3dEvent.restore(undefined);
                                                      return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 10);
                                                    }));
                                      }));
                        };
                        Meta3d_jest.describe("bind keyup event", (function (param) {
                                _testKeyboardEvent(/* KeyUp */9, "keyup");
                                Meta3d_jest.describe("test keyboard event", (function (param) {
                                        Meta3d_jest.test("test name, ctrlKey, altKey, shiftKey, metaKey,  keyCode", (function (param) {
                                                KeyboardEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined);
                                                var refEvent = {
                                                  contents: -1
                                                };
                                                ManageEventAPI$Meta3dEvent.onKeyboardEvent(/* KeyUp */9, 0, (function ($$event, state) {
                                                        refEvent.contents = $$event;
                                                        return state;
                                                      }));
                                                EventTool$Meta3dEvent.triggerDomEvent("keyup", EventTool$Meta3dEvent.getKeyboardEventBindedDom(undefined), KeyboardEventTool$Meta3dEvent.buildKeyboardEvent(true, true, true, true, 9, undefined));
                                                EventTool$Meta3dEvent.restore(undefined);
                                                var match = refEvent.contents;
                                                return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect([
                                                                match.name,
                                                                match.ctrlKey,
                                                                match.altKey,
                                                                match.shiftKey,
                                                                match.metaKey,
                                                                match.keyCode
                                                              ]), [
                                                            /* KeyUp */9,
                                                            true,
                                                            true,
                                                            true,
                                                            true,
                                                            9
                                                          ]);
                                              }));
                                        return Meta3d_jest.describe("test key", (function (param) {
                                                      Meta3d_jest.test("test keyCode is in specialKeyMap", (function (param) {
                                                              KeyboardEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined);
                                                              var key = {
                                                                contents: ""
                                                              };
                                                              ManageEventAPI$Meta3dEvent.onKeyboardEvent(/* KeyUp */9, 0, (function ($$event, state) {
                                                                      key.contents = $$event.key;
                                                                      return state;
                                                                    }));
                                                              EventTool$Meta3dEvent.triggerDomEvent("keyup", EventTool$Meta3dEvent.getKeyboardEventBindedDom(undefined), KeyboardEventTool$Meta3dEvent.buildKeyboardEvent(undefined, undefined, undefined, undefined, 9, undefined));
                                                              EventTool$Meta3dEvent.restore(undefined);
                                                              return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(key.contents), "tab");
                                                            }));
                                                      return Meta3d_jest.describe("else", (function (param) {
                                                                    return Meta3d_jest.test("if shiftKey=true, get key from shiftKeyByCharCodeMap", (function (param) {
                                                                                  KeyboardEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined);
                                                                                  var keyArr = [];
                                                                                  ManageEventAPI$Meta3dEvent.onKeyboardEvent(/* KeyUp */9, 0, (function ($$event, state) {
                                                                                          ArraySt$Meta3dCommonlib.push(keyArr, $$event.key);
                                                                                          return state;
                                                                                        }));
                                                                                  EventTool$Meta3dEvent.triggerDomEvent("keyup", EventTool$Meta3dEvent.getKeyboardEventBindedDom(undefined), KeyboardEventTool$Meta3dEvent.buildKeyboardEvent(undefined, undefined, true, undefined, 51, undefined));
                                                                                  EventTool$Meta3dEvent.triggerDomEvent("keyup", EventTool$Meta3dEvent.getKeyboardEventBindedDom(undefined), KeyboardEventTool$Meta3dEvent.buildKeyboardEvent(undefined, undefined, true, undefined, 52, undefined));
                                                                                  EventTool$Meta3dEvent.triggerDomEvent("keyup", EventTool$Meta3dEvent.getKeyboardEventBindedDom(undefined), KeyboardEventTool$Meta3dEvent.buildKeyboardEvent(undefined, undefined, true, undefined, 187, undefined));
                                                                                  EventTool$Meta3dEvent.restore(undefined);
                                                                                  return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(keyArr), [
                                                                                              "#",
                                                                                              "$",
                                                                                              "+"
                                                                                            ]);
                                                                                }));
                                                                  }));
                                                    }));
                                      }));
                                return Meta3d_jest.describe("test priority", (function (param) {
                                              return Meta3d_jest.test("the higher priority handleFunc is executed first", (function (param) {
                                                            KeyboardEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined);
                                                            var value = {
                                                              contents: 5
                                                            };
                                                            ManageEventAPI$Meta3dEvent.onKeyboardEvent(/* KeyUp */9, 0, (function ($$event, state) {
                                                                    value.contents = value.contents + 1 | 0;
                                                                    return state;
                                                                  }));
                                                            ManageEventAPI$Meta3dEvent.onKeyboardEvent(/* KeyUp */9, 1, (function ($$event, state) {
                                                                    value.contents = (value.contents << 1);
                                                                    return state;
                                                                  }));
                                                            EventTool$Meta3dEvent.triggerDomEvent("keyup", EventTool$Meta3dEvent.getKeyboardEventBindedDom(undefined), KeyboardEventTool$Meta3dEvent.buildKeyboardEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                            EventTool$Meta3dEvent.restore(undefined);
                                                            return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 11);
                                                          }));
                                            }));
                              }));
                        Meta3d_jest.describe("bind keydown event", (function (param) {
                                return _testKeyboardEvent(/* KeyDown */10, "keydown");
                              }));
                        return Meta3d_jest.describe("bind keypress event", (function (param) {
                                      return _testKeyboardEvent(/* KeyPress */11, "keypress");
                                    }));
                      }));
                return Meta3d_jest.describe("bind touch event", (function (param) {
                              var _testTouchEvent = function (touchEventName, touchDomEventName) {
                                Meta3d_jest.test("test bind", (function (param) {
                                        TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                        var value = {
                                          contents: 0
                                        };
                                        ManageEventAPI$Meta3dEvent.onTouchEvent(touchEventName, 0, (function ($$event, state) {
                                                value.contents = 1;
                                                return state;
                                              }));
                                        EventTool$Meta3dEvent.triggerDomEvent(touchDomEventName, EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                        EventTool$Meta3dEvent.restore(undefined);
                                        return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 1);
                                      }));
                                return Meta3d_jest.describe("test unbind by handleFunc", (function (param) {
                                              Meta3d_jest.test("test", (function (param) {
                                                      TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                      var value = {
                                                        contents: 0
                                                      };
                                                      var handleFunc = function ($$event, state) {
                                                        value.contents = value.contents + 1 | 0;
                                                        return state;
                                                      };
                                                      ManageEventAPI$Meta3dEvent.onTouchEvent(touchEventName, 0, handleFunc);
                                                      ManageEventAPI$Meta3dEvent.offTouchEventByHandleFunc(touchEventName, handleFunc);
                                                      EventTool$Meta3dEvent.triggerDomEvent("" + touchDomEventName, EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                      EventTool$Meta3dEvent.restore(undefined);
                                                      return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 0);
                                                    }));
                                              return Meta3d_jest.test("test unbind one handleFunc of the eventName", (function (param) {
                                                            TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                            var value = {
                                                              contents: 0
                                                            };
                                                            var handleFunc = function ($$event, state) {
                                                              value.contents = value.contents + 1 | 0;
                                                              return state;
                                                            };
                                                            ManageEventAPI$Meta3dEvent.onTouchEvent(touchEventName, 0, handleFunc);
                                                            ManageEventAPI$Meta3dEvent.onTouchEvent(touchEventName, 0, (function ($$event, state) {
                                                                    value.contents = value.contents + 10 | 0;
                                                                    return state;
                                                                  }));
                                                            ManageEventAPI$Meta3dEvent.offTouchEventByHandleFunc(touchEventName, handleFunc);
                                                            EventTool$Meta3dEvent.triggerDomEvent("" + touchDomEventName, EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                            EventTool$Meta3dEvent.restore(undefined);
                                                            return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 10);
                                                          }));
                                            }));
                              };
                              Meta3d_jest.describe("bind touchstart event", (function (param) {
                                      _testTouchEvent(/* TouchStart */15, "touchstart");
                                      Meta3d_jest.describe("test touch event", (function (param) {
                                              Meta3d_jest.describe("test locationInView", (function (param) {
                                                      return Meta3d_jest.test("test view has no offsetParent", (function (param) {
                                                                    TouchEventTool$Meta3dEvent.prepare(sandbox, 1, 2, undefined, undefined, undefined);
                                                                    var valueX = {
                                                                      contents: 0
                                                                    };
                                                                    var valueY = {
                                                                      contents: 0
                                                                    };
                                                                    ManageEventAPI$Meta3dEvent.onTouchEvent(/* TouchStart */15, 0, (function ($$event, state) {
                                                                            var match = $$event.locationInView;
                                                                            valueX.contents = match[0];
                                                                            valueY.contents = match[1];
                                                                            return state;
                                                                          }));
                                                                    EventTool$Meta3dEvent.triggerDomEvent("touchstart", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, [TouchEventTool$Meta3dEvent.buildTouchData(10, 20, undefined)], undefined, undefined, undefined, undefined));
                                                                    EventTool$Meta3dEvent.restore(undefined);
                                                                    return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect([
                                                                                    valueX.contents,
                                                                                    valueY.contents
                                                                                  ]), [
                                                                                9,
                                                                                18
                                                                              ]);
                                                                  }));
                                                    }));
                                              Meta3d_jest.describe("test touchData", (function (param) {
                                                      return Meta3d_jest.test("test", (function (param) {
                                                                    TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                                    var value = {
                                                                      contents: 0
                                                                    };
                                                                    ManageEventAPI$Meta3dEvent.onTouchEvent(/* TouchStart */15, 0, (function ($$event, state) {
                                                                            value.contents = $$event.touchData;
                                                                            return state;
                                                                          }));
                                                                    EventTool$Meta3dEvent.triggerDomEvent("touchstart", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, [TouchEventTool$Meta3dEvent.buildTouchData(10, 20, undefined)], undefined, undefined, undefined, undefined));
                                                                    EventTool$Meta3dEvent.restore(undefined);
                                                                    return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), {
                                                                                clientX: 0,
                                                                                clientY: 0,
                                                                                pageX: 10,
                                                                                pageY: 20,
                                                                                identifier: 0,
                                                                                screenX: 0,
                                                                                screenY: 0,
                                                                                radiusX: 0,
                                                                                radiusY: 0,
                                                                                rotationAngle: 0,
                                                                                force: 0
                                                                              });
                                                                  }));
                                                    }));
                                              return Meta3d_jest.describe("test movementDelta", (function (param) {
                                                            return Meta3d_jest.describe("compute by lastX,lastY", (function (param) {
                                                                          var _test = function (param, param$1, param$2) {
                                                                            TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                                            TouchEventTool$Meta3dEvent.setLastXY(param[0], param[1]);
                                                                            var valueX = {
                                                                              contents: 0
                                                                            };
                                                                            var valueY = {
                                                                              contents: 0
                                                                            };
                                                                            ManageEventAPI$Meta3dEvent.onTouchEvent(/* TouchStart */15, 0, (function ($$event, state) {
                                                                                    var match = $$event.movementDelta;
                                                                                    valueX.contents = match[0];
                                                                                    valueY.contents = match[1];
                                                                                    return state;
                                                                                  }));
                                                                            EventTool$Meta3dEvent.triggerDomEvent("touchstart", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, [TouchEventTool$Meta3dEvent.buildTouchData(param$1[0], param$1[1], undefined)], undefined, undefined, undefined, undefined));
                                                                            EventTool$Meta3dEvent.restore(undefined);
                                                                            return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect([
                                                                                            valueX.contents,
                                                                                            valueY.contents
                                                                                          ]), [
                                                                                        param$2[0],
                                                                                        param$2[1]
                                                                                      ]);
                                                                          };
                                                                          Meta3d_jest.test("test has no lastX, lastY", (function (param) {
                                                                                  return _test([
                                                                                              undefined,
                                                                                              undefined
                                                                                            ], [
                                                                                              0,
                                                                                              0
                                                                                            ], [
                                                                                              0,
                                                                                              0
                                                                                            ]);
                                                                                }));
                                                                          return Meta3d_jest.test("test has lastX, lastY", (function (param) {
                                                                                        return _test([
                                                                                                    1,
                                                                                                    2
                                                                                                  ], [
                                                                                                    10,
                                                                                                    11
                                                                                                  ], [
                                                                                                    9,
                                                                                                    9
                                                                                                  ]);
                                                                                      }));
                                                                        }));
                                                          }));
                                            }));
                                      return Meta3d_jest.describe("test priority", (function (param) {
                                                    return Meta3d_jest.test("the higher priority handleFunc is executed first", (function (param) {
                                                                  TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                                  var value = {
                                                                    contents: 2
                                                                  };
                                                                  ManageEventAPI$Meta3dEvent.onTouchEvent(/* TouchStart */15, 0, (function ($$event, state) {
                                                                          value.contents = value.contents - 2 | 0;
                                                                          return state;
                                                                        }));
                                                                  ManageEventAPI$Meta3dEvent.onTouchEvent(/* TouchStart */15, 1, (function ($$event, state) {
                                                                          value.contents = (value.contents << 1);
                                                                          return state;
                                                                        }));
                                                                  EventTool$Meta3dEvent.triggerDomEvent("touchstart", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                                  EventTool$Meta3dEvent.restore(undefined);
                                                                  return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 2);
                                                                }));
                                                  }));
                                    }));
                              Meta3d_jest.describe("bind touchend event", (function (param) {
                                      return _testTouchEvent(/* TouchEnd */13, "touchend");
                                    }));
                              Meta3d_jest.describe("bind touchtap event", (function (param) {
                                      return Meta3d_jest.test("test trigger event after touchstart and touchend event", (function (param) {
                                                    TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                    var value = {
                                                      contents: 0
                                                    };
                                                    ManageEventAPI$Meta3dEvent.onTouchEvent(/* TouchTap */12, 0, (function ($$event, state) {
                                                            value.contents = 1;
                                                            return state;
                                                          }));
                                                    EventTool$Meta3dEvent.triggerDomEvent("touchstart", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                    EventTool$Meta3dEvent.triggerDomEvent("touchend", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                    EventTool$Meta3dEvent.restore(undefined);
                                                    return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 1);
                                                  }));
                                    }));
                              Meta3d_jest.describe("bind touchmove event", (function (param) {
                                      _testTouchEvent(/* TouchMove */14, "touchmove");
                                      Meta3d_jest.test("preventDefault", (function (param) {
                                              TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                              var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var stopPropagationFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              ManageEventAPI$Meta3dEvent.onTouchEvent(/* TouchMove */14, 0, (function ($$event, state) {
                                                      return state;
                                                    }));
                                              EventTool$Meta3dEvent.triggerDomEvent("touchmove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, [TouchEventTool$Meta3dEvent.buildTouchData(10, 20, undefined)], undefined, preventDefaultFunc, stopPropagationFunc, undefined));
                                              EventTool$Meta3dEvent.restore(undefined);
                                              return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect([
                                                              Sinon.getCallCount(preventDefaultFunc),
                                                              Sinon.getCallCount(stopPropagationFunc)
                                                            ]), [
                                                          1,
                                                          1
                                                        ]);
                                            }));
                                      return Meta3d_jest.describe("test touch event", (function (param) {
                                                    return Meta3d_jest.describe("test movementDelta", (function (param) {
                                                                  return Meta3d_jest.test("set lastX, lastY after handle", (function (param) {
                                                                                TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                                                TouchEventTool$Meta3dEvent.setLastXY(undefined, undefined);
                                                                                var valueX = {
                                                                                  contents: 0
                                                                                };
                                                                                var valueY = {
                                                                                  contents: 0
                                                                                };
                                                                                ManageEventAPI$Meta3dEvent.onTouchEvent(/* TouchMove */14, 0, (function ($$event, state) {
                                                                                        var match = $$event.movementDelta;
                                                                                        valueX.contents = valueX.contents + match[0] | 0;
                                                                                        valueY.contents = valueY.contents + match[1] | 0;
                                                                                        return state;
                                                                                      }));
                                                                                EventTool$Meta3dEvent.triggerDomEvent("touchmove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, [TouchEventTool$Meta3dEvent.buildTouchData(10, 20, undefined)], undefined, undefined, undefined, undefined));
                                                                                EventTool$Meta3dEvent.triggerDomEvent("touchmove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, [TouchEventTool$Meta3dEvent.buildTouchData(30, 50, undefined)], undefined, undefined, undefined, undefined));
                                                                                EventTool$Meta3dEvent.restore(undefined);
                                                                                return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect([
                                                                                                valueX.contents,
                                                                                                valueY.contents
                                                                                              ]), [
                                                                                            20,
                                                                                            30
                                                                                          ]);
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                              return Meta3d_jest.describe("bind touchdrag event", (function (param) {
                                            Meta3d_jest.test("trigger touchdragstart event when touchstart", (function (param) {
                                                    TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                    var value = {
                                                      contents: 0
                                                    };
                                                    ManageEventAPI$Meta3dEvent.onTouchEvent(/* TouchDragStart */16, 0, (function ($$event, state) {
                                                            value.contents = value.contents + 1 | 0;
                                                            return state;
                                                          }));
                                                    EventTool$Meta3dEvent.triggerDomEvent("touchstart", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                    EventTool$Meta3dEvent.restore(undefined);
                                                    return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 1);
                                                  }));
                                            Meta3d_jest.test("trigger touchdragover event when touchmove after touchstart", (function (param) {
                                                    TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                    var value = {
                                                      contents: 0
                                                    };
                                                    ManageEventAPI$Meta3dEvent.onTouchEvent(/* TouchDragOver */17, 0, (function ($$event, state) {
                                                            value.contents = value.contents + 1 | 0;
                                                            return state;
                                                          }));
                                                    EventTool$Meta3dEvent.triggerDomEvent("touchstart", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                    EventTool$Meta3dEvent.triggerDomEvent("touchmove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                    EventTool$Meta3dEvent.triggerDomEvent("touchmove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                    EventTool$Meta3dEvent.restore(undefined);
                                                    return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 2);
                                                  }));
                                            Meta3d_jest.test("trigger touchdragdrop event when touchend", (function (param) {
                                                    TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                    var value = {
                                                      contents: 0
                                                    };
                                                    ManageEventAPI$Meta3dEvent.onTouchEvent(/* TouchDragDrop */18, 0, (function ($$event, state) {
                                                            value.contents = value.contents + 1 | 0;
                                                            return state;
                                                          }));
                                                    EventTool$Meta3dEvent.triggerDomEvent("touchstart", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                    EventTool$Meta3dEvent.triggerDomEvent("touchmove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                    EventTool$Meta3dEvent.triggerDomEvent("touchend", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                    EventTool$Meta3dEvent.triggerDomEvent("touchmove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                    EventTool$Meta3dEvent.restore(undefined);
                                                    return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 1);
                                                  }));
                                            Meta3d_jest.describe("test unbind by handleFunc", (function (param) {
                                                    return Meta3d_jest.test("test", (function (param) {
                                                                  TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                                  var value = {
                                                                    contents: 0
                                                                  };
                                                                  var handleFunc = function ($$event, state) {
                                                                    value.contents = value.contents + 1 | 0;
                                                                    return state;
                                                                  };
                                                                  ManageEventAPI$Meta3dEvent.onTouchEvent(/* TouchDragOver */17, 0, handleFunc);
                                                                  ManageEventAPI$Meta3dEvent.offTouchEventByHandleFunc(/* TouchDragOver */17, handleFunc);
                                                                  EventTool$Meta3dEvent.triggerDomEvent("touchstart", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                                  EventTool$Meta3dEvent.triggerDomEvent("touchmove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                                  EventTool$Meta3dEvent.restore(undefined);
                                                                  return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 0);
                                                                }));
                                                  }));
                                            return Meta3d_jest.describe("test movement", (function (param) {
                                                          var _prepare = function (param) {
                                                            TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                            var movementX = {
                                                              contents: 0
                                                            };
                                                            var movementY = {
                                                              contents: 0
                                                            };
                                                            ManageEventAPI$Meta3dEvent.onTouchEvent(/* TouchDragOver */17, 0, (function ($$event, state) {
                                                                    var match = $$event.movementDelta;
                                                                    movementX.contents = match[0];
                                                                    movementY.contents = match[1];
                                                                    return state;
                                                                  }));
                                                            return [
                                                                    movementX,
                                                                    movementY
                                                                  ];
                                                          };
                                                          Meta3d_jest.test("if not set lastXY on touchmove event if touchdragover event is triggering", (function (param) {
                                                                  var match = _prepare(undefined);
                                                                  EventTool$Meta3dEvent.triggerDomEvent("touchmove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, [TouchEventTool$Meta3dEvent.buildTouchData(1, 2, undefined)], undefined, undefined, undefined, undefined));
                                                                  EventTool$Meta3dEvent.triggerDomEvent("touchstart", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                                  EventTool$Meta3dEvent.triggerDomEvent("touchmove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, [TouchEventTool$Meta3dEvent.buildTouchData(10, 20, undefined)], undefined, undefined, undefined, undefined));
                                                                  EventTool$Meta3dEvent.triggerDomEvent("touchmove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, [TouchEventTool$Meta3dEvent.buildTouchData(50, 70, undefined)], undefined, undefined, undefined, undefined));
                                                                  EventTool$Meta3dEvent.restore(undefined);
                                                                  return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect([
                                                                                  match[0].contents,
                                                                                  match[1].contents
                                                                                ]), [
                                                                              40,
                                                                              50
                                                                            ]);
                                                                }));
                                                          return Meta3d_jest.test("reset lastX,lastY when drag start", (function (param) {
                                                                        var match = _prepare(undefined);
                                                                        EventTool$Meta3dEvent.triggerDomEvent("touchmove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, [TouchEventTool$Meta3dEvent.buildTouchData(1, 2, undefined)], undefined, undefined, undefined, undefined));
                                                                        EventTool$Meta3dEvent.triggerDomEvent("touchstart", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                                        EventTool$Meta3dEvent.triggerDomEvent("touchmove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, [TouchEventTool$Meta3dEvent.buildTouchData(50, 80, undefined)], undefined, undefined, undefined, undefined));
                                                                        EventTool$Meta3dEvent.restore(undefined);
                                                                        return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect([
                                                                                        match[0].contents,
                                                                                        match[1].contents
                                                                                      ]), [
                                                                                    0,
                                                                                    0
                                                                                  ]);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        return Meta3d_jest.describe("bind dom event to trigger point event", (function (param) {
                      Meta3d_jest.describe("bind mouse event to trigger point event", (function (param) {
                              var _testPointEvent = function (pointEventName, mouseDomEventName) {
                                Meta3d_jest.test("test bind", (function (param) {
                                        MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                        var value = {
                                          contents: 0
                                        };
                                        ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(pointEventName, 0, (function ($$event, state) {
                                                value.contents = 1;
                                                return [
                                                        state,
                                                        $$event
                                                      ];
                                              }));
                                        EventTool$Meta3dEvent.triggerDomEvent(mouseDomEventName, EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                        EventTool$Meta3dEvent.restore(undefined);
                                        return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 1);
                                      }));
                                Meta3d_jest.describe("test unbind by handleFunc", (function (param) {
                                        return Meta3d_jest.test("test unbind one handleFunc of the eventName", (function (param) {
                                                      MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                      var value = {
                                                        contents: 0
                                                      };
                                                      var handleFunc = function ($$event, state) {
                                                        value.contents = value.contents + 1 | 0;
                                                        return [
                                                                state,
                                                                $$event
                                                              ];
                                                      };
                                                      ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(pointEventName, 0, handleFunc);
                                                      ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(pointEventName, 0, (function ($$event, state) {
                                                              value.contents = value.contents + 10 | 0;
                                                              return [
                                                                      state,
                                                                      $$event
                                                                    ];
                                                            }));
                                                      ManageEventAPI$Meta3dEvent.offCustomGlobalEventByHandleFunc(pointEventName, handleFunc);
                                                      EventTool$Meta3dEvent.triggerDomEvent(mouseDomEventName, EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                      EventTool$Meta3dEvent.restore(undefined);
                                                      return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 10);
                                                    }));
                                      }));
                                return Meta3d_jest.describe("test unbind by eventName", (function (param) {
                                              return Meta3d_jest.test("test", (function (param) {
                                                            MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                            var value = {
                                                              contents: 0
                                                            };
                                                            var handleFunc = function ($$event, state) {
                                                              value.contents = value.contents + 1 | 0;
                                                              return [
                                                                      state,
                                                                      $$event
                                                                    ];
                                                            };
                                                            ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(pointEventName, 0, handleFunc);
                                                            ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(pointEventName, 0, (function ($$event, state) {
                                                                    value.contents = value.contents + 10 | 0;
                                                                    return [
                                                                            state,
                                                                            $$event
                                                                          ];
                                                                  }));
                                                            ManageEventAPI$Meta3dEvent.offCustomGlobalEventByEventName(pointEventName);
                                                            EventTool$Meta3dEvent.triggerDomEvent(mouseDomEventName, EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                            EventTool$Meta3dEvent.restore(undefined);
                                                            return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 0);
                                                          }));
                                            }));
                              };
                              Meta3d_jest.describe("test trigger pointdown event", (function (param) {
                                      _testPointEvent(CustomEventTool$Meta3dEvent.getPointDownEventName(undefined), "mousedown");
                                      Meta3d_jest.describe("test point event", (function (param) {
                                              Meta3d_jest.test("test event", (function (param) {
                                                      MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                      var value = {
                                                        contents: 0
                                                      };
                                                      ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(CustomEventTool$Meta3dEvent.getPointDownEventName(undefined), 0, (function (customEvent, state) {
                                                              var match = OptionSt$Meta3dCommonlib.unsafeGet(customEvent.userData);
                                                              value.contents = match.event.pageX;
                                                              return [
                                                                      state,
                                                                      customEvent
                                                                    ];
                                                            }));
                                                      var mouseDomEvent = MouseEventTool$Meta3dEvent.buildMouseEvent(10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                                                      EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), mouseDomEvent);
                                                      EventTool$Meta3dEvent.restore(undefined);
                                                      return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 10);
                                                    }));
                                              return Meta3d_jest.test("test name, location, locationInView, button, wheel, movementDelta", (function (param) {
                                                            MouseEventTool$Meta3dEvent.prepare(sandbox, 1, 2, Caml_option.some(undefined), undefined, undefined);
                                                            MouseEventTool$Meta3dEvent.setPointerLocked();
                                                            var resultArr = [];
                                                            ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(CustomEventTool$Meta3dEvent.getPointDownEventName(undefined), 0, (function ($$event, state) {
                                                                    var match = OptionSt$Meta3dCommonlib.unsafeGet($$event.userData);
                                                                    resultArr.push(match.name, match.location, match.locationInView, match.button, match.wheel, match.movementDelta);
                                                                    return [
                                                                            state,
                                                                            $$event
                                                                          ];
                                                                  }));
                                                            var mouseDomEvent = MouseEventTool$Meta3dEvent.buildMouseEvent(10, 20, 1, 1, 2, 2, Caml_option.some(undefined), undefined, undefined, undefined);
                                                            EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), mouseDomEvent);
                                                            EventTool$Meta3dEvent.restore(undefined);
                                                            return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(resultArr), [
                                                                        /* PointDown */1,
                                                                        [
                                                                          10,
                                                                          20
                                                                        ],
                                                                        [
                                                                          9,
                                                                          18
                                                                        ],
                                                                        /* Left */1,
                                                                        -2,
                                                                        [
                                                                          1,
                                                                          2
                                                                        ]
                                                                      ]);
                                                          }));
                                            }));
                                      return Meta3d_jest.describe("test priority", (function (param) {
                                                    return Meta3d_jest.test("the higher priority handleFunc is executed first", (function (param) {
                                                                  MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                                  var value = {
                                                                    contents: 2
                                                                  };
                                                                  ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(CustomEventTool$Meta3dEvent.getPointDownEventName(undefined), 0, (function ($$event, state) {
                                                                          value.contents = value.contents - 2 | 0;
                                                                          return [
                                                                                  state,
                                                                                  $$event
                                                                                ];
                                                                        }));
                                                                  ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(CustomEventTool$Meta3dEvent.getPointDownEventName(undefined), 1, (function ($$event, state) {
                                                                          value.contents = (value.contents << 1);
                                                                          return [
                                                                                  state,
                                                                                  $$event
                                                                                ];
                                                                        }));
                                                                  EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                                  EventTool$Meta3dEvent.restore(undefined);
                                                                  return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 2);
                                                                }));
                                                  }));
                                    }));
                              Meta3d_jest.describe("test trigger pointup event", (function (param) {
                                      return _testPointEvent(CustomEventTool$Meta3dEvent.getPointUpEventName(undefined), "mouseup");
                                    }));
                              Meta3d_jest.describe("test trigger pointtap event", (function (param) {
                                      return _testPointEvent(CustomEventTool$Meta3dEvent.getPointTapEventName(undefined), "click");
                                    }));
                              Meta3d_jest.describe("test trigger pointscale event", (function (param) {
                                      return _testPointEvent(CustomEventTool$Meta3dEvent.getPointScaleEventName(undefined), "mousewheel");
                                    }));
                              Meta3d_jest.describe("test trigger pointmove event", (function (param) {
                                      return _testPointEvent(CustomEventTool$Meta3dEvent.getPointMoveEventName(undefined), "mousemove");
                                    }));
                              return Meta3d_jest.describe("test trigger pointdrag event", (function (param) {
                                            Meta3d_jest.test("test trigger pointdragstart event when trigger mousedragstart event", (function (param) {
                                                    MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                    var value = {
                                                      contents: 0
                                                    };
                                                    ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(CustomEventTool$Meta3dEvent.getPointDragStartEventName(undefined), 0, (function ($$event, state) {
                                                            value.contents = value.contents + 1 | 0;
                                                            return [
                                                                    state,
                                                                    $$event
                                                                  ];
                                                          }));
                                                    EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                    EventTool$Meta3dEvent.restore(undefined);
                                                    return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 1);
                                                  }));
                                            Meta3d_jest.test("test trigger pointdragover event when trigger mousedragover event", (function (param) {
                                                    MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                    var value = {
                                                      contents: 0
                                                    };
                                                    ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(CustomEventTool$Meta3dEvent.getPointDragOverEventName(undefined), 0, (function ($$event, state) {
                                                            value.contents = value.contents + 1 | 0;
                                                            return [
                                                                    state,
                                                                    $$event
                                                                  ];
                                                          }));
                                                    EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                    EventTool$Meta3dEvent.triggerFirstMouseDragOverEvent(MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                    EventTool$Meta3dEvent.triggerDomEvent("mousemove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                    EventTool$Meta3dEvent.restore(undefined);
                                                    return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 2);
                                                  }));
                                            return Meta3d_jest.test("test trigger pointdragdrop event when trigger mousedragdrop event", (function (param) {
                                                          MouseEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                          var value = {
                                                            contents: 0
                                                          };
                                                          ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(CustomEventTool$Meta3dEvent.getPointDragDropEventName(undefined), 0, (function ($$event, state) {
                                                                  value.contents = value.contents + 1 | 0;
                                                                  return [
                                                                          state,
                                                                          $$event
                                                                        ];
                                                                }));
                                                          EventTool$Meta3dEvent.triggerDomEvent("mousedown", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                          EventTool$Meta3dEvent.triggerFirstMouseDragOverEvent(MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                          EventTool$Meta3dEvent.triggerDomEvent("mouseup", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                          EventTool$Meta3dEvent.triggerDomEvent("mouseup", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), MouseEventTool$Meta3dEvent.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                          EventTool$Meta3dEvent.restore(undefined);
                                                          return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 1);
                                                        }));
                                          }));
                            }));
                      return Meta3d_jest.describe("bind touch event to trigger point event", (function (param) {
                                    var _testPointEvent = function (pointEventName, touchDomEventName) {
                                      Meta3d_jest.test("test bind", (function (param) {
                                              TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                              var value = {
                                                contents: 0
                                              };
                                              ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(pointEventName, 0, (function ($$event, state) {
                                                      value.contents = 1;
                                                      return [
                                                              state,
                                                              $$event
                                                            ];
                                                    }));
                                              EventTool$Meta3dEvent.triggerDomEvent(touchDomEventName, EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                              EventTool$Meta3dEvent.restore(undefined);
                                              return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 1);
                                            }));
                                      Meta3d_jest.describe("test unbind by handleFunc", (function (param) {
                                              return Meta3d_jest.test("test unbind one handleFunc of the eventName", (function (param) {
                                                            TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                            var value = {
                                                              contents: 0
                                                            };
                                                            var handleFunc = function ($$event, state) {
                                                              value.contents = value.contents + 1 | 0;
                                                              return [
                                                                      state,
                                                                      $$event
                                                                    ];
                                                            };
                                                            ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(pointEventName, 0, handleFunc);
                                                            ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(pointEventName, 0, (function ($$event, state) {
                                                                    value.contents = value.contents + 10 | 0;
                                                                    return [
                                                                            state,
                                                                            $$event
                                                                          ];
                                                                  }));
                                                            ManageEventAPI$Meta3dEvent.offCustomGlobalEventByHandleFunc(pointEventName, handleFunc);
                                                            EventTool$Meta3dEvent.triggerDomEvent(touchDomEventName, EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                            EventTool$Meta3dEvent.restore(undefined);
                                                            return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 10);
                                                          }));
                                            }));
                                      return Meta3d_jest.describe("test unbind by eventName", (function (param) {
                                                    return Meta3d_jest.test("test", (function (param) {
                                                                  TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                                  var value = {
                                                                    contents: 0
                                                                  };
                                                                  var handleFunc = function ($$event, state) {
                                                                    value.contents = value.contents + 1 | 0;
                                                                    return [
                                                                            state,
                                                                            $$event
                                                                          ];
                                                                  };
                                                                  ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(pointEventName, 0, handleFunc);
                                                                  ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(pointEventName, 0, (function ($$event, state) {
                                                                          value.contents = value.contents + 10 | 0;
                                                                          return [
                                                                                  state,
                                                                                  $$event
                                                                                ];
                                                                        }));
                                                                  ManageEventAPI$Meta3dEvent.offCustomGlobalEventByEventName(pointEventName);
                                                                  EventTool$Meta3dEvent.triggerDomEvent(touchDomEventName, EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                                  EventTool$Meta3dEvent.restore(undefined);
                                                                  return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 0);
                                                                }));
                                                  }));
                                    };
                                    Meta3d_jest.describe("test trigger pointdown event", (function (param) {
                                            _testPointEvent(CustomEventTool$Meta3dEvent.getPointDownEventName(undefined), "touchstart");
                                            Meta3d_jest.describe("test point event", (function (param) {
                                                    Meta3d_jest.test("test event", (function (param) {
                                                            TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                            var value = {
                                                              contents: 0
                                                            };
                                                            ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(CustomEventTool$Meta3dEvent.getPointDownEventName(undefined), 0, (function (customEvent, state) {
                                                                    var match = OptionSt$Meta3dCommonlib.unsafeGet(customEvent.userData);
                                                                    var changedTouches = match.event.changedTouches;
                                                                    value.contents = Caml_array.get(changedTouches, 0).pageX;
                                                                    return [
                                                                            state,
                                                                            customEvent
                                                                          ];
                                                                  }));
                                                            var touchDomEvent = TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, [TouchEventTool$Meta3dEvent.buildTouchData(10, undefined, undefined)], undefined, undefined, undefined, undefined);
                                                            EventTool$Meta3dEvent.triggerDomEvent("touchstart", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), touchDomEvent);
                                                            EventTool$Meta3dEvent.restore(undefined);
                                                            return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 10);
                                                          }));
                                                    return Meta3d_jest.test("test name, location, locationInView, button, wheel, movementDelta", (function (param) {
                                                                  TouchEventTool$Meta3dEvent.prepare(sandbox, 1, 2, Caml_option.some(undefined), undefined, undefined);
                                                                  var resultArr = [];
                                                                  ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(CustomEventTool$Meta3dEvent.getPointDownEventName(undefined), 0, (function ($$event, state) {
                                                                          var match = OptionSt$Meta3dCommonlib.unsafeGet($$event.userData);
                                                                          resultArr.push(match.name, match.location, match.locationInView, match.button, match.wheel, match.movementDelta);
                                                                          return [
                                                                                  state,
                                                                                  $$event
                                                                                ];
                                                                        }));
                                                                  var touchDomEvent = TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, [TouchEventTool$Meta3dEvent.buildTouchData(10, 20, undefined)], undefined, undefined, undefined, undefined);
                                                                  EventTool$Meta3dEvent.triggerDomEvent("touchstart", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), touchDomEvent);
                                                                  EventTool$Meta3dEvent.restore(undefined);
                                                                  return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(resultArr), [
                                                                              /* PointDown */1,
                                                                              [
                                                                                10,
                                                                                20
                                                                              ],
                                                                              [
                                                                                9,
                                                                                18
                                                                              ],
                                                                              undefined,
                                                                              undefined,
                                                                              [
                                                                                0,
                                                                                0
                                                                              ]
                                                                            ]);
                                                                }));
                                                  }));
                                            return Meta3d_jest.describe("test priority", (function (param) {
                                                          return Meta3d_jest.test("the higher priority handleFunc is executed first", (function (param) {
                                                                        TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                                        var value = {
                                                                          contents: 2
                                                                        };
                                                                        ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(CustomEventTool$Meta3dEvent.getPointDownEventName(undefined), 0, (function ($$event, state) {
                                                                                value.contents = value.contents - 2 | 0;
                                                                                return [
                                                                                        state,
                                                                                        $$event
                                                                                      ];
                                                                              }));
                                                                        ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(CustomEventTool$Meta3dEvent.getPointDownEventName(undefined), 1, (function ($$event, state) {
                                                                                value.contents = (value.contents << 1);
                                                                                return [
                                                                                        state,
                                                                                        $$event
                                                                                      ];
                                                                              }));
                                                                        EventTool$Meta3dEvent.triggerDomEvent("touchstart", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                                        EventTool$Meta3dEvent.restore(undefined);
                                                                        return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 2);
                                                                      }));
                                                        }));
                                          }));
                                    Meta3d_jest.describe("test trigger pointup event", (function (param) {
                                            return _testPointEvent(CustomEventTool$Meta3dEvent.getPointUpEventName(undefined), "touchend");
                                          }));
                                    Meta3d_jest.describe("test trigger pointtap event", (function (param) {
                                            Meta3d_jest.test("test bind", (function (param) {
                                                    TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                    var value = {
                                                      contents: 0
                                                    };
                                                    ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(CustomEventTool$Meta3dEvent.getPointTapEventName(undefined), 0, (function ($$event, state) {
                                                            value.contents = 1;
                                                            return [
                                                                    state,
                                                                    $$event
                                                                  ];
                                                          }));
                                                    EventTool$Meta3dEvent.triggerDomEvent("touchstart", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                    EventTool$Meta3dEvent.triggerDomEvent("touchend", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                    EventTool$Meta3dEvent.restore(undefined);
                                                    return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 1);
                                                  }));
                                            return Meta3d_jest.describe("test unbind by handleFunc", (function (param) {
                                                          return Meta3d_jest.test("test unbind one handleFunc of the eventName", (function (param) {
                                                                        TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                                        var value = {
                                                                          contents: 0
                                                                        };
                                                                        var handleFunc = function ($$event, state) {
                                                                          value.contents = value.contents + 1 | 0;
                                                                          return [
                                                                                  state,
                                                                                  $$event
                                                                                ];
                                                                        };
                                                                        ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(CustomEventTool$Meta3dEvent.getPointTapEventName(undefined), 0, handleFunc);
                                                                        ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(CustomEventTool$Meta3dEvent.getPointTapEventName(undefined), 0, (function ($$event, state) {
                                                                                value.contents = value.contents + 10 | 0;
                                                                                return [
                                                                                        state,
                                                                                        $$event
                                                                                      ];
                                                                              }));
                                                                        ManageEventAPI$Meta3dEvent.offCustomGlobalEventByHandleFunc(CustomEventTool$Meta3dEvent.getPointTapEventName(undefined), handleFunc);
                                                                        EventTool$Meta3dEvent.triggerDomEvent("touchstart", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                                        EventTool$Meta3dEvent.triggerDomEvent("touchend", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                                        EventTool$Meta3dEvent.restore(undefined);
                                                                        return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 10);
                                                                      }));
                                                        }));
                                          }));
                                    Meta3d_jest.describe("test trigger pointmove event", (function (param) {
                                            return _testPointEvent(CustomEventTool$Meta3dEvent.getPointMoveEventName(undefined), "touchmove");
                                          }));
                                    return Meta3d_jest.describe("test trigger pointdrag event", (function (param) {
                                                  return Meta3d_jest.test("test trigger event when trigger touchdrag event", (function (param) {
                                                                TouchEventTool$Meta3dEvent.prepare(sandbox, undefined, undefined, undefined, undefined, undefined);
                                                                var value = {
                                                                  contents: 0
                                                                };
                                                                ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(CustomEventTool$Meta3dEvent.getPointDragOverEventName(undefined), 0, (function ($$event, state) {
                                                                        value.contents = value.contents + 1 | 0;
                                                                        return [
                                                                                state,
                                                                                $$event
                                                                              ];
                                                                      }));
                                                                EventTool$Meta3dEvent.triggerDomEvent("touchstart", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                                EventTool$Meta3dEvent.triggerDomEvent("touchmove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                                EventTool$Meta3dEvent.triggerDomEvent("touchmove", EventTool$Meta3dEvent.getPointEventBindedDom(undefined), TouchEventTool$Meta3dEvent.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, undefined));
                                                                EventTool$Meta3dEvent.restore(undefined);
                                                                return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), 2);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
