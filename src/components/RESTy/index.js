/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';
import ReactJson from 'react-json-view';
import uuid from 'uuid';
import superagent from 'superagent';

import History from './History';

/**
 * RESTy
 */
export default class RESTy extends React.Component {
  state = {
    url: '',
    method: 'get',
    body: '',
    history: {},
    response: {},
  };

  componentDidMount() {
    const history = JSON.parse(localStorage.getItem('history')) || {};
    this.setState({ history });
  }

  componentDidUpdate() {
    localStorage.setItem('history', JSON.stringify(this.state.history));
  }

  handleURL = (event) => {
    this.setState({ url: event.target.value });
  };

  handleMethod = (event) => {
    this.setState({ method: event.target.value });
  };

  handleBody = (event) => {
    this.setState({ body: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState(({ history }) => {
      history[uuid()] = { url: this.state.url, method: this.state.method, body: this.state.body };
      return { history };
    });

    try {
      switch (this.state.method) {
        case 'get':
          this.setState({ response: await superagent.get(this.state.url) });
          break;
        case 'post':
          this.setState({
            response: await superagent
              .post(this.state.url)
              .send(JSON.parse(this.state.body.replace(/\s+/g, ''))),
          });
          break;
        case 'put':
          this.setState({
            response: await superagent
              .put(this.state.url)
              .send(JSON.parse(this.state.body.replace(/\s+/g, ''))),
          });
          break;
        case 'patch':
          this.setState({
            response: await superagent
              .patch(this.state.url)
              .send(JSON.parse(this.state.body.replace(/\s+/g, ''))),
          });
          break;
        case 'delete':
          this.setState({ response: await superagent.delete(this.state.url) });
          break;
        default:
        // do something
      }
    } catch (error) {
      console.error(error);
    }
  };

  populate = (id) => {
    this.setState({ url: this.state.history[id].url });
    this.setState({ method: this.state.history[id].method });
    this.setState({ body: this.state.history[id].body });
  };

  render() {
    return (
      <main
        css={css`
          display: flex;
          margin: 1em;

          @media (max-width: 420px) {
            flex-direction: column;
          }

          h2 {
            font-size: 1em;
            margin-bottom: 0.5em;
            margin-top: 0;
            margin-bottom: 0.5em;
          }
        `}
      >
        <aside
          css={css`
            width: 25%;
            padding-right: 1em;
            @media (max-width: 420px) {
              width: 100%;
              order: 3;
            }
          `}
        >
          <History data={this.state.history} populate={this.populate} />
        </aside>
        <div
          css={css`
            display: flex;
            flex-flow: column nowrap;
            flex-grow: 1;
          `}
        >
          <form onSubmit={this.handleSubmit}>
            <section>
              <input
                placeholder="URL"
                value={this.state.url}
                onChange={this.handleURL}
                css={css`
                  width: 100%;
                `}
              />
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  justify-content: left;
                  margin: 1em 0;

                  label {
                    cursor: pointer;
                    margin-right: 1em;
                    @media (max-width: 420px) {
                      font-size: 0.5;
                      margin: 0;
                    }

                    span {
                      padding: 0.25em 1em;
                      &:hover {
                        background: #ddd;
                      }
                    }
                    input {
                      display: none;

                      &[type='radio']:checked + span {
                        background: #2d5986;
                        color: #eee;
                        border: 1px groove #ccc;
                      }
                    }
                  }
                `}
              >
                <label>
                  <input
                    type="radio"
                    name="method"
                    value="get"
                    onChange={this.handleMethod}
                    checked={this.state.method === 'get'}
                  />
                  <span>GET</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="method"
                    value="post"
                    onChange={this.handleMethod}
                    checked={this.state.method === 'post'}
                  />
                  <span>POST</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="method"
                    value="put"
                    onChange={this.handleMethod}
                    checked={this.state.method === 'put'}
                  />
                  <span>PUT</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="method"
                    value="patch"
                    onChange={this.handleMethod}
                    checked={this.state.method === 'patch'}
                  />
                  <span>PATCH</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="method"
                    value="delete"
                    onChange={this.handleMethod}
                    checked={this.state.method === 'delete'}
                  />
                  <span>DELETE</span>
                </label>
                <button type="submit">Go</button>
              </div>
            </section>
            <section
              css={css`
                display: flex;
                margin: 1em 0;
                @media (max-width: 420px) {
                  flex-direction: column;
                }
              `}
            >
              <textarea
                placeholder="Raw JSON body"
                onChange={this.handleBody}
                value={this.state.body}
                disabled={this.state.method === 'get' || this.state.method === 'delete'}
                css={css`
                  height: 10em;
                  flex-grow: 1;
                  margin-right: 1em;

                  &[disabled] {
                    background: #ccc;
                  }
                `}
              />
              <div
                css={css`
                  flex-grow: 1;
                  flex-flow: column nowrap;
                  display: flex;
                `}
              >
                <button
                  onClick={event => event.preventDefault()}
                  css={css`
                    display: inline-block;
                  `}
                >
                  Headers
                </button>
                <div>
                  <h2>Basic Authorization</h2>
                  <div>
                    <input placeholder="username" />
                    <input
                      placeholder="password"
                      css={css`
                        display: inline-block;
                      `}
                    />
                  </div>
                </div>
                <div
                  css={css`
                    display: flex;
                    flex-flow: column nowrap;
                  `}
                >
                  <h2
                    css={css`
                      margin: 0;
                      font-size: 100%;
                    `}
                  >
                    Bearer Token
                  </h2>
                  <input
                    placeholder="Bearer Token"
                    css={css`
                      flex-grow: 1;
                    `}
                  />
                </div>
              </div>
            </section>
          </form>
          <div
            css={css`
              background-color: #f5f5f5;
              border: 1px solid #ccc;
              padding: 1em;
              overflow: scroll;
              flex-grow: 1;
              flex-basis: 0;
              @media (max-width: 420px) {
                flex-grow: 0;
              }
            `}
          >
            <ReactJson src={this.state.response.headers} name={'Headers'} />
            <ReactJson src={this.state.response.body} name={'Response'} />
          </div>
        </div>
      </main>
    );
  }
}
