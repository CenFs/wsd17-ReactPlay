import Prize from '../Components/Prize';
import { connect } from 'react-redux';
import { reset } from '../Actions';
// pass two props from redux to Component
const mapStateToProps = (state) => ({
    result:state.result,
    prizeText:state.prizeText
});

// pass and action to the component
const mapDispatchToProps = ({
    resetWheel:reset
});

const Onnea = connect(
  mapStateToProps,
  mapDispatchToProps
)(Prize);

export default Onnea;