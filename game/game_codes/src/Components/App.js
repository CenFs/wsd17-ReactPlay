import React from 'react';
import Wheelspin from '../Containers/Wheelspin';
import Buttons from '../Containers/Buttons';
import Onnea from '../Containers/Onnea';

const App = () => (
    <div className="top">
        <img className="mask" src="./tmp/bg_mask.png"/>
        <Buttons />
        <Wheelspin />
        <Onnea />
    </div>
);

export default App;

// <img className="bg" src="./tmp/bg.png"/>