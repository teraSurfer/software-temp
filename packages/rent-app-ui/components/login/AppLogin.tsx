import React from 'react';
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

export default (prop: ILogin) => {
  return (
    <Card className='shadow-sm border-0 w mt-4'>
      <CardHeader className='bg-primary text-light'>
        <h5 className='mb-0'>Login</h5>
      </CardHeader>
      <CardBody>
        <Form>
          <FormGroup>
            <Label for='email'>Email:</Label>
            <Input name='email' type='text' placeholder='Email'></Input>
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password:</Label>
            <Input
              name='password'
              type='password'
              placeholder='Password'
            ></Input>
          </FormGroup>
          <Button block color='dark'>
            Login
          </Button>
          <Button onClick={prop.toggleType} block outline color='dark'>
            Register instead?
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
