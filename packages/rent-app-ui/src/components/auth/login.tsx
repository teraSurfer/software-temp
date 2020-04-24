import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { USER_LOGIN } from '../../queries';
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
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import styles from './login.module.scss';
import { Redirect, withRouter } from 'react-router-dom';


const Login = (props: any) => {

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });
  const [loginUser, { loading }] = useMutation(USER_LOGIN);

  if (window.localStorage.getItem('LOGGED_IN') === 'true') {
    return <Redirect to='/' />
  }

  function handleEmailChange(evt: any) {
    evt.preventDefault();
    setLoginDetails({
      email: evt.target.value,
      password: loginDetails.password,
    });
  }

  function handlePasswordChange(evt: any) {
    evt.preventDefault();
    setLoginDetails({
      email: loginDetails.email,
      password: evt.target.value,
    });
  }

  async function handleFormSubmit(evt: any) {
    evt.preventDefault();
    try {
      const { data } = await loginUser({
        variables: {
          data: loginDetails,
        },
      });
      window.localStorage.setItem('LOGGED_IN', 'true');
      data.login.roles.findIndex((role: any) => role.roleName === 'admin') > -1
        ? window.localStorage.setItem('ADMIN', 'true')
        : window.localStorage.setItem('ADMIN', 'false');
        window.location.href = '/';
    } catch (err) {
      window.localStorage.setItem('LOGGED_IN', 'false');
      window.localStorage.setItem('ADMIN', 'false');
    }
  }

  return (
    <Card className={styles.w + ' shadow-sm border-0 mt-4'}>
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
          <Button block type='submit' disabled={loading} color='dark'>
            {loading ? <Fa icon={faCircleNotch} spin /> : 'Login'}
          </Button>
          <Button onClick={props.toggleType} block outline color='dark'>
            Register instead?
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default withRouter(Login);
