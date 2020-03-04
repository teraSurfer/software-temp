import * as express from 'express';
import {Redis} from 'ioredis';

// export interface Session extends express.Session {
//     userId?: string;
//   }
  
  export interface Context {
    redis: Redis;
    url: string;
    // session: Session;
    req: express.Request;
    res: express.Response;
    // pubsub: PubSub;
  }

export type Resolver = (
    parent: any,
    args: any,
    context: Context,
    info: any
) => any;

export type GraphQLMiddlewareFunc = (
    resolver: Resolver,
    parent: any,
    args: any,
    context: Context,
    info: any
) => any;


export interface ResolverMap {
    [key: string]: {
        [key: string]: Resolver | { [key: string]: Resolver };
    };
}