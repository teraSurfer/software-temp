import { Resolver, Mutation, Arg, Query, Authorized } from 'type-graphql';
import { User } from '../../../entities/user';
import { RegisterInput } from './RegisterInput';
import { UserResponseUnion, ResponseError } from '../../shared';
import { Role } from '../../../entities/roles';
import { MembershipDetails } from '../../../entities/membershipDetails';
import { Payment } from '../../../entities/payment';
import { Price } from '../../../entities/price';


/*
 * File Created: Saturday, 28th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class RegisterResolver {

  @Authorized(['admin', 'user'])
  @Query(() => String)
  hello() {
    return 'Hello world';
  }

  @Mutation(() => UserResponseUnion)
  async register(@Arg('data') {
    email,
    firstName,
    lastName,
    password,
    addressFirstLine,
    addressSecondLine,
    addressThirdLine,
    addressZipCode,
    creditCardNumber,
    cvv,
    expiry,
    license,
    nameOnCard,
  }: RegisterInput): Promise<ResponseError | User> {

    console.log(password);

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new ResponseError(
        'User with that email already exists',
        'register'
      );
    }

    const userRole = await Role.findOne({
      where: {
        roleName: 'user'
      }
    });

    if (!userRole) {
      throw new ResponseError(
        'Something went wrong, try after sometime.',
        'register'
      );
    }

    const exp = new Date(expiry);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      roles: [
        userRole
      ]
    }).save();
    const expiryDate = new Date();

    expiryDate.setMonth(expiryDate.getMonth() + 6);

    const price = await Price.findOne({ name: 'MEMBERSHIP' });


    await MembershipDetails.create({
      license,
      addressFirstLine,
      addressSecondLine,
      addressThirdLine,
      addressZipCode,
      creditCardNumber,
      cvv,
      expiry: exp,
      nameOnCard,
      membershipExpiry: expiryDate,
      user
    }).save();

    await Payment.create({
      price,
      user,
      totalCost: price?.cost,
      paymentDate: new Date()
    }).save();

    return user;
  }
}
