import { MOVIE_LIST, SET_ERROR, RESPONSE_PAGE, LOAD_MORE_RESULTS, MOVIE_TYPE } from "../types";
import { MOVIE_API_URL } from "../../API/movieAPI";

export const getMovie = (type, pageIndex) => async (dispatch) => {
  try {
    const response = await getMovieRequest(type, pageIndex);
    const { results, payload } = response;
    dispatchMethod(MOVIE_LIST, results, dispatch);
    dispatchMethod(RESPONSE_PAGE, payload, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};
export const loadMoreMovies = (type, pageIndex) => async (dispatch) => {
  try {
    const response = await getMovieRequest(type, pageIndex);
    const { results, payload } = response;
    dispatchMethod(LOAD_MORE_RESULTS, { list: results, page: payload.page, totalPageIndex: payload.totalPageIndex }, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const setResponsePageNumber = (page, totalPageIndex) => async (dispatch) => {
  const payload = { page, totalPageIndex };
  dispatchMethod(RESPONSE_PAGE, payload, dispatch);
};

export const setMovieType = (type) => async (dispatch) => {
  dispatchMethod(MOVIE_TYPE, type, dispatch);
};

const dispatchMethod = (type, payload, dispatch) => {
  dispatch({ type, payload });
};

const getMovieRequest = async (type, pageIndex) => {
  const movie = await MOVIE_API_URL(type, pageIndex);
  const { results, page, total_pages } = movie.data;
  const payload = {
    page,
    totalPageIndex: total_pages,
  };
  return { results, payload };
};
