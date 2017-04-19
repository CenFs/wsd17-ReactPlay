import Start from '../Components/Start';
import { connect } from 'react-redux';
import { startSpin, endSpin, start_end } from '../Actions';

const mapStateToProps = (state) => ({
    spinning:state.spinning,
    result:state.result
});

const mapDispatchToProps = ({
    startClick:start_end
    // stopClick: endSpin
});

const Buttons = connect(
  mapStateToProps,
  mapDispatchToProps
)(Start);

export default Buttons;