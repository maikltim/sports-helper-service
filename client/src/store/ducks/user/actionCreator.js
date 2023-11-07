import {
    REGISTER_USER, 
    USER_CHECK, 
    INIT_USERS, 
    EDIT_USER, 
    LOGIN_USER, 
    LOGOUT_USER, 
    ERROR_REGISTER, 
    UPDATE_PHOTO_USER,
    ERROR_LOGIN
} from './contracts/actionTypes'
  

export const initUsersAC = (payload) => {
    return {
      type:INIT_USERS,
      payload
    }
  }
  export const registerUserAC = (payload) => {
    return {
      type: REGISTER_USER,
      payload
    }
  }
  
  export const loginUserAC = (payload) => {
    return {
      type: LOGIN_USER,
      payload
    }
  }
  
  export const editUserAC = (payload) => {
    return {
      type: EDIT_USER,
      payload
    }
  }
  
  export const updatePhotoUserAC = (payload) => {
    return {
      type:UPDATE_PHOTO_USER,
      payload
    }
  }
  
  export const ErrorLoginUserAC = (payload) => {
    return {
      type: ERROR_LOGIN,
      payload
    }
  }
  
  export const ErrorRegisterUserAC = (payload) => {
    return {
      type: ERROR_REGISTER,
      payload
    }
  }
  
  export const checkUserAC = (payload) => {
    return {
      type: USER_CHECK,
      payload
    }
  }
  
  export const logoutUserAC = () => {
    return {
      type: LOGOUT_USER,
    }
  }