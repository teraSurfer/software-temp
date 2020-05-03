import React, { Fragment, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Spinner,
} from 'reactstrap';
import Table from '../../util/table';
import { useQuery } from '@apollo/react-hooks';
import { ADMIN_COUNTS, GET_PAYMENTS, GET_RESERVATIONS } from '../../../queries';
import Paginate from '../util/Paginate';

/*
 * File Created: Wednesday, 22nd April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

const AdminHome = function () {
  const [rPage, setRPage] = useState({ skip: 0, take: 5 });
  const [pPage, setPPage] = useState({ skip: 0, take: 5 });
  const { data, loading } = useQuery(ADMIN_COUNTS);
  const payments = useQuery(GET_PAYMENTS, {variables: pPage});
  const reservations = useQuery(GET_RESERVATIONS, {variables: rPage});

  

  let p = [];
  let r = [];

  if (!payments.loading && !reservations.loading) {
    console.log(reservations);
    p = payments.data.getPayments;
    r = reservations.data.findAllReservation;
  }

  return (
    <Container fluid>
      <Row className='pt-3'>
        <Col sm='12' md='6' lg='3' className='mb-2 px-2'>
          <Card className='shadow-sm border-0 text-center'>
            <CardBody>
              {loading ? (
                <Spinner type='grow' color='primary' />
              ) : (
                <h2 className='mb-0'>{data.getCounts.reservationCount}</h2>
              )}
            </CardBody>
            <CardFooter className='border-0'>
              <h6 className='my-0'>Reservations</h6>
            </CardFooter>
          </Card>
        </Col>
        <Col sm='12' md='6' lg='3' className='mb-2 px-2'>
          <Card className='shadow-sm border-0 text-center'>
            <CardBody>
              {loading ? (
                <Spinner type='grow' color='primary' />
              ) : (
                <h2 className='mb-0'>{data.getCounts.locationsCount}</h2>
              )}
            </CardBody>
            <CardFooter className='border-0'>
              <h6 className='my-0'>Locations</h6>
            </CardFooter>
          </Card>
        </Col>
        <Col sm='12' md='6' lg='3' className='mb-2 px-2'>
          <Card className='shadow-sm border-0 text-center'>
            <CardBody>
              {loading ? (
                <Spinner type='grow' color='primary' />
              ) : (
                <h2 className='mb-0'>{data.getCounts.membersCount}</h2>
              )}
            </CardBody>
            <CardFooter className='border-0'>
              <h6 className='my-0'>Members</h6>
            </CardFooter>
          </Card>
        </Col>
        <Col sm='12' md='6' lg='3' className='mb-2 px-2'>
          <Card className='shadow-sm border-0 text-center'>
            <CardBody>
              {loading ? (
                <Spinner type='grow' color='primary' />
              ) : (
                <h2 className='mb-0'>{data.getCounts.vehiclesCount}</h2>
              )}
            </CardBody>
            <CardFooter className='border-0'>
              <h6 className='my-0'>Vehicles</h6>
            </CardFooter>
          </Card>
        </Col>
      </Row>

      <Row className='pt-3 px-2'>
        <Card className='shadow-sm border-0 w-100 p-2'>
          <h4 className='text-center'>Reservations</h4>
          {reservations.loading ? (
            <div className='text-center'>
              <Spinner type='grow' color='primary'></Spinner>
              <Spinner type='grow' color='accent'></Spinner>
              <Spinner type='grow' color='warning'></Spinner>
            </div>
          ) : (
            <Fragment>
                <Table data={r} headers={reservationHeaders} />
                <Paginate data={r} page={rPage} setPage={setRPage} refetch={reservations.refetch} />
            </Fragment>
          )}
        </Card>
      </Row>
      <Row className='pt-3 px-2'>
        <Card className='shadow-sm border-0 w-100 p-2'>
          <h4 className='text-center'>Payments</h4>
          {payments.loading ? (
            <div className='text-center'>
              <Spinner type='grow' color='primary'></Spinner>
              <Spinner type='grow' color='accent'></Spinner>
              <Spinner type='grow' color='warning'></Spinner>
            </div>
          ) : (
            <Fragment>
                <Table data={p} headers={paymentHeaders} />
                <Paginate data={p} page={pPage} setPage={setPPage} refetch={payments.refetch} />
            </Fragment>
          )}
        </Card>
      </Row>
    </Container>
  );
};

const paymentHeaders = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Total Cost',
    accessor: 'totalCost',
  },
  {
    Header: 'Payment Date',
    accessor: 'paymentDate',
  },
];

const reservationHeaders = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Reservation Start',
    accessor: 'reservationStart',
  },
  {
    Header: 'Reservation End',
    accessor: 'reservationEnd',
  },
];

export default AdminHome;
