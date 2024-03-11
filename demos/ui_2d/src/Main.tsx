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

import { Bar } from '@ant-design/plots';
import Page from './Page';

const DemoBar = () => {
  const data = [
    {
      year: '1951 年',
      value: 38,
    },
    {
      year: '1952 年',
      value: 52,
    },
    {
      year: '1956 年',
      value: 61,
    },
    {
      year: '1957 年',
      value: 145,
    },
    {
      year: '1958 年',
      value: 48,
    },
  ];
  const config = {
    data,
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    legend: {
      position: 'top-left',
    },
  } as any;

  return <>
    <Bar {...config} />
    <Page />
  </>

    ;
};


const DemoBar2 = () => {

  return <>
    <Page />
  </>

    ;
};

ReactDOM.render(<DemoBar />, document.getElementById('root1'));
ReactDOM.render(<DemoBar2 />, document.getElementById('root2'));

