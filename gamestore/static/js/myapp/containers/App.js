// demo, not used in the project
import React from 'react';
import Main from '../components/Main';
import { connect } from 'react-redux';
import { loginPage, logoutPage } from '../actions';

const mapStateToProps = (state) => ({
    isLogin:state.isLogin
});

const mapDispatchToProps = ({
    loginClick:loginPage,
    logoutClick:logoutPage
});

// connect global state to the component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default App;
