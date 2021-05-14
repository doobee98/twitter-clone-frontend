import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {
    font-size: 16px;
    height: 100%;
  }

  body {
    width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
  }

  input {
    appearance: none;
    border-radius: 0;
  }

  p {
    margin: 0;
  }

  ul {
    list-style: none;
    padding-inline-start: 0;
    padding: 0; 
    margin: 0;
  }

  li { 
    padding: 0;
    margin:0px; 
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
  return (
    <>
      <GlobalStyle />
      Hello, React!
    </>
  );
};

export default App;
