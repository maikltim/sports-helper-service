import { REGISTER_USER,EDIT_USER, LOGOUT_USER, 
  ERROR_REGISTER, ERROR_LOGIN, LOGIN_USER, INIT_USERS, UPDATE_PHOTO_USER } from './contracts/actionTypes'
const state = JSON.parse(window.localStorage.getItem("currentState"));

let initialState = {
  nickname: '',
  email: '',
  id:'',
  token:'',
  expirience:'',
  about:'',
  portrait:'',
  isAdmin: false,
  logged: false,
  error:false,
  allUsers:[],
}

if (state) {
  initialState = {
    nickname:state.users.nickname,
    email:state.users.email,
    about:state.users.about,
    expirience:state.users.expirience,
    token:state.users.token,
    id:state.users.id,
    logged:state.users.logged,
    isAdmin: state.users.isAdmin,
    portrait:state.users.portrait,
    error:false,
    allUsers:[],
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    
    case INIT_USERS:
      return {...state, allUsers: action.payload}

    case ERROR_REGISTER: 
    return {...state, error: action.payload} 
    
    case ERROR_LOGIN: 
    return {...state, error: action.payload} 

    case EDIT_USER:
      return{...state, token:action.payload.token,expirience:action.payload.data.expirience, about:action.payload.data.about, error: false, logged:true }
    
      case UPDATE_PHOTO_USER:
      return{...state, portrait:action.payload.portrait, error: false, logged:true }
    
      case REGISTER_USER: 
    return {...state, portrait:action.payload.data.portrait, nickname:action.payload.data.nickname, email:action.payload.data.email, id:action.payload.data._id, token:action.payload.token, expirience:action.payload.expirience, about:action.payload.about, error: false, logged:true} 

    case LOGIN_USER: 
    return {...state, portrait:action.payload.data.portrait, nickname:action.payload.data.nickname, email:action.payload.data.email, id:action.payload.data._id, token:action.payload.token, isAdmin:action.payload.data.isAdmin, expirience:action.payload.data.expirience, about:action.payload.data.about, error: false, logged:true} 

    case LOGOUT_USER: 
    return {...state, nickname: "",id:'',email: "",token:'',logged: false, isAdmin:false, error: false}

    default: 
    return state
  }
}

export default reducer;
