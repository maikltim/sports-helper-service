import React, { useRef } from "react";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegisterUser, fetchInitUsers } from "../../store/ducks/user/asyncFunction";
import store from '../../store/store'
function RegisterPage() {
  const logoLinkUrl = "/"
  const headingText = "Зарегистрироваться"
  const SubmitButtonIcon = SignUpIcon
  const signInUrl = "/signin"

  const Container = tw(
    ContainerBase
  )`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
  const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
  const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
  const LogoLink = tw.a``;
  const LogoImage = tw.img`h-12 mx-auto`;
  const MainContent = tw.div`mt-12 flex flex-col items-center`;
  const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
  const FormContainer = tw.div`w-full flex-1 mt-8`;


  const Form = tw.form`mx-auto max-w-xs`;
  const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
  const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

  const dispatch = useDispatch();
  const nicknameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const history = useHistory();
  const { error } = useSelector((state) => state.users);

  const RegistrationHandler = (e) => {
    e.preventDefault();
    const nickname = nicknameInput.current.value;
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    dispatch(fetchRegisterUser(nickname, email, password));

    setTimeout(() => {
      let isError = store.getState((store) => store.users.error)
      if (!isError.users.error) {
        history.push("/map");
        dispatch(fetchInitUsers());
      }
    }, 600);
  };

  return (
    <>
      <Container>
        <Content>
          <MainContainer>
            <MainContent>
              <Heading style={{ position: "unset" }}>{headingText}</Heading>
              <FormContainer>
                <Form onSubmit={RegistrationHandler}>
                  <Input type="text" ref={nicknameInput} placeholder="Username" required />
                  <Input type="email" ref={emailInput} placeholder="Email" required />
                  <Input
                    type="password"
                    ref={passwordInput}
                    placeholder="Password"
                    required
                  />
                  <SubmitButton type="submit">
                    <SubmitButtonIcon className="icon" />
                    <span className="text">Зарегистрироваться</span>
                  </SubmitButton>
                  {error && <p tw="mt-8 text-sm text-red-600 text-center">{error}</p>}

                  <p tw="mt-8 text-sm text-gray-600 text-center">
                    Уже зарегистрированы?{" "}
                    <a href={signInUrl} tw="border-b border-gray-500 border-dotted">
                      Войти
                </a>
                  </p>
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
        </Content>
      </Container>
    </>
  );
}

export default RegisterPage;
