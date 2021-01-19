import fetch from 'isomorphic-fetch';
import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import { merge } from 'lodash/merge';
import { Config } from '~/config';

const GRAPHQL_API_ROOT =
  Config.GRAPHQL_API_ROOT ||
  `${process.env.NODE_SCHEMA}://${process.env.NODE_HOST}:${process.env.NODE_PORT}`;

const GRAPHQL_METHOD = 'POST';

const GRAPHQL_HEADERS = Config.GRAPHQL_HEADERS || {
  'Content-Type': 'application/json',
};

export const callGraphQLApi = (
  url,
  schema,
  payload = {},
  headers = GRAPHQL_HEADERS,
) => {
  const graphQLUrl =
    url.indexOf(GRAPHQL_API_ROOT) === -1 ? GRAPHQL_API_ROOT + url : url;

  if (headers) {
    merge({}, GRAPHQL_HEADERS, headers);
  }

  const { signal } = new AbortController();

  const graphQLSResponse = fetch(graphQLUrl, {
    signal,
    method: GRAPHQL_METHOD,
    headers,
    body: JSON.stringify(payload),
  })
    .then((response) => {
      const reader = response.body.getReader();
      const stream = new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }

              controller.enqueue(value);
              push();
            });
          }

          push();
        },
      });

      return new Response(stream, { headers });
    })
    .then((response) => response.json().then((json) => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        Promise.reject(json);
      }

      return merge({}, normalize(camelizeKeys(json), schema));
    })
    .then(
      (response) => ({ response }),
      (error) => ({ error: error.message || 'Error omitted empty schema' }),
    );

  return graphQLSResponse;
};
