import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_VEHICLE_TYPE } from '../../../queries';
import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  Spinner,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import { IVehicleType } from '../../../interfaces';
import swal from 'sweetalert';

type CreateVehicleTypeProps = {};

const CreateVehicleType = (props: CreateVehicleTypeProps) => {
  const [createVt, { loading }] = useMutation(CREATE_VEHICLE_TYPE);
  const [vt, setVt] = useState<IVehicleType>({
    vehicleType: '',
    vehicleDescription: '',
  });

  function handleChange(e: any) {
    e.preventDefault();
    setVt({
      ...vt,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { data } = await createVt({
        variables: {
          input: vt,
        },
      });

      if (data && data.createVehicleType) {
        swal({ icon: 'success', text: 'Created vehicle type successfully.' });
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      swal({ icon: 'error', text: err.message.replace('GraphQL error: ', '') });
    }
  }

  return (
    <Card className='bg-light my-2 border-0'>
      <CardHeader className='bg-light border-0'>
        <h5 className='text-center mb-0'>Create Vehicle Type</h5>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label sm={3}>Vehicle Type:</Label>
            <Col sm={9}>
              <Input
                type='text'
                onChange={handleChange}
                id='vehicleType'
                placeholder='Vehicle Type'
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Vehicle Type Description:</Label>
            <Col sm={9}>
              <Input
                type='textarea'
                id='vehicleDescription'
                placeholder='Vehicle Type Description'
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <div className='text-center'>
            <Button color='dark' type='submit'>
              {loading ? <Spinner color='light' /> : 'Create'}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CreateVehicleType;
