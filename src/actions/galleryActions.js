import { GET_GALLERY, UNFAV_GALLERY, FAV_GALLERY, CLEAR_GALLERY, RECOMMEND_GALLERIES } from "../constants/actionTypes";
import http from "../services/httpService";

export const getGallery = utilite => dispatch => {
  http
    .get(`/galleries/${utilite}`)
    .then(res => {
      dispatch({
        type: GET_GALLERY,
        payload: res.data.data
      });
    });
};

export const clearGallery = () => {
  return { type: CLEAR_GALLERY, payload: null };
};

export const favGallery = data => dispatch => {
  dispatch({
    type: FAV_GALLERY,
    payload: { galleryId: data.gallery_id, hasFaved: true }
  });

  http
    .post('/galleries/fav', data)
    .then()
    .catch(err => {
      dispatch({
        type: UNFAV_GALLERY,
        payload: false
      });
    });
};

export const unfavGallery = data => dispatch => {
  dispatch({
    type: UNFAV_GALLERY,
    payload: { galleryId: data.gallery_id, hasFaved: false }
  });

  http
    .post('/galleries/unfav', data)
    .then()
    .catch(err => {
      dispatch({
        type: FAV_GALLERY,
        payload: true
      });
    });
};

export const getRecommendedGalleries = data => dispatch => {
  http
    .get(`/galleries/recommended/galleries`)
    .then(res => {
      dispatch({
        type: RECOMMEND_GALLERIES,
        payload: res.data.data
      });
    });
};

