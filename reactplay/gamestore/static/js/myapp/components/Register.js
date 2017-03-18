import React from 'react';
import { Form,FormGroup,Col,FormControl,Button,ControlLabel,Row } from 'react-bootstrap';
import { registerClick } from '../actions';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom'

class Register extends React.Component{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault();

        // Check whether password was written correctly
        var password = ReactDOM.findDOMNode(this.password).value;
        if (password == ReactDOM.findDOMNode(this.password_check).value) {
            // Send register dispatch
            var username = ReactDOM.findDOMNode(this.username).value;
            var email = ReactDOM.findDOMNode(this.email).value;
            var group = ReactDOM.findDOMNode(this.group).value;
            this.props.dispatch(registerClick({
                    username:username, password:password, email:email, role:group
                }));
        } else {
            
        }
    }

    render() {
        return (
            <Row >
                <Col sm={8} smOffset={2} md={6} mdOffset={3} lg={6} lgOffset={3}>

                  <Form horizontal className="register">
                    <FormGroup controlId="formHorizontalEmail">
                      <Col componentClass={ControlLabel} sm={2}>
                        Username
                      </Col>
                      <Col sm={10}>
                        <FormControl type="text" placeholder="Username" ref={(input) => this.username = input}/>
                      </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                      <Col componentClass={ControlLabel} sm={2}>
                        Email
                      </Col>
                      <Col sm={10}>
                        <FormControl type="email" placeholder="Email" ref={(input) => this.email = input}/>
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

                    <FormGroup controlId="formHorizontalPassword">
                      <Col componentClass={ControlLabel} sm={2}>
                        Password
                      </Col>
                      <Col sm={10}>
                        <FormControl type="password" placeholder="Password Again" ref={(password_check) => this.password_check = password_check}/>
                      </Col>
                    </FormGroup>

                    <FormGroup controlId="formControlsSelect">
                      <Col componentClass={ControlLabel} sm={2}>
                        Account Type
                      </Col>
                      <Col sm={10}>
                        <FormControl componentClass="select" placeholder="UserPlayer" ref={(input) => this.group = input}>
                          <option value="UserPlayer">Player</option>
                          <option value="UserDeveloper">Developer</option>
                        </FormControl>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col smOffset={2} sm={10}>
                        <Button type="submit" onClick={this.handleSubmit} >
                          Register
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>

                </Col>
            </Row>
        );
    }
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(Register);