import React, { useState, useEffect } from 'react';
import { Row } from 'antd';

export let Loading = ({ percent }) => {
    return <Row align="middle">
        <img src="./image/png/logo.png" width="64px" height="64px" />
        <img src="./image/gif/loading.gif" width="100px" height="100ps" />
        {"加载中：" + percent.toString() + "%"}
    </Row >
};