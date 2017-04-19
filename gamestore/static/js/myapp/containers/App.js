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

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default App;
