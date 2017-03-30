import Wheel from '../Components/Wheel';
import { connect } from 'react-redux';
import { END_SPIN, reset } from '../Actions';

const mapStateToProps = (state) => ({
    spinning:state.spinning,
    result:state.result,
    degree:state.degree,
});

const mapDispatchToProps = ({
    resetWheel:reset
});

const Wheelspin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Wheel);

export default Wheelspin;