import { buildSchema } from 'type-graphql';
import { RegisterResolver } from '../modules/user/register/Register';
import { LoginResolver } from '../modules/user/login/Login';
import { LogoutResolver } from '../modules/user/logout/Logout';
import { authCheck } from '../middleware/auth';
import { UserResolver } from '../modules/user/find/Find';
import { CreateUserResolver } from '../modules/user/create/Create';


export const generateSchemas = () => 
  buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      LogoutResolver,
      UserResolver,
      CreateUserResolver
    ],
    authChecker: authCheck
  })