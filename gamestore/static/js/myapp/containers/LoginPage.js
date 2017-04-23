import Login from '../components/Login';
import { connect } from 'react-redux';
import { loginClick } from '../actions';

// state
const mapStateToProps = (state) => ({
});

// enable the component to dispatch actions
const mapDispatchToProps = ({
    loginClick:loginClick
});

// connect state to the component
const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginPage;