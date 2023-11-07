
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { fetchEditUser, fetchUpdatePhotoUser } from '../../store/ducks/user/asyncFunction';
import { Form } from 'react-bootstrap';
import './ProfilePage.css';
import axios from "axios";

function ProfilePage() {
  const { userId } = useParams();
  const { allUsers, id, expirience, about, email, nickname, portrait, isAdmin } = useSelector((state) => state.users);
  const [edit, setEdit] = useState(false);
  const [myProfile, setMyProfile] = useState(false);
  const aboutInput = useRef();
  const expInput = useRef();
  const dispatch = useDispatch();

  let userProfile = allUsers.find((el) => el._id === userId);

  setTimeout(() => {
    if (userProfile?._id === id) {
      setMyProfile(true)
    }
  }, 0);

  const editHandler = () => {
    setEdit(true);
  };

  let imageUrl;
  const [imageSelect, setImageSelect] = useState("");

  const saveHandler = async () => {
    setEdit(false);
    dispatch(
      fetchEditUser(userId, aboutInput.current.value, expInput.current.value)
    );
    const formData = new FormData();
    formData.append("file", imageSelect);
    formData.append("upload_preset", "xk24ty94");
    let response = await axios.post(
      "https://api.cloudinary.com/v1_1/mikhailssh/image/upload",
      formData
    );
    imageUrl = await response.data.secure_url;
    dispatch(fetchUpdatePhotoUser(userProfile._id, imageUrl));
  };


  console.log(myProfile);
  return (
    <>
      {myProfile ?
        <>
          <div className="page-content page-container" id="page-content">
            <div className="padding">
              <div className="row container d-flex justify-content-center">
                <div className="col-xl-6 col-md-12">
                  <div className="card user-card-full">
                    <div className="row m-l-0 m-r-0">
                      <div className="col-sm-4 bg-c-lite-green user-profile">
                        <div className="card-block text-center text-white">
                          {console.log(portrait)}
                          <div className="m-b-25"> <img src={portrait} className="img-radius" alt="User-Profile-Image" /> </div>
                          {edit &&
                            <div>
                              <input style={{ paddingRight: '50px' }}
                                type="file"
                                onChange={(event) => {
                                  setImageSelect(event.target.files[0]);
                                }}
                              />
                              {/* <button onClick={uploadImage}>Upload img</button> */}
                            </div>}
                          <h6 className="f-w-600">{nickname}</h6>
                          <p>{email}</p>
                          {!edit &&
                            <i onClick={editHandler} className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                          }
                          {edit &&
                            <>
                              {/* <p>123123</p> */}
                              <p onClick={saveHandler} className="icon-edit m-b-10 f-w-600">Сохранить</p>
                            </>
                          }
                        </div>
                      </div>
                      <div className="col-sm-8">
                        <div className="card-block">
                          {isAdmin && <h4 className="m-b-20 p-b-5 f-w-600">Администратор</h4>}
                          {!isAdmin && <h4 className="m-b-20 p-b-5 f-w-600">Пользователь</h4>}
                          <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Информация</h6>
                          {!edit &&
                            <div className="row">
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Опыт</p>
                                {expirience ?
                                  <h6 className="text-muted f-w-400">{expirience}</h6>
                                  :
                                  <h6 className="text-muted f-w-400">- - -</h6>
                                }
                              </div>
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">О себе</p>
                                {about ?
                                  <h6 className="text-muted f-w-400">{about}</h6>
                                  :
                                  <h6 className="text-muted f-w-400">- - -</h6>
                                }
                              </div>
                            </div>
                          }
                          {edit &&
                            <div className="row">
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Опыт</p>
                                {expirience ?
                                  <Form.Control className="text-muted f-w-400" placeholder='опыт' defaultValue={expirience} ref={expInput} />
                                  :
                                  <Form.Control className="text-muted f-w-400" placeholder='опыт' ref={expInput} />
                                }
                              </div>
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">О себе</p>
                                {/* {about ? */}
                                <Form.Control as="textarea" className="text-muted f-w-400" placeholder='о себе' defaultValue={about} ref={aboutInput} />
                                {/* : */}
                                {/* <input className="text-muted f-w-400" placeholder='о себе' ref={aboutInput} > - - -</input> */}
                                {/* } */}
                              </div>
                            </div>
                          }
                          <div className="row">
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600"></p>
                            </div>
                          </div>
                        </div>
                        <Link style={{ marginLeft: '130px', }} to="/">Вернуться на главную</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        :
        <>
          <div className="page-content page-container" id="page-content">
            <div className="padding">
              <div className="row container d-flex justify-content-center">
                <div className="col-xl-6 col-md-12">
                  <div className="card user-card-full">
                    <div className="row m-l-0 m-r-0">
                      <div className="col-sm-4 bg-c-lite-green user-profile">
                        <div className="card-block text-center text-white">
                          <div className="m-b-25"> <img src={userProfile?.portrait} className="img-radius" alt="User-Profile-Image" /> </div>
                          <h6 className="f-w-600">{userProfile?.nickname}</h6>
                          <p>{userProfile?.email}</p>
                        </div>
                      </div>
                      <div className="col-sm-8">
                        <div className="card-block">
                          {userProfile?.isAdmin && <h4 className="m-b-20 p-b-5 f-w-600">Администратор</h4>}
                          {!userProfile?.isAdmin && <h4 className="m-b-20 p-b-5 f-w-600">Пользователь</h4>}
                          <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Информация</h6>
                          <div className="row">
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">Опыт</p>
                              {userProfile?.expirience ?
                                <h6 className="text-muted f-w-400">{userProfile?.expirience}</h6>
                                :
                                <h6 className="text-muted f-w-400">- - -</h6>
                              }
                            </div>
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">О себе</p>
                              {userProfile?.about ?
                                <h6 className="text-muted f-w-400">{userProfile?.about}</h6>
                                :
                                <h6 className="text-muted f-w-400">- - -</h6>
                              }
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600"></p>
                            </div>
                          </div>
                        </div>
                        <Link style={{ marginLeft: '130px', }} to="/">Вернуться на главную</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
}

export default ProfilePage;
