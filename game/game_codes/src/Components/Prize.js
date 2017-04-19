import React from 'react';

const Prize = ({result,prizeText,resetWheel}) => {
    
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

//<p>Your lucky number is {result}!</p>
//<h1>ONNEA!</h1>

// {
//     (result<=50) ?
//     <img className="prize" src="./tmp/prize1.png"/>
//     :
//     (
//         (result<=62.5) ? 
//         <img className="prize" src="./tmp/prize2.png"/>
//         :
//         (
//             (result<=75) ? 
//             <img className="prize" src="./tmp/prize3.png"/>
//             :
//             (
//                 (result<=87.5) ? 
//                 <img className="prize" src="./tmp/prize4.png"/>
//                 :
//                 (
//                     <img className="prize" src="./tmp/prize5.png"/>
//                 )
//             )
//         )
//     )
// }