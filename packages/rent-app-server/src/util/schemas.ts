import { buildSchema } from 'type-graphql';
import { authCheck } from '../middleware/auth';
import { RegisterResolver } from '../modules/user/register/Register';
import { LoginResolver } from '../modules/user/login/Login';
import { LogoutResolver } from '../modules/user/logout/Logout';
import { UserResolver } from '../modules/user/find/Find';
import { CreateUserResolver } from '../modules/user/create/Create';
import { FindRolesResolver } from '../modules/role/find/Find';
import { CreateRoleResolver } from '../modules/role/create/Create';
import { CreateVehicleTypeResolver } from '../modules/vehicleType/create/Create';
import { FindVehicleTypeResolver } from '../modules/vehicleType/find/Find';
import { UpdateVehicleTypeResolver } from '../modules/vehicleType/update/Update';
import { DeleteVehicleTypeResolver } from '../modules/vehicleType/delete/Delete';
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
      CreateRoleResolver,
      CreateVehicleTypeResolver,
      FindVehicleTypeResolver,
      UpdateVehicleTypeResolver,
      DeleteVehicleTypeResolver
    ],
    authChecker: authCheck
  });