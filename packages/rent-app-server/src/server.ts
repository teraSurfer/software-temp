import * as constants from './util/constants';

import { EventEmitter } from 'events';
import { GraphQLServer } from 'graphql-yoga';
// import { applyMiddleware } from 'graphql-middleware';
import { generateSchema } from './util/schemas';
import { Props } from 'graphql-yoga/dist/types';
import { createDBConnection } from './util/type-orm';
import * as session from 'express-session';
import { redis } from './util/redis';
import * as connectRedis from 'connect-redis';

/*
 * File Created: Sunday, 1st March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

export class Server extends EventEmitter {
    private server: GraphQLServer;
    private props: Props;
    constructor() {
        super();
    }

    async loadSettings() {
        this.emit(constants.SERVER.STARTING);
        const schema = generateSchema()
        // applyMiddleware(schema, middleware);

        this.props = {
            schema,
            context: ({request, response}) => ({
                redis,
                url: request 
                    ? request.protocol + '://' + request.get('host')
                    : '',
                session: request ? request.session : undefined,
                req: request,
                res: response,
            })
        };

        await createDBConnection();
    }

    start() {
        this.server = new GraphQLServer(this.props);
        const RedisStore = connectRedis(session as any);
        this.server.express.use(
            session({
                store: new RedisStore({
                    client: redis as any,
                    prefix: ''
                }),
                name: 'ssid',
                secret: constants.SESSION.SECRET,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    httpOnly: true,
                    secure: false,
                    maxAge: 1000 * 60 * 60 * 24 * 7
                }
            } as any)
        );
        this.server.start({
            port: constants.SERVER.PORT,
            endpoint: '/graph/v1',
            subscriptions: '/subscriptions',
            playground: '/playground',
            cors: {
                credentials: true,
                origin: constants.FRONTEND.URL 
            }
        }, ({port}) => 
        console.log(`Server is running on localhost:${port}`));
    }
}

