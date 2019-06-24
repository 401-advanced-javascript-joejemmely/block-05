/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';

/**
 * Footer component
 */
export default function Footer() {
  return (
    <footer
      css={css`
        height: 2em;
        align-items: center;
        background-color: #142739;
        color: #f5f5f5;
        display: flex;
        font-size: 0.75em;
        grid-area: footer;
        justify-content: center;
      `}
    >
      <p
        css={css`
          margin: 0;
        `}
      >
        ©2019 Code Fellows
      </p>
    </footer>
  );
}
