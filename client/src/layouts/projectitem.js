import React from "react"
import { withRouter } from 'react-router'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Tooltip } from 'reactstrap'
import img1 from '../assets/images/users/1.jpg'
import { getProjectData } from '../actions/projectActions'

class ProjectsList extends React.Component {
	constructor(props) {
		super(props);

		this.toggle10 = this.toggle10.bind(this);
		this.toggle20 = this.toggle20.bind(this);
		this.toggle30 = this.toggle30.bind(this);
		this.toggle40 = this.toggle40.bind(this);
		this.state = {
			tooltipOpen10: false,
			tooltipOpen20: false,
			tooltipOpen30: false,
			tooltipOpen40: false
		};
	}

	toggle10() {
		this.setState({
			tooltipOpen10: !this.state.tooltipOpen10
		});
	}

	toggle20() {
		this.setState({
			tooltipOpen20: !this.state.tooltipOpen20
		});
	}

	toggle30() {
		this.setState({
			tooltipOpen30: !this.state.tooltipOpen30
		});
	}

	toggle40() {
		this.setState({
			tooltipOpen40: !this.state.tooltipOpen40
		});
	}


	onClick(e) {
		e.preventDefault()
		const id = this.props.project._id
		this.props.getProjectData(id)
		this.props.history.push("/dashboard")
	}

	render() {
		const { project } = this.props
		const { id } = this.props.auth.user
		const date = project.date.toString().split("T", 1);
		return (
			/*--------------------------------------------------------------------------------*/
			/* Used In Dashboard-4 [General]     
			/* {`/${id}/dashboard`}                                             */
			/*--------------------------------------------------------------------------------*/
						<tbody>
							<tr>
								<td>
									<div className="d-flex no-block align-items-center">
										<div className="mr-2"><img src={img1} alt="user" className="rounded-circle" width="45" /></div>
										<div className="">
											<Link onClick={this.onClick.bind(this)} to={`/${id}/dashboard`} ><h5 className="mb-0 font-16 font-medium">{project.name}</h5></Link><small>Creado: {date}</small></div>
									</div>
								</td>
								<td>{project.platform}</td>

								<td>
									<i className="fa fa-circle text-orange" id="tlp1"></i>
									<Tooltip placement="top" isOpen={this.state.tooltipOpen10} target="tlp1" toggle={this.toggle10}>
										In Progress
                      				</Tooltip>
								</td>
							</tr>
						</tbody>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	projects: state.projects
})

export default withRouter(connect(mapStateToProps, { getProjectData })(ProjectsList))
