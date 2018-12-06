import React, { Component } from 'react'

import ProjectItem from './projectitem'

class ProjectsFeed extends Component {
  render() {
    const { projects } = this.props

    return projects.map(project => <ProjectItem key={project._id} project={project} />)
  }
}

export default ProjectsFeed
