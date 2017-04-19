import React from 'react';

const Wheel = ({spinning,degree,result}) => {

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


    /*<div className="wheel-div">
    </div>*/

// {
//     spinning ?
//     <p> Your wheel is spinning</p>
//     :
//     (result>0 ? <p> Your result is {result}</p> : <p> Press start button</p>)
// }