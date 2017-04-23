import Start from '../Components/Start';
import { connect } from 'react-redux';
import { startSpin, endSpin, start_end } from '../Actions';

// pass tow props from global state to the component
const mapStateToProps = (state) => ({
    spinning:state.spinning,
    result:state.result
});

const mapDispatchToProps = ({
    startClick:start_end
});

// connect state to the start button, let it be able to dispatch actions.
const Buttons = connect(
  mapStateToProps,
  mapDispatchToProps
)(Start);

export default Buttons;