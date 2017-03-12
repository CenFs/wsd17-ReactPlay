import React from 'react';
import { Form,FormGroup,Col,FormControl,Button,Checkbox,ControlLabel,Row } from 'react-bootstrap';


const Login = () => (

<Row >
    <Col sm={8} smOffset={2} md={6} mdOffset={3} lg={6} lgOffset={3}>

      <Form horizontal className="login">
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Password" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Checkbox>Remember me</Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">
              Sign in
            </Button>
          </Col>
        </FormGroup>
      </Form>

    </Col>
</Row>

);

export default Login;

//<form className="login">
//  <h1> React Play </h1>
//  <div className="form-group row">
//    <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Username</label>
//    <div className="col-sm-10">
//    <input type="text" name="username" className="form-control" id="inputEmail" placeholder="Email" />
//    </div>
//  </div>
//  <div className="form-group row">
//    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
//    <div className="col-sm-10">
//    <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
//    </div>
//  </div>
//  <div className="form-group row">
//    <div className="offset-sm-2 col-sm-10">
//      <button type="submit" className="btn btn-primary">Sign in</button>
//    </div>
//  </div>
//</form>