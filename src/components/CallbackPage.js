import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import userManager from '../userManager';

const CallbackPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const successCallback = (user) => {
    const redirectPath = user.state.path;
    const userProfile = {
      name: user.profile.name,
      role: user.profile.role,
      email: user.profile.preferred_username,
      id_token: user.id_token,
      access_token: user.access_token,
      user_id: user.profile.sub
    }
    dispatch({ type: "user/login", payload: { user: userProfile, status: true } })
    navigate(redirectPath);
  };

  const errorCallback = (error) => {
    //console.log("Error in callback page: ", error);
    navigate('/');
  };

  useEffect(() => {
    userManager
      .signinRedirectCallback()
      .then(user => successCallback(user))
      .catch(error => errorCallback(error));
  });

  return <div>Loading...</div>;
};

export default connect()(CallbackPage);