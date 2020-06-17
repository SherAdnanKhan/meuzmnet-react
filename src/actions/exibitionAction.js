import http from "../services/httpService"
import { ART_SEARCH } from "../constants/actionTypes";

export const artSearch = (art) => dispatch => {
  http
    .get('/arts/search', { params: { art } })
    .then(res => {
      dispatch({
        type: ART_SEARCH,
        payload: res.data,
      })
    });
};

export const artPost = (data, history) => () => {
  http
    .post('/posts', data, {})
    .then(res => {
      history.push('/dashboard/my-studio');
    });
};

