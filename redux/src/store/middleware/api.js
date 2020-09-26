import axios from "axios";
import * as actions from "../api";

// Inspired by https://github.com/ohansemmanuel/fake-medium/

const apiMiddleware = ({ dispatch }) => next => async action => {
  // allow logging of api calls to Redux Dev Tools
  if (action.type !== actions.apiStarted.type) return next(action);

  const {
    url,
    method,
    data,
    token,
    onStart,
    onSuccess,
    onFailure,
    hideErrorToast,
    headers,
  } = action.payload;

  if (onStart) dispatch({ type: onStart });
  next(action);

  axios.defaults.baseURL =
    process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";
  // "https://camelcase-itproject.herokuapp.com/api";

  const dataOrParams = ["get"].includes(method) ? "params" : "data";

  axios.defaults.headers.common["Content-Type"] = "application/json";
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const request = {
    url,
    method,
    data,
    token,
  };

  // make api call
  try {
    const response = await axios.request({
      url,
      method,
      [dataOrParams]: data,
      headers,
    });

    // General success action
    dispatch(actions.apiEnded(response.data));

    // Specific action
    if (onSuccess)
      dispatch({ type: onSuccess, payload: response.data, request });
  } catch (error) {
    // console.log(error);
    // General error action
    const returnedError = {
      message: error.message,
      data: error.response ? error.response.data : null,
      hideErrorToast,
      request,
    };

    dispatch(actions.apiErrored(returnedError));
    // Specific
    if (onFailure) dispatch({ type: onFailure, payload: returnedError });

    if (error.response && error.response.status === 403) {
      dispatch(actions.accessDenied(window.location.pathname));
    }
  }
};

export default apiMiddleware;
