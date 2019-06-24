/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';

export default function Header() {
  return (
    <header
      css={css`
        align-items: center;
        background-color: #204060;
        color: #fff;
        display: flex;
        grid-area: header;
        padding: 0 2em;
      `}
    >
      <h1>RESTy</h1>
    </header>
  );
}
