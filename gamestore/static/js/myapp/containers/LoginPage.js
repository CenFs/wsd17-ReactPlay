import Login from '../components/Login';
import { connect } from 'react-redux';
import { loginClick } from '../actions';

const mapStateToProps = (state) => ({
});

//let data1 = {username:'player',password:'debugpass'}
//var data2 = new FormData();
//data2.append('json',JSON.stringify(data1));

const mapDispatchToProps = ({
    loginClick:loginClick
});

const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginPage;