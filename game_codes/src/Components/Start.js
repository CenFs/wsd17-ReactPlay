import React from 'react';

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

        // {spinning ?
        //     (<button onClick={()=>stopClick()}>Stop</button>) :
        //     (<button disabled>Reset</button>)
        // }