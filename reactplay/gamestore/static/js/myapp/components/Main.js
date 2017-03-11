import React from 'react';
import Gamelist from '../containers/Gamelist';

const Main = () => (
<div>
    <h1>Django+React+Redux+Webpack </h1>
    <ul>
        <li>0. You should install npm locally if not</li>
        <li>1. you can click the fetch button to get some data from our django server</li>
        <li>2. fetch and clear buttons both emit actions, and they will change the state of the app</li>
        <li>3. I used npm + webpack to build the react, all react codes are inside the gamestore/static/js/myapp folder</li>
        <li>4. you can check those react codes, I added some comments to explain the app</li>
        <li>5. everytime you change some js code, you need to run 'npm run build' on command line, the webpack will create new bundle file</li>
        <li>6. it is pain to rebuild the bundle everytime, we should consider make some hot-reload</li>
        <li>7. I suggest to write es6 codes, the babel-loader will transform those into es5</li>
        <li>8. Chrome is strongly recommended, and you should install React Developer Tools for Chrome, it is awesome</li>
    </ul>
    <Gamelist />

    <a href="/store/login"> login page </a> <br/>
    <a href="/store/register"> register page </a>
</div>
);

export default Main;


//import React from 'react';
//
//
//const Main = ({}) => (
//    <div>
//        <h1>
//            Welcome to ReactPlay
//        </h1>
//    </div>
//);
//
//export default Main;

