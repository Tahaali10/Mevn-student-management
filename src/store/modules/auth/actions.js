import Axios from 'axios';
import {
  AUTH_ACTION,
  LOGIN_ACTION,
  AUTO_LOGIN_ACTION,
  LOGOUT_ACTION,
  SET_USER_TOKEN_DATA_MUTATION,
  SIGNUP_ACTION,
  AUTO_LOGOUT_ACTION,
  SET_AUTO_LOGOUT_MUTATION,
} from '../../storeconstants';
import SignupValidations from '@/services/SignupValidations';

let timer = '';

export default {
  [LOGOUT_ACTION](context) {
    context.commit(SET_USER_TOKEN_DATA_MUTATION, {
      email: null,
      token: null,
      expiresIn: null,
      refreshToken: null,
      userId: null,
    });
    localStorage.removeItem('userData');
    if (timer) {
      clearTimeout(timer);
    }
  },

  [AUTO_LOGOUT_ACTION](context) {
    context.dispatch(LOGOUT_ACTION);
    context.commit(SET_AUTO_LOGOUT_MUTATION);
  },

 
  async [LOGIN_ACTION](context, payload) {
    try {
      const response = await Axios.post('http://localhost:5000/auth/login', {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,  // You can remove this if not required by your backend
      });
  
      console.log('API response:', response);
  
      if (response.data.status) {
        const user = response.data.data.user;
        const token = response.data.data.token;
  
        const expirationTime = 3600 * 1000; // Adjust according to your backend's token expiry time
  
        timer = setTimeout(() => {
          context.dispatch(AUTO_LOGOUT_ACTION);
        }, expirationTime);
  
        const tokenData = {
          email: user.email,
          token: token,
          expiresIn: new Date().getTime() + expirationTime,
          refreshToken: null,  // If you have a refresh token, use it here
          userId: user._id,
        };
  
        console.log('Setting user data in localStorage:', tokenData);
        localStorage.setItem('userData', JSON.stringify(tokenData));
        context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData);
  
        // Ensure the state is updated before redirection
        context.dispatch(AUTO_LOGIN_ACTION);
      }
    } catch (err) {
      console.log('Error during login API call:', err);
      throw err.response?.data?.message || 'Login failed. Please try again.';
    }
  },

  async [SIGNUP_ACTION](context, payload) {
    try {
      const response = await Axios.post('http://localhost:5000/auth/signup', {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
        returnSecureToken: true,
      });

      console.log('API response:', response);

      if (response.status === 200) {
        const expirationTime = +response.data.expiresIn * 1000;

        timer = setTimeout(() => {
          context.dispatch(AUTO_LOGOUT_ACTION);
        }, expirationTime);

        const tokenData = {
          email: response.data.email,
          token: response.data.idToken,
          expiresIn: expirationTime,
          refreshToken: response.data.refreshToken,
          userId: response.data.localId,
        };
        localStorage.setItem('userData', JSON.stringify(tokenData));
        context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData);

        context.dispatch(AUTO_LOGIN_ACTION);
      }
    } catch (err) {
      console.log('Error during signup API call:', err);
      throw err.response?.data?.error?.message || 'Signup failed. Please try again.';
    }
  },

  [AUTO_LOGIN_ACTION](context) {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationTime = userData.expiresIn - new Date().getTime();

      if (expirationTime < 10000) {
        context.dispatch(AUTO_LOGOUT_ACTION);
      } else {
        timer = setTimeout(() => {
          context.dispatch(AUTO_LOGOUT_ACTION);
        }, expirationTime);
      }

      context.commit(SET_USER_TOKEN_DATA_MUTATION, userData);
    }
  },

  async [AUTH_ACTION](context, payload) {
    const postData = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      phone: payload.phone,
      returnSecureToken: true,
    };
    let response = '';
    try {
      response = await Axios.post(payload.url, postData);
    } catch (err) {
      const errorMessage = SignupValidations.getErrorMessageFromCode(
        err.response.data.error.errors[0].message,
      );
      throw errorMessage;
    }

    if (response.status === 200) {
      const expirationTime = +response.data.expiresIn * 1000;

      timer = setTimeout(() => {
        context.dispatch(AUTO_LOGOUT_ACTION);
      }, expirationTime);

      const tokenData = {
        email: response.data.email,
        token: response.data.idToken,
        expiresIn: expirationTime,
        refreshToken: response.data.refreshToken,
        userId: response.data.localId,
      };
      localStorage.setItem('userData', JSON.stringify(tokenData));
      context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData);
    }
  },
};
