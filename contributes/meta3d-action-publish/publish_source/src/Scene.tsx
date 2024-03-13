import React, { useState, useEffect } from 'react';
import { Loading } from './Loading';
import { load, startLoop } from './Loop';

let _getWidth = () => {
    return window.innerWidth + "px"
}

let _getHeight = () => {
    return window.innerHeight + "px"
}


let Scene: React.FC = () => {
    let [isLoading, setIsLoading] = useState(true)
    let [percent, setPercent] = useState(0)
    // let [sceneData, setSceneData] = useState(null)

    useEffect(() => {
        load(setPercent).then(sceneData => {
            setIsLoading(_ => false)
            // setSceneData((_) => sceneData)

            return startLoop(sceneData)
        })
    }, []);

    return <>
        {
            isLoading ?
                <Loading percent={percent} />
                : null
        }
        <canvas id="canvas" width={_getWidth()} height={_getHeight()} style={{ "width": _getWidth(), "height": _getHeight() }}></canvas>
    </>
};

export default Scene;