import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "tailwindcss/dist/base.css";
import "../../styles/globalStyles.css";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import MapPage from '../../pages/MapPage/MapPage';
import Footer from '../Footer/Footer';
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import Navbar from '../Navbar/Navbar'
import RequestPage from '../../pages/RequestsPage/RequestPage'
import FieldPage from '../../pages/FieldPage/FieldPage';
import { fetchInitUsers } from '../../store/ducks/user/asyncFunction';
import { fetchInitFields } from '../../store/ducks/fields/asyncFunction'
import AddMarkPage from '../../pages/AddMarkPage/AddMarkPage'
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInitFields());
    dispatch(fetchInitUsers())
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <AnimationRevealPage disabled>
        <Switch>
          <Route exact path="/">
            <WelcomePage />
          </Route>
          <Route path="/addmark">
            <AddMarkPage />
          </Route>
          <Route path="/map">
            <MapPage />
          </Route>
          <Route path="/signin">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <RegisterPage />
          </Route>
          <Route path="/field/:id">
            <FieldPage />
          </Route>
          <Route path="/profile/:userId">
            <ProfilePage />
          </Route>
          <Route path="/requests">
            <RequestPage />
          </Route>
        </Switch>
        <Footer />
      </AnimationRevealPage>
    </Router>
  );
};

export default App;
