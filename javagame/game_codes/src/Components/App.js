// The entry of the game UI
import React from 'react';
import Wheelspin from '../Containers/Wheelspin';
import Buttons from '../Containers/Buttons';
import Onnea from '../Containers/Onnea';

// simple component combines sub-components together
const App = () => (
    <div className="top">
        <img className="mask" src="./tmp/bg_mask.png"/>
        <Buttons />
        <Wheelspin />
        <Onnea />
    </div>
);

export default App;