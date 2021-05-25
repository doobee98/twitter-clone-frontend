import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { login } from 'modules/auth';
import HomePage from './pages/HomePage';

const GlobalStyle = createGlobalStyle`
  ${normalize}

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

  html {
    font-size: 16px;
    height: 100%;
  }

  body {
    width: 100%;
    min-height: 100%;
  }

  input {
    appearance: none;
    border-radius: 0;
  }

  ul {
    list-style: none;
    padding-inline-start: 0;
  }


  a:link { color: inherit; text-decoration: none;}
  a:visited { color: inherit; text-decoration: none;}
  a:hover { color: inherit; text-decoration: none;}

  input,
  textarea,
  button,
  select,
  a {
    text-decoration: none;
    outline: none;
  }

  #root {
    height: 100%;
  }
`;

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loginRequest = {
      id: '',
      password: '',
    };

    dispatch(login(loginRequest));
  }, []);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/home" />} />
          <Route path="/home" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
