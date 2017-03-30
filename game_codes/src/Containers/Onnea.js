import Prize from '../Components/Prize';
import { connect } from 'react-redux';
import { reset } from '../Actions';

const mapStateToProps = (state) => ({
    result:state.result,
    prizeText:state.prizeText
});

const mapDispatchToProps = ({
    resetWheel:reset
});

const Onnea = connect(
  mapStateToProps,
  mapDispatchToProps
)(Prize);

export default Onnea;