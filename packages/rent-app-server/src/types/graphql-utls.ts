import * as express from 'express';
import { Redis } from 'ioredis';
import * as Session from 'express-session';

/*
 * File Created: Sunday, 1st March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */


export interface Session extends express.Session {
  userId?: string;
  userRole?: number;
}

export interface Context {
  redis: Redis;
  url: string;
  session: Session;
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