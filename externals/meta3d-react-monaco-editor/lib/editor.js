"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
const React = require("react");
const react_1 = require("react");
// import { MonacoEditorProps } from "./types";
const utils_1 = require("./utils");
function MonacoEditor({ monaco, width, height, value, defaultValue, language, theme, options, overrideServices, editorWillMount, editorDidMount, editorWillUnmount, onChange, className, uri,
// }: MonacoEditorProps) {
 }) {
    const containerElement = (0, react_1.useRef)(null);
    // const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const editor = (0, react_1.useRef)(null);
    // const _subscription = useRef<monaco.IDisposable | null>(null);
    const _subscription = (0, react_1.useRef)(null);
    const __prevent_trigger_change_event = (0, react_1.useRef)(null);
    const fixedWidth = (0, utils_1.processSize)(width);
    const fixedHeight = (0, utils_1.processSize)(height);
    const style = (0, react_1.useMemo)(() => ({
        width: fixedWidth,
        height: fixedHeight,
    }), [fixedWidth, fixedHeight]);
    const handleEditorWillMount = () => {
        const finalOptions = editorWillMount(monaco);
        return finalOptions || {};
    };
    const handleEditorDidMount = () => {
        editorDidMount(editor.current, monaco);
        _subscription.current = editor.current.onDidChangeModelContent((event) => {
            if (!__prevent_trigger_change_event.current) {
                onChange(editor.current.getValue(), event);
            }
        });
    };
    const handleEditorWillUnmount = () => {
        editorWillUnmount(editor.current, monaco);
    };
    const initMonaco = () => {
        const finalValue = value !== null ? value : defaultValue;
        if (containerElement.current) {
            // Before initializing monaco editor
            const finalOptions = Object.assign(Object.assign({}, options), handleEditorWillMount());
            const modelUri = uri === null || uri === void 0 ? void 0 : uri(monaco);
            let model = modelUri && monaco.editor.getModel(modelUri);
            if (model) {
                // Cannot create two models with the same URI,
                // if model with the given URI is already created, just update it.
                model.setValue(finalValue);
                monaco.editor.setModelLanguage(model, language);
            }
            else {
                model = monaco.editor.createModel(finalValue, language, modelUri);
            }
            editor.current = monaco.editor.create(containerElement.current, Object.assign(Object.assign(Object.assign({ model }, (className ? { extraEditorClassName: className } : {})), finalOptions), (theme ? { theme } : {})), overrideServices);
            // After initializing monaco editor
            handleEditorDidMount();
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (0, react_1.useEffect)(initMonaco, []);
    (0, react_1.useEffect)(() => {
        if (editor.current) {
            if (value === editor.current.getValue()) {
                return;
            }
            const model = editor.current.getModel();
            __prevent_trigger_change_event.current = true;
            editor.current.pushUndoStop();
            // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
            model.pushEditOperations([], [
                {
                    range: model.getFullModelRange(),
                    text: value,
                },
            ], undefined);
            editor.current.pushUndoStop();
            __prevent_trigger_change_event.current = false;
        }
    }, [value]);
    (0, react_1.useEffect)(() => {
        if (editor.current) {
            const model = editor.current.getModel();
            monaco.editor.setModelLanguage(model, language);
        }
    }, [language]);
    (0, react_1.useEffect)(() => {
        if (editor.current) {
            // Don't pass in the model on update because monaco crashes if we pass the model
            // a second time. See https://github.com/microsoft/monaco-editor/issues/2027
            const { model: _model } = options, optionsWithoutModel = __rest(options, ["model"]);
            editor.current.updateOptions(Object.assign(Object.assign({}, (className ? { extraEditorClassName: className } : {})), optionsWithoutModel));
        }
    }, [className, options]);
    (0, react_1.useEffect)(() => {
        if (editor.current) {
            editor.current.layout();
        }
    }, [width, height]);
    (0, react_1.useEffect)(() => {
        monaco.editor.setTheme(theme);
    }, [theme]);
    (0, react_1.useEffect)(() => () => {
        if (editor.current) {
            handleEditorWillUnmount();
            editor.current.dispose();
        }
        if (_subscription.current) {
            _subscription.current.dispose();
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    return (React.createElement("div", { ref: containerElement, style: style, className: "react-monaco-editor-container" }));
}
MonacoEditor.defaultProps = {
    width: "100%",
    height: "100%",
    value: null,
    defaultValue: "",
    language: "javascript",
    theme: null,
    options: {},
    overrideServices: {},
    editorWillMount: utils_1.noop,
    editorDidMount: utils_1.noop,
    editorWillUnmount: utils_1.noop,
    onChange: utils_1.noop,
    className: null,
};
MonacoEditor.displayName = "MonacoEditor";
exports.default = MonacoEditor;
//# sourceMappingURL=editor.js.map