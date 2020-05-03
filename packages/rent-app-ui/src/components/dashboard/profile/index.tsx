import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Spinner,
  Label,
  Input,
  Col,
  Button,
} from 'reactstrap';
import { ME } from '../../../queries';
import { useQuery } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

type ProfileProps = {};

const Profile = (props: ProfileProps) => {
  const [edit, toggleEdit] = useState(false);
  const { data, loading } = useQuery(ME);

  if (data && data.me) {
    console.log(data.me);
  }

  return (
    <Card className='mt-2 border-0 shadow-sm'>
      <CardHeader className='bg-dark text-light d-flex justify-content-between'>
        <div className='d-flex align-items-center'>
          <h5 className='mb-0 '>Profile</h5>
        </div>
        <Button
          size='sm'
          color='light'
          outline
          onClick={() => toggleEdit(!edit)}
        >
          {!edit ? (
            <FontAwesomeIcon icon={faPen} />
          ) : (
            <FontAwesomeIcon icon={faTimes} />
          )}
        </Button>
      </CardHeader>
      <CardBody>
        {loading ? (
          <div className='text-center'>
            <Spinner />
          </div>
        ) : (
          <Form>
            <FormGroup row>
              <Label sm={3}>ID:</Label>
              <Col sm={9}>
                <Input disabled defaultValue={data.me.id} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>Email:</Label>
              <Col sm={9}>
                <Input disabled defaultValue={data.me.email} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>First Name:</Label>
              <Col sm={9}>
                <Input disabled={!edit} defaultValue={data.me.firstName} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>Last Name:</Label>
              <Col sm={9}>
                <Input disabled={!edit} defaultValue={data.me.lastName} />
              </Col>
            </FormGroup>
            {edit ? (
              <div className='text-center'>
                <Button color='dark'>Update</Button>
              </div>
            ) : null}
          </Form>
        )}
      </CardBody>
    </Card>
  );
};

export default Profile;
