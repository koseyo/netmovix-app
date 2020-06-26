import { MOVIE_LIST, SET_ERROR, RESPONSE_PAGE } from "../types";
import { MOVIE_API_URL } from "../../API/movieAPI";

export const getMovie = (type, pageNumber) => async (dispatch) => {
  try {
    const movie = await MOVIE_API_URL(type, pageNumber);
    const { result, page, total_pages } = movie.data;
    const payload = {
      page,
      totalPages: total_pages,
    };
    dispatchMethod(MOVIE_LIST, result, dispatch);
    dispatchMethod(RESPONSE_PAGE, payload, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

const dispatchMethod = (type, payload, dispatch) => {
  dispatch({ type, payload });
};
