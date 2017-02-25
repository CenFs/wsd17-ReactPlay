// This container make the Game component dynamic
// It will pass data and functions from the top state to the Game component's prop

import Game from '../components/Game';
import { connect } from 'react-redux';
import { fetchData, clearData } from '../actions';

const mapStateToProps = (state) => ({
    name:state.name,
    games:state.games
});

const mapDispatchToProps = ({
    fetchClick:fetchData,
    clearClick:clearData
});

const Gamelist = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default Gamelist;