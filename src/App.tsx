import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { useRootDispatch } from 'hooks/redux';
import { authActions } from 'modules/auth';
import storage, { AUTH_TOKEN_NAME } from 'utils/storage';
import NotImplementedPage from 'pages/NotImplementedPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

const GlobalStyle = createGlobalStyle`
  ${normalize}

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto',
      Helvetica, Arial, sans-serif;
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
  const dispatch = useRootDispatch();

  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    const completeInitialLoading = () => {
      setInitialLoading(true);
    };

    if (!storage.getItem(AUTH_TOKEN_NAME)) {
      completeInitialLoading();
      return;
    }

    dispatch(authActions.info()).finally(completeInitialLoading);
  }, []);

  if (!initialLoading) {
    return null;
  }

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/home" />} />
          <Route path="/login" component={LoginPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/explore" component={NotImplementedPage} />
          <Route path="/notifications" component={NotImplementedPage} />
          <Route path="/messages" component={NotImplementedPage} />
          <Route path="/bookmarks" component={NotImplementedPage} />
          <Route path="/lists" component={NotImplementedPage} />
          <Route path="/:id" component={ProfilePage} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
