import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRICE } from '../../../queries';
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

const Price = (props: PriceProps) => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PRICE, {
    variables: {
      id: Number(id),
    },
  });

  const [editMode, toggleEditMode] = useState(false);

  if (!loading && error) {
    swal({ icon: 'error', text: 'Cannot find a price with that id' });
    return <Redirect to='/admin-dashboard/prices' />;
  }

  const headers = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Total Cost',
      accessor: 'totalCost',
    },
  ];

  let datax;

  if (data) {
    datax = data.findOnePrice.payments;
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
          <Form disabled>
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
                  value={data.findOnePrice.id}
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
                  name='id'
                  id='id'
                  disabled={!editMode}
                  value={data.findOnePrice.name}
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
                  name='id'
                  id='id'
                  disabled={!editMode}
                  value={data.findOnePrice.cost}
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
                  name='id'
                  id='id'
                  disabled={!editMode}
                  value={data.findOnePrice.duration}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='id' sm={2}>
                Vehicle Type:
              </Label>
              <Col sm={10}>
                <Input
                  type='text'
                  name='id'
                  id='id'
                  disabled={!editMode}
                  value={
                    data.findOnePrice.vehicleType
                      ? data.findOnePrice.vehicleType.vehicleType
                      : ''
                  }
                />
              </Col>
            </FormGroup>
            {editMode ? (
              <div className='mt-2 text-center'>
                <Button color='dark' size='sm'>
                  Update
                </Button>
              </div>
            ) : null}
            <Card className='mt-2 border-0'>
              <CardHeader className='bg-dark text-white'>
                <h6 className='text-center mb-0'>Payments</h6>
              </CardHeader>
              <Table headers={headers} data={datax} />
            </Card>
          </Form>
        )}
      </CardBody>
    </Card>
  );
};

export default Price;
