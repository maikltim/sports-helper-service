import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "../headers/light.js";
import { useSelector, useDispatch } from 'react-redux'
import { logoutUserAC } from '../../store/ducks/user/actionCreator'
import { useHistory } from 'react-router-dom'
 const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;

const PrimaryLink = tw(PrimaryLinkBase)`rounded-full`
const Container = styled.div`
  ${tw`relative -mx-8 -mt-6 bg-center bg-cover h-screen`}
  background-color: purple;
  height: 7rem;
  margin-left: 0rem;
  margin-right: 0rem;
`;

const OpacityOverlay = tw.div`z-10 mt-0 absolute inset-0 bg-black opacity-100`;
const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-3 h-full flex flex-row-reverse`;

function Navbar() {
  const { logged, nickname, id, isAdmin } = useSelector(state => state.users)
  const dispatch = useDispatch()
  const history = useHistory()
  const logOutHandler = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('users')
    dispatch(logoutUserAC())
    window.localStorage.removeItem('currentState')
    history.push("/")
  }
  const navLinks = [
    <NavLinks key={1}>
      <NavLink href="/">
        Основная
      </NavLink>
      <NavLink href="/map">
        Карта
      </NavLink>
      <NavLink href="/addmark">
        Добавить поле
      </NavLink>
    </NavLinks>,
    <NavLinks key={2}>
      <PrimaryLink style={{ marginRight: '5%' }} href="/signin">
        Вход
      </PrimaryLink>
      <PrimaryLink style={{ marginRight: '5%' }} href="/signup">
        Регистрация
    </PrimaryLink>
    </NavLinks>
  ];

  const navLinksSignined = [
    <NavLinks key={1}>
      <NavLink href="/">
        Главная
      </NavLink>
      <NavLink href="/map">
        Карта
      </NavLink>
      <NavLink href="/addmark">
        Добавить метку
      </NavLink>
      {isAdmin && <NavLink href="/requests">
        Заявки
      </NavLink>}
    </NavLinks>,
    <NavLinks key={2}>
      <PrimaryLink style={{ marginRight: '10%' }} href={`/profile/${id}`}>
        {nickname}
      </PrimaryLink>
      <PrimaryLink onClick = {logOutHandler} href="/logout">
        Выйти
      </PrimaryLink>
    </NavLinks>
  ];
  
  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        {!logged && <StyledHeader links={navLinks} />}
        {logged && <StyledHeader links={navLinksSignined} />}
      </HeroContainer>
    </Container>
  );
};

export default Navbar;
