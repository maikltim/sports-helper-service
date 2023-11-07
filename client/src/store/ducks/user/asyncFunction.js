import {
  registerUserAC,
  loginUserAC,
  logoutUserAC,
  ErrorLoginUserAC,
  ErrorRegisterUserAC,
  updatePhotoUserAC,
  initUsersAC,
  checkUserAC,
  editUserAC
} from './actionCreator'

export const fetchInitUsers = () => {
    return async (dispatch) => {
      try {
        let response = await fetch("/users");
        let usersInfo = await response.json();
        let { data } = usersInfo;
        if (usersInfo.status === "success") {
          dispatch(initUsersAC(data));
        }
      } catch (err) {
        dispatch(ErrorRegisterUserAC('Error'));
      }
    }
  }

  export const fetchRegisterUser = (nickname, email, password) => {
    return async (dispatch) => {
      try {
        if (nickname && email && password) {
          let response = await fetch("/users/registration", {
            method: "POST",
            headers: {
              "Content-type": "Application/json",
            },
            body: JSON.stringify({
              nickname,
              email,
              password,
            }),
          });
          let userInfo = await response.json();
          let { data, token } = userInfo;
          if (userInfo.status === "success") {
            dispatch(registerUserAC({ data, token }));
          } else {
            dispatch(ErrorRegisterUserAC('Пользователь с таким именем/почтой уже существует'));
          }
        } else {
          dispatch(ErrorRegisterUserAC('Пожалуйста, заполните все поля'))
        }
      } catch (err) {
        dispatch(ErrorRegisterUserAC('Изивините, в данный момент наш сервис недоступен'));
      }
    };
  };


  export const fetchLoginUser = (email, password) => {
    return async (dispatch) => {
      try {
        if (email && password) {
          let response = await fetch("/users/login", {
            method: "POST",
            headers: {
              "Content-type": "Application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });
          let userInfo = await response.json();
          let { data } = userInfo;
          if (userInfo.status === "success") {
            dispatch(loginUserAC(userInfo));
          } else {
            dispatch(ErrorLoginUserAC('Неверно введены email или пароль'));
          }
        } else {
          dispatch(ErrorLoginUserAC('Пожалуйста, заполните все поля'))
        }
      } catch (err) {
        dispatch(ErrorLoginUserAC('Изивините, в данный момент наш сервис недоступен'));
      }
    };
  };


  export const fetchCheckUser = (token) => {
    return async (dispatch) => {
      try {
        let response = await fetch("/users/verify", {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({
            token,
          }),
        });
        let userInfo = await response.json();
        let { data, token } = userInfo;
        if (userInfo.status === "success") {
          dispatch(registerUserAC({ data, token }));
        } else {
          dispatch(ErrorRegisterUserAC('Error'));
        }
      } catch (err) {
        dispatch(ErrorRegisterUserAC('Error'));
      }
    };
  };
  
  export const fetchEditUser = (id, about, expirience) => {
    return async (dispatch) => {
      try {
        let response = await fetch(`/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({
            about,
            expirience
          }),
        });
        let userInfo = await response.json();
        let { data, token } = userInfo;
        dispatch(editUserAC({ data, token }));
      } catch (err) {
        dispatch(ErrorRegisterUserAC('Error'));
      }
    };
  };
  
  export const fetchUpdatePhotoUser = (id, portrait) => {
    return async (dispatch) => {
      try {
        console.log(id, portrait);
        let response = await fetch(`/users/${id}/pic`, {
          method: "PUT",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({
            portrait
          }),
        });
        let userInfo = await response.json();
        console.log(userInfo);
        let { data } = userInfo;
        dispatch(updatePhotoUserAC(data));
      } catch (err) {
        dispatch(ErrorRegisterUserAC('Error'));
      }
    }
  }
  