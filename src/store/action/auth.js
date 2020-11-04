import * as actionTypes from "./actionTypes";
import Axios from "axios";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authLogOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('localId')
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: idToken,
    userId: localId,
  };
};

const checkAuthTimeOut = (expirationTime) => {
  return dispatch => {
      setTimeout(()=>dispatch(authLogOut()),
      expirationTime*1000)
  }
}

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCjME3PEBxXpDP2efR96EPtfN4l6xP24HQ";
    if (isSignUp === false) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCjME3PEBxXpDP2efR96EPtfN4l6xP24HQ";
    }
    Axios.post(url, authData)
      .then((response) => {
        const expirationDate=new Date(new Date().getTime() + response.data.expiresIn*1000);
        localStorage.setItem('token',response.data.idToken);
        localStorage.setItem('expirationDate',expirationDate);
        localStorage.setItem('userId',response.data.localId)
        dispatch(checkAuthTimeOut(response.data.expiresIn));
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const authSetRedirectPath = (path) => {
  return {
    type: actionTypes.AUTH_SET_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token=localStorage.getItem('token');
    if(!token){
      dispatch(authLogOut())
    }else{
      const expirationDate = new Date (localStorage.getItem('expirationDate'));
      if(expirationDate <= new Date()){
          dispatch(authLogOut());
      }else{
        const userId=localStorage.getItem('userId');
        dispatch(authSuccess(token,userId))
        dispatch(checkAuthTimeOut((expirationDate.getTime()-new Date().getTime())/1000))
      }
    }
  }
}