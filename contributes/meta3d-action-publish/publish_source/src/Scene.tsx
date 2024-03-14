import React, { useState, useEffect } from 'react';
import { Loading } from './Loading';
import { load, startLoop } from './Loop';
import { getHeight, getWidth } from './ViewUtils';

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
        <canvas id="canvas" width={getWidth() + "px"} height={getHeight() + "px"} style={{ "width": getWidth() + "px", "height": getHeight() + "px" }}></canvas>
    </>
};

export default Scene;