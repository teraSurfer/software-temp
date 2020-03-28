import * as yup from 'yup';
import { ResolverMap } from '../../../types/graphql-utls';
import { User } from '../../../entities/user';
import { Role } from '../../../entities/roles';

/*
 * File Created: Sunday, 1st March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */


export const invalidEmail = 'email must be a valid email';
export const passwordNotLongEnough = 'password must be at least 6 characters';

export const registerPasswordValidation = yup
  .string()
  .min(6, passwordNotLongEnough)
  .max(255)
  .required();


const validUserSchema = yup.object().shape({
  email: yup
    .string()
    .max(255)
    .email(invalidEmail)
    .required(),
  password: registerPasswordValidation
});


const formatYupError = (err: yup.ValidationError) => {
  const errors: RentApp.IError[] = [];
  err.inner.forEach(e => {
    errors.push({
      __typename: 'Error',
      path: e.path,
      message: e.message
    });
  });

  return errors;
};

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (
      _,
      args: RentApp.IRegisterOnMutationArguments,
    ) => {
      try {
        await validUserSchema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }
      
      const { email, password, firstName, lastName } = args;

      const roles = await Role.find({ roleName: 'user' });

      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ['id']
      });

      if (userAlreadyExists) {
        return [
          {
            __typename: 'Error',
            path: 'email',
            message: 'User with given email already exists'
          }
        ];
      }



      const user = User.create({
        email,
        password,
        firstName,
        lastName,
        roles
      });

      await user.save();

      return [{
        __typename: 'Success',
        message: 'Created user successfully.'
      }];
    }
  },
  Response: {
    __resolveType: obj => {
      if (obj.path) return 'Error';
      else return 'Success';
    }
  }
}