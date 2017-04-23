export const START_SPIN = 'START_SPIN';
export const END_SPIN = 'END_SPIN';
export const RESET = 'RESET';

// start action, when click the start button
export const startSpin = () => ({
    type: START_SPIN
});

// end action, when the wheel stop rotation
export const endSpin = () => ({
    type: END_SPIN
});

// reset action, when you click on the Prize text/score
export const reset = () => ({
    type: RESET
});

// start spinning, 5 secs later, dispatch end action
export const start_end = () => dispatch => {
    dispatch(startSpin());
    return setTimeout(()=>dispatch(endSpin()),5500);
};