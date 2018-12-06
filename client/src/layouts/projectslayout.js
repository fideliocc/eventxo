import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectsFeed from './projectsfeed'
import { getAuthUserProjects } from '../actions/projectActions'

import Header from '../components/header/header.jsx'
import Footer from '../components/footer/footer.jsx'
import Spinner from '../components/common/Spinner'

import {
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	Table
} from 'reactstrap';

class ProjectsLayout extends Component {
    componentWillMount() {
        this.props.getAuthUserProjects()
    }

  render() {
    let projectContent
    const { projects, loading } = this.props.projects
    console.log(projects)

    /*** Spinner ***/
    if (projects === null || loading) {
        projectContent = <Spinner />
    } else {
        projectContent = <ProjectsFeed projects={projects} />
    }

    return (
    <div>
        <Header />
        <Card>
            <CardBody>
                <div className="d-flex align-items-center">
                    <div>
                        <CardTitle>Proyectos</CardTitle>
                        <CardSubtitle>Vista General</CardSubtitle>
                    </div>
                    {/*<div className="ml-auto d-flex no-block align-items-center">
                        <div className="dl">
                            <Input type="select" className="custom-select">
                                <option value="0">Monthly</option>
                                <option value="1">Daily</option>
                                <option value="2">Weekly</option>
                                <option value="3">Yearly</option>
                            </Input>
                        </div>
                    </div>*/}
                </div>

                <Table className="no-wrap v-middle" responsive>
                    <thead>
                        <tr className="border-0">
                            <th className="border-0">Proyecto</th>
                            <th className="border-0">Plataforma</th>
                            <th className="border-0">Estado</th>
                        </tr>
                    </thead>
                    
                    {projectContent}
                    
                </Table>
            </CardBody>
        </Card>  
        <Footer />
    </div>
    )
  }
}

const mapStateToProps = state => ({
    auth: state.auth,
    projects: state.projects,
    errors: state.errors
  });

export default connect(mapStateToProps, { getAuthUserProjects })(ProjectsLayout)