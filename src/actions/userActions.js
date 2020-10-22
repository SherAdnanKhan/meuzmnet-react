import http from '../services/httpService';
import { toast } from 'react-toastify';
import {
  GET_ALL_USERS,
  GET_USER_ART_NAME,
  GET_FAV_USER,
  GET_FAV_BY_USER,
  CLEAR_USERS,
  FAV_USER,
  UNFAV_USER,
  UPDATE_COUNT,
  GET_ALL_FEELS,
  REQUEST_APPROVED,
  REQUEST_REJECTED,
  SPRFVS_USERS,
  USER_REQUESTS,
  INVITED_USERS,
  GET_FAV_AND_SPRFVS_USERS,
  ONLINE_USERS,
  SET_SEARCH_ERROR,
  CLEAR_SEARCH_ERROR,
} from '../constants/actionTypes';
import { isEmpty } from "../utils/helperFunctions";


export const getAllUsers = query => dispatch => {
  http
    .get(`/users/search?name=${query}`)
    .then(res => {
      if (isEmpty(res.data.data.users)) {
        dispatch({ type: SET_SEARCH_ERROR })
      }
      else {
        dispatch({ type: CLEAR_SEARCH_ERROR })
      }
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data.data.users
      });
    });
};

export const clearUsers = () => ({ type: CLEAR_USERS, payload: null });

export const getUserArtById = (id) => dispatch => {
  http
    .get(`/arts/art/${id}`)
    .then(res => {
      dispatch({
        type: GET_USER_ART_NAME,
        payload: res.data.data.art
      });
    });
};

export const getFaveUsers = username => dispatch => {
  http
    .get(`/favs/get-faves?username=${username}`)
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: GET_FAV_USER,
          payload: res.data.data.faves
        });
      }
    });
};

export const getFaveByUsers = username => dispatch => {
  http
    .get(`/favs/get-faved-by?username=${username}`)
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: GET_FAV_BY_USER,
          payload: res.data.data.faves
        });
      }
    });
};

export const favUser = favedTo => dispatch => {
  dispatch({ type: FAV_USER, payload: true });

  http
    .post('/favs', { faved_to: favedTo })
    .then()
    .catch(() => {
      dispatch({ type: UNFAV_USER, payload: false });
    });
};

export const unfavUser = faved_to => dispatch => {
  dispatch({ type: UNFAV_USER, payload: false });

  http
    .delete(`/favs/fave/${faved_to}`)
    .then()
    .catch(() => {
      dispatch({ type: FAV_USER, payload: true });
    });
};

export const updateCounter = () => ({ type: UPDATE_COUNT });

export const getFeelHistory = (page) => dispatch => {
  http
    .get(`/users/list-feels?page=${page}`)
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: GET_ALL_FEELS,
          payload: res.data.data
        });
      }
    });
};

export const getSprfvsUsers = (privacyTypeId, status, userSlug = '') => dispatch => {
  let url = `/user/privacy/lists/${privacyTypeId}/${status}`;

  if (userSlug) {
    url += `?slug=${userSlug}`;
  }

  http
    .get(url)
    .then(res => {
      dispatch({
        type: SPRFVS_USERS,
        payload: res.data.data.faves
      });
    });
};

export const getUserRequests = (privacyTypeId, status) => dispatch => {
  http
    .get(`/user/privacy/lists/${privacyTypeId}/${status}`)
    .then(res => {
      dispatch({
        type: USER_REQUESTS,
        payload: res.data.data.faves
      });
    });
};

export const getInvitedUsers = (privacyTypeId, status) => dispatch => {
  http
    .get(`/user/privacy/lists/${privacyTypeId}/${status}`)
    .then(res => {
      dispatch({
        type: INVITED_USERS,
        payload: res.data.data.faves
      });
    });
};

export const approveRequest = request => dispatch => {
  http
    .post('/user/privacy/sprfvs/approved', request)
    .then(() => {
      toast('You have approved request.');

      dispatch({
        type: REQUEST_APPROVED,
        payload: request
      });
    });
};

export const rejectRequest = request => dispatch => {
  http
    .post('/user/privacy/sprfvs/reject', request)
    .then(() => {
      toast('You have reject request.');

      dispatch({
        type: REQUEST_REJECTED,
        payload: request
      });
    });
};

export const getFaveAndSprfvsUsers = () => dispatch => {
  http
    .get('/mzflash/user/faves-sprfvs-users')
    .then(res => {
      dispatch({
        type: GET_FAV_AND_SPRFVS_USERS,
        payload: res.data.data.faves
      });
    });
};

export const setOnlineUsers = (users) => {
  return {
    type: ONLINE_USERS,
    payload: users
  };
};

export const reportUser = (data, username) => dispatch => {
  http
    .post('/users/report', data)
    .then(res => {
      toast.success(`you have successfully reported `)
    });
};
