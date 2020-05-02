import React, { useState, useRef, MutableRefObject, useEffect } from 'react';
import { IVehicle } from '../../../interfaces';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button,
  Spinner,
} from 'reactstrap';
import DateTime from 'react-datetime';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ALL_LOCATIONS, VEHICLE_TYPES, UPDATE_VEHICLE } from '../../../queries';
import moment, { Moment } from 'moment';
import { vehicleConditions } from './common';
import swal from 'sweetalert';

type UpdateVehicleProps = {
  editMode: boolean;
  vehicle: IVehicle;
};

const UpdateVehicle = (props: UpdateVehicleProps) => {
  const [vehicle, setVehicle] = useState<IVehicle>(props.vehicle);
  const vehicleTypeInput = useRef() as MutableRefObject<HTMLInputElement>;
  const locationInput = useRef() as MutableRefObject<HTMLInputElement>;

  const locations = useQuery(ALL_LOCATIONS, { variables: { take: 15 } });
  const vehicleTypes = useQuery(VEHICLE_TYPES, { variables: { take: 15 } });

  const [updateVehicle, updateStatus] = useMutation(UPDATE_VEHICLE);

  useEffect(() => {
    if (!locations.loading && !vehicleTypes.loading) {
      vehicleTypeInput.current.value = vehicle.vehicleType;
      locationInput.current.value = vehicle.location;
    }
  });

  function handleDateChange(date: string | Moment, handle: string) {
    setVehicle({
      ...vehicle,
      [handle]: moment(date).toISOString(),
    });
  }

  const handleChange = (e: any) => {
    e.preventDefault();
    setVehicle({
      ...vehicle,
      [e.target.id]: e.target.value,
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newVehicle: IVehicle = {
      ...vehicle,
    };
    
    newVehicle.currentMileage = Number(newVehicle.currentMileage);
    newVehicle.year = moment(newVehicle.year).year();
    newVehicle.lastServiced = moment(newVehicle.lastServiced).toISOString();
    try {
      const { data } = await updateVehicle({
        variables: {
          data: newVehicle,
        },
      });

      if (data && data.updateVehicle) {
        swal({ icon: 'success', text: 'Updated vehicle successfully' });
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      swal({ icon: 'error', text: err.message.replace('GraphQL error: ', '') });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup row>
        <Label sm={3}>ID:</Label>
        <Col sm={9}>
          <Input
            onChange={handleChange}
            id='id'
            type='text'
            required
            defaultValue={vehicle.id}
            disabled
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={3}>Make:</Label>
        <Col sm={9}>
          <Input
            onChange={handleChange}
            id='make'
            type='text'
            required
            defaultValue={vehicle.make}
            disabled={!props.editMode}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={3}>Model:</Label>
        <Col sm={9}>
          <Input
            onChange={handleChange}
            id='model'
            type='text'
            required
            defaultValue={vehicle.model}
            disabled={!props.editMode}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={3}>Registration Tag:</Label>
        <Col sm={9}>
          <Input
            onChange={handleChange}
            id='registrationTag'
            type='text'
            required
            defaultValue={vehicle.registrationTag}
            disabled
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={3}>Year:</Label>
        <Col sm={9}>
          <DateTime
            onChange={(d) => handleDateChange(d, 'year')}
            inputProps={{
              id: 'year',
              required: true,
              disabled: !props.editMode,
            }}
            defaultValue={vehicle.year.toString()}
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
            type='text'
            required
            defaultValue={vehicle.currentMileage}
            disabled={!props.editMode}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={3}>Last Serviced:</Label>
        <Col sm={9}>
          <DateTime
            inputProps={{
              id: 'lastServiced',
              required: true,
              disabled: !props.editMode,
            }}
            onChange={(d) => handleDateChange(d, 'lastServiced')}
            defaultValue={vehicle.lastServiced}
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
            defaultValue={vehicle.condition}
            disabled={!props.editMode}
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
            defaultValue={vehicle.vehicleType}
            innerRef={vehicleTypeInput}
            disabled={!props.editMode}
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
            innerRef={locationInput}
            defaultValue={vehicle.location}
            disabled={!props.editMode}
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
        {props.editMode ? (
          <Button type='submit' color='dark'>
            {updateStatus.loading ? <Spinner color='light' /> : 'Update'}
          </Button>
        ) : null}
      </div>
    </Form>
  );
};

export default UpdateVehicle;
