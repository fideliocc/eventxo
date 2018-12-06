import React, { Component } from "react"
import { connect } from 'react-redux'
import { getSpeakers } from '../../actions/speakerActions'
import SpeakersFeed from './speakersfeed'
import Spinner from '../../components/common/Spinner'

import img1 from '../../assets/images/users/1.jpg';
import img2 from '../../assets/images/users/2.jpg';
import img3 from '../../assets/images/users/3.jpg';
import img4 from '../../assets/images/users/4.jpg';

import {
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	Input,
	Table,
    Tooltip,
    Button
} from 'reactstrap';

class Speakers extends Component {
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
        this.props.history.push('/speakers/add')
    }

    componentWillMount() {
        const id = this.props.projects.project._id
        this.props.getSpeakers(id)
    }

	render() {
        let speakersContent
        const { speakers, loading } = this.props.speakers
    
        /*** Spinner ***/
        if (speakers === null || loading) {
            speakersContent = <Spinner />
        } else {
            speakersContent = <SpeakersFeed speakers={speakers} />
        }

		return (
			/*--------------------------------------------------------------------------------*/
			/* Used In Dashboard-4 [General]                                                  */
			/*--------------------------------------------------------------------------------*/
            
            <Card>
                <CardBody>
                {/* Add Speaker button*/}
                <Button onClick={this.onClick.bind(this)} className="btn" color="danger">Add speaker</Button>{' '}
                <hr></hr>
					<div className="d-flex align-items-center">
                        <div>
							<CardTitle>Speakers List</CardTitle>
							{/*<CardSubtitle>Overview of Latest Month</CardSubtitle>*/}
						</div>
						<div className="ml-auto d-flex no-block align-items-center">
							<div className="dl">
								<Input type="select" className="custom-select">
									<option value="0">Monthly</option>
									<option value="1">Daily</option>
									<option value="2">Weekly</option>
									<option value="3">Yearly</option>
								</Input>
							</div>
						</div>
					</div>
					<Table className="no-wrap v-middle" responsive>
						<thead>
							<tr className="border-0">
								<th className="border-0">Speaker</th>
								<th className="border-0">Grade</th>

								<th className="border-0">From</th>

							</tr>
						</thead>
                
                        
                        {speakersContent}
                            
				
					</Table>
				</CardBody>
			</Card>
		);
	}
}

const mapStateToProps = state => ({
    projects: state.projects,
    speakers: state.speakers
})

export default connect(mapStateToProps, { getSpeakers })(Speakers)
