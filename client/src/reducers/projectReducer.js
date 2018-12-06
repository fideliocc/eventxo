import { GET_PROJECT, GET_PROJECTS, PROJECT_LOADING } from "../actions/types";
//import isEmpty from "../validation/is-empty";

const initialState = {
    projects: [],
    project: {},
    loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PROJECT_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false
      }
      
      case GET_PROJECT:
        return {
          ...state,
        project: action.payload,
        loading: false
        }
    default:
      return state;
  }
}
