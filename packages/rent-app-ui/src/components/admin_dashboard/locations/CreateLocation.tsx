import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
} from 'reactstrap';
import { ILocation } from '../../../interfaces';
import swal from 'sweetalert';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_LOCATION } from '../../../queries';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

type CreateLocationProps = {};

const CreateLocation = (props: CreateLocationProps) => {
  const [location, setLocation] = useState<ILocation>({
    locationName: '',
    addressFirstLine: '',
    addressSecondLine: '',
    addressZipCode: '',
    addressThirdLine: '',
    vehicleCapacity: '',
  });

  const [createLocation, { loading }] = useMutation(CREATE_LOCATION);

  function handleInputChange(e: any) {
    e.preventDefault();
    setLocation({
      ...location,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (location.addressZipCode.length !== 5) {
      return swal({ icon: 'error', title: 'Invalid zip code' });
    }
    location.vehicleCapacity = Number(location.vehicleCapacity);
    try {
      const { data } = await createLocation({
        variables: {
          data: location
        }
      });

      if (data && data.createLocation) {
        swal({ icon: 'success', title: 'Created Location Successfully' });
        window.location.reload();
      }
    } catch (err) {
      swal({ icon: 'error', text: 'A location with that name already exists.' });
      console.log(err);
    }
  }

  return (
    <Card className='bg-light border-0 my-1'>
      <CardHeader className='bg-light text-dark border-0'>
        <h5 className='mb-0 text-center'>Create Location</h5>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label sm={3}>Location Name:</Label>
            <Col sm={9}>
              <Input
                onChange={handleInputChange}
                id='locationName'
                type='text'
                placeholder='Location Name'
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Address 1st Line:</Label>
            <Col sm={9}>
              <Input
                onChange={handleInputChange}
                id='addressFirstLine'
                type='text'
                placeholder='Address 1st Line'
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Address 2nd Line:</Label>
            <Col sm={9}>
              <Input
                onChange={handleInputChange}
                id='addressSecondLine'
                type='text'
                placeholder='Address 2nd Line'
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Address 3rd Line:</Label>
            <Col sm={9}>
              <Input
                onChange={handleInputChange}
                id='addressThirdLine'
                type='text'
                placeholder='Address 3rd Line'
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Address Zip Code:</Label>
            <Col sm={9}>
              <Input
                onChange={handleInputChange}
                id='addressZipCode'
                type='text'
                placeholder='Address Zip Code'
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Vehicle Capacity:</Label>
            <Col sm={9}>
              <Input
                onChange={handleInputChange}
                id='vehicleCapacity'
                type='text'
                placeholder='Vehicle Capacity'
                required
              />
            </Col>
          </FormGroup>
          <div className='text-center'>
            <Button type='submit' color='dark'>
              {loading ? <Fa icon={faSpinner} spin /> : 'Create'}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CreateLocation;
