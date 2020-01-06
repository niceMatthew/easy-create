import { useReducer } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { current, baseUrl } from '../env';

// Set baseURL when debugging production url in dev mode

axios.defaults.baseURL = baseUrl[current];

/**
 * Method to make ajax request
 *
 * @param {object} options - axios config (https://github.com/axios/axios#request-config)
 * @return {object} response data
 */
export async function request(options) {
  try {
    const response = await axios(options);
    const { data, error } = handleResponse(response);

    if (error) {
      throw error;
    } else {
        console.log('resquest', data)
        return { response, data };
    }
  } catch (error) {
    showError(error.message);
    console.error(error);
    throw error;
  }
}


/**
 * Hooks to make ajax request
 *
 * @param {object} options - axios config (https://github.com/axios/axios#request-config)
 * @return {object}
 *   @param {object} response - response of axios (https://github.com/axios/axios#response-schema)
 *   @param {object} error - HTTP or use defined error
 *   @param {boolean} loading - loading status of the request
 *   @param {function} request - function to make the request manually
 */
export function useRequest(options) {
  const initialState = {
    response: null,
    loading: false,
    error: null,
    data: null
  };
  const [state, dispatch] = useReducer(requestReducer, initialState);

  /**
   * Method to make request manually
   * @param {object} config - axios config to shallow merged with options before making request
   */
  async function request(config) {
    try {
      dispatch({
        type: 'init',
      });

      const response = await axios({
        ...options,
        ...config,
      });

      const { error, data } = handleResponse(response);

      if (error) {
        throw error;
      } else {
        dispatch({
          type: 'success',
          response,
          data
        });
      }
    } catch (error) {
      showError(error.message);
      dispatch({
        type: 'error',
        error,
      });
    }
  }

  return {
    ...state,
    request,
  };
}

/**
 * Reducer to handle the status of the request
 * @param {object} state - original status
 * @param {object} action - action of dispatch
 * @return {object} new status
 */
function requestReducer(state, action) {
  switch (action.type) {
    case 'init':
      return {
        response: null,
        error: null,
        loading: true,
      };
    case 'success':
      return {
        response: action.response,
        data: action.data,
        error: null,
        loading: false,
      };
    case 'error':
      return {
        response: null,
        error: action.error,
        loading: false,
      };
    default:
      return {
        response: null,
        error: null,
        loading: false,
      };
  }
}

/**
 * Custom response data handler logic
 *
 * @param {object} response - response data returned by request
 * @return {object} data or error according to status code
 */
function handleResponse(response) {
  const { data } = response;
  // Please modify the status key according to your business logic
  if (data.status === true) {
    return { data: data.entry };
  } else {
    const error = new Error(data.message || '后端接口异常');
    return { error };
  }
}

/**
 * Display error message
 *
 * @param {string} errorMessage - error message
 */
function showError(errorMessage) {
    message.error(errorMessage);
}

