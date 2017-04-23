import Wheel from '../Components/Wheel';
import { connect } from 'react-redux';
import { END_SPIN, reset } from '../Actions';

// pass three props to the component
const mapStateToProps = (state) => ({
    spinning:state.spinning,
    result:state.result,
    degree:state.degree,
});

// pass action
const mapDispatchToProps = ({
    resetWheel:reset
});

// connect
const Wheelspin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Wheel);

export default Wheelspin;