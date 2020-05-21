import http from "../services/httpService";
import {
  GET_FAV, GET_ALL_USERS, GET_USER_ART_NAME,
  GET_OTEHR_FAV_USER, CLEAR_USERS, FAV_USER,
  UNFAV_USER
} from "../constants/actionTypes";

export const getFavourites = () => dispatch => {
  http
    .get('/lobby')
    .then(res => {
      dispatch({
        type: GET_FAV,
        payload: res.data.data
      });
    });
};

export const getAllUsers = query => dispatch => {
  http
    .get(`/users/search?name=${query}`)
    .then(res => {
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data.data.users
      });
    });
};

export const clearUsers = () => {
  return { type: CLEAR_USERS, payload: null };
};

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

export const getOtherFavouriteUsers = () => dispatch => {
  http
    .get('/favs/get-faves')
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: GET_OTEHR_FAV_USER,
          payload: res.data.data.faves
        })
      }
    });
};

export const getOtherFavouriteByUsers = () => dispatch => {
  http
    .get('/favs/get-faved-by')
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: GET_OTEHR_FAV_USER,
          payload: res.data.data.faves
        });
      }
    });
};

export const favUser = faved_to => dispatch => {
  dispatch({ type: FAV_USER, payload: true });

  http
    .post('/favs', { faved_to })
    .then()
    .catch(res => {
      dispatch({ type: UNFAV_USER, payload: false });
    });
};

export const unfavUser = faved_to => dispatch => {
  dispatch({ type: UNFAV_USER, payload: false });

  http
    .delete(`/favs/${faved_to}`)
    .then()
    .catch(res => {
      dispatch({ type: FAV_USER, payload: true });
    });
};
