import React from 'react';

// simple component which only has a button
const Start = ({spinning,result,startClick,stopClick}) => (
    <div className="button-div">
        {!spinning && (result<0) ?
            (
                <img className="start" src="./tmp/btn.png" onClick={()=>startClick()}/>
            )
            :
            (
                <img className="start" src="./tmp/btn_spin.png"/>
            )
        }
    </div>
);

export default Start;