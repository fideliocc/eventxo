import React, { Component } from 'react'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Button, Form, FormGroup, Label, Input, Col, Row} from 'reactstrap'
import { loginUser } from '../../actions/authActions'

class Login extends Component {
  constructor(){
    super()
    this.state = {
      email: "",
      password: "",
      errors: {}
    }
    /* Binding */
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    // Redirect to Main page if user is logged in and try to visit /login
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/projects");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      //this.props.getCurrentProfile();
      this.props.history.push("/projects");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  render() {
    return (
      <div className="login">
        <div className="container">
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>

              {/**** LOGIN FORM ****/}
              <h1 className="display-4 text-center">Inicia sesión</h1>
              <Form onSubmit={this.onSubmit}>

                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" name="email" value={this.state.email} onChange={this.onChange} id="email" placeholder="user@example.com" />
                </FormGroup>

                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input type="password" name="password" value={this.state.password} onChange={this.onChange} id="password" placeholder="Place a secure password" />
                </FormGroup>

                <Button>Submit</Button>
                
              </Form>
              {/**** LOGIN FORM ****/}

            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser } )(Login)
