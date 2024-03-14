// import { loadPackage } from "meta3d"
// import * as M from "meta3d"

// console.log(( globalThis as any ).Meta3d)



import 'antd/dist/reset.css'
import '@ant-design/flowchart/dist/index.css'

// import * as layui from "layui"

// // Usage
// layui.use(function () {
//     var layer = layui.layer;
//     // Welcome
//     layer.msg('Hello World', { icon: 6 });
// });
// // import {use, layer, msg} from "layui"

// // // Usage
// // use(function () {
// //     // var layer = layui.layer;
// //     // Welcome
// //     msg('Hello World', { icon: 6 });
// // });
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import VConsole from 'vconsole';

// import { Bar } from '@ant-design/plots';
import Page from './Page';
// import { startLoop } from './Loop';
import Scene from './Scene';

let App = () => {
    useEffect(() => {
        let _ = new VConsole()
    }, []);


    return <Layout>
        < Layout.Content >
            <Scene />
            <Page />
        </Layout.Content >
    </Layout >
};

(ReactDOM as any).render(<App />, document.getElementById('ui_root'));