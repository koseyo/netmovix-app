import { MOVIE_LIST, SET_ERROR, RESPONSE_PAGE, LOAD_MORE_RESULTS, MOVIE_TYPE, SEARCH_QUERY, SEARCH_RESULT, MOVIE_DETAILS, CLEAR_MOVIE_DETAILS } from "../types";
import { MOVIE_API_URL, SEARCH_API_URL, MOVIE_DETAILS_URL, MOVIE_CREDITS_URL, MOVIE_IMAGES_URL, MOVIE_VIDEOS_URL, MOVIE_REVIEWS_URL } from "../../API/movieAPI";

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

export const searchQuery = (query) => async (dispatch) => {
  dispatchMethod(SEARCH_QUERY, query, dispatch);
};

export const searchResult = (query) => async (dispatch) => {
  try {
    if (query) {
      const movies = await SEARCH_API_URL(query);
      const { results } = movies.data;
      dispatchMethod(SEARCH_RESULT, results, dispatch);
    } else {
      dispatchMethod(SEARCH_RESULT, [], dispatch);
    }
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const movieDetails = (id) => async (dispatch) => {
  try {
    const details = await MOVIE_DETAILS_URL(id);
    const credits = await MOVIE_CREDITS_URL(id);
    const images = await MOVIE_IMAGES_URL(id);
    const videos = await MOVIE_VIDEOS_URL(id);
    const reviews = await MOVIE_REVIEWS_URL(id);

    const responseValues = await Promise.all([details, credits, images, videos, reviews])
      .then((values) => Promise.all(values.map((value) => value.data)))
      .then((response) => response);
    dispatchMethod(MOVIE_DETAILS, responseValues, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const clearMovieDetails = () => async (dispatch) => {
  dispatchMethod(CLEAR_MOVIE_DETAILS, [], dispatch);
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
