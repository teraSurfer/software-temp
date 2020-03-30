import { buildSchema } from 'type-graphql';
import { authCheck } from '../middleware/auth';
import { RegisterResolver } from '../modules/user/register/Register';
import { LoginResolver } from '../modules/user/login/Login';
import { LogoutResolver } from '../modules/user/logout/Logout';
import { UserResolver } from '../modules/user/find/Find';
import { CreateUserResolver } from '../modules/user/create/Create';
import { FindRolesResolver } from '../modules/role/find/Find';
import { CreateRoleResolver } from '../modules/role/create/Create';

/*
 * File Created: Sunday, 1st March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

export const generateSchemas = () => 
  buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      LogoutResolver,
      UserResolver,
      CreateUserResolver,
      FindRolesResolver,
      CreateRoleResolver
    ],
    authChecker: authCheck
  });