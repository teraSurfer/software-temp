import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from 'reactstrap';
import styles from './register.module.scss';

/*
 * File Created: Friday, 20th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */


interface IRegister {
    toggleType: any;
}

export default (props: IRegister) => {

  const [userData, setUserData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    license: '',
    addressFirstLine: '',
    addressSecondLine: '',
    addressThirdLine: '',
    addressZipCode: '',
    creditCardNumber: '',
    nameOnCard: '',
    expiry: '',
    cvv: ''
  });

  function handleChange(e: any) {
    e.preventDefault();
    setUserData({
      ...userData,
      [e.target.id]: e.target.value
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(userData);
  }

  return (
    <Card className={styles.w + ' shadow-sm border-0 my-4'}>
      <CardHeader className='bg-primary text-light'>
        <h5 className='mb-0'>Register</h5>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for='email'>Email:</Label>
            <Input id='email' onChange={handleChange} type='email' required placeholder='Email'></Input>
          </FormGroup>
          <FormGroup>
            <Label for='fn'>First Name:</Label>
            <Input
              id='firstName'
              type='text'
              onChange={handleChange}
              placeholder='First Name'
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for='fn'>Last Name:</Label>
            <Input
              id='lastName'
              type='text'
              onChange={handleChange}
              placeholder='Last Name'
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password:</Label>
            <Input
              id='password'
              type='password'
              onChange={handleChange}
              placeholder='Password'
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for='confirmPassword'>Confirm Password:</Label>
            <Input
              id='confirmPassword'
              type='password'
              onChange={handleChange}
              placeholder='Confirm Password'
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for='license'>Driver's License:</Label>
            <Input
              id='license'
              type='text'
              onChange={handleChange}
              placeholder='License'
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for='addressFirstLine'>Address First Line:</Label>
            <Input
              id='addressFirstLine'
              type='text'
              onChange={handleChange}
              placeholder='Address First Line'
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for='addressSecondLine'>Address Second Line:</Label>
            <Input
              id='addressSecondLine'
              type='text'
              onChange={handleChange}
              placeholder='Address Second Line'
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for='addressThirdLine'>Address Third Line:</Label>
            <Input
              id='addressThirdLine'
              type='text'
              onChange={handleChange}
              placeholder='Address Third Line'
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for='addressZipCode'>Address Zip Code:</Label>
            <Input
              id='addressZipCode'
              type='text'
              onChange={handleChange}
              placeholder='Address Zip Code'
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for='creditCardNumber'>Credit Card Number:</Label>
            <Input
              id='creditCardNumber'
              type='text'
              onChange={handleChange}
              placeholder='Credit Card Number'
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for='nameOnCard'>Name On Card:</Label>
            <Input
              id='nameOnCard'
              type='text'
              onChange={handleChange}
              placeholder='Name On Card'
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for='expiry'>Expiry Date:</Label>
            <Input
              id='expiry'
              type='text'
              onChange={handleChange}
              placeholder='Expiry Date'
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for='cvv'>CVV:</Label>
            <Input
              id='cvv'
              type='text'
              onChange={handleChange}
              placeholder='CVV'
              required
            ></Input>
          </FormGroup>
          <Button block color='dark'>
            Register
          </Button>
          <Button onClick={props.toggleType} block outline color='dark'>
            Already have an account?
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
