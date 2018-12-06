import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Label, Input, Col, Row} from 'reactstrap'
import { createSpeaker } from '../../actions/speakerActions'

class AddSpeaker extends Component {
  constructor(){
    super()
    this.state = {
      name: "",
      lastname: "",
      email: "",
      grade: "",
      country: "",
      bio: "",
      project_id: "",
      errors: {}
    }
    /* Binding */
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    const speakerData = {
      name: this.state.name,
      lastname: this.state.lastname,
      email: this.state.email,
      grade: this.state.grade,
      country: this.state.country,
      bio: this.state.bio,
      project_id: this.props.projects.project._id
    }
    console.log(speakerData)
    this.props.createSpeaker(speakerData, this.props.history)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    console.log(this.props.projects.project._id)
    return (
      <div className="addspeaker">
      <div className="container">
  
          {/*<Col sm="12" md={{ size: 6, offset: 3 }}>*/}

            {/**** CREATE SPEAKER FORM ****/}
            <h1 className="display-4">New speaker</h1>
            <hr></hr>
            <Form onSubmit={this.onSubmit}>
            <Row>

            <Col md={4}>
              <FormGroup>
                <Label for="Name">Name</Label>
                <Input type="text" name="name" value={this.state.name} onChange={this.onChange} id="name" placeholder="John" />
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label for="lastname">Lastname</Label>
                <Input type="text" name="lastname" value={this.state.lastname} onChange={this.onChange} id="lastname" placeholder="Doe Cedeño" />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <Label for="grade">Grade</Label>
                <Input type="text" name="grade" value={this.state.grade} onChange={this.onChange} id="grade" placeholder="PhD" />
              </FormGroup>
            </Col>
            </Row>

            <Row>
              <Col md={2}>
                <FormGroup>
                  <Label for="country">Country</Label>
                    <Input type="select" name="country" id="country" value={this.state.country} onChange={this.onChange}>
                      <option selected hidden>Select your country</option>
                      <option>Ecuador</option>
                      <option>United States</option>
                      <option>Brazil</option>
                      <option>México</option>
                      <option>Portugal</option>
                    </Input>
                  </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="email" name="email" value={this.state.email} onChange={this.onChange} id="email" placeholder="johndoe@example.com" />
                </FormGroup>
              </Col>


            </Row>

            <Row>
              <Col sm={10}>
                <Label for="bio" sm={2}>Write a short bio</Label>
                <Input type="textarea" name="bio" id="bio" value={this.state.bio} onChange={this.onChange} />
              </Col>
            </Row>

            <br></br>
            <Button className="btn" color="danger">Submit</Button>

            </Form>
            {/**** CREATE SPEAKER FORM ****/}
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  projects: state.projects
})

export default connect(mapStateToProps, { createSpeaker })(AddSpeaker)