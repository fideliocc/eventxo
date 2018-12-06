import React from "react"
import { withRouter } from 'react-router'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Tooltip } from 'reactstrap'
import img1 from '../../assets/images/users/1.jpg'

class SpeakersItem extends React.Component {
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

	}

	render() {
        //console.log(this.props.speaker, 'speakersitem')
        const { speaker } = this.props
        const date = speaker.date.toString().split("T", 1);
        console.log(speaker)
        return(
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
                                        <Link onClick={this.onClick.bind(this)} to={`/dashboard`} ><h5 className="mb-0 font-16 font-medium">{speaker.lastname + ', ' + speaker.name}</h5></Link>
                                        <span>{speaker.email}</span>
                                        <p><small>Creado: {date}</small></p>
                                    </div>
                                </div>
                            </td>
                            <td>{speaker.grade}</td>

                            <td>
                            {speaker.country}
                            </td>
                        </tr>
                        </tbody>
                   
        )
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
    projects: state.projects,
    speakers: state.speakers
})

export default withRouter(connect(mapStateToProps, {  })(SpeakersItem))
