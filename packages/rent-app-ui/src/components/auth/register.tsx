import React from 'react';
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
  return (
    <Card className={styles.w + ' shadow-sm border-0 mt-4'}>
      <CardHeader className='bg-primary text-light'>
        <h5 className='mb-0'>Register</h5>
      </CardHeader>
      <CardBody>
        <Form>
          <FormGroup>
            <Label for='email'>Email:</Label>
            <Input name='email' type='text' placeholder='Email'></Input>
          </FormGroup>
          <FormGroup>
            <Label for='fn'>First Name:</Label>
            <Input
              name='fn'
              type='text'
              placeholder='First Name'
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for='fn'>Last Name:</Label>
            <Input
              name='ln'
              type='text'
              placeholder='Last Name'
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password:</Label>
            <Input
              name='password'
              type='password'
              placeholder='Password'
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for='cnf-pwd'>Confirm Password:</Label>
            <Input
              name='cnf-pwd'
              type='password'
              placeholder='Confirm Password'
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
