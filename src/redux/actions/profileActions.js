import { serverCall } from '../../modules/ServerCall'

export const getProfile = (id) => (dispatch, getState) => {
  if (!getState().token.token) return
  const token = getState().token.token
  let url = `/users/${token.user_id}`
  if (id) {
    url = `/users/${id}`
  }
  dispatch({
    type: FETCH_PROFILE_BEGIN
  })
  return serverCall({
    method: 'get',
    url: url
  }).request
    .then(res => {
      dispatch({
        type: FETCH_PROFILE_SUCCESS,
        payload: res
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_PROFILE_FAILURE,
        payload: { error }
      })
    })
}
export const FETCH_PROFILE_BEGIN = 'FETCH_PROFILE_BEGIN';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

export const getProfiles = (id) => (dispatch, getState) => {
  dispatch({
    type: FETCH_PROFILES_BEGIN
  })
  const url = `/users/${id}`
  return serverCall({
    method: 'get',
    url: url
  }).request
    .then(res => {
      dispatch({
        type: FETCH_PROFILES_SUCCESS,
        payload: res
      })
      return res
    })
    .catch(error => {
      dispatch({
        type: FETCH_PROFILES_FAILURE,
        payload: { error }
      })
      throw error
    })

}
export const FETCH_PROFILES_BEGIN = 'FETCH_PROFILES_BEGIN';
export const FETCH_PROFILES_SUCCESS = 'FETCH_PROFILES_SUCCESS';
export const FETCH_PROFILES_FAILURE = 'FETCH_PROFILES_FAILURE';

export const getAllProfiles = (id_array) => (dispatch, getState) => {
  dispatch({
    type: FETCH_ALLPROFILES_BEGIN
  })
  Promise.all(id_array.map(id => {
    const url = `/users/${id}`
    return serverCall({
      method: 'get',
      url: url
    }).request
      .then(res => {
        dispatch({
          type: FETCH_ALLPROFILES_SUCCESS,
          payload: res
        })
        return res
      })
      .catch(error => {
        dispatch({
          type: FETCH_ALLPROFILES_FAILURE,
          payload: { error }
        })
        return error
      })
  })).then(res =>
    dispatch({
      type: FETCH_ALLPROFILES_DONE
    }))
}
export const FETCH_ALLPROFILES_BEGIN = 'FETCH_ALLPROFILES_BEGIN';
export const FETCH_ALLPROFILES_SUCCESS = 'FETCH_ALLPROFILES_SUCCESS';
export const FETCH_ALLPROFILES_FAILURE = 'FETCH_ALLPROFILES_FAILURE';
export const FETCH_ALLPROFILES_DONE = 'FETCH_ALLPROFILES_DONE';

export const updateProfile = (obj) => (dispatch, getState) => {
  if (!getState().token.token) return
  const token = getState().token.token
  dispatch({
    type: UPDATE_PROFILE_BEGIN
  })
  return serverCall({
    method: 'put',
    url: `/users/${token.user_id}`,
    data: {
      "user": {
        ...obj
      }
    }
  }).request
    .then(res => {
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res
      })
      return res
    })
    .catch(error => {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: { error }
      })
    })
}
export const UPDATE_PROFILE_BEGIN = 'UPDATE_PROFILE_BEGIN'
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS'
export const UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL'

export const signUp = (email, password, name) => dispatch => {
  dispatch({
    type: POST_SIGNUP_BEGIN
  })
  return serverCall({
    method: 'post',
    url: `/users`,
    data: {
      "user": {
        "email": email,
        "password": password,
        "name": name || '',
      }
    }
  }).request
    .then(res => {
      dispatch({
        type: POST_SIGNUP_SUCCESS,
        payload: res
      })
      return res
    })
    .catch(error => {
      dispatch({
        type: POST_SIGNUP_FAIL,
        payload: { error }
      })
      throw error
    })
}
export const UPDATE_REDUX_PROFILE_SUCCESS = 'UPDATE_REDUX_PROFILE_SUCCESS'
export const POST_SIGNUP_BEGIN = 'POST_SIGNUP_BEGIN'
export const POST_SIGNUP_SUCCESS = 'POST_SIGNUP_SUCCESS'
export const POST_SIGNUP_FAIL = 'POST_SIGNUP_FAIL'


