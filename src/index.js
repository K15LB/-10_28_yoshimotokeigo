import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import appSyncConfig from "./aws-exports";
import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient, { AUTH_TYPE, defaultDataIdFromObject } from "aws-appsync";
import Amplify, { Auth } from 'aws-amplify';
import { Rehydrated } from "aws-appsync-react";
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const client = new AWSAppSyncClient({
    url: appSyncConfig.aws_appsync_graphqlEndpoint,
    region: appSyncConfig.aws_appsync_region,
    auth: {
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: async () =>
            (await Auth.currentSession()).getIdToken().getJwtToken(),
    },
    cacheOptions: {
        dataIdFromObject: (obj) => {
            let id = defaultDataIdFromObject(obj);

            if (!id) {
                const { __typename: typename } = obj;
                switch (typename) {
                    case 'Comment':
                        return `${typename}:${obj.commentId}`;
                    default:
                        return id;
                }
            }

            return id;
        }
    }
});

ReactDOM.render(

    <ApolloProvider client={client}>
        <Rehydrated>
            <App />
        </Rehydrated>
    </ApolloProvider>

    , document.getElementById('root'));
registerServiceWorker();
