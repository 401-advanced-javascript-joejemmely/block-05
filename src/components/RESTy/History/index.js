/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';

export default class History extends React.Component {
  handleClick = (event) => {
    this.props.populate(event.currentTarget.id);
  };

  render() {
    return (
      <>
        <h2>History</h2>
        <ul
          css={css`
            margin: 0;
            list-style: none;
            padding: 0;

            li {
              border: 1px groove #ccc;
              color: #eee;
              cursor: pointer;
              display: flex;
              flex-direction: column;
              font-size: 0.75em;
              margin-bottom: 0.5em;
              padding: 0.33em;
              border-radius: 3px;
              background: #2d5986;

              &:hover {
                color: #000;
                background: #ccc;
              }
            }
          `}
        >
          {Object.values(this.props.data).map((request, i) => (
            <li
              key={Object.keys(this.props.data)[i]}
              id={Object.keys(this.props.data)[i]}
              onClick={this.handleClick}
            >
              <div>
                <strong
                  css={css`
                    text-transform: uppercase;
                    font-weight: bold;
                  `}
                >
                  {request.method}
                </strong>
              </div>
              <div>{request.url}</div>
              <div>{request.params}</div>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
