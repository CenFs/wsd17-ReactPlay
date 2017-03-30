export const START_SPIN = 'START_SPIN';
export const END_SPIN = 'END_SPIN';
export const RESET = 'RESET';

export const startSpin = () => ({
    type: START_SPIN
});

export const endSpin = () => ({
    type: END_SPIN
});

export const reset = () => ({
    type: RESET
});

export const start_end = () => dispatch => {
    dispatch(startSpin());
    return setTimeout(()=>dispatch(endSpin()),5500);
};