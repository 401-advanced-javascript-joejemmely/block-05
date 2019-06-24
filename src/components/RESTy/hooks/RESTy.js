/** @jsx jsx */

import React, { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import ReactJson from 'react-json-view';
import uuid from 'uuid';
import superagent from 'superagent';

/**
 * RESTy component
 */
export default function RESTy() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('get');

  const [body, setBody] = useState('');
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('history')) || {});

  const [headerVisible, setHeaderVisible] = useState(true);

  const [response, setResponse] = useState({});

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [response]);

  function handleURL(event) {
    setUrl(event.target.value);
  }

  function handleMethod(event) {
    setMethod(event.target.value);
  }

  function handleBody(event) {
    setBody(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (url !== '') {
      setHistory((state) => {
        const path = url;
        state[uuid()] = { method, url, path };
        return state;
      });
    }

    try {
      switch (method) {
        case 'get':
          setResponse(await superagent.get(url));
          break;
        case 'post':
          setResponse(await superagent.post(url).send(JSON.parse(body.replace(/\s+/g, ''))));
          break;
        case 'put':
          setResponse(await superagent.put(url).send(JSON.parse(body.replace(/\s+/g, ''))));
          break;
        case 'patch':
          setResponse(await superagent.patch(url).send(JSON.parse(body.replace(/\s+/g, ''))));
          break;
        case 'delete':
          setResponse(await superagent.delete(url));
          break;
        default:
        //
      }
    } catch (error) {
      console.error(error);
    }
  }

  function populate(event) {
    setUrl(history[event.currentTarget.id].url);
    setMethod(history[event.currentTarget.id].method);
    setBody(history[event.currentTarget.id].body);
  }

  return (
    <main
      css={css`
        display: flex;
        margin: 1em;

        h2 {
          font-size: 1em;
          margin-bottom: 0.5em;
          margin-top: 0;
          margin-bottom: 0.5em;
        }

        aside {
          width: 25%;
          padding-right: 1em;

          ul {
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
              overflow: hidden;

              &:hover {
                color: #000;
                background: #ccc;
              }

              & strong {
                text-transform: uppercase;
                font-weight: bold;
              }
            }
          }
        }
      `}
    >
      <aside>
        <>
          <h2>History</h2>
          <ul>
            {Object.values(history).map((request, i) => (
              <li key={Object.keys(history)[i]} id={Object.keys(history)[i]} onClick={populate}>
                <div>
                  <strong>{request.method}</strong>
                </div>
                <div>{request.url}</div>
                <div>{request.params}</div>
              </li>
            ))}
          </ul>
        </>
      </aside>
      <div
        css={css`
          display: flex;
          flex-flow: column nowrap;
          flex-grow: 1;
        `}
      >
        <form
          onSubmit={handleSubmit}
          css={css`
            label {
              cursor: pointer;
              margin-right: 1em;

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

            textarea {
              height: 10em;
              flex-grow: 1;
              margin-right: 1em;

              &[disabled] {
                background: #ccc;
              }
            }
          `}
        >
          <section>
            <input
              placeholder="URL"
              value={url}
              onChange={handleURL}
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
              `}
            >
              <label>
                <input
                  type="radio"
                  name="method"
                  value="get"
                  onClick={handleMethod}
                  checked={method === 'get'}
                />
                <span>GET</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="method"
                  value="post"
                  onClick={handleMethod}
                  checked={method === 'post'}
                />
                <span>POST</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="method"
                  value="put"
                  onClick={handleMethod}
                  checked={method === 'put'}
                />
                <span>PUT</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="method"
                  value="patch"
                  onClick={handleMethod}
                  checked={method === 'patch'}
                />
                <span>PATCH</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="method"
                  value="delete"
                  onClick={handleMethod}
                  checked={method === 'delete'}
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
            `}
          >
            <textarea
              placeholder="Raw JSON body"
              onChange={handleBody}
              value={body}
              disabled={method === 'get' || method === 'delete'}
              css={css``}
            />
            <div
              css={css`
                flex-grow: 1;
                flex-flow: column nowrap;
                display: flex;
              `}
            >
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setHeaderVisible(visible => !visible);
                }}
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
                <h2>Bearer Token</h2>
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
          `}
        >
          <ReactJson src={response.headers} name={'Headers'} enableClipboard={false} />
          <ReactJson src={response.body} name={'Response'} enableClipboard={false} />
        </div>
      </div>
    </main>
  );
}
