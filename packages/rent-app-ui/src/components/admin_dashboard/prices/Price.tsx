import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_PRICE, VEHICLE_TYPES, UPDATE_PRICE } from '../../../queries';
import swal from 'sweetalert';
import {
  Card,
  CardHeader,
  CardBody,
  Spinner,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  ButtonGroup,
  Button,
} from 'reactstrap';
import Table from '../../util/table';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
/*
 * File Created: Thursday, 23rd April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

type PriceProps = {};

type PriceInput = {
  findOnePrice: {
    id: string;
    name: string;
    cost: string;
    duration: string;
    vehicleType?: {
      id: string;
      vehicleType: string;
    };
    payments: any[];
  };
};

const Price = (props: PriceProps) => {
  const { id } = useParams();

  const [price, setPrice] = useState<PriceInput>({
    findOnePrice: {
      id: '',
      name: '',
      cost: '',
      duration: '',
      vehicleType: {
        id: '',
        vehicleType: '',
      },
      payments: [],
    },
  });
  const { data, loading, error } = useQuery(GET_PRICE, {
    variables: {
      id: Number(id),
    },
    onCompleted: setPrice,
  });

  const vehicleTypes = useQuery(VEHICLE_TYPES, {variables: {take: 15}});

  const [updatePrice, updateStatus] = useMutation(UPDATE_PRICE);

  const [editMode, toggleEditMode] = useState(false);

  if (!loading && error) {
    swal({ icon: 'error', text: 'Cannot find a price with that id' });
    return <Redirect to='/admin-dashboard/prices' />;
  }

  const handleFormChange = (e: any) => {
    e.preventDefault();

    switch (e.target.id) {
      case 'id':
        setPrice({
          findOnePrice: {
            ...price.findOnePrice,
            id: e.target.value,
          },
        });
        break;
      case 'name':
        setPrice({
          findOnePrice: {
            ...price.findOnePrice,
            name: e.target.value,
          },
        });
        break;
      case 'cost':
        setPrice({
          findOnePrice: {
            ...price.findOnePrice,
            cost: e.target.value,
          },
        });
        break;
      case 'duration':
        setPrice({
          findOnePrice: {
            ...price.findOnePrice,
            duration: e.target.value,
          },
        });
        break;
      case 'vehicleTypeId':
        setPrice({
          findOnePrice: {
            vehicleType: { id: e.target.value, vehicleType: '' },
            ...price.findOnePrice,
          },
        });
        break;
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const updatedPrice = {
        id: price.findOnePrice.id,
        name: price.findOnePrice.name,
        duration: price.findOnePrice.duration,
        cost: Number(price.findOnePrice.cost),
        vehicleTypeId: null,
      };

      const uData = await updatePrice({
        variables: {
          data: updatedPrice,
        },
      });

      if (uData.data) {
        swal({ icon: 'success', text: 'Updated price successfully' });
        window.location.href = '/admin-dashboard/prices';
      }
    } catch (err) {
      console.log(err);
    }
  };

  const headers = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Payment Date',
      accessor: 'paymentDate',
    },
    {
      Header: 'Total Cost',
      accessor: 'totalCost',
    },
  ];

  let datax: any[];

  if (data) {
    datax = price.findOnePrice.payments;
  }

  return (
    <Card className='mt-2 shadow-sm border-0'>
      <CardHeader className='bg-dark text-white d-flex justify-content-between'>
        <h4 className='mb-0'>Price - {id}</h4>
        <ButtonGroup className='mb-0'>
          <Button
            onClick={() => toggleEditMode(!editMode)}
            color='light'
            outline
            size='sm'
          >
            {editMode ? <Fa icon={faTimes} /> : <Fa icon={faPen} />}
          </Button>
        </ButtonGroup>
      </CardHeader>
      <CardBody>
        {loading ? (
          <div className='text-center'>
            <Spinner type='grow' color='primary'></Spinner>
            <Spinner type='grow' color='accent'></Spinner>
            <Spinner type='grow' color='warning'></Spinner>
          </div>
        ) : (
          <Form onSubmit={handleUpdate} disabled>
            <FormGroup row>
              <Label for='id' sm={2}>
                ID:
              </Label>
              <Col sm={10}>
                <Input
                  type='text'
                  name='id'
                  id='id'
                  disabled
                  defaultValue={price.findOnePrice.id}
                  onChange={handleFormChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='id' sm={2}>
                Name:
              </Label>
              <Col sm={10}>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  disabled
                  defaultValue={price.findOnePrice.name}
                  onChange={handleFormChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='id' sm={2}>
                Cost:
              </Label>
              <Col sm={10}>
                <Input
                  type='text'
                  name='cost'
                  id='cost'
                  defaultValue={price.findOnePrice.cost}
                  onChange={handleFormChange}
                  disabled={!editMode}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='id' sm={2}>
                Duration:
              </Label>
              <Col sm={10}>
                <Input
                  type='text'
                  name='duration'
                  id='duration'
                  defaultValue={price.findOnePrice.duration}
                  onChange={handleFormChange}
                  disabled={!editMode}
                />
              </Col>
            </FormGroup>
            {vehicleTypes.loading ? null : (
              <FormGroup row>
                <Label for='id' sm={2}>
                  Vehicle Type:
                </Label>
                <Col sm={10}>
                  <Input
                    type='select'
                    name='vehicleTypeId'
                    id='vehicleTypeId'
                    value={
                      price.findOnePrice.vehicleType
                        ? price.findOnePrice.vehicleType!.id
                        : ''
                    }
                    disabled={!editMode}
                    onChange={handleFormChange}
                  >
                    <option value=''>---</option>
                    {vehicleTypes.data.findAllVehicleTypes.map((vt: any) => (
                      <option key={vt.id} value={vt.id}>
                        {vt.vehicleType}
                      </option>
                    ))}
                  </Input>
                </Col>
                {editMode ? (
                  <div className='w-100 d-flex justify-content-center mt-2 text-center'>
                    <Button disabled={updateStatus.loading} color='dark' size='sm'>
                      {updateStatus.loading ? <Spinner type='grow' color='light' /> : 'Update'}
                    </Button>
                  </div>
                ) : null}
              </FormGroup>
            )}
            <Card className='mt-2 border-0'>
              <CardHeader className='bg-dark text-white'>
                <h6 className='text-center mb-0'>Payments</h6>
              </CardHeader>
              <Table headers={headers} data={datax!} />
            </Card>
          </Form>
        )}
      </CardBody>
    </Card>
  );
};

export default Price;
