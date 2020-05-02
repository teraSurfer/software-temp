import 'reflect-metadata';
import * as constants from './util/constants';

import { EventEmitter } from 'events';
import { createDBConnection } from './util/type-orm';
import * as session from 'express-session';
import { redis } from './util/redis';
import * as connectRedis from 'connect-redis';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import * as Express from 'express';
import * as cors from 'cors';
import { generateSchemas } from './util/schemas';
import { AppContext } from './types/context';

/*
 * File Created: Sunday, 1st March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

export class Server extends EventEmitter {
    private apolloServer: ApolloServer;
    private expressServer: Express.Application;
    private schema: GraphQLSchema;
    constructor() {
        super();
    }

    async loadSettings() {
        this.emit(constants.SERVER.STARTING);
        this.expressServer = Express();
        try {
            this.schema = await generateSchemas();
        } catch (err) { console.log(err); }
        this.apolloServer = new ApolloServer({
            schema: this.schema,
            context: ({ req, res }: AppContext) => ({
                req,
                res,
            }),
        });
        const RedisStore = connectRedis(session as any);
        await createDBConnection();

        this.expressServer.use(
            cors({
                credentials: true,
                origin: constants.FRONTEND.URL
            })
        );

        this.expressServer.use(
            session({
                store: new RedisStore({
                    client: redis as any,
                    prefix: ''
                }),
                name: "sid",
                secret: constants.SESSION.SECRET,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
                }
            })
        );
        this.apolloServer.applyMiddleware({ app: this.expressServer, cors: false });
    }

    start() {
        // tslint:disable-next-line: radix
        this.expressServer.listen(parseInt(constants.SERVER.PORT), constants.SERVER.HOST, () => {
            console.log(`Application started on http://${constants.SERVER.HOST}:${constants.SERVER.PORT}`);
        });
    }
}

