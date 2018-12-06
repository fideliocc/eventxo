import React, { Component } from 'react'

import SpeakersItem from './speakersitem'

class SpeakersFeed extends Component {
  render() {
    const { speakers } = this.props

    return speakers.map(speaker => <SpeakersItem key={speaker._id} speaker={speaker} />)
  }
}

export default SpeakersFeed
