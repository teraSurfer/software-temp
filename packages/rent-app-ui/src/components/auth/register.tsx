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
  Spinner,
} from 'reactstrap';
import styles from './register.module.scss';
import DateTime from 'react-datetime';
import moment, { Moment } from 'moment';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_PRICE, REGISTER_USER } from '../../queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

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
    cvv: '',
  });

  const { data, loading } = useQuery(GET_PRICE, {
    variables: {
      name: 'MEMBERSHIP'
    }
  });

  const [registerUser, registerStatus] = useMutation(REGISTER_USER);

  function handleChange(e: any) {
    e.preventDefault();
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  }

  function handleDate(d: string | Moment) {
    setUserData({
      ...userData,
      expiry: moment(d).toISOString()
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (userData.password !== userData.confirmPassword) {
        swal({ icon: 'warning', title: 'Passwords do not match.' });
        return;
      } else if (userData.creditCardNumber.length < 13) {
        swal({ icon: 'warning', title: 'Invalid credit card number' });
        return;
      }
      const regData = { ...userData };
      delete regData.confirmPassword;
      const regis = await registerUser({
        variables: {
          data: regData
        }
      });
      
      if (regis.data && regis.data.register) {
        swal({ icon: 'success', text: 'registered successfully.' });
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      swal({ icon: 'error', text: err.message.replace('GraphQL error: Unexpected error value: { message: "', '').replace('", path: "register" }', '') });
    }
  }

  return (
    <Card className={styles.w + ' shadow-sm border-0 my-4'}>
      <CardHeader className='bg-primary text-light'>
        <h5 className='mb-0'>6 month fee - {loading ? <FontAwesomeIcon icon={faSpinner} spin /> :  '$'+data.findOnePrice.cost}</h5>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for='email'>Email:</Label>
            <Input
              id='email'
              onChange={handleChange}
              type='email'
              required
              placeholder='Email'
            ></Input>
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
            <DateTime
              inputProps={{
                id: 'expiry',
                placeholder: 'Expiry Date',
                required: true,
              }}
              onChange={handleDate}
              timeFormat={false}
            />
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
            {registerStatus.loading ? <Spinner /> : 'Register'}
          </Button>
          <Button onClick={props.toggleType} block outline color='dark'>
            Already have an account?
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
