import React from 'react';

// prize component
const Prize = ({result,prizeText,resetWheel}) => {
    
    // control the display of the mask depending on result
    if (result>0)
    {
        if(document.getElementsByClassName("imgs").length)
        {
            document.getElementsByClassName("mask")[0].style.opacity = 0.5;
            document.getElementsByClassName("button-div")[0].style.filter = "brightness(50%)";
            document.getElementsByClassName("imgs")[0].style.filter = "brightness(50%)";
        }
    }
    else
    {
        if(document.getElementsByClassName("imgs").length)
        {
            document.getElementsByClassName("mask")[0].style.opacity = 0;
            document.getElementsByClassName("button-div")[0].style.filter = "brightness(100%)";
            document.getElementsByClassName("imgs")[0].style.filter = "brightness(100%)";
        }
    }

    // the prize and onnea image will be shown depending on the result's value
    return (
        <div className="prize">
            {(result>0) ?
                <div className="result" onClick={resetWheel}>
                    <img className="onnea" src="./tmp/onnea.png"/>
                    <p>You won {result} beers!</p>
                </div>
                :
                null
            }
        </div>
    );
}

export default Prize;