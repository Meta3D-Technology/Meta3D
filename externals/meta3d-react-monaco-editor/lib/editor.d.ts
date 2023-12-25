import * as React from "react";
import { noop } from "./utils";
declare function MonacoEditor({ monaco, width, height, value, defaultValue, language, theme, options, overrideServices, editorWillMount, editorDidMount, editorWillUnmount, onChange, className, uri, }: {
    monaco: any;
    width: any;
    height: any;
    value: any;
    defaultValue: any;
    language: any;
    theme: any;
    options: any;
    overrideServices: any;
    editorWillMount: any;
    editorDidMount: any;
    editorWillUnmount: any;
    onChange: any;
    className: any;
    uri: any;
}): React.JSX.Element;
declare namespace MonacoEditor {
    var defaultProps: {
        width: string;
        height: string;
        value: any;
        defaultValue: string;
        language: string;
        theme: any;
        options: {};
        overrideServices: {};
        editorWillMount: typeof noop;
        editorDidMount: typeof noop;
        editorWillUnmount: typeof noop;
        onChange: typeof noop;
        className: any;
    };
    var displayName: string;
}
export default MonacoEditor;
