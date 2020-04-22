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
import { FindLocationResolver } from '../modules/location/find/Find';
import { CreateLocationResolver } from '../modules/location/create/Create';
import { UpdateLocationResolver } from '../modules/location/update/Update';
import { DeleteLocationResolver } from '../modules/location/delete/Delete';
import { CreateVehicleResolver } from '../modules/vehicle/create/Create';
import { UpdateVehicleResolver } from '../modules/vehicle/update/Update';
import { FindVehicleResolver } from '../modules/vehicle/find/Find';
import { DeleteVehicleResolver } from '../modules/vehicle/delete/Delete';
import { CreateReservationResolver } from '../modules/reservation/create/Create';
import { UpdateReservationResolver } from '../modules/reservation/update/Update';
import { DeleteReservationResolver } from '../modules/reservation/delete/Delete';
import { FindReservationResolver } from '../modules/reservation/find/Find';
import { CreatePriceResolver } from '../modules/price/create/Create';
import { UpdatePriceResolver } from '../modules/price/update/Update';
import { FindPriceResolver } from '../modules/price/find/Find';
import { DeletePriceResolver } from '../modules/price/delete/Delete';
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
      DeleteVehicleTypeResolver,
      FindLocationResolver,
      CreateLocationResolver,
      UpdateLocationResolver,
      DeleteLocationResolver,
      CreateVehicleResolver,
      UpdateVehicleResolver,
      FindVehicleResolver,
      DeleteVehicleResolver,
      CreateReservationResolver,
      UpdateReservationResolver,
      DeleteReservationResolver,
      FindReservationResolver,
      CreatePriceResolver,
      UpdatePriceResolver,
      FindPriceResolver,
      DeletePriceResolver
    ],
    authChecker: authCheck
  });