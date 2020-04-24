import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { VEHICLE_TYPES, CREATE_PRICE } from '../../../queries';
import { Card, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import swal from 'sweetalert';
/*
 * File Created: Thursday, 23rd April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

type CreatePriceProps = {};

type PriceInput = {
  name: string;
  cost: number;
  duration: string;
  vehicleTypeId: number;
};

const CreatePrice = function (props: CreatePriceProps) {
  const [price, setPriceData] = useState<PriceInput>({
    name: '',
    cost: NaN,
    duration: '',
    vehicleTypeId: NaN,
  });
  const vehicleTypes = useQuery(VEHICLE_TYPES);

  const [createPrice, { loading }] = useMutation(CREATE_PRICE);

  let vehicleTypeOptions;

  if (!vehicleTypes.loading) {
    vehicleTypeOptions = vehicleTypes.data.findAllVehicleTypes.map(
      (vt: any) => (
        <option key={vt.vehicleType} value={vt.id}>
          {vt.vehicleType}
        </option>
      ),
    );
  }

  const handleFormChange = (evt: any) => {
    evt.preventDefault();
    let value;

    switch (evt.target.id) {
      case 'name':
        value = evt.target.value;
        break;
      case 'cost':
        value = parseFloat(evt.target.value);
        break;
      case 'duration':
        value = evt.target.value;
        break;
      case 'vehicleTypeId':
        value = parseInt(evt.target.value, 10);
        break;
    }
    setPriceData({
      ...price,
      [evt.target.id]: value,
    });
  };

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault();
    if (
      price.name === '' ||
      isNaN(price.cost) ||
      price.duration === '' ||
      isNaN(price.vehicleTypeId)
    )
      swal({ icon: 'warning', text: 'Please fill all fields' });
    else {
      try {
      const { data } = await createPrice({
        variables: {
          data: price,
        },
      });
        if (!loading && data) {
          swal({ icon: 'success', text: 'Created price successfully' });
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
     }
    }
  };

  return (
    <Card className='p-2 mb-2 border-0 bg-light'>
      <h5 className='text-center'>New Price Type</h5>
      <Form onSubmit={handleFormSubmit}>
        <FormGroup>
          <Label for='name'>Name:</Label>
          <Input
            bsSize='sm'
            type='text'
            onChange={handleFormChange}
            id='name'
            placeholder='Name'
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for='cost'>Cost:</Label>
          <Input
            bsSize='sm'
            type='text'
            onChange={handleFormChange}
            id='cost'
            placeholder='Cost'
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for='duration'>Duration:</Label>
          <Input
            bsSize='sm'
            type='text'
            onChange={handleFormChange}
            id='duration'
            placeholder='Duration'
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for='vehicleTypeId'>Vehicle Type:</Label>
          <Input
            bsSize='sm'
            type='select'
            onChange={handleFormChange}
            id='vehicleTypeId'
            required
          >
            {vehicleTypes.loading ? (
              <option>---</option>
            ) : (
              <React.Fragment>
                <option>---</option>
                {vehicleTypeOptions}
              </React.Fragment>
            )}
          </Input>
        </FormGroup>
        <div className='d-flex justify-content-center'>
          <Button type='submit' color='dark' size='sm'>
            Create Price
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default CreatePrice;
