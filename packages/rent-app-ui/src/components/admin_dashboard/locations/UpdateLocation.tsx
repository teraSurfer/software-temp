import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import { ILocation } from '../../../interfaces';
import { UPDATE_LOCATION } from '../../../queries';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/react-hooks';
import swal from 'sweetalert';

type UpdateLocationProps = {
  editMode: boolean;
  location: ILocation;
};

const UpdateLocation = (props: UpdateLocationProps) => {
  const [updateLocation, { loading }] = useMutation(UPDATE_LOCATION);
  const [location, setLocation] = useState<ILocation>({
    id: '',
    addressFirstLine: '',
    addressSecondLine: '',
    addressThirdLine: '',
    addressZipCode: '',
    locationName: '',
    vehicleCapacity: '',
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const updatedLocation: ILocation = {
      id: '',
      locationName: '',
      addressFirstLine: '',
      addressSecondLine: '',
      addressThirdLine: '',
      addressZipCode: '',
      vehicleCapacity: '',
    };
    updatedLocation.id = location.id === '' ? props.location.id : location.id;
    updatedLocation.locationName =
      location.locationName === ''
        ? props.location.locationName
        : location.locationName;
    updatedLocation.addressFirstLine =
      location.addressFirstLine === ''
        ? props.location.addressFirstLine
        : location.addressFirstLine;
    updatedLocation.addressSecondLine =
      location.addressSecondLine === ''
        ? props.location.addressSecondLine
        : location.addressSecondLine;
    updatedLocation.addressThirdLine =
      location.addressThirdLine === ''
        ? props.location.addressThirdLine
        : location.addressThirdLine;
    updatedLocation.addressZipCode =
      location.addressZipCode === ''
        ? props.location.addressZipCode
        : location.addressZipCode;
    updatedLocation.vehicleCapacity =
      location.vehicleCapacity === ''
        ? Number(props.location.vehicleCapacity)
        : Number(location.vehicleCapacity);
    try {
      const { data } = await updateLocation({
        variables: {
          data: updatedLocation,
        },
      });

      if (data && data.updateLocation) {
        swal({ icon: 'success', title: 'Updated Successfully.' });
        window.location.reload();
      }
    } catch (err) {
      swal({icon: 'error', title: 'Something went wrong.'});
      console.log(err);
    }
  }

  function handleLocationUpdate(e: any) {
    e.preventDefault();
    setLocation({
      ...location,
      [e.target.id]: e.target.value,
    });
  }

  return (
    <Form onSubmit={handleSubmit} disabled={props.editMode}>
      <FormGroup row>
        <Label sm={2}>ID:</Label>
        <Col sm={10}>
          <Input
            id='id'
            disabled
            type='text'
            defaultValue={props.location.id}
            onChange={handleLocationUpdate}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>Name:</Label>
        <Col sm={10}>
          <Input
            id='locationName'
            disabled={!props.editMode}
            type='text'
            defaultValue={props.location.locationName}
            onChange={handleLocationUpdate}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>Address 1st Line:</Label>
        <Col sm={10}>
          <Input
            id='addressFirstLine'
            disabled={!props.editMode}
            type='text'
            defaultValue={props.location.addressFirstLine}
            onChange={handleLocationUpdate}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>Address 2nd Line:</Label>
        <Col sm={10}>
          <Input
            id='addressSecondLine'
            disabled={!props.editMode}
            type='text'
            defaultValue={props.location.addressSecondLine}
            onChange={handleLocationUpdate}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>Address 3rd Line:</Label>
        <Col sm={10}>
          <Input
            id='addressThirdLine'
            disabled={!props.editMode}
            type='text'
            defaultValue={props.location.addressThirdLine}
            onChange={handleLocationUpdate}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>Address Zip Code:</Label>
        <Col sm={10}>
          <Input
            id='addressZipCode'
            disabled={!props.editMode}
            type='text'
            defaultValue={props.location.addressZipCode}
            onChange={handleLocationUpdate}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>Vehicle Capacity</Label>
        <Col sm={10}>
          <Input
            id='vehicleCapacity'
            disabled={!props.editMode}
            type='text'
            defaultValue={props.location.vehicleCapacity}
            onChange={handleLocationUpdate}
          />
        </Col>
      </FormGroup>
      {props.editMode ? (
        <div className='text-center'>
          <Button type='submit' color='dark'>
            {loading ? <Fa icon={faSpinner} spin /> : 'Submit'}
          </Button>
        </div>
      ) : null}
    </Form>
  );
};

export default UpdateLocation;
