/** @jsx jsx */

import React from 'react';
import { Global, jsx, css } from '@emotion/core';
import Helmet from 'react-helmet';

import Header from './components/Header';
import RESTy from './components/RESTy';
import Footer from './components/Footer';

function App() {
  return (
    <div
      className="App"
      css={css`
        height: 100%;
        display: grid;
        grid-template-rows: 4em 1fr auto;
        grid-template-columns: auto;
        grid-template-areas:
          'header'
          'main'
          'footer';
      `}
    >
      <Global
        styles={css`
          html {
            height: 100%;
          }
          body {
            margin: 0;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            height: 100%;
            background-color: #eee;
          }

          #root {
            height: 100%;
          }
        `}
      />
      <Helmet>
        <title>RESTy</title>
      </Helmet>
      <Header />
      <RESTy />
      <Footer />
    </div>
  );
}

export default App;
