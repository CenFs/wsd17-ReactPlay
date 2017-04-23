import React from 'react';

// simple component which consists of several images
const Wheel = ({spinning,degree,result}) => {

    // here we define the animation, it depends on the degree value, dynamically passed to wheel image
    let imgStyle = (degree > 0) ?
                    {transform:`rotate(${degree}deg)`,
                    transition: '-webkit-transform 5s ease-out'} :
                    {}
                    ;

    return (
        <div className="imgs">
            <img className="wheel" style={imgStyle} src="./tmp/wheel.png"/>
            <img className="dot" src="tmp/dot.png"/>
            <img className="pin" src="tmp/pin.png"/>
        </div>
    )
};

export default Wheel;