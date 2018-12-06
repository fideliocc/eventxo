import axios from 'axios'

import { GET_ERRORS, SPEAKER_LOADING, GET_SPEAKERS } from './types'

// Get all the speakers of current project by projectId
export const getSpeakers = id => dispatch => {
    dispatch(setSpeakerLoading())
    axios
        .get(`api/admin/speaker/${id}`)
        .then(res => 
            dispatch({
                type: GET_SPEAKERS,
                payload: res.data
            }))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

// Create new speaker
export const createSpeaker = (speakerData, history) => dispatch => {
    axios
        .post("/api/admin/speaker/create", speakerData)
        .then(res => history.push("/speakers"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

export const setSpeakerLoading = () => {
    return {
        type: SPEAKER_LOADING
      }
}