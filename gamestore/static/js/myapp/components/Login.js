import React from 'react';
import { Form, FormGroup, Col, FormControl, Button, Checkbox, ControlLabel, Row } from 'react-bootstrap';
import { loginClick } from '../actions';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom'

// Login component
class Login extends React.Component{

    // constructor for Login, bind event handler to class
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handler submission of login form
    handleSubmit = event => {
        event.preventDefault();
        const username = ReactDOM.findDOMNode(this.username).value;
        const password = ReactDOM.findDOMNode(this.password).value;
        this.props.dispatch(loginClick({ username, password }));
    }

    // render the JSX, use bootstrap components
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

// transform the current Redux store state into the props
const mapStateToProps = (state) => ({
});

// connect the state of the application to Login component, so we can use dispatch at handleSubmit
export default connect(mapStateToProps)(Login);
