import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
} from 'reactstrap';
import Table from '../../util/table';
import { useQuery } from '@apollo/react-hooks';
import { ADMIN_COUNTS } from '../../../queries';

/*
 * File Created: Wednesday, 22nd April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

const AdminHome = function () {

  const { data, loading } = useQuery(ADMIN_COUNTS);

  const datax = [
    {
      idx: 1,
      col1: 'Hello',
      col2: 'World!',
    },
    {
      idx: 2,
      col1: 'react-table',
      col2: 'rocks',
    },
    {
      idx: 3,
      col1: 'whatever',
      col2: 'you want',
    },
    {
      idx: 4,
      col1: 'whatever',
      col2: 'you want',
    },
    {
      idx: 5,
      col1: 'whatever',
      col2: 'you want',
    },
  ];

  const header = [
    {
      Header: '#',
      accessor: 'idx',
    },
    {
      Header: 'Column 1',
      accessor: 'col1', // accessor is the "key" in the data
    },
    {
      Header: 'Column 2',
      accessor: 'col2',
    },
  ];

  return (
    <Container fluid>
      <Row className='pt-3'>
        <Col sm='12' md='6' lg='3' className='mb-2 px-2'>
          <Card className='shadow-sm border-0 text-center'>
            <CardBody>
              { loading ? <Spinner type="grow" color="primary" /> :
                <h2 className='mb-0'>{data.getCounts.reservationCount}</h2>
              }
            </CardBody>
            <CardFooter className='border-0'>
              <h6 className='my-0'>Reservations</h6>
            </CardFooter>
          </Card>
        </Col>
        <Col sm='12' md='6' lg='3' className='mb-2 px-2'>
          <Card className='shadow-sm border-0 text-center'>
            <CardBody>
              { loading ? <Spinner type="grow" color="primary" /> :
                <h2 className='mb-0'>{data.getCounts.locationsCount}</h2>
              }
            </CardBody>
            <CardFooter className='border-0'>
              <h6 className='my-0'>Locations</h6>
            </CardFooter>
          </Card>
        </Col>
        <Col sm='12' md='6' lg='3' className='mb-2 px-2'>
          <Card className='shadow-sm border-0 text-center'>
            <CardBody>
              { loading ? <Spinner type="grow" color="primary" /> :
                <h2 className='mb-0'>{data.getCounts.membersCount}</h2>
              }
            </CardBody>
            <CardFooter className='border-0'>
              <h6 className='my-0'>Members</h6>
            </CardFooter>
          </Card>
        </Col>
        <Col sm='12' md='6' lg='3' className='mb-2 px-2'>
          <Card className='shadow-sm border-0 text-center'>
            <CardBody>
              { loading ? <Spinner type="grow" color="primary" /> :
                <h2 className='mb-0'>{data.getCounts.vehiclesCount}</h2>
              }
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
          <Table data={datax} headers={header} />
          <Pagination className='d-flex justify-content-center' aria-label='Page navigation example'>
            <PaginationItem>
              <PaginationLink first href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink previous href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink next href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink last href='#' />
            </PaginationItem>
          </Pagination>
        </Card>
      </Row>
      <Row className='pt-3 px-2'>
        <Card className='shadow-sm border-0 w-100 p-2'>
          <h4 className='text-center'>Payments</h4>
          <Table data={datax} headers={header} />
          <Pagination className='d-flex justify-content-center' aria-label='Page navigation example'>
            <PaginationItem>
              <PaginationLink first href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink previous href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink next href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink last href='#' />
            </PaginationItem>
          </Pagination>
        </Card>
      </Row>
    </Container>
  );
};

export default AdminHome;
