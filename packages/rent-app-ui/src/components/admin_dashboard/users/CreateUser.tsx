import React, { useState, Fragment } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button,
} from 'reactstrap';
import { User } from '../../../interfaces';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ROLES, CREATE_USER } from '../../../queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

type CreateUserProps = {};

const CreateUser = (props: CreateUserProps) => {
  const [user, setUser] = useState<User>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    roles: [],
  });

  const { data, loading } = useQuery(GET_ROLES);

  const [createUser, createUserStatus] = useMutation(CREATE_USER);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      user.password &&
      (user.password?.length < 8 || user.password?.length > 30)
    ) {
      swal({ icon: 'error', text: 'Password does not meet requirements.' });
    }
    try {
      const u = await createUser({
        variables: {
          input: user
        }
      });

      if (u.data && u.data.createUser) {
        swal({ icon: 'success', text: 'Created user successfully' });
        window.location.reload();
      }
    } catch (err) {
      swal({ icon: 'error', text: 'An user with that email already exists' });
      console.log(err);
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    if (e.target.id !== 'roles')
      setUser({
        ...user,
        [e.target.id]: e.target.value,
      });
    else {
      setUser({
        ...user,
        roles: [e.target.value],
      });
    }
  };
  return (
    <Card className='bg-light border-0 my-2'>
      <CardHeader className='bg-light border-0'>
        <h5 className='text-center mb-0'>Create User</h5>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label sm={3}>First Name:</Label>
            <Col sm={9}>
              <Input
                onChange={handleChange}
                placeholder='First Name'
                required
                id='firstName'
                type='text'
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Last Name:</Label>
            <Col sm={9}>
              <Input
                onChange={handleChange}
                placeholder='Last Name'
                required
                id='lastName'
                type='text'
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Email:</Label>
            <Col sm={9}>
              <Input
                onChange={handleChange}
                placeholder='Email'
                required
                id='email'
                type='email'
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Password:</Label>
            <Col sm={9}>
              <Input
                onChange={handleChange}
                placeholder='Password'
                required
                id='password'
                type='password'
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Role:</Label>
            <Col sm={9}>
              <Input type='select' onChange={handleChange} required id='roles'>
                <option value=''>---</option>
                {loading ? null : (
                  <Fragment>
                    {data.findAllRoles.map((r: any) => (
                      <option key={r.id} value={r.roleName}>
                        {r.roleName}
                      </option>
                    ))}
                  </Fragment>
                )}
              </Input>
            </Col>
          </FormGroup>
          <div className='text-center'>
            <Button type='submit' color='dark'>
              {createUserStatus.loading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                'Create'
              )}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CreateUser;
