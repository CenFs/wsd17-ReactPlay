import React from 'react';
import { Form,FormGroup,Col,FormControl,Button,Checkbox,ControlLabel,Row } from 'react-bootstrap';
import { loginClick } from '../actions';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom'

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch(loginClick({username:ReactDOM.findDOMNode(this.username).value,password:ReactDOM.findDOMNode(this.password).value}));
    }

    render() {
        return (
            <Row >
                <Col sm={8} smOffset={2} md={6} mdOffset={3} lg={6} lgOffset={3}>

                  <Form horizontal className="login">
                    <FormGroup controlId="formHorizontalEmail">
                      <Col componentClass={ControlLabel} sm={2}>
                        Username
                      </Col>
                      <Col sm={10}>
                        <FormControl type="text" placeholder="Username" ref={(input) => this.username = input}/>
                      </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                      <Col componentClass={ControlLabel} sm={2}>
                        Password
                      </Col>
                      <Col sm={10}>
                        <FormControl type="password" placeholder="Password" ref={(password) => this.password = password}/>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col smOffset={2} sm={10}>
                        <Checkbox>Remember me</Checkbox>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col smOffset={2} sm={10}>
                        <Button type="submit" onClick={this.handleSubmit} >
                          Sign in
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>

                </Col>
            </Row>
        );
    }
}

//const Login = ({loginClick}) => (
//<Row >
//    <Col sm={8} smOffset={2} md={6} mdOffset={3} lg={6} lgOffset={3}>
//
//      <Form horizontal className="login">
//        <FormGroup controlId="formHorizontalEmail">
//          <Col componentClass={ControlLabel} sm={2}>
//            Username
//          </Col>
//          <Col sm={10}>
//            <FormControl type="text" placeholder="Username" />
//          </Col>
//        </FormGroup>
//
//        <FormGroup controlId="formHorizontalPassword">
//          <Col componentClass={ControlLabel} sm={2}>
//            Password
//          </Col>
//          <Col sm={10}>
//            <FormControl type="password" placeholder="Password" />
//          </Col>
//        </FormGroup>
//
//        <FormGroup>
//          <Col smOffset={2} sm={10}>
//            <Checkbox>Remember me</Checkbox>
//          </Col>
//        </FormGroup>
//
//        <FormGroup>
//          <Col smOffset={2} sm={10}>
//            <Button type="submit" onClick={(event)=>{event.preventDefault(); loginClick(JSON.stringify({username:'player',password:'debugpass'}))}} >
//              Sign in
//            </Button>
//          </Col>
//        </FormGroup>
//      </Form>
//
//    </Col>
//</Row>
//);

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(Login);
