import { GET_SPEAKERS, SPEAKER_LOADING } from "../actions/types";

const initialState = {
    speakers: [],
    speaker: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_SPEAKERS:
            return {
                ...state,
                speakers: action.payload,
                loading: false
            }
        case SPEAKER_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}