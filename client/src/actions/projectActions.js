import axios from "axios";

import { GET_PROJECTS, GET_PROJECT, GET_ERRORS, PROJECT_LOADING } from "./types";


// Login - Get user Token
export const getAuthUserProjects = () => dispatch => {
    dispatch(setProjectLoading())
    axios
    .get("/api/admin/projects")
    .then(res =>
        dispatch({
            type: GET_PROJECTS,
            payload: res.data
        }))
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: null
        })
    )
}

export const getProjectData = id => dispatch => {
    dispatch(setProjectLoading())
    axios 
        .get(`/api/admin/projects/${id}`)
        .then(res => 
            dispatch({
                type: GET_PROJECT,
                payload: res.data
            })      
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: null
            })        
        )
}

export const setProjectLoading = () => {
    return {
        type: PROJECT_LOADING
      }
}