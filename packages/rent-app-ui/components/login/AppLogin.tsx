import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

/*
 * File Created: Friday, 20th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

interface ILogin {
  toggleType: any;
}

export default (props: ILogin) => {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  function handleEmailChange(evt) {
    evt.preventDefault();
    setLoginDetails({
      email: evt.target.value,
      password: loginDetails.password,
    });
  }

  function handlePasswordChange(evt) {
    evt.preventDefault();
    setLoginDetails({
      email: loginDetails.email,
      password: evt.target.value,
    });
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    console.log(loginDetails);
  }

  return (
    <Card className='shadow-sm border-0 w mt-4'>
      <CardHeader className='bg-primary text-light'>
        <h5 className='mb-0'>Login</h5>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleFormSubmit}>
          <FormGroup>
            <Label for='email'>Email:</Label>
            <Input
              name='email'
              type='text'
              onChange={handleEmailChange}
              placeholder='Email'
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password:</Label>
            <Input
              name='password'
              type='password'
              placeholder='Password'
              onChange={handlePasswordChange}
            ></Input>
          </FormGroup>
          <Button block type='submit' color='dark'>
            Login
          </Button>
          <Button onClick={props.toggleType} block outline color='dark'>
            Register instead?
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
