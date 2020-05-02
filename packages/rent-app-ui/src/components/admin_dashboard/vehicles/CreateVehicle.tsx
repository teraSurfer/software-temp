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
  Spinner,
} from 'reactstrap';
import { IVehicle } from '../../../interfaces';
import DateTime from 'react-datetime';
import { vehicleConditions } from './common';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ALL_LOCATIONS, VEHICLE_TYPES, CREATE_VEHICLE } from '../../../queries';
import moment, { Moment } from 'moment';
import swal from 'sweetalert';

type CreateVehicleProps = {};

const CreateVehicle = (props: CreateVehicleProps) => {
  const [vehicle, setVehicle] = useState<IVehicle>({
    make: '',
    model: '',
    condition: '',
    currentMileage: '',
    lastServiced: '',
    location: '',
    registrationTag: '',
    vehicleType: '',
    year: '',
  });

  const locations = useQuery(ALL_LOCATIONS, {variables: {take: 15}});
  const vehicleTypes = useQuery(VEHICLE_TYPES, { variables: { take: 15 } });

  const [createVehicle, createStatus] = useMutation(CREATE_VEHICLE);

  const handleDate = (date: string | Moment, handle: string) => {
    setVehicle({
      ...vehicle,
      [handle]: moment(date).toISOString(),
    });
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setVehicle({
      ...vehicle,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newVehicle: IVehicle = {
      ...vehicle,
    };

    newVehicle.currentMileage = Number(newVehicle.currentMileage);
    newVehicle.year = moment(newVehicle.year).year();

    try {
      const { data } = await createVehicle({
        variables: {
          data: newVehicle
        }
      });

      if (data && data.createVehicle) {
        swal({ icon: 'success', text: 'Created vehicle successfully' });
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      swal({ icon: 'error', text: err.message.replace('GraphQL error: ', '')});
    }
  };

  return (
    <Card className='border-0 bg-light'>
      <CardHeader className='bg-light border-0'>
        <h5 className='text-center mb-0'>Create Vehicle</h5>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label sm={3}>Make:</Label>
            <Col sm={9}>
              <Input
                onChange={handleChange}
                id='make'
                placeholder='Make'
                type='text'
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Model:</Label>
            <Col sm={9}>
              <Input
                onChange={handleChange}
                id='model'
                placeholder='Model'
                type='text'
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Registration Tag:</Label>
            <Col sm={9}>
              <Input
                onChange={handleChange}
                id='registrationTag'
                placeholder='Registration Tag'
                type='text'
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Year:</Label>
            <Col sm={9}>
              <DateTime
                onChange={(d) => handleDate(d, 'year')}
                inputProps={{ id: 'year', placeholder: 'Year', required: true }}
                dateFormat='YYYY'
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Current Mileage:</Label>
            <Col sm={9}>
              <Input
                id='currentMileage'
                onChange={handleChange}
                placeholder='Current Mileage'
                type='text'
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Last Serviced:</Label>
            <Col sm={9}>
              <DateTime
                inputProps={{
                  id: 'lastServiced',
                  placeholder: 'Last Serviced',
                  required: true,
                }}
                onChange={(d) => handleDate(d, 'lastServiced')}
                dateFormat='MM-DD-YYYY'
                timeFormat={false}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Condition:</Label>
            <Col sm={9}>
              <Input
                id='condition'
                onChange={handleChange}
                type='select'
                required
              >
                <option value=''>---</option>
                {vehicleConditions.map((v, i) => (
                  <option key={i} value={v}>
                    {v.toUpperCase()}
                  </option>
                ))}
              </Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={3}>Vehicle Type:</Label>
            <Col sm={9}>
              <Input
                id='vehicleType'
                onChange={handleChange}
                type='select'
                required
              >
                <option value=''>---</option>
                {vehicleTypes.loading
                  ? null
                  : vehicleTypes.data.findAllVehicleTypes.map((v: any) => (
                      <option key={v.id} value={v.vehicleType}>
                        {v.vehicleType.toUpperCase()}
                      </option>
                    ))}
              </Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={3}>Location:</Label>
            <Col sm={9}>
              <Input
                id='location'
                onChange={handleChange}
                type='select'
                required
              >
                <option value=''>---</option>
                {locations.loading
                  ? null
                  : locations.data.findAllLocations.map((l: any) => (
                      <option key={l.id} value={l.locationName}>
                        {l.locationName}
                      </option>
                    ))}
              </Input>
            </Col>
          </FormGroup>
          <div className='text-center'>
            <Button type='submit' color='dark'>
              {createStatus.loading ? <Spinner color='light' /> : 'Create'}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CreateVehicle;
